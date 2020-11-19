#include <stdio.h>
#include <inttypes.h>
#include "esp_types.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/periph_ctrl.h"
#include "driver/timer.h"

uint8_t crcTable[256];
uint8_t CalcCRC(uint8_t * buf, uint8_t len);
void CRCInit(void);
uint8_t buf[] = {0x08, 0xFF, 0x40, 0x03};

uint8_t CalcCRC(uint8_t * buf, uint8_t len) {
        const uint8_t * ptr = buf;
        uint8_t _crc = 0xFF;

        while(len--) _crc = crcTable[_crc ^ *ptr++];

        return ~_crc;
}

void CRCInit(void) {
        uint8_t _crc;
        for (int i = 0; i < 0x100; i++) {
                _crc = i;

                for (uint8_t bit = 0; bit < 8; bit++) _crc = (_crc & 0x80) ? ((_crc << 1) ^ 0x1D) : (_crc << 1);

                crcTable[i] = _crc;
        }
}

// uint8_t message[12] = {0};
uint64_t message = 0;
uint64_t message_buffer = 0;
uint8_t test_msg = 0;
uint8_t	bit_count = 0;

// J1850 Config

enum J1850_ERRORS {
    J1850_OK                        = 0x00,
    J1850_ERR_BUS_IS_BUSY           = 0x81,
    J1850_ERR_BUS_ERROR             = 0x82,
    J1850_ERR_RECV_NOT_CONFIGURATED = 0x84,
    J1850_ERR_PULSE_TOO_SHORT       = 0x85,
    J1850_ERR_PULSE_OUTSIDE_FRAME   = 0x86,
    J1850_ERR_ARBITRATION_LOST      = 0x87,
    J1850_ERR_PULSE_TOO_LONG        = 0x88,
    J1850_ERR_PULSE_OUT_OF_RANGE    = 0x89
};

enum J1850_ERRORS err = J1850_OK;
bool ACTIVE = true;
bool SOF = false;
uint8_t byte_count = 0;

uint64_t ACTIVE_ZERO_NOM = 128;
uint64_t ACTIVE_ZERO_MIN = 112;
uint64_t ACTIVE_ZERO_MAX = 145;

uint64_t ACTIVE_ONE_NOM = 64;
uint64_t ACTIVE_ONE_MIN = 49;
uint64_t ACTIVE_ONE_MAX = 79;

uint64_t PASSIVE_ZERO_NOM = 64;
uint64_t PASSIVE_ZERO_MIN = 49;
uint64_t PASSIVE_ZERO_MAX = 79;

uint64_t PASSIVE_ONE_NOM = 128;
uint64_t PASSIVE_ONE_MIN = 112;
uint64_t PASSIVE_ONE_MAX = 145;

uint64_t SOF_NOM = 200;
uint64_t SOF_MIN = 182;
uint64_t SOF_MAX = 218;

uint64_t EOD_NOM = 200;
uint64_t EOD_MIN = 182;
uint64_t EOD_MAX = 218;

uint64_t EOF_NOM = 280;
uint64_t EOF_MIN = 261;

uint64_t IFS_NOM = 300;
uint64_t IFS_MIN = 280;

uint64_t BREAK_NOM = 300;
uint64_t BREAK_MIN = 280;
uint64_t BREAK_MAX = 5000;

// Timer Config

#define TIMER_DIVIDER         16  //  Hardware timer clock divider
#define TIMER_SCALE           (TIMER_BASE_CLK / TIMER_DIVIDER)  // convert counter value to seconds
#define TIMER_INTERVAL1_SEC   (EOF_NOM / 1000000)   // sample test interval for the second timer
#define TEST_WITH_RELOAD      1        // testing will be done with auto reload

typedef struct {
    int type;  // the type of timer's event
    int timer_group;
    int timer_idx;
    uint64_t timer_counter_value;
} timer_event_t;

xQueueHandle timer_queue;

