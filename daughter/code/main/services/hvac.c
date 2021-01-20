#include "drivers/i2c.c"
#include "drivers/max11617.c"
#include "drivers/mcp23x17.c"
#include "drivers/timer.c"

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
#define INSIDE_AIR_TEMP_BLOWER						B0
#define REAR_DEFOG												B2

#define DRIVER_HEATED_SEAT_STATUS					B4
#define PASSENGER_HEATED_SEAT_STATUS			B5

#define DRIVER_SEAT_TEMP_CONTROL					B6
#define PASSENGER_SEAT_TEMP_CONTROL				B7

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

void set_left_air_temp(bool valA, bool valB)
{
	set_mcp_io(LEFT_AIR_TEMP_CONTROL_A, valA);
	set_mcp_io(LEFT_AIR_TEMP_CONTROL_B, valB);
}

void set_right_air_temp(bool valA, bool valB)
{
	set_mcp_io(RIGHT_AIR_TEMP_CONTROL_A, valA);
	set_mcp_io(RIGHT_AIR_TEMP_CONTROL_B, valB);
}

void set_mode(bool valA, bool valB)
{
	set_mcp_io(MODE_A, valA);
	set_mcp_io(MODE_B, valB);
}

void set_recirculation(bool valA, bool valB)
{
	set_mcp_io(RECIRCULATION_A, valA);
	set_mcp_io(RECIRCULATION_B, valB);
}

void set_rear_defog(bool val)
{
	set_mcp_io(REAR_DEFOG, val);
}

void set_air_temp_blower(bool val)
{
	set_mcp_io(INSIDE_AIR_TEMP_BLOWER, val);
}

void set_driver_heated_seat(bool val)
{
	set_mcp_io(DRIVER_SEAT_TEMP_CONTROL, val);
}

void set_passenger_heated_seat(bool val)
{
	set_mcp_io(PASSENGER_SEAT_TEMP_CONTROL, val);
}

uint16_t get_ambient_air_temp()
{
	return get_max_values()[AMBIENT_AIR_TEMP];
}

uint16_t get_inside_air_temp()
{
	return get_max_values()[INSIDE_AIR_TEMP];
}

uint16_t get_upper_right_air_temp()
{
	return get_max_values()[UPPER_RIGHT_AIR_TEMP];
}

uint16_t get_upper_left_air_temp()
{
	return get_max_values()[UPPER_LEFT_AIR_TEMP];
}

uint16_t get_lower_left_air_temp()
{
	return get_max_values()[LOWER_LEFT_AIR_TEMP];
}

uint16_t get_lower_right_air_temp()
{
	return get_max_values()[LOWER_RIGHT_AIR_TEMP];
}

void get_driver_heated_status()
{
	get_mcp_io(DRIVER_HEATED_SEAT_STATUS);
}

void get_passenger_heated_status()
{
	get_mcp_io(PASSENGER_HEATED_SEAT_STATUS);
}

uint16_t get_ambient_light_level()
{
	return get_max_values()[AMBIENT_LIGHT];
}

uint16_t get_driver_sunload()
{
	return get_max_values()[DRIVER_SUNLOAD];
}

uint16_t get_passenger_sunload()
{
	return get_max_values()[PASSENGER_SUNLOAD];
}

static void hvac_task(void* arg)
{
	uint16_t * adc_values;
	uint16_t io_values;

	set_mcp_io_dir(DRIVER_HEATED_SEAT_STATUS, MCP_INPUT);
	set_mcp_io_dir(PASSENGER_HEATED_SEAT_STATUS, MCP_INPUT);

	bool on = true;
	int i = 0;

	while(1) {
		set_blower_level(i);
		i >= 7 ? i=0 : i++;

		// adc_values = get_max_values();
		// io_values = get_mcp_values();


		// printHvacData(adc_values, io_values);
		vTaskDelay(2000 / portTICK_RATE_MS);
	}
}

void hvac_main(void)
{
	i2c_main();
	max11617_main();
	mcp23x17_main();
	timer_main();
	xTaskCreate(hvac_task, "hvac_task", 2048, NULL, 10, NULL);
}
