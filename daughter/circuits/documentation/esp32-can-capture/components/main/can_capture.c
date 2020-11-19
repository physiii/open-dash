#ifdef _DEBUG
// _DEBUG blinks status LED and prints all frames
#define LOG_LOCAL_LEVEL ESP_LOG_VERBOSE
#endif // _DEBUG
#ifdef _VERBOSE
#define LOG_LOCAL_LEVEL ESP_LOG_VERBOSE
#endif // _VERBOSE

#include "freertos/FreeRTOS.h"
#include "esp_system.h"
#include "esp_event.h"
#include "esp_event_loop.h"
#include "esp_log.h"
#include "esp_timer.h"
#include "driver/gpio.h"
#include "rom/uart.h"
#include "cJSON.h"
#include "CAN.h"

#include <string.h>

// if the dash does not respond, assume it is off
#define DASH_RESPONSE_TIMEOUT         (2000 / portTICK_PERIOD_MS)
// how long to snooze between characters to avoid busy looping
#define DASH_CHARACTER_DELAY          (25 / portTICK_PERIOD_MS)
// master loop queue timeout
#define MASTER_LOOP_PERIOD            (50 / portTICK_PERIOD_MS)
// how long to wait after toggling power before checking status again?
#define DASH_POWERUP_WAIT             (10 * 1000 / portTICK_PERIOD_MS)
#define DASH_POWERDOWN_WAIT           (10 * 1000 / portTICK_PERIOD_MS)

// GPIO assignments
#define GPIO_STATUS_LED               (GPIO_NUM_2)
#define GPIO_CAN_RX                   (GPIO_NUM_4)
// #define GPIO_CAN_TX                   (GPIO_NUM_???)
#define GPIO_MAINBOARD_SOFT_POWER     (GPIO_NUM_5)
#define GPIO_DISPLAY_POWER            (GPIO_NUM_15)
#define GPIO_AUDIO_AMP_POWER          (GPIO_NUM_16)
#define GPIO_MAINBOARD_POWER          (GPIO_NUM_18)

#define KEY_POSITION_MASK             0x0000f00000000f00
#define KEY_POSITION_OFF              0x0000100000000b00
#define KEY_POSITION_START            0x0000c00000000b00
#define KEY_POSITION_RUN              0x0000400000000b00

TaskHandle_t xBlink = NULL;
bool dash_wait_flag = false;

enum eIgnitionState {
  IgnitionOff,
  IgnitionRun,
  IgnitionStart,
  IgnitionUnknown,
} IgnitionState = IgnitionUnknown;

const char * get_ignition_state_label(enum eIgnitionState ignition_state) {
  switch (ignition_state) {
    case IgnitionOff: return "Off";
    case IgnitionRun: return "Run";
    case IgnitionStart: return "Start";
    case IgnitionUnknown: return "Unknown";
  }
  return "what";
}

enum eDashState {
  DashTimedOut,
  DashOn,
  DashUnknown,
} DashState = DashUnknown;

const char * get_dash_state_label(enum eDashState dash_state) {
  switch (dash_state) {
    case DashTimedOut: return "TimedOut";
    case DashOn: return "On";
    case DashUnknown: return "Unknown";
  }

  return "what";
}

CAN_device_t CAN_cfg = {0};

void initialize_gpio() {
  gpio_set_direction(GPIO_STATUS_LED, GPIO_MODE_OUTPUT);
  gpio_set_direction(GPIO_MAINBOARD_SOFT_POWER, GPIO_MODE_OUTPUT);
  gpio_set_direction(GPIO_DISPLAY_POWER, GPIO_MODE_OUTPUT);
  gpio_set_direction(GPIO_AUDIO_AMP_POWER, GPIO_MODE_OUTPUT);
  gpio_set_direction(GPIO_MAINBOARD_POWER, GPIO_MODE_OUTPUT);
}

/***
apply power to peripherals
***/
void apply_dash_power() {
  gpio_set_level(GPIO_DISPLAY_POWER, 0); //display power
  gpio_set_level(GPIO_AUDIO_AMP_POWER, 0); //audio amp power
  gpio_set_level(GPIO_MAINBOARD_POWER, 0); //mainboard power
  gpio_set_level(GPIO_MAINBOARD_SOFT_POWER, 0); //mainboard softpower
}

esp_err_t event_handler(void *ctx, system_event_t *event)
{
  // printf("event: %s\n", fmt_event_id(event->event_id));
  return ESP_OK;
}

