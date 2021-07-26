#define MCP23X17_ADDR 0x20
#define IO_CHANNELS 16                  /*!< Data buffer length of test buffer */
#define DATA_LENGTH 3                  /*!< Data buffer length of test buffer */
#define RW_TEST_LENGTH 128               /*!< Data length for r/w test, [0,DATA_LENGTH] */

#define I2C_FREQ_HZ 1000000  // Max 1MHz for esp-idf, but device supports up to 1.7Mhz

#define REG_IODIRA   0x00
#define REG_IODIRB   0x01
#define REG_IPOLA    0x02
#define REG_IPOLB    0x03
#define REG_GPINTENA 0x04
#define REG_GPINTENB 0x05
#define REG_DEFVALA  0x06
#define REG_DEFVALB  0x07
#define REG_INTCONA  0x08
#define REG_INTCONB  0x09
#define REG_IOCON    0x0A
#define REG_GPPUA    0x0C
#define REG_GPPUB    0x0D
#define REG_INTFA    0x0E
#define REG_INTFB    0x0F
#define REG_INTCAPA  0x10
#define REG_INTCAPB  0x11
#define REG_GPIOA    0x12
#define REG_GPIOB    0x13
#define REG_OLATA    0x14
#define REG_OLATB    0x15

#define BIT_IOCON_INTPOL 1
#define BIT_IOCON_ODR    2
#define BIT_IOCON_HAEN   3
#define BIT_IOCON_DISSLW 4
#define BIT_IOCON_SEQOP  5
#define BIT_IOCON_MIRROR 6
#define BIT_IOCON_BANK   7

#define MCP_OUTPUT 0
#define MCP_INPUT  1

#define AIN0	0
#define AIN1	1
#define AIN2	2
#define AIN3	3
#define AIN4	4
#define AIN5	5
#define AIN6	6
#define AIN7	7
#define AIN8	8
#define AIN9	9
#define AIN10	10
#define AIN11	11

#define ADC_CHANNELS 12                  /*!< Data buffer length of test buffer */

#define INSIDE_AIR_TEMP										AIN0
#define AMBIENT_AIR_TEMP  		 						AIN1
#define UPPER_RIGHT_AIR_TEMP   						AIN2
#define UPPER_LEFT_AIR_TEMP   						AIN3
#define LOWER_RIGHT_AIR_TEMP   						AIN4
#define LOWER_LEFT_AIR_TEMP   						AIN5
#define AMBIENT_LIGHT				   						AIN6
#define DRIVER_SUNLOAD				  					AIN7
#define PASSENGER_SUNLOAD									AIN8

#define LEFT_AIR_TEMP_CONTROL_A						A0
#define LEFT_AIR_TEMP_CONTROL_B						A1
#define RIGHT_AIR_TEMP_CONTROL_A					A2
#define RIGHT_AIR_TEMP_CONTROL_B					A3
#define MODE_A														A4
#define MODE_B														A5
#define RECIRCULATION_A										A6
#define RECIRCULATION_B										A7

#define DRIVER_SEAT_TEMP_CONTROL					B0
#define PASSENGER_SEAT_TEMP_CONTROL				B1
#define INSIDE_AIR_TEMP_BLOWER						B2
#define BLOWER_MOTOR											B3
#define REAR_DEFOG												B4
#define C_OUT3														B5
#define DRIVER_HEATED_SEAT_STATUS					B6
#define PASSENGER_HEATED_SEAT_STATUS			B7

#define HEAT_PULSE_WIDTH									384
#define HEAT_END_PULSE_WIDTH 							892
#define COOL_PULSE_WIDTH									384
#define COOL_A_PULSE_WIDTH								80
#define COOL_END_PULSE_WIDTH 							1928
#define TEMP_INTERVAL											3200

#define DEFROST														0
#define FEET								 							1700
#define BOTH															3600
#define HEAD															7900

#include "../i2cdev/i2cdev.h"
#include "drivers/mcp23017/mcp23017.c"
#include "drivers/ads111x/ads1115.c"
#include "drivers/timer.c"