static void inline print_timer_counter(uint64_t counter_value)
{
    printf("Counter: 0x%08x%08x\n", (uint32_t) (counter_value >> 32),
           (uint32_t) (counter_value));
    printf("Time   : %.8f s\n", (double) counter_value / TIMER_SCALE);
}

void IRAM_ATTR timer_group0_isr(void *para)
{
		SOF = false;
    gpio_set_level(J1850_DEBUG_PIN, SOF);
		byte_count = 0;

    timer_spinlock_take(TIMER_GROUP_0);
    int timer_idx = (int) para;

    /* Retrieve the interrupt status and the counter value
       from the timer that reported the interrupt */
    uint32_t timer_intr = timer_group_get_intr_status_in_isr(TIMER_GROUP_0);
    uint64_t timer_counter_value = timer_group_get_counter_value_in_isr(TIMER_GROUP_0, timer_idx);

    /* Prepare basic event data
       that will be then sent back to the main program task */
    timer_event_t evt;
    evt.timer_group = 0;
    evt.timer_idx = timer_idx;
    evt.timer_counter_value = timer_counter_value;

    /* Clear the interrupt
       and update the alarm time for the timer with without reload */
    if (timer_intr & TIMER_INTR_T1) {
        evt.type = TEST_WITH_RELOAD;
        timer_group_clr_intr_status_in_isr(TIMER_GROUP_0, TIMER_1);
    } else {
        evt.type = -1; // not supported even type
    }

    /* After the alarm has been triggered
      we need enable it again, so it is triggered the next time */
    // timer_group_enable_alarm_in_isr(TIMER_GROUP_0, timer_idx);

    /* Now just send the event data back to the main program task */
    xQueueSendFromISR(timer_queue, &evt, NULL);
    timer_spinlock_give(TIMER_GROUP_0);
}

static void example_tg0_timer_init(int timer_idx,
                                   bool auto_reload, double timer_interval_sec)
{
    /* Select and initialize basic parameters of the timer */
    timer_config_t config = {
        .divider = TIMER_DIVIDER,
        .counter_dir = TIMER_COUNT_UP,
        .counter_en = TIMER_PAUSE,
        .alarm_en = TIMER_ALARM_EN,
        .auto_reload = auto_reload,
    }; // default clock source is APB
    timer_init(TIMER_GROUP_0, timer_idx, &config);

    /* Timer's counter will initially start from value below.
       Also, if auto_reload is set, this value will be automatically reload on alarm */
    timer_set_counter_value(TIMER_GROUP_0, timer_idx, 0x00000000ULL);

    /* Configure the alarm value and the interrupt on alarm. */
    timer_set_alarm_value(TIMER_GROUP_0, timer_idx, timer_interval_sec * TIMER_SCALE);
    timer_enable_intr(TIMER_GROUP_0, timer_idx);
    timer_isr_register(TIMER_GROUP_0, timer_idx, timer_group0_isr,
                       (void *) timer_idx, ESP_INTR_FLAG_IRAM, NULL);

    timer_start(TIMER_GROUP_0, timer_idx);
}

static void timer_example_evt_task(void *arg)
{
    while (1) {
        timer_event_t evt;
        xQueueReceive(timer_queue, &evt, portMAX_DELAY);

				if (err == J1850_OK) {
          if (message_buffer) {

            if (bit_count < 24) continue;

            // --- CRC Check --- //

            uint8_t bytes = bit_count / 8 - 1;
            uint8_t buffer[8] = { 0 };

            for (int i = bytes, j = 0; i > 0; i--,j++) {
              buffer[j] = message_buffer >> 8 * i;
            }

            uint8_t calculated_crc = CalcCRC(buffer, bytes);
            uint8_t received_crc = message_buffer & 0xFF;

            if (calculated_crc == received_crc) {
              // printf("[j1850] Message (%d bits): %llX\n", bit_count, message_buffer,);
              printf("{\"j1850\":\"%llX\", \"bits\":%d}\n", message_buffer, bit_count);
            }

            // ----------------- //

            message_buffer = 0;
            bit_count = 0;
          }
					// printf("[j1850] Message:\t");
					// for (int i=0; i < 12; i++) {
					// 	printf("%d ", message[i]);
					// }
					// printf("\n");
				} else {
					// (err == J1850_ERR_PULSE_OUT_OF_RANGE)
					// 	? printf("[j1850] Error: pulse out of range\n")
					// 	:	printf("[j1850] Error: %d\n", err);
				}
    }
}

