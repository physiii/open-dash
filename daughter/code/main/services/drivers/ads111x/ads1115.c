#include <stdio.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "../ads111x/ads111x.h"
#include <string.h>

#define DEV_COUNT 3   // 2 ICs
#define I2C_PORT 0
#define SDA_GPIO 21
#define SCL_GPIO 22

#define GAIN ADS111X_GAIN_4V096 // +-4.096V

// #define MAX11617_ADDR 0x35 /*!< ESP32 slave address, you can set any 7bit value */
#define ADC_CHANNELS 12                  /*!< Data buffer length of test buffer */
// #define DATA_LENGTH 2                  /*!< Data buffer length of test buffer */
// #define RW_TEST_LENGTH 128               /*!< Data length for r/w test, [0,DATA_LENGTH] */
// #define DELAY_TIME_BETWEEN_ITEMS_MS 1000 /*!< delay time between different test items */

uint16_t ADS_VALUES[ADC_CHANNELS] = {0};

uint16_t * get_ads_values()
{
	return ADS_VALUES;
}

// I2C addresses
static const uint8_t addr[DEV_COUNT] = {
    ADS111X_ADDR_GND,
    ADS111X_ADDR_VCC,
		ADS111X_ADDR_SCL
};

// Descriptors
static i2c_dev_t devices[DEV_COUNT];

// Gain value
static float gain_val;

float measure(size_t n)
{
    // wait for conversion end
    bool busy;
    do
    {
        ads111x_is_busy(&devices[n], &busy);
    }
    while (busy);

    // Read result
    int16_t raw = 0;
    if (ads111x_get_value(&devices[n], &raw) == ESP_OK)
    {
        float voltage = gain_val / ADS111X_MAX_VALUE * raw;
        // printf("[%u] Raw ADC value: %d, voltage: %.04f volts\n", n, raw, voltage);
				return raw;
    }
    else
        printf("[%u] Cannot read ADC value\n", n);
				return 0;
}

void ads111x_test(void *pvParameters)
{
    gain_val = ads111x_gain_values[GAIN];
		uint16_t cnt = 0;

		for (size_t i = 0; i < DEV_COUNT; i++)
		{
			ESP_ERROR_CHECK(ads111x_init_desc(&devices[i], addr[i], I2C_PORT, SDA_GPIO, SCL_GPIO));

			ESP_ERROR_CHECK(ads111x_set_mode(&devices[i], ADS111X_MODE_CONTINUOUS));    // Continuous conversion mode
			ESP_ERROR_CHECK(ads111x_set_data_rate(&devices[i], ADS111X_DATA_RATE_32)); // 32 samples per second
			ESP_ERROR_CHECK(ads111x_set_input_mux(&devices[i], ADS111X_MUX_0_GND));    // positive = AIN0, negative = GND
			ESP_ERROR_CHECK(ads111x_set_gain(&devices[i], GAIN));
		}

    while (1)
    {
			int io = cnt % 4;

			for (size_t i = 0; i < DEV_COUNT; i++)
			{
					if (io == 0) ESP_ERROR_CHECK(ads111x_set_input_mux(&devices[i], ADS111X_MUX_0_GND));
					if (io == 1) ESP_ERROR_CHECK(ads111x_set_input_mux(&devices[i], ADS111X_MUX_1_GND));
					if (io == 2) ESP_ERROR_CHECK(ads111x_set_input_mux(&devices[i], ADS111X_MUX_2_GND));
					if (io == 3) ESP_ERROR_CHECK(ads111x_set_input_mux(&devices[i], ADS111X_MUX_3_GND));

		      // vTaskDelay(SERVICE_LOOP / portTICK_PERIOD_MS);
			}

      // vTaskDelay(5 * SERVICE_LOOP / portTICK_PERIOD_MS);

      for (size_t i = 0; i < DEV_COUNT; i++) {
				int num = (4 * i) + io;
	    	ADS_VALUES[num] = measure(i);
				// vTaskDelay(SERVICE_LOOP / portTICK_PERIOD_MS);
			}

			cnt++;
      vTaskDelay(SERVICE_LOOP / portTICK_PERIOD_MS);
    }
}

void ads1115_main()
{
    memset(devices, 0, sizeof(devices));
    xTaskCreatePinnedToCore(ads111x_test, "ads111x_test", configMINIMAL_STACK_SIZE * 8, NULL, 5, NULL, APP_CPU_NUM);
}