int actuator_interval = 3200;
int mode_motor_pos = 0;
int spin_motor_duration = 0;

int actuator_A_start_pulse_width = 500;
int actuator_B_start_pulse_width = 500;
int actuator_A_pulse_width = 280;
int actuator_B_pulse_width = 360;
int actuator_end_pulse_width = 900;

bool left_air_temp_A = false;
bool left_air_temp_B = false;
bool right_air_temp_A = false;
bool right_air_temp_B = false;

bool start_cooling_left = false;
bool start_heating_left = false;
bool start_cooling_right = false;
bool start_heating_right = false;

bool ac_on = false;
bool cooling = true;

void printHvacData(uint16_t * adc_values, uint16_t io_values) {
	printf("HVAC ADC\t");
	for (int i=0; i < ADC_CHANNELS; i++)
		printf("%d ", adc_values[i]);
	printf("\n");

	printf("HVAC IO\t\t%d\n", io_values);
}

void set_blower_level(int val)
{
	set_blower_pwm_width(val);
}

void setAcOn(bool val) {
	ac_on = val;
	if (!val) {
		set_blower_level(0);
	}
}

void set_left_air_temp_motor(bool valA, bool valB)
{
	mcp23x17_set_level(&mcp_dev, LEFT_AIR_TEMP_CONTROL_A, valA);
	mcp23x17_set_level(&mcp_dev, LEFT_AIR_TEMP_CONTROL_B, valB);
	// printf("set_left_air_temp_motor\tA:%d\tB:%d\n", valA, valB);
}

void set_right_air_temp_motor(bool valA, bool valB)
{
	mcp23x17_set_level(&mcp_dev, RIGHT_AIR_TEMP_CONTROL_A, valA);
	mcp23x17_set_level(&mcp_dev, RIGHT_AIR_TEMP_CONTROL_B, valB);
	// printf("set_right_air_temp_motor\tA:%d\tB:%d\n", valA, valB);
}


void set_mode_motor(bool valA, bool valB)
{
	mcp23x17_set_level(&mcp_dev, MODE_A, valA);
	mcp23x17_set_level(&mcp_dev, MODE_B, valB);

	printf("Set Mode Motor\tA:%d\tB:%d\n", valA, valB);
}


void spin_mode_motor(int duration)
{
	while (spin_motor_duration) {
		vTaskDelay(SERVICE_LOOP / portTICK_RATE_MS);
	}
	mode_motor_pos += duration;
	spin_motor_duration = duration;
}

void set_mode(char * mode)
{
	if (strcmp(mode, "init") == 0) {
		spin_mode_motor(DEFROST - HEAD);
		mode_motor_pos = DEFROST;
		spin_mode_motor(FEET - mode_motor_pos);
	}

	if (strcmp(mode, "head") == 0) {
		spin_mode_motor(HEAD - mode_motor_pos);
	}

	if (strcmp(mode, "both") == 0) {
		spin_mode_motor(BOTH - mode_motor_pos);
	}

	if (strcmp(mode, "feet") == 0) {
		spin_mode_motor(FEET - mode_motor_pos);
	}

	if (strcmp(mode, "defrost") == 0) {
		spin_mode_motor(DEFROST - mode_motor_pos);
	}

	printf("Set Mode\t%s\n", mode);
}

static void mode_motor_task(void* arg)
{
	while(1) {
		if (spin_motor_duration > 0) {
			printf("Spinning motor cw for %d ms.\n", spin_motor_duration >= 0 ? spin_motor_duration : -1*spin_motor_duration);
			set_mode_motor(true, false);
			vTaskDelay(spin_motor_duration / portTICK_RATE_MS);
			set_mode_motor(false, false);
			printf("Current motor position is %d\n", mode_motor_pos);
		} else if (spin_motor_duration < 0) {
			printf("Spinning motor ccw for %d ms.\n", spin_motor_duration >= 0 ? spin_motor_duration : -1*spin_motor_duration);
			spin_motor_duration *= -1;
			set_mode_motor(false, true);
			vTaskDelay(spin_motor_duration / portTICK_RATE_MS);
			set_mode_motor(false, false);
			printf("Current motor position is %d\n", mode_motor_pos);
		}
		spin_motor_duration = 0;

		vTaskDelay(SERVICE_LOOP / portTICK_RATE_MS);
	}
}