/***
TODO: the documentation discourages uart_rx_one_char

read a string from the serial port, until newline (either '\r' or '\n'), outsize, or timeout

Parameters:
out is where to store the characters
outsize is the maximum number of characters to read. callers should leave space for a terminal null.
xTickDelay is how long to sleep after each character to avoid busy looping
xTicksTimeout is how soon we should quit if we did not reach outsize characters, reset after each character.

Return value: number of characters stored (excluding terminal null).

This is blocking and as such is meant to be used from a separate task.
***/
size_t read_uart_string(char * out, size_t outsize) {
  char * outp = out;
  unsigned char in;
  clock_t xTimeout = xTaskGetTickCount() + DASH_RESPONSE_TIMEOUT;

  while (xTaskGetTickCount() < xTimeout && 0 < outsize) {
    if (OK == uart_rx_one_char(&in)) {
      if ('\r' == in || '\n' == in) {
        break;
      } else {
        *outp ++ = in;
        outsize -= 1;
        xTimeout = xTaskGetTickCount() + DASH_RESPONSE_TIMEOUT;
      }
    }
    vTaskDelay(DASH_CHARACTER_DELAY);
  }

  *outp = 0;

  return outp - out;
}

/***
given a JSON string from the dash, populate an sInternalMessage
return non-zero if filled in (even invalid), zero if no message
primarily looking for:
{"type":"status","payload":{"power_state":true}}
***/
enum eDashState interpret_JSON_message(char * json_string) {
  enum eDashState retval = DashUnknown;
  cJSON * root = cJSON_Parse(json_string);
  if (root) {
    cJSON * type = cJSON_GetObjectItem(root, "type");
    if (type) {
      if (cJSON_String == type->type) {
        if (0 == strcmp("status", type->valuestring)) {
          cJSON * payload = cJSON_GetObjectItem(root, "payload");
          if (payload) {
            cJSON * power_state = cJSON_GetObjectItem(payload, "power_state");
            if (power_state) {
              if (cJSON_True == power_state->type) {
                retval = DashOn;
              }
            } else {
              ESP_LOGW("json", "power_state key missing from payload of '%s'", json_string);
            }
          } else {
            ESP_LOGW("json", "payload key missing from '%s'", json_string);
          }
        } else {
          ESP_LOGW("json", "wrong type '%s' in '%s'", type->valuestring, json_string);
        }
      } else {
        ESP_LOGW("json", "type wrong type in '%s': %02x", json_string, type->type);
      }
    } else {
      ESP_LOGW("json", "type key missing from '%s'", json_string);
    }
    cJSON_Delete(root);
  } else {
    ESP_LOGW("json", "failed to parse JSON response '%s'", json_string);
  }

  return retval;
}

/***
wait for one message from the serial port, or set DashTimedOut
***/
enum eDashState query_dash_power_state() {
  char dash_input[100];
  enum eDashState retval = DashTimedOut;

  ESP_LOGI("query", "querying dash...");

  printf("{\"type\":\"status\",\"payload\":{\"get_power_state\":true}}\n");

  if (0 < read_uart_string(dash_input, sizeof(dash_input))) {
    retval = interpret_JSON_message(dash_input);
  } else {
    ESP_LOGI("query", "dash response timed out (%d ms)", DASH_RESPONSE_TIMEOUT * portTICK_PERIOD_MS);
  }

  return retval;
}

/***
"press the button" for one second
***/
void toggle_dash_power() {
  gpio_set_level(GPIO_MAINBOARD_SOFT_POWER, 1);
  vTaskDelay(1000 / portTICK_PERIOD_MS);
  gpio_set_level(GPIO_MAINBOARD_SOFT_POWER, 0);
}

/***
these two are the same for now, but could be different later
***/
void turn_dash_off() {
  ESP_LOGI("power", "turning dash off... (%0.2fs wait)", (1.0 * DASH_POWERDOWN_WAIT * portTICK_PERIOD_MS) / 1000.0);
  toggle_dash_power();
  vTaskDelay(DASH_POWERDOWN_WAIT);
  ESP_LOGI("power", "powerdown wait complete");
}

void turn_dash_on() {
  ESP_LOGI("power", "turning dash on... (%0.2fs wait)", (1.0 * DASH_POWERUP_WAIT * portTICK_PERIOD_MS) / 1000.0);
  toggle_dash_power();
  dash_wait_flag = true;
  vTaskDelay(DASH_POWERUP_WAIT);
  dash_wait_flag = false;
  ESP_LOGI("power", "powerup wait complete");
}

