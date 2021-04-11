/* UART asynchronous example, that uses separate RX and TX tasks

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_log.h"
#include "driver/uart.h"
#include "string.h"
#include "driver/gpio.h"

static const int RX_BUF_SIZE = 2000;
char received_message[2048];
cJSON * outgoing_uart_message;
char outgoing_message_str[2048];

#define TXD_PIN (GPIO_NUM_1)
#define RXD_PIN (GPIO_NUM_3)

int char_count(char * ch1, char * ch2, char* str)
{
	int m;
	int charcount = 0;

	charcount = 0;
	for(m=0; str[m]; m++) {
	    if(str[m] == ch1) {
	        charcount ++;
	    }
			if(str[m] == ch2) {
					charcount --;
			}
	}
	return charcount;
}

int check_json(char * str)
{
	int bra_cnt = char_count("{","}",str);
	if (bra_cnt!=0) return 0;
	return 1;
}

void init(void) {
    const uart_config_t uart_config = {
        .baud_rate = 115200,
        .data_bits = UART_DATA_8_BITS,
        .parity = UART_PARITY_DISABLE,
        .stop_bits = UART_STOP_BITS_1,
        .flow_ctrl = UART_HW_FLOWCTRL_DISABLE,
        .source_clk = UART_SCLK_APB,
    };
    // We won't use a buffer for sending data.
    uart_driver_install(UART_NUM_0, RX_BUF_SIZE * 2, 0, 0, NULL, 0);
    uart_param_config(UART_NUM_0, &uart_config);
    uart_set_pin(UART_NUM_0, TXD_PIN, RXD_PIN, UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE);
}

static void uartMessageTask(void *arg)
{
	int cnt = 0;
  while (1) {
		// if (uartMessage.readyToSend) {
		// 	sprintf(outgoing_message_str, "%s\n", cJSON_PrintUnformatted(outgoing_uart_message));
	  //   const int len = strlen(outgoing_message_str);
	  //   const int txBytes = uart_write_bytes(UART_NUM_0, outgoing_message_str, len);
		// 	outgoing_uart_message = NULL;
		// 	// printf("tx_task RECEIVED: %s\n", received_message);
		// 	uartMessage.readyToSend = false;
		// }

		if (!uartMessage.readyToSend) {
			cnt = 0;
			if (uartMessage.queueCount > 0) {
				uartMessage.message = &uartMessage.messageQueue[uartMessage.queueCount];

				sprintf(outgoing_message_str, "%s\n", cJSON_PrintUnformatted(uartMessage.message));
			  const int len = strlen(outgoing_message_str);
			  const int txBytes = uart_write_bytes(UART_NUM_0, outgoing_message_str, len);
				// printf("tx_task RECEIVED: %s\n", received_message);
				uartMessage.readyToSend = false;
				uartMessage.queueCount--;
			}
		} else if (cnt > 10) {
			printf("uartMessage timeout reached.\n");
			uartMessage.readyToSend = false;
		} else {
			cnt++;
		}

    vTaskDelay(SERVICE_LOOP / portTICK_PERIOD_MS);
  }
}

static void rx_task(void *arg)
{
    static const char *RX_TASK_TAG = "RX_TASK";
    esp_log_level_set(RX_TASK_TAG, ESP_LOG_INFO);
    uint8_t* data = (uint8_t*) malloc(RX_BUF_SIZE+1);
    char rcv_buffer[RX_BUF_SIZE];
    while (1) {
        const int rxBytes = uart_read_bytes(UART_NUM_0, data, RX_BUF_SIZE, 10 / portTICK_RATE_MS);
        if (rxBytes > 0) {
            data[rxBytes] = 0;
            // ESP_LOGI(RX_TASK_TAG, "Read %d bytes: '%s'", rxBytes, data);
            // ESP_LOG_BUFFER_HEXDUMP(RX_TASK_TAG, data, rxBytes, ESP_LOG_INFO);

						sprintf(rcv_buffer, "%s", data);

						int valid_json = check_json(rcv_buffer);

						cJSON *root = cJSON_Parse(rcv_buffer);
            if (root == NULL)
            {
                const char *error_ptr = cJSON_GetErrorPtr();
                if (error_ptr != NULL)
                {
                    printf("Error before: %s\n", error_ptr);
                }
                valid_json = 0;
            }

						if (valid_json) {
							service_message = root;
							// outgoing_uart_message = service_message;
						}
        }
    }
    free(data);
}

void uart_main(void)
{
    init();
    xTaskCreate(rx_task, "uart_rx_task", 1024*5, NULL, configMAX_PRIORITIES, NULL);
    xTaskCreate(uartMessageTask, "uartMessageTask", 1024*5, NULL, configMAX_PRIORITIES-1, NULL);
}