void set_recirculation(bool valA, bool valB)
{
	mcp23x17_set_level(&mcp_dev, RECIRCULATION_A, valA);
	mcp23x17_set_level(&mcp_dev, RECIRCULATION_B, valB);
}

void set_rear_defog(bool val)
{
	mcp23x17_set_level(&mcp_dev, REAR_DEFOG, val);
}

void set_air_temp_blower(bool val)
{
	mcp23x17_set_level(&mcp_dev, INSIDE_AIR_TEMP_BLOWER, val);
}

void set_driver_heated_seat(bool val)
{
	mcp23x17_set_level(&mcp_dev, DRIVER_SEAT_TEMP_CONTROL, val);
}

void set_passenger_heated_seat(bool val)
{
	mcp23x17_set_level(&mcp_dev, PASSENGER_SEAT_TEMP_CONTROL, val);
}

uint16_t get_ambient_air_temp()
{
	return get_ads_values()[AMBIENT_AIR_TEMP];
}

uint16_t get_inside_air_temp()
{
	return get_ads_values()[INSIDE_AIR_TEMP];
}

uint16_t get_upper_right_air_temp()
{
	return get_ads_values()[UPPER_RIGHT_AIR_TEMP];
}

uint16_t get_upper_left_air_temp()
{
	return get_ads_values()[UPPER_LEFT_AIR_TEMP];
}

uint16_t get_lower_left_air_temp()
{
	return get_ads_values()[LOWER_LEFT_AIR_TEMP];
}

uint16_t get_lower_right_air_temp()
{
	return get_ads_values()[LOWER_RIGHT_AIR_TEMP];
}

void get_driver_heated_status()
{
	uint32_t val = 0;
	mcp23x17_get_level(&mcp_dev, DRIVER_HEATED_SEAT_STATUS, val);
	return val;
}

void get_passenger_heated_status()
{
	uint32_t val = 0;
	mcp23x17_get_level(&mcp_dev, PASSENGER_HEATED_SEAT_STATUS, val);
	return val;
}

uint16_t get_ambient_light_level()
{
	return get_ads_values()[AMBIENT_LIGHT];
}

uint16_t get_driver_sunload()
{
	return get_ads_values()[DRIVER_SUNLOAD];
}

uint16_t get_passenger_sunload()
{
	return get_ads_values()[PASSENGER_SUNLOAD];
}

void send_hvac_state () {
		char msg[1024];
		// sprintf(msg,
				// "{\"type\": \"hvac\", \"air_temp\": {\"ambient\": %d, \"inside\": %d,"
				// " \"upper\":{\"left\": %d, \"right\": %d},"
				// " \"lower\":{\"left\": %d, \"right\": %d}}, "
				// "\"light_level\":{\"ambient\": %d, \"driver\": %d, \"passenger\": %d}}",
				// get_ambient_air_temp(), get_inside_air_temp(),
				// get_upper_left_air_temp(), get_upper_right_air_temp(),
				// get_lower_left_air_temp(), get_lower_right_air_temp(),
				// get_ambient_light_level(), get_driver_sunload(), get_passenger_sunload());

		sprintf(msg,
				"{\"type\": \"hvac\", \"air_temp\": {\"ambient\": %d, \"inside\": %d}}",
				get_ambient_air_temp(), get_inside_air_temp());

		addUartMessageToQueue(cJSON_Parse(msg));

		sprintf(msg,
				"{\"type\": \"hvac\", \"air_temp\": {"
				" \"upper\":{\"left\": %d, \"right\": %d},"
				" \"lower\":{\"left\": %d, \"right\": %d}}}, ",
				get_upper_left_air_temp(), get_upper_right_air_temp(),
				get_lower_left_air_temp(), get_lower_right_air_temp());

		addUartMessageToQueue(cJSON_Parse(msg));

		sprintf(msg,
				"{\"type\": \"hvac\", "
				"\"light_level\":{\"ambient\": %d, \"driver\": %d, \"passenger\": %d}}",
				get_ambient_light_level(), get_driver_sunload(), get_passenger_sunload());

		addUartMessageToQueue(cJSON_Parse(msg));
}

