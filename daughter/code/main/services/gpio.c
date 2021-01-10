#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/gpio.h"
#include "driver/gpio.h"
#include <mcp23x17.h>
#include <string.h>

#define IGNITION_WIRE_IO CONFIG_IGNITION_WIRE_IO
#define MAIN_POWER_IO CONFIG_MAIN_POWER_IO
#define DISPLAY_POWER_IO CONFIG_DISPLAY_POWER_IO
#define AUDIO_STBY_IO CONFIG_AUDIO_STBY_IO
#define AUDIO_MUTE_IO CONFIG_AUDIO_MUTE_IO
#define J1850_INPUT_PIN CONFIG_J1850_INPUT_PIN
#define J1850_OUTPUT_PIN CONFIG_J1850_OUTPUT_PIN
#define J1850_DEBUG_PIN 22

#define GPIO_OUTPUT_PIN_SEL  ((1ULL<<J1850_DEBUG_PIN) | (1ULL<<J1850_OUTPUT_PIN) | (1ULL<<MAIN_POWER_IO) | (1ULL<<DISPLAY_POWER_IO) | (1ULL<<AUDIO_STBY_IO) | (1ULL<<AUDIO_MUTE_IO))
#define GPIO_INPUT_PIN_SEL  ((1ULL<<IGNITION_WIRE_IO) | (1ULL<<J1850_INPUT_PIN))
#define ESP_INTR_FLAG_DEFAULT 0

#define INTA_GPIO 19  // INTA pin
#define SDA_GPIO 21
#define SCL_GPIO 22

static void IRAM_ATTR intr_handler(void *arg)
{
    printf("Interrupt!\n");
}

void mcp23017(void *pvParameters)
{
    mcp23x17_t dev;
    memset(&dev, 0, sizeof(mcp23x17_t));

    ESP_ERROR_CHECK(mcp23x17_init_desc(&dev, 0, MCP23X17_ADDR_BASE + 7, SDA_GPIO, SCL_GPIO));

    // Setup PORTA0 as input
    mcp23x17_set_mode(&dev, 0, MCP23X17_GPIO_INPUT);
    // Setup interrupt on it
    mcp23x17_set_interrupt(&dev, 0, MCP23X17_INT_ANY_EDGE);

    gpio_set_direction(INTA_GPIO, GPIO_MODE_INPUT);
    gpio_set_intr_type(INTA_GPIO, GPIO_INTR_ANYEDGE);
    gpio_install_isr_service(0);
    gpio_isr_handler_add(INTA_GPIO, intr_handler, NULL);

    // Setup PORTB0 as output
    mcp23x17_set_mode(&dev, 8, MCP23X17_GPIO_OUTPUT);
    for (int i = 0; i < 15; i++) {
      mcp23x17_set_mode(&dev, i, MCP23X17_GPIO_INPUT);
    }
    // for (int i = 0; i < 15; i++) {
    //   mcp23x17_set_mode(&dev, i, MCP23X17_GPIO_INPUT);
    // }
    // do some blinking
    bool on = true;
    while (1)
    {
        // mcp23x17_set_level(&dev, 8, on);
        // on = !on;

        uint32_t val;

        printf("IO\t");
        for (int i = 0; i < 15; i++) {
          mcp23x17_get_level(&dev, i, &val);
        	printf(" %d ", val);
        }
        printf("\n");
        vTaskDelay(500 / portTICK_PERIOD_MS);
    }
}


void gpio_main(void)
{
    ESP_ERROR_CHECK(i2cdev_init());
    xTaskCreate(mcp23017, "mcp23017", configMINIMAL_STACK_SIZE * 6, NULL, 5, NULL);

    gpio_config_t io_conf;
    io_conf.intr_type = GPIO_INTR_DISABLE;
    io_conf.mode = GPIO_MODE_OUTPUT;
    io_conf.pin_bit_mask = GPIO_OUTPUT_PIN_SEL;
    io_conf.pull_down_en = 0;
    io_conf.pull_up_en = 0;
    gpio_config(&io_conf);

    io_conf.intr_type = GPIO_INTR_ANYEDGE;
    io_conf.pin_bit_mask = GPIO_INPUT_PIN_SEL;
    io_conf.mode = GPIO_MODE_INPUT;
    io_conf.pull_up_en = 0;
    gpio_config(&io_conf);

    gpio_install_isr_service(ESP_INTR_FLAG_DEFAULT);
}
