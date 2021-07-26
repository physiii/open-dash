#define J1850_QUEUE_SIZE		100
#define J1850_MESSAGE_SIZE	100

#include <stdio.h>
#include <inttypes.h>
#include "esp_types.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/periph_ctrl.h"
#include "driver/timer.h"
#include "driver/rmt.h"

uint8_t crcTable[256];
uint8_t CalcCRC(uint8_t * buf, uint8_t len);
void CRCInit(void);
uint8_t buf[] = {0x08, 0xFF, 0x40, 0x03};
esp_timer_handle_t eof_timer;
int64_t current_time = 0;
int64_t previous_time = 0;
int64_t pulse_width = 0;
rmt_config_t config;

struct J1850
{
  uint64_t messageIn;
	char messageOut[J1850_MESSAGE_SIZE];
	char messageQueue[J1850_QUEUE_SIZE][J1850_MESSAGE_SIZE];
	rmt_item32_t messageRaw[J1850_MESSAGE_SIZE];
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

uint64_t ACTIVE_ZERO_NOM = 128 - 8;
uint64_t ACTIVE_ZERO_MIN = 112 - 12;
uint64_t ACTIVE_ZERO_MAX = 145 + 12;

uint64_t ACTIVE_ONE_NOM = 64 - 8;
uint64_t ACTIVE_ONE_MIN = 49 - 24;
uint64_t ACTIVE_ONE_MAX = 79 + 12;

uint64_t PASSIVE_ZERO_NOM = 64 + 16;
uint64_t PASSIVE_ZERO_MIN = 49 - 24;
uint64_t PASSIVE_ZERO_MAX = 79 + 12;

uint64_t PASSIVE_ONE_NOM = 128 + 16;
uint64_t PASSIVE_ONE_MIN = 112 - 12;
uint64_t PASSIVE_ONE_MAX = 145 + 12;

uint64_t SOF_NOM = 200 + 8;
uint64_t SOF_MIN = 182;
uint64_t SOF_MAX = 218 + 24;

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

int valid = 1;
int error = 1;
static void eof_timer_callback(void* arg)
{
    SOF = false;
    // gpio_set_level(J1850_DEBUG_PIN, 0);
    char msg[1024];

		if (err == J1850_OK) {
			if (jMsg.messageIn) {
				if (jMsg.bitCount < 24) return;
				// --- CRC Check --- //
				uint8_t bytes = jMsg.bitCount / 8 - 1;
				uint8_t buffer[8] = { 0 };

				for (int i = bytes, j = 0; i > 0; i--,j++) {
					buffer[j] = jMsg.messageIn >> 8 * i;
				}

				uint8_t calculated_crc = CalcCRC(buffer, bytes);
				uint8_t received_crc = jMsg.messageIn & 0xFF;

				if (calculated_crc == received_crc) {
          sprintf(msg, "{\"type\":\"j1850\", \"j1850\":\"%llX\", \"bits\":%d}", jMsg.messageIn, jMsg.bitCount);
					addUartMessageToQueue(cJSON_Parse(msg));
					valid++;
				} else {
          sprintf(msg, "{\"type\":\"j1850_crc_err\", \"j1850\":\"%llX\", \"bits\":%d}", jMsg.messageIn, jMsg.bitCount);
          addUartMessageToQueue(cJSON_Parse(msg));
					error++;
        }

				// ----------------- //

				jMsg.messageIn = 0;
				jMsg.bitCount = 0;
			}
		} else {
			error++;
			(err == J1850_ERR_PULSE_OUT_OF_RANGE)
				? printf("[j1850] Error: pulse out of range %llu\n", pulse_width)
				:	printf("[j1850] Error: %d\n", err);
		}
}

static void IRAM_ATTR j1850_isr_handler(void* arg)
{
	uint32_t pin = (uint32_t) arg;
	bool level = gpio_get_level(pin);
  // return;
  esp_timer_stop(eof_timer);
  esp_timer_start_once(eof_timer, EOF_MIN);
	err = J1850_OK;

	previous_time = current_time;
	current_time = esp_timer_get_time();
	pulse_width = current_time - previous_time;

  if (!SOF) {
    if (level == ACTIVE && pulse_width > SOF_MIN && pulse_width < SOF_MAX) {
      SOF = true;
      // gpio_set_level(J1850_DEBUG_PIN, 1);
    } else {
			// err = J1850_ERR_PULSE_OUT_OF_RANGE;
		}
    return;
  }

	if (level == ACTIVE) {
		if (pulse_width > ACTIVE_ZERO_MIN && pulse_width < ACTIVE_ZERO_MAX) {
			jMsg.messageIn = (jMsg.messageIn << 1) | 0;
      // gpio_set_level(J1850_DEBUG_PIN, 0);
		} else if (pulse_width > ACTIVE_ONE_MIN && pulse_width < ACTIVE_ONE_MAX) {
			jMsg.messageIn = (jMsg.messageIn << 1) | 1;
      // gpio_set_level(J1850_DEBUG_PIN, 1);
		} else {
			err = J1850_ERR_PULSE_OUT_OF_RANGE;
      return;
		}
	} else {
		if (pulse_width > PASSIVE_ZERO_MIN && pulse_width < PASSIVE_ZERO_MAX) {
			jMsg.messageIn = (jMsg.messageIn << 1) | 0;
      // gpio_set_level(J1850_DEBUG_PIN, 0);
		} else if (pulse_width > PASSIVE_ONE_MIN && pulse_width < PASSIVE_ONE_MAX) {
			jMsg.messageIn = (jMsg.messageIn << 1) | 1;
      // gpio_set_level(J1850_DEBUG_PIN, 1);
		} else {
			err = J1850_ERR_PULSE_OUT_OF_RANGE;
		}
	}

  if (err == J1850_OK) {
    jMsg.bitCount++;
  } else {
    SOF = false;
    jMsg.messageIn = 0;
    jMsg.bitCount = 0;
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

void rmt_init() {
  // put your setup code here, to run once:
  config.rmt_mode = RMT_MODE_TX;
  config.channel = RMT_CHANNEL_0;
  config.gpio_num = 4;
  config.mem_block_num = 1;
  config.tx_config.loop_en = 0;
  config.tx_config.carrier_en = 0;
  config.tx_config.idle_output_en = 1;
  config.tx_config.idle_level = RMT_IDLE_LEVEL_LOW;
  config.tx_config.carrier_level = RMT_CARRIER_LEVEL_HIGH;
  config.clk_div = 80; // 80MHx / 80 = 1MHz 0r 1uS per count

  rmt_config(&config);
  rmt_driver_install(config.channel, 0, 0);  //  rmt_driver_install(rmt_channel_t channel, size_t rx_buf_size, int rmt_intr_num)
}

void setStartOfFrame() {
	jMsg.messageRaw[0].duration0 = 1;
	jMsg.messageRaw[0].level0 = 0;
	jMsg.messageRaw[0].duration1 = SOF_NOM;
	jMsg.messageRaw[0].level1 = 1;
}

void setActiveZero(bool zeroOrOne, int rmtCnt) {
	if (zeroOrOne == 0) {
		jMsg.messageRaw[rmtCnt].duration0 = ACTIVE_ZERO_NOM;
		jMsg.messageRaw[rmtCnt].level0 = 1;
	} else {
		jMsg.messageRaw[rmtCnt].duration1 = ACTIVE_ZERO_NOM;
		jMsg.messageRaw[rmtCnt].level1 = 1;
	}
}

void setActiveOne(bool zeroOrOne, int rmtCnt) {
	if (zeroOrOne == 0) {
		jMsg.messageRaw[rmtCnt].duration0 = ACTIVE_ONE_NOM;
		jMsg.messageRaw[rmtCnt].level0 = 1;
	} else {
		jMsg.messageRaw[rmtCnt].duration1 = ACTIVE_ONE_NOM;
		jMsg.messageRaw[rmtCnt].level1 = 1;
	}
}

void setPassiveZero(bool zeroOrOne, int rmtCnt) {
	if (zeroOrOne == 0) {
		jMsg.messageRaw[rmtCnt].duration0 = PASSIVE_ZERO_NOM;
		jMsg.messageRaw[rmtCnt].level0 = 0;
	} else {
		jMsg.messageRaw[rmtCnt].duration1 = PASSIVE_ZERO_NOM;
		jMsg.messageRaw[rmtCnt].level1 = 0;
	}
}

void setPassiveOne(bool zeroOrOne, int rmtCnt) {
	if (zeroOrOne == 0) {
		jMsg.messageRaw[rmtCnt].duration0 = PASSIVE_ONE_NOM;
		jMsg.messageRaw[rmtCnt].level0 = 0;
	} else {
		jMsg.messageRaw[rmtCnt].duration1 = PASSIVE_ONE_NOM;
		jMsg.messageRaw[rmtCnt].level1 = 0;
	}
}

int getMsb16(uint64_t num) {
	int msb = 0;

	for (int i = sizeof(num) * 8 - 1; i >= 0; i--) {
		uint64_t bit = (num >> i) & 1;
		if (bit && msb == 0) msb = i + 1;
	}

	while (msb % 4 != 0) {
		msb++;
	}

	return msb;
}

int buildJ1850Message(uint64_t msg) {
	int msb = getMsb16(msg);
	uint64_t bit;

	setStartOfFrame();

	for (int i = msb - 1, rmtPos=1; i >= 0; i=i-2, rmtPos++) {
		bit = (msg >> i) & 1;

		if (bit) {
			setPassiveOne(0, rmtPos);
		} else {
			setPassiveZero(0, rmtPos);
		}

		bit = (msg >> (i-1)) & 1;

		if (bit) {
			setActiveOne(1, rmtPos);
		} else {
			setActiveZero(1, rmtPos);
		}
	}

	return msb;
}

void sendJ1850Message(char * msg) {
	uint64_t msgInt;
	sscanf(msg, "%llx", &msgInt);
	int size = buildJ1850Message(msgInt);

  gpio_set_level(J1850_DEBUG_PIN, 1);
  rmt_write_items(config.channel, jMsg.messageRaw, size / 2 + 1, 0);
  gpio_set_level(J1850_DEBUG_PIN, 0);
	for (int i = 0; i < J1850_MESSAGE_SIZE; i++) {
		jMsg.messageRaw[i].duration0 = 0;
		jMsg.messageRaw[i].level0 = 0;
		jMsg.messageRaw[i].duration1 = 0;
		jMsg.messageRaw[i].level1 = 0;
	}
}


void addJ1850MessageToQueue(char *message)
{
	if (jMsg.queueCount >= J1850_QUEUE_SIZE) {
		printf("[addJ1850MessageToQueue] Queue is full (%d) %s\n", jMsg.queueCount, message);
		return;
	}
	jMsg.queueCount++;
	// printf("addJ1850MessageToQueue (%d) %s\n", jMsg.queueCount, message);
	strcpy(jMsg.messageQueue[jMsg.queueCount], message);
}

void sendHvacOnMessage() {
	// addJ1850MessageToQueue("0xAAB3990220751D");
	// addJ1850MessageToQueue("0xAAB39902205E55");
	// addJ1850MessageToQueue("0xAAB3990220476D");
	// addJ1850MessageToQueue("0xAAB39902203067");
	// addJ1850MessageToQueue("0xAAB39902201915");
	// addJ1850MessageToQueue("0x88151181A2");
	// addJ1850MessageToQueue("0x68491110561F");
	// addJ1850MessageToQueue("0xA91411501F");
	addJ1850MessageToQueue("0x88159910005D");
}

void sendHvacOffMessage() {
// addJ1850MessageToQueue("0xA91411501F");
	addJ1850MessageToQueue("0x881599100140");
	// addJ1850MessageToQueue("0x8815110184");
	// addJ1850MessageToQueue("0xAAB39902205E55");
	// addJ1850MessageToQueue("0xAAB3990220476D");
	// addJ1850MessageToQueue("0xAAB39902203067");
	// addJ1850MessageToQueue("0xAAB39902201915");
	// addJ1850MessageToQueue("0xAAB39902200217");
	// addJ1850MessageToQueue("0x684911106BD4");

}

static void j1850_tx_task(void* arg)
{
	// sendHvacOnMessage();
	int cnt = 0;
  while (1) {
  	vTaskDelay(SERVICE_LOOP / portTICK_PERIOD_MS);

		if (jMsg.queueCount > 0) {
			strcpy(jMsg.messageOut, jMsg.messageQueue[jMsg.queueCount]);
			while (SOF) {}
			sendJ1850Message(jMsg.messageOut);
			jMsg.queueCount--;
		}
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
	rmt_init();
	xTaskCreate(j1850_tx_task, "j1850_tx_task", 2048, NULL, 10, NULL);
}
