#include "cJSON.h"

cJSON *service_message = NULL;
#define SERVICE_LOOP	100
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
	while(1) {
			printf("Uptime: %d minutes\n", cnt++);
			vTaskDelay(60 * 1000 / portTICK_RATE_MS);
	}
}
