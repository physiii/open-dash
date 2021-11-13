#include "drivers/adc.c"

#define IGN_OFF true
#define IGN_ON  false
#define SHUTDOWN_DELAY 70
#define ONE_SECOND_IN_MILLISECONDS 1000
#define C_OUT3														B5

static xQueueHandle gpio_evt_queue = NULL;
bool ignition_state = IGN_ON;
bool prev_ignition_state = false;
bool audio_power_state = false;
bool display_power_state = false;
bool main_power_state = true;
int shutdown_cnt = 0;

void set_main_power(bool);

static void IRAM_ATTR ignition_isr_handler(void* arg)
{
		uint32_t gpio_num = (uint32_t) arg;
		ignition_state = gpio_get_level(gpio_num);
}


char * get_ignition() {
		char * state = ignition_state == IGN_ON ? "on" : "off";
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

		// sprintf(msg,
		// 		"{\"type\": \"power\", \"ignition\": \"%s\", \"audio\": %s, \"display\": %s, \"main\": %s, "
		// 		"\"battery_voltage\":%d, \"main_current\":%d, \"wheel\":%d}",
		// 		get_ignition(), get_audio_power(), get_display_power(), get_main_power(),
		// 		get_battery_voltage(), get_main_current(), get_wheel_state());

		sprintf(msg,
				"{\"type\": \"power\", \"ignition\": \"%s\", \"audio\": %s, \"display\": %s, \"main\": %s}",
						get_ignition(), get_audio_power(), get_display_power(), get_main_power());

		addUartMessageToQueue(cJSON_Parse(msg));

		// sprintf(msg,
		// 		"{\"type\": \"power\", \"battery_voltage\":%d, \"main_current\":%d, \"wheel\":%d}",
		// 		get_battery_voltage(), get_main_current(), get_wheel_state());
		//
		// addUartMessageToQueue(cJSON_Parse(msg));
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
	mcp23x17_set_level(&mcp_dev, C_OUT3, !val);
	send_power_state();
}

void set_main_power(bool val)
{
	main_power_state = val;

	gpio_set_level(MAIN_POWER_IO, val);
	send_power_state();
}

void start_shutdown_timer (bool val)
{
  if (val) {
    shutdown_cnt = SHUTDOWN_DELAY;
  } else {
    shutdown_cnt = 0;
  }
}

static void
shutdown_timer (void *pvParameter)
{
  while (1) {
		if (shutdown_cnt) {
			if (shutdown_cnt == 1) {
				set_main_power(false);
			}
			shutdown_cnt--;
		}
		vTaskDelay(ONE_SECOND_IN_MILLISECONDS / portTICK_PERIOD_MS);
  }
}

void check_power_state() {
	if (ignition_state == prev_ignition_state) return;

	if (ignition_state == IGN_ON) {
		set_main_power(true);
		start_shutdown_timer(false);
	} else {
		start_shutdown_timer(true);
		setAcOn(false);
	}

	send_power_state();
	prev_ignition_state = ignition_state;
}

void handle_power_message (cJSON * msg) {
	if (msg == NULL) return;
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

	cJSON_Delete(serviceMessage.message);
}

static void power_task(void* arg)
{
	while(1) {
		handle_power_message(checkServiceMessage("power"));
		check_power_state();
		vTaskDelay(8 * SERVICE_LOOP / portTICK_RATE_MS);
	}
}

void power_main(void)
{
	ignition_state = gpio_get_level(IGNITION_WIRE_IO);
	mcp23x17_set_mode(&mcp_dev, C_OUT3, MCP23X17_GPIO_OUTPUT);
	
	set_main_power(true);
	set_display_power(true);
	set_audio_power(false);

	adc_main();

	gpio_evt_queue = xQueueCreate(10, sizeof(uint32_t));
	gpio_isr_handler_add(IGNITION_WIRE_IO, ignition_isr_handler, (void*) IGNITION_WIRE_IO);
	xTaskCreate(power_task, "ignition_task", 1024 * 5, NULL, 10, NULL);
  xTaskCreate(shutdown_timer, "shutdown_timer", 2048, NULL, 10, NULL);
}
