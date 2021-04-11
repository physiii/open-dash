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
esp_timer_handle_t eof_timer;
uint64_t current_time = 0;
uint64_t previous_time = 0;
uint64_t pulse_width = 0;

struct J1850
{
  uint64_t message;
  uint64_t queue[100];
	bool readyToSend;
	int timeout;
	int queueCount;
  uint8_t	bitCount;
};

struct J1850 jMsg;

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

static void eof_timer_callback(void* arg);

typedef struct {
    int type;  // the type of timer's event
    int timer_group;
    int timer_idx;
    uint64_t timer_counter_value;
} timer_event_t;


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

static void eof_timer_callback(void* arg)
{
		SOF = false;
    gpio_set_level(J1850_DEBUG_PIN, SOF);
    // jMsg.queue[jMsg.queueCount] = jMsg.message;
    // jMsg.queueCount++;

		if (err == J1850_OK) {
			if (jMsg.message) {
				if (jMsg.bitCount < 24) return;

				// --- CRC Check --- //
				uint8_t bytes = jMsg.bitCount / 8 - 1;
				uint8_t buffer[8] = { 0 };

				for (int i = bytes, j = 0; i > 0; i--,j++) {
					buffer[j] = jMsg.message >> 8 * i;
				}

				uint8_t calculated_crc = CalcCRC(buffer, bytes);
				uint8_t received_crc = jMsg.message & 0xFF;

				if (calculated_crc == received_crc) {
					// printf("[j1850] Message (%d bits): %llX\n", jMsg.bitCount, jMsg.message,);
					// printf("{\"type\":\"j1850\", \"j1850\":\"%llX\", \"bits\":%d}\n", jMsg.message, jMsg.bitCount);
					addUartMessageToQueue(jMsg.message);
				}

				// ----------------- //

				jMsg.message = 0;
				jMsg.bitCount = 0;
			}
			// printf("[j1850] Message:\t");
			// for (int i=0; i < 12; i++) {
			// 	printf("%d ", jMsg.message[i]);
			// }
			// printf("\n");
		} else {
			(err == J1850_ERR_PULSE_OUT_OF_RANGE)
				? printf("[j1850] Error: pulse out of range\n")
				:	printf("[j1850] Error: %d\n", err);
		}
}

static void IRAM_ATTR j1850_isr_handler(void* arg)
{
	uint32_t pin = (uint32_t) arg;
	bool level = gpio_get_level(pin);

  esp_timer_stop(eof_timer);
  esp_timer_start_once(eof_timer, EOF_NOM);
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
			jMsg.message = (jMsg.message << 1) | 0;
		} else if (pulse_width > ACTIVE_ONE_MIN && pulse_width < ACTIVE_ONE_MAX) {
			jMsg.message = (jMsg.message << 1) | 1;
		} else {
			err = J1850_ERR_PULSE_OUT_OF_RANGE;
		}
	} else {
		if (pulse_width > PASSIVE_ZERO_MIN && pulse_width < PASSIVE_ZERO_MAX) {
			jMsg.message = (jMsg.message << 1) | 0;
		} else if (pulse_width > PASSIVE_ONE_MIN && pulse_width < PASSIVE_ONE_MAX) {
			jMsg.message = (jMsg.message << 1) | 1;
		} else {
			err = J1850_ERR_PULSE_OUT_OF_RANGE;
		}
	}

  if (err == J1850_OK) {
    jMsg.bitCount++;
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
  while (1) {
      // if (err == J1850_OK) {
      //   if (jMsg.message) {
      //     if (jMsg.bitCount < 24) continue;
			//
      //     // --- CRC Check --- //
      //     uint8_t bytes = jMsg.bitCount / 8 - 1;
      //     uint8_t buffer[8] = { 0 };
			//
      //     for (int i = bytes, j = 0; i > 0; i--,j++) {
      //       buffer[j] = jMsg.message >> 8 * i;
      //     }
			//
      //     uint8_t calculated_crc = CalcCRC(buffer, bytes);
      //     uint8_t received_crc = jMsg.message & 0xFF;
			//
      //     if (calculated_crc == received_crc) {
      //       // printf("[j1850] Message (%d bits): %llX\n", jMsg.bitCount, jMsg.message,);
      //       printf("{\"type\":\"j1850\", \"j1850\":\"%llX\", \"bits\":%d}\n", jMsg.message, jMsg.bitCount);
      //     }
			//
      //     // ----------------- //
			//
      //     jMsg.message = 0;
      //     jMsg.bitCount = 0;
      //   }
      //   // printf("[j1850] Message:\t");
      //   // for (int i=0; i < 12; i++) {
      //   // 	printf("%d ", message[i]);
      //   // }
      //   // printf("\n");
      // } else {
      //   // (err == J1850_ERR_PULSE_OUT_OF_RANGE)
      //   // 	? printf("[j1850] Error: pulse out of range\n")
      //   // 	:	printf("[j1850] Error: %d\n", err);
      // }

      // printTestData();
      printf("Message count: %d\n", jMsg.queueCount);
      vTaskDelay(SERVICE_LOOP / portTICK_PERIOD_MS);
  }
}

void j1850_main(void)
{
	CRCInit();
  const esp_timer_create_args_t eof_timer_args = {
          .callback = &eof_timer_callback,
          /* argument specified here will be passed to timer callback function */
          .arg = (void*) eof_timer,
          .name = "eof"
  };

  ESP_ERROR_CHECK(esp_timer_create(&eof_timer_args, &eof_timer));

	gpio_isr_handler_add(J1850_INPUT_PIN, j1850_isr_handler, (void*) J1850_INPUT_PIN);
	xTaskCreate(j1850_task, "j1850_task", 2048, NULL, 10, NULL);
}
