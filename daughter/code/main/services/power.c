#include "drivers/adc.c"

static xQueueHandle gpio_evt_queue = NULL;
bool ignition_state = false;
bool prev_ignition_state = false;
bool audio_power_state = false;
bool display_power_state = false;
bool main_power_state = false;

void set_main_power(bool);

static void IRAM_ATTR ignition_isr_handler(void* arg)
{
		uint32_t gpio_num = (uint32_t) arg;
		ignition_state = gpio_get_level(gpio_num);
}


char * get_ignition() {
	char * state = ignition_state ? "false" : "true";
	return state;
}

char * get_audio_power() {
	char * state = audio_power_state ? "true" : "false";
	return state;
}

char * get_display_power() {
	char * state = display_power_state ? "true" : "false";
	return state;
}

char * get_main_power() {
	char * state = main_power_state ? "true" : "false";
	return state;
}


uint32_t get_battery_voltage(){
		return adc7_reading;
}

uint32_t get_main_current(){
		return adc6_reading;
}

uint32_t get_wheel_state(){
		return adc5_reading;
}

void send_power_state () {
		char msg[1024];

		sprintf(msg,
				"{\"type\": \"power\", \"ignition_wire\": %s, \"audio\": %s, \"display\": %s, \"main\": %s, "
				"\"battery_voltage\":%d, \"main_current\":%d, \"wheel\":%d}"
				"\n",
				get_ignition(), get_audio_power(), get_display_power(), get_main_power(),
				get_battery_voltage(), get_main_current(), get_wheel_state());

		outgoing_uart_message = cJSON_Parse(msg);
}

void set_display_power(bool val)
{
	display_power_state = val;

	gpio_set_level(DISPLAY_POWER_IO, val);
	send_power_state();
}

void set_audio_power(bool val)
{
	audio_power_state = val;

	gpio_set_level(AUDIO_STBY_IO, val);
	gpio_set_level(AUDIO_MUTE_IO, val);
	send_power_state();
}

void set_main_power(bool val)
{
	main_power_state = val;

	gpio_set_level(MAIN_POWER_IO, val);
	send_power_state();
}

void check_power_state() {
	if (ignition_state == prev_ignition_state) return;

	if (!ignition_state) {
		set_main_power(true);
	}

	send_power_state();
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


	if (cJSON_GetObjectItem(msg,"set_audio_power")) {
		if (cJSON_IsTrue(cJSON_GetObjectItem(msg,"set_audio_power"))) {
			set_audio_power(true);
		} else {
			set_audio_power(false);
		}
	}

	if (cJSON_GetObjectItem(msg,"get_state")) {
		send_power_state();
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

	adc_main();

	gpio_evt_queue = xQueueCreate(10, sizeof(uint32_t));
	gpio_isr_handler_add(IGNITION_WIRE_IO, ignition_isr_handler, (void*) IGNITION_WIRE_IO);
	xTaskCreate(power_task, "ignition_task", 1024 * 5, NULL, 10, NULL);
}