/***
execute the state change operator
***/
void change_dash_state(enum eDashState newstate) {
  switch (newstate) {
    case DashOn:
      if (!dash_wait_flag)  {
        ESP_LOGI("power", "waiting on dash to boot");
        break;
      }
      turn_dash_on();
      break;

    case DashTimedOut:
      //turn_dash_off(); //turning off from the OS via CAN
      break;

    default:
      break;
  }
}

/***
transition the dash's state from a specific current state.
if the precondition (current state) is not met, no transition occurs
***/
void update_dash_state(enum eDashState precondition, enum eDashState postcondition) {
  if (DashState == precondition) {
    change_dash_state(postcondition);
  } else {
    ESP_LOGI("power", "state change from %s to %s fails to meet precondition %s", get_dash_state_label(DashState), get_dash_state_label(postcondition), get_dash_state_label(precondition));
  }
}

/***
pulse the status LED
***/
void pulse_ms(int pulse_count, int high_ms, int low_ms) {
  for (; pulse_count >= 0; pulse_count -= 1) {
    gpio_set_level(GPIO_STATUS_LED, 1);
    vTaskDelay(high_ms / portTICK_PERIOD_MS);
    gpio_set_level(GPIO_STATUS_LED, 0);
    if (pulse_count > 0) {
      vTaskDelay(low_ms / portTICK_PERIOD_MS);
    }
  }
}

/***
block until dash tells us to blink once
***/
void task_BlinkOnce(void * pvParameters) {
  while (1) {
    ulTaskNotifyTake(pdTRUE, portMAX_DELAY);
    pulse_ms(3, 100, 100);
  }
}

/***
monitor and maintain the dash state based on the current ignition state
***/
void task_Dash(void *pvParameters) {
  while (1) {
    DashState = query_dash_power_state();
    switch (DashState) {
      case DashOn:
        xTaskNotifyGive(xBlink);
        ESP_LOGI("dash", "power state: on");
        break;
      case DashTimedOut: ESP_LOGI("dash", "timed out"); break;
      default: ESP_LOGW("dash", "invalid power state");
    }

    switch (IgnitionState) {
      case IgnitionRun:
      case IgnitionStart:
        update_dash_state(DashTimedOut, DashOn);
        break;

      case IgnitionOff:
        update_dash_state(DashOn, DashTimedOut);
        break;

      case IgnitionUnknown:
        break;
    }
  }
}

/***
return this frame's IgnitionStatus, or IgnitionUnknown if it is not an ignition frame
***/
enum eIgnitionState check_ignition_status(const CAN_frame_t * frame) {
  if (CAN_RTR != frame->FIR.B.RTR) {
    switch (frame->MsgID) {
      case 0x6214000:
        switch (frame->data.u64 & KEY_POSITION_MASK) {
          case KEY_POSITION_OFF: return IgnitionOff;
          case KEY_POSITION_RUN: return IgnitionRun;
          case KEY_POSITION_START: return IgnitionStart;
          default: return IgnitionUnknown;
        }
        break;
      case 0x6284000: break; // mute from steering wheel
      case 0x6314018: break; // gear change
      case 0xc214003: // clock, DLC=6 ignore the last 2 bytes
        // 2353210120170000 // Jan 21, 2017, 23:53
        // HHMMddmmYYyy
        break;
    }
  }
  return IgnitionUnknown;
}

/***
wrap this in JSON and send to dash via serial link
***/
void forward_frame(const CAN_frame_t * frame, const unsigned int ctr) {
  int64_t ticks = esp_timer_get_time();
  printf("{\"type\": \"CAN\", \"payload\": {\"message_id\": \"0x%08x\", \"message\": {\"l32\": \"0x%08x\", \"h32\": \"0x%08x\"}, \"length\": %d, \"ticks\": {\"l32\": \"0x%08x\", \"h32\": \"0x%08x\"}, \"counter\": %u}}\n",
    frame->MsgID, frame->data.u32[0], frame->data.u32[1],
    frame->FIR.B.DLC, (uint32_t)(ticks & 0xffffffff), (uint32_t)((ticks >> 32) & 0xffffffff),
    ctr
  );
}

// 64-bit endian reversal
// <https://stackoverflow.com/a/21507710> 2018-06-02
uint64_t swapLong(uint64_t x) {
    x = (x & 0x00000000FFFFFFFF) << 32 | (x & 0xFFFFFFFF00000000) >> 32;
    x = (x & 0x0000FFFF0000FFFF) << 16 | (x & 0xFFFF0000FFFF0000) >> 16;
    x = (x & 0x00FF00FF00FF00FF) << 8  | (x & 0xFF00FF00FF00FF00) >> 8;
    return x;
}