void handle_hvac_message (cJSON * msg) {
	if (msg == NULL) return;

	char mode[100];

	if (cJSON_GetObjectItem(msg,"set_blower_motor")) {
		int level = cJSON_GetObjectItem(msg,"set_blower_motor")->valueint;
		set_blower_level(level);
		setAcOn(true);
		if (level == 0) {
			sendHvacOffMessage();
			setAcOn(false);
		}
	}

	if (cJSON_GetObjectItem(msg,"set_left_air_temp_motor")) {
		cJSON * mode = cJSON_GetObjectItem(msg,"set_left_air_temp_motor");
		left_air_temp_A = cJSON_IsTrue(cJSON_GetObjectItem(mode,"A"));
		left_air_temp_B = cJSON_IsTrue(cJSON_GetObjectItem(mode,"B"));
	}

	if (cJSON_GetObjectItem(msg,"set_right_air_temp_motor")) {
		cJSON * mode = cJSON_GetObjectItem(msg,"set_right_air_temp_motor");
		right_air_temp_A = cJSON_IsTrue(cJSON_GetObjectItem(mode,"A"));
		right_air_temp_B = cJSON_IsTrue(cJSON_GetObjectItem(mode,"B"));
	}

	if (cJSON_GetObjectItem(msg,"set_left_air_temp")) {
		setAcOn(true);
		cJSON * mode_obj = cJSON_GetObjectItem(msg,"set_left_air_temp");
		char mode[20];
		sprintf(mode, "%s", mode_obj->valuestring);

		if (strcmp(mode, "cool")==0) {
			sendHvacOnMessage();
			start_cooling_left = true;
			cooling = true;
		}

		if (strcmp(mode, "heat")==0) {
			start_heating_left = true;
			cooling = false;
		}
	}

	if (cJSON_GetObjectItem(msg,"set_right_air_temp")) {
		setAcOn(true);
		cJSON * mode_obj = cJSON_GetObjectItem(msg,"set_right_air_temp");
		char mode[20];
		sprintf(mode, "%s", mode_obj->valuestring);

		if (strcmp(mode, "cool")==0) {
			start_cooling_right = true;
			cooling = true;
		}

		if (strcmp(mode, "heat")==0) {
			start_heating_right = true;
			cooling = false;
		}
	}

	if (cJSON_GetObjectItem(msg,"set_mode_motor")) {
		cJSON * mode = cJSON_GetObjectItem(msg,"set_mode_motor");
		bool modeA = cJSON_IsTrue(cJSON_GetObjectItem(mode,"A"));
		bool modeB = cJSON_IsTrue(cJSON_GetObjectItem(mode,"B"));

		set_mode_motor(modeA, modeB);
	}

	if (cJSON_GetObjectItem(msg,"setMode")) {
		setAcOn(true);
		cJSON * mode_obj = cJSON_GetObjectItem(msg,"setMode");
		char mode[20];
		sprintf(mode, "%s", mode_obj->valuestring);
		set_mode(mode);
	}

	if (cJSON_GetObjectItem(msg,"set_recirculation")) {
		cJSON * mode = cJSON_GetObjectItem(msg,"set_recirculation");
		bool modeA = cJSON_IsTrue(cJSON_GetObjectItem(mode,"A"));
		bool modeB = cJSON_IsTrue(cJSON_GetObjectItem(mode,"B"));

		set_recirculation(modeA, modeB);
	}

	if (cJSON_GetObjectItem(msg,"set_rear_defog")) {
			bool on = cJSON_IsTrue(cJSON_GetObjectItem(msg,"set_rear_defog"));
			set_rear_defog(on);
	}

	if (cJSON_GetObjectItem(msg,"set_air_temp_blower")) {
		bool on = cJSON_IsTrue(cJSON_GetObjectItem(msg,"set_air_temp_blower"));
		set_air_temp_blower(on);
	}

	if (cJSON_GetObjectItem(msg,"get_state")) {
		send_hvac_state();
	}

	cJSON_Delete(serviceMessage.message);
}

