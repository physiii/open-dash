static xQueueHandle gpio_evt_queue = NULL;
bool ignition_state = false;
bool prev_ignition_state = false;

void set_main_power(bool);

static void IRAM_ATTR ignition_isr_handler(void* arg)
{
		uint32_t gpio_num = (uint32_t) arg;
		ignition_state = gpio_get_level(gpio_num);
}

void set_audio_power(bool val)
{
	char str[100];
	sprintf(str, "{\"audio_power\": %s}\n", val ? "true" : "false");
	outgoing_uart_message = cJSON_Parse(str);

	gpio_set_level(AUDIO_STBY_IO, val);
	gpio_set_level(AUDIO_MUTE_IO, val);
}

void set_main_power(bool val)
{
	char str[100];
	sprintf(str, "{\"main_power\": %s}\n", val ? "true" : "false");
	outgoing_uart_message = cJSON_Parse(str);

	gpio_set_level(MAIN_POWER_IO, val);
}

void set_display_power(bool val)
{
	char str[100];
	sprintf(str, "{\"display_power\": %s}\n", val ? "true" : "false");
	outgoing_uart_message = cJSON_Parse(str);

	gpio_set_level(DISPLAY_POWER_IO, val);
}

void get_ignition(char * ign) {
	if (ignition_state) {
		sprintf(ign, "on");
	} else {
		sprintf(ign, "off");
	}
}

void send_power_state () {
		char msg[1024];
		char ign[20];
		get_ignition(ign);
		sprintf(msg, "{\"ignition\": %s}\n", ign);
		outgoing_uart_message = cJSON_Parse(msg);
}

void check_power_state() {
	if (ignition_state == prev_ignition_state) return;

	if (!ignition_state) {
		set_main_power(true);
		printf("{\"ignition\":\"on\"}\n");
	} else {
		printf("{\"ignition\":\"off\"}\n");
	}
	prev_ignition_state = ignition_state;
}

void handle_power_message (cJSON * msg) {
	char mode[100];

	if (cJSON_GetObjectItem(msg,"set_main_power")) {
		if (cJSON_IsTrue(cJSON_GetObjectItem(msg,"set_main_power"))) {
			set_main_power(true);
		} else {
			set_main_power(false);
		}
	}

	if (cJSON_GetObjectItem(msg,"set_display_power")) {
		if (cJSON_IsTrue(cJSON_GetObjectItem(msg,"set_display_power"))) {
			set_display_power(true);
		} else {
			set_display_power(false);
		}
	}

	if (cJSON_GetObjectItem(msg,"get_state")) {
		send_hvac_state();
	}
}

static void power_task(void* arg)
{
	char type[100];
	cJSON * payload = NULL;

	while(1) {

		if (service_message != NULL) {
			if (cJSON_GetObjectItem(service_message,"type")) {
	  		snprintf(type,sizeof(type),"%s",cJSON_GetObjectItem(service_message,"type")->valuestring);
			}

			if (strcmp(type,"power")==0) {
				if (cJSON_GetObjectItem(service_message,"payload")) {
					payload = cJSON_GetObjectItemCaseSensitive(service_message,"payload");
					handle_power_message(payload);
					printf("%s\n", cJSON_PrintUnformatted(payload));
					service_message = NULL;
				}
			}
		}

		check_power_state();
		vTaskDelay(100 / portTICK_RATE_MS);
	}
}

void power_main(void)
{
	set_main_power(false);
	set_display_power(true);
	set_audio_power(true);

	gpio_evt_queue = xQueueCreate(10, sizeof(uint32_t));
	gpio_isr_handler_add(IGNITION_WIRE_IO, ignition_isr_handler, (void*) IGNITION_WIRE_IO);
	xTaskCreate(power_task, "ignition_task", 2048, NULL, 10, NULL);
}
