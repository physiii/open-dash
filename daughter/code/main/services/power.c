static xQueueHandle gpio_evt_queue = NULL;
bool ignition_state = false;
bool prev_ignition_state = false;

void set_main_power(bool);

static void IRAM_ATTR ignition_isr_handler(void* arg)
{
		uint32_t gpio_num = (uint32_t) arg;
		ignition_state = gpio_get_level(gpio_num);
}

static void power_task(void* arg)
{
	uint32_t io_num;
	while(1) {
		vTaskDelay(100 / portTICK_RATE_MS);
		if (ignition_state == prev_ignition_state) continue;

		if (!ignition_state) {
			set_main_power(true);
			printf("{\"ignition\":\"on\"}\n");
		} else {
			printf("{\"ignition\":\"off\"}\n");
		}
		prev_ignition_state = ignition_state;
	}
}

void set_main_power(bool val)
{
	gpio_set_level(MAIN_POWER_IO, val);
}

void set_display_power(bool val)
{
	gpio_set_level(DISPLAY_POWER_IO, val);
}

void set_audio_power(bool val)
{
	gpio_set_level(AUDIO_STBY_IO, val);
	gpio_set_level(AUDIO_MUTE_IO, val);
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
