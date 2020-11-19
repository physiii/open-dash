#include "services/gpio.c"
#include "services/can.c"
#include "services/j1850.c"
#include "services/power.c"
#include "services/ap.c"
#include "services/webserver/main.c"

void app_main(void)
{
	gpio_main();
	// twai_main();
	power_main();
	j1850_main();
	ap_main();
	webserver_main();

	int cnt = 0;
	while(1) {
			printf("cnt: %d\n", cnt++);
			vTaskDelay(60 * 1000 / portTICK_RATE_MS);
	}
}