static void left_air_temp_task(void* arg)
{
	while (1) {
		if (start_heating_left) {
			printf("start_cooling_left\n");

			for (int i = 0; i < 3; i++) {
				set_left_air_temp_motor(false, true);
				vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
				set_left_air_temp_motor(false, false);
				vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);
			}

			// some pulses have a sqaure wave on A channel at the end of the pulse
			set_left_air_temp_motor(false, true);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(false, false);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(true, false);
			vTaskDelay(COOL_A_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(false, false);
			vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);

			set_left_air_temp_motor(false, true);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(false, false);
			vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);

			// some pulses have a sqaure wave on A channel at the end of the pulse
			set_left_air_temp_motor(false, true);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(false, false);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(true, false);
			vTaskDelay(COOL_A_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(false, false);
			vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);

			set_left_air_temp_motor(false, true);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(false, false);
			vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);

			set_left_air_temp_motor(false, true);
			vTaskDelay((COOL_END_PULSE_WIDTH - COOL_A_PULSE_WIDTH) / portTICK_RATE_MS);
			set_left_air_temp_motor(true, true);
			vTaskDelay(COOL_A_PULSE_WIDTH / portTICK_RATE_MS);
			set_left_air_temp_motor(false, false);

			start_heating_left = false;
		}

		if (start_cooling_left) {
			for (int i = 0; i < 6; i++) {
				set_left_air_temp_motor(true, false);
				vTaskDelay(HEAT_PULSE_WIDTH / portTICK_RATE_MS);
				set_left_air_temp_motor(false, false);
				vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);
			}

			set_left_air_temp_motor(true, false);
			vTaskDelay(HEAT_END_PULSE_WIDTH / 2 / portTICK_RATE_MS);
			set_left_air_temp_motor(true, true);
			vTaskDelay(HEAT_END_PULSE_WIDTH / 2 / portTICK_RATE_MS);
			set_left_air_temp_motor(false, false);

			start_cooling_left = false;
		}

		vTaskDelay(SERVICE_LOOP / portTICK_RATE_MS);
	}
}

static void right_air_temp_task(void* arg)
{
	while (1) {
		if (start_cooling_right) {
			printf("start_cooling_right\n");

			for (int i = 0; i < 3; i++) {
				set_right_air_temp_motor(false, true);
				vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
				set_right_air_temp_motor(false, false);
				vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);
			}

			// some pulses have a sqaure wave on A channel at the end of the pulse
			set_right_air_temp_motor(false, true);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(false, false);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(true, false);
			vTaskDelay(COOL_A_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(false, false);
			vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);

			set_right_air_temp_motor(false, true);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(false, false);
			vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);

			// some pulses have a sqaure wave on A channel at the end of the pulse
			set_right_air_temp_motor(false, true);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(false, false);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(true, false);
			vTaskDelay(COOL_A_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(false, false);
			vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);

			set_right_air_temp_motor(false, true);
			vTaskDelay(COOL_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(false, false);
			vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);

			set_right_air_temp_motor(false, true);
			vTaskDelay((COOL_END_PULSE_WIDTH - COOL_A_PULSE_WIDTH) / portTICK_RATE_MS);
			set_right_air_temp_motor(true, true);
			vTaskDelay(COOL_A_PULSE_WIDTH / portTICK_RATE_MS);
			set_right_air_temp_motor(false, false);

			start_cooling_right = false;
		}

		if (start_heating_right) {
			for (int i = 0; i < 6; i++) {
				set_right_air_temp_motor(true, false);
				vTaskDelay(HEAT_PULSE_WIDTH / portTICK_RATE_MS);
				set_right_air_temp_motor(false, false);
				vTaskDelay(TEMP_INTERVAL / portTICK_RATE_MS);
			}

			set_right_air_temp_motor(true, false);
			vTaskDelay(HEAT_END_PULSE_WIDTH / 2 / portTICK_RATE_MS);
			set_right_air_temp_motor(true, true);
			vTaskDelay(HEAT_END_PULSE_WIDTH / 2 / portTICK_RATE_MS);
			set_right_air_temp_motor(false, false);

			start_heating_right = false;
		}

		vTaskDelay(SERVICE_LOOP / portTICK_RATE_MS);
	}
}