// main program

uint64_t current_time = 0;
uint64_t previous_time = 0;
uint64_t pulse_width = 0;

static void IRAM_ATTR j1850_isr_handler(void* arg)
{
	uint32_t pin = (uint32_t) arg;
	bool level = gpio_get_level(pin);
	timer_group_enable_alarm_in_isr(TIMER_GROUP_0, TIMER_1);
	err = J1850_OK;

	previous_time = current_time;
	current_time = esp_timer_get_time();
	pulse_width = current_time - previous_time;

	if (SOF == false
			&& level == ACTIVE
			&& pulse_width > SOF_MIN
			&& pulse_width < SOF_MAX)
	{
		SOF = true;
    gpio_set_level(J1850_DEBUG_PIN, SOF);
		return;
	}

	if (level == ACTIVE) {
		if (pulse_width > ACTIVE_ZERO_MIN && pulse_width < ACTIVE_ZERO_MAX) {
			message_buffer = (message_buffer << 1) | 0;
		} else if (pulse_width > ACTIVE_ONE_MIN && pulse_width < ACTIVE_ONE_MAX) {
			message_buffer = (message_buffer << 1) | 1;
		} else {
			err = J1850_ERR_PULSE_OUT_OF_RANGE;
		}
	} else {
		if (pulse_width > PASSIVE_ZERO_MIN && pulse_width < PASSIVE_ZERO_MAX) {
			message_buffer = (message_buffer << 1) | 0;
		} else if (pulse_width > PASSIVE_ONE_MIN && pulse_width < PASSIVE_ONE_MAX) {
			message_buffer = (message_buffer << 1) | 1;
		} else {
			err = J1850_ERR_PULSE_OUT_OF_RANGE;
		}
	}

  if (err == J1850_OK) {
    bit_count++;
  }
}

void printTestData () {
	printf("{\"j1850\":\"CBC6C1212672\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"68C986C14434\", \"bits\":47}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"88DB4027F6\", \"bits\":41}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"18AC740A32604\", \"bits\":49}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"88DB4027F6\", \"bits\":41}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"18AC740A32604\", \"bits\":49}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"3689DE995174\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"683B400CC5\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"683B401961\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"CBC6C1212672\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"AAF399151CFA\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"CBC6C1212672\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"CC93A2503ED\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"36885284300DD\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"CC93A2503ED\", \"bits\":48}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"7A9846243D2\", \"bits\":45}\n");
	vTaskDelay(1000 / portTICK_RATE_MS);
	printf("{\"j1850\":\"8AC740A1346B\", \"bits\":48}\n");
}

static void j1850_task(void* arg)
{
  CRCInit();
	while(1) {
		vTaskDelay(1000 / portTICK_RATE_MS);
		printTestData();
	}
}

void j1850_main(void)
{
	gpio_isr_handler_add(J1850_INPUT_PIN, j1850_isr_handler, (void*) J1850_INPUT_PIN);
	xTaskCreate(j1850_task, "j1850_task", 2048, NULL, 10, NULL);

  timer_queue = xQueueCreate(10, sizeof(timer_event_t));
  example_tg0_timer_init(TIMER_1, TEST_WITH_RELOAD,    TIMER_INTERVAL1_SEC);
  xTaskCreate(timer_example_evt_task, "timer_evt_task", 2048, NULL, 5, NULL);
}
