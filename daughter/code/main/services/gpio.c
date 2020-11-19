#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/gpio.h"

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

void gpio_main(void)
{
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