static void hvac_task(void* arg)
{
	char type[100];
	cJSON * payload = NULL;

	mcp23x17_set_mode(&mcp_dev, DRIVER_HEATED_SEAT_STATUS, MCP23X17_GPIO_INPUT);
	mcp23x17_set_mode(&mcp_dev, PASSENGER_HEATED_SEAT_STATUS, MCP23X17_GPIO_INPUT);

	while(1) {
		handle_hvac_message(checkServiceMessage("hvac"));
		vTaskDelay(SERVICE_LOOP / portTICK_RATE_MS);
	}
}

static void cooling_task(void* arg)
{
	while(1) {
		if (!ac_on) {
			vTaskDelay(1000 / portTICK_RATE_MS);
			continue;
		}

		if (cooling) {
			// printf("Sending coooling j1850 messages.\n");
			sendHvacOnMessage();
		} else {
			sendHvacOffMessage();
		}
		vTaskDelay(5 * 1000 / portTICK_RATE_MS);
	}
}

void hvac_main(void)
{
	// {"type":"hvac", "payload":{"get_state":true}}
  ESP_ERROR_CHECK(i2cdev_init());
	ads1115_main();
	mcp23017_main();
	timer_main();

  mcp23x17_set_mode(&mcp_dev, DRIVER_HEATED_SEAT_STATUS, MCP23X17_GPIO_INPUT);
  mcp23x17_set_mode(&mcp_dev, PASSENGER_HEATED_SEAT_STATUS, MCP23X17_GPIO_INPUT);

  mcp23x17_set_mode(&mcp_dev, LEFT_AIR_TEMP_CONTROL_A, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, LEFT_AIR_TEMP_CONTROL_B, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, RIGHT_AIR_TEMP_CONTROL_A, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, RIGHT_AIR_TEMP_CONTROL_B, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, MODE_A, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, MODE_B, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, RECIRCULATION_A, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, RECIRCULATION_B, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, DRIVER_SEAT_TEMP_CONTROL, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, PASSENGER_SEAT_TEMP_CONTROL, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, INSIDE_AIR_TEMP_BLOWER, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, REAR_DEFOG, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, C_OUT3, MCP23X17_GPIO_OUTPUT);
	mcp23x17_set_mode(&mcp_dev, BLOWER_MOTOR, MCP23X17_GPIO_OUTPUT);

  mcp23x17_set_interrupt(&mcp_dev, DRIVER_HEATED_SEAT_STATUS, MCP23X17_INT_ANY_EDGE);
  mcp23x17_set_interrupt(&mcp_dev, PASSENGER_HEATED_SEAT_STATUS, MCP23X17_INT_ANY_EDGE);

	xTaskCreate(mode_motor_task, "mode_motor_task", 1024 * 2, NULL, 10, NULL);
	xTaskCreate(left_air_temp_task, "left_air_temp_task", 1024 * 5, NULL, 10, NULL);
	xTaskCreate(right_air_temp_task, "right_air_temp_task", 1024 * 5, NULL, 10, NULL);
	xTaskCreate(cooling_task, "cooling_task", 1024 * 5, NULL, 10, NULL);
	xTaskCreate(hvac_task, "hvac_task", 1024 * 5, NULL, 10, NULL);

	set_mode("init");
}
