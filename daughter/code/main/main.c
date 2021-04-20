#include "cJSON.h"
cJSON *service_message = NULL;
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "automation.h"
#include "services/uart.c"
#include "services/gpio.c"
#include "services/hvac.c"
#include "services/j1850.c"
// #include "services/can.c"
#include "services/power.c"
// #include "services/ap.c"
// #include "services/webserver/main.c"

void app_main(void)
{
	gpio_main();
	hvac_main();
	power_main();
	uart_main();
	// twai_main();
	j1850_main();
	// ap_main();
	// webserver_main();

	int cnt = 0;
	serviceMessage.read = true;
	serviceMessage.message = NULL;

	xTaskCreate(serviceMessageTask, "serviceMessageTask", 5000, NULL, 10, NULL);

	while(1) {
			printf("Uptime: %d minutes\n", cnt++);

			vTaskDelay(60 * 1000 / portTICK_RATE_MS);
			printf("Minimum free heap size: %d bytes\n", esp_get_minimum_free_heap_size());
	}
}