/***
receive CAN bus messages
let ignition on/off messages update car power state
if dash power state is on then transmit (printf) JSON-wrapped copies of non-ignition messages

based on <http://www.barth-dev.de/can-driver-esp32/> and
<http://www.barth-dev.de/wp-content/uploads/2017/01/ESP32_CAN_demo.zip>
as accessed 2018-04-26
***/
void task_CAN (void *pvParameters) {
  //frame buffer
  CAN_frame_t __RX_frame;

  // configure CAN receiver
  CAN_cfg.rx_queue = xQueueCreate(10, sizeof(CAN_frame_t));
  CAN_cfg.rx_pin_id = GPIO_CAN_RX;
  CAN_cfg.speed = 50;

  //start CAN module
  {
    int ret;
    if (0 != (ret = CAN_init())) {
      ESP_LOGE("canbus", "!!! CAN_init failed with %d\n", ret);
      vTaskDelay(1500 / portTICK_PERIOD_MS);
      esp_restart();
    }
  }

  ESP_LOGD("canbus", "Entering CAN loop");
  for (unsigned long ctr = 0; ;) {
    if (pdTRUE == xQueueReceive(CAN_cfg.rx_queue,&__RX_frame, 100 / portTICK_PERIOD_MS)) {
      // RTR frames don't have data
      if (CAN_RTR != __RX_frame.FIR.B.RTR) {
        // ESP32 CAN data payloads are reversed from what we captured with
        // SparkFun CAN Shield
        __RX_frame.data.u64 = swapLong(__RX_frame.data.u64);
      }

      enum eIgnitionState NewIgnitionState = check_ignition_status(&__RX_frame);

      if (NewIgnitionState != IgnitionUnknown) {
        if (NewIgnitionState != IgnitionState) {
          ESP_LOGI("canbus", "ignition state change from %s to %s", get_ignition_state_label(IgnitionState), get_ignition_state_label(NewIgnitionState));
          if (NewIgnitionState == IgnitionRun) {
						dash_wait_flag = true;
	  			}

          if (NewIgnitionState == IgnitionOff) {
						dash_wait_flag = false;
	  			}
          IgnitionState = NewIgnitionState;
          
        } else {
          //ESP_LOGI("canbus", "repeat ignition state %s", get_ignition_state_label(IgnitionState));
        }
      }

      ESP_LOGV("canbus", "queue size: %d", uxQueueMessagesWaiting(CAN_cfg.rx_queue));

      if (1 || DashOn == DashState) {
        forward_frame(&__RX_frame, ctr);
      } else if (CAN_RTR != __RX_frame.FIR.B.RTR) {
        // ESP_LOGV("canbus", "(dash off, q:%d) MsgID: 0x%08x, DLC: %d, Payload: 0x%016llx", uxQueueMessagesWaiting(CAN_cfg.rx_queue), __RX_frame.MsgID, __RX_frame.FIR.B.DLC, __RX_frame.data.u64);
      }

      ctr += 1;
    }
  }
}

void app_main(void) {
#ifdef _DEBUG
  esp_log_level_set("*", ESP_LOG_INFO);
#else // !_DEBUG
  esp_log_level_set("*", ESP_LOG_ERROR);
#endif // _DEBUG

#ifdef _VERBOSE
  // this prints *every* CAN message (except RTR frames which have no data)
  esp_log_level_set("canbus", ESP_LOG_VERBOSE);
#endif // _VERBOSE

  ESP_ERROR_CHECK( esp_event_loop_init(event_handler, NULL) );

  initialize_gpio();
  apply_dash_power();

  xTaskCreate(task_Dash, "Dash", 2048, NULL, 5, NULL);
  xTaskCreate(task_CAN, "CAN", 2048, NULL, 5, NULL);
  xTaskCreate(task_BlinkOnce, "blink", configMINIMAL_STACK_SIZE, NULL, 5, &xBlink);

  while (1) {
#ifdef _DEBUG
    gpio_set_level(GPIO_STATUS_LED, 1);
    vTaskDelay(25 / portTICK_PERIOD_MS);
    gpio_set_level(GPIO_STATUS_LED, 0);
    vTaskDelay(1475 / portTICK_PERIOD_MS);
#else // !_DEBUG
    vTaskSuspend(NULL);
#endif // _DEBUG
  }
}

