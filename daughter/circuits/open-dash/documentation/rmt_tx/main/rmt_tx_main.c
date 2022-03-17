/* RMT transmit example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "driver/rmt.h"

static const char *RMT_TX_TAG = "RMT Tx";

// count of light positions
#define WS2812_PIXELS (300)

#define RMT_TX_CHANNEL RMT_CHANNEL_0
#define RMT_TX_GPIO 17

// RMT_BASECLK_APB is not defined anywhere I can see, assuming default 80MHz
#define MY_RMT_BASECLK_APB (80)

#define RMT_CLK_DIV 1
#define PULSE_T0H_US (0.35)
#define PULSE_T1H_US (0.7)
#define PULSE_T0L_US (0.8)
#define PULSE_T1L_US (0.6)
#define PULSE_RES_US (50)

#define T0H_TICKS ((int)(MY_RMT_BASECLK_APB * PULSE_T0H_US))
#define T1H_TICKS ((int)(MY_RMT_BASECLK_APB * PULSE_T1H_US))
#define T0L_TICKS ((int)(MY_RMT_BASECLK_APB * PULSE_T0L_US))
#define T1L_TICKS ((int)(MY_RMT_BASECLK_APB * PULSE_T1L_US))
#define RES_TICKS ((int)(MY_RMT_BASECLK_APB * PULSE_RES_US))

struct __attribute__((__packed__)) rgb_t {
  unsigned char r, g, b;
};

struct rgb_t pixel[WS2812_PIXELS] = {0};
// 3 channels (RGB), 8 bits each
rmt_item32_t rmt_pixel[WS2812_PIXELS][3][8];

static void ws2812_rmt_tx_init() {
    rmt_config_t config = {};

    config.rmt_mode = RMT_MODE_TX;
    config.channel = RMT_TX_CHANNEL;
    config.clk_div = RMT_CLK_DIV;
    config.gpio_num = RMT_TX_GPIO;
    config.mem_block_num = 1; // don't know what this does but it needs to be so

    config.tx_config.loop_en = 0;
    config.tx_config.carrier_en = 0;
    config.tx_config.idle_output_en = 0;
    config.tx_config.idle_level = 0;

    ESP_ERROR_CHECK(rmt_config(&config));
    ESP_ERROR_CHECK(rmt_driver_install(config.channel, 0, 0));
}

void set_pixel_channel(rmt_item32_t * item, int state) {
  item->level0 = 1;
  item->level1 = 0;
  if (0 == state) {
    item->duration0 = T0H_TICKS;
    item->duration1 = T0L_TICKS;
  } else {
    item->duration0 = T1H_TICKS;
    item->duration1 = T1L_TICKS;
  }
}

void write_pixels() {
  int structs = sizeof(rmt_pixel) / sizeof(rmt_pixel[0][0][0]);
  ESP_ERROR_CHECK(rmt_write_items(RMT_TX_CHANNEL, rmt_pixel, structs, true));
}

// copy rgb_t pixel data into rmt_pixel data
void set_pixel_by_index(int index, unsigned char r, unsigned char g, unsigned char b, int write) {
  int bit;
  if (index >= 0 && index < WS2812_PIXELS) {
    for (bit = 7; bit >= 0; bit -= 1) {
      set_pixel_channel(&(rmt_pixel[index][0][bit]), g & (1 << bit));
      set_pixel_channel(&(rmt_pixel[index][1][bit]), r & (1 << bit));
      set_pixel_channel(&(rmt_pixel[index][2][bit]), b & (1 << bit));
    }
    if (write) {
      write_pixels();
    }
  } else {
    ESP_LOGI(RMT_TX_TAG, "pixel index %d out of bounds", index);
  }
}

void all_one_color(unsigned char r, unsigned char g, unsigned char b) {
  int index;
  for (index = 0; index < WS2812_PIXELS; index += 1) {
    set_pixel_by_index(index, r, g, b, 0);
  }
  write_pixels();
}

void reset_pixels() {
  all_one_color(0, 0, 0);
}

void all_red() {
  all_one_color(255, 0, 0);
}

void all_green() {
  all_one_color(0, 255, 0);
}

void all_blue() {
  all_one_color(0, 0, 255);
}

void all_white() {
  all_one_color(255, 255, 255);
}

void light_demo() {
  // gbr glider runs across
  for (int i = 2; i < WS2812_PIXELS; i += 1) {
    set_pixel_by_index(i - 2, 127, 0, 0, 0);
    set_pixel_by_index(i - 1, 0, 127, 0, 0);
    set_pixel_by_index(i - 0, 0, 0, 127, 1);
    write_pixels();
    set_pixel_by_index(i - 2, 0, 0, 0, 0);
    set_pixel_by_index(i - 1, 0, 0, 0, 0);
    set_pixel_by_index(i - 0, 0, 0, 0, 0);
    vTaskDelay((2500 / WS2812_PIXELS) / portTICK_PERIOD_MS);
  }

  for (int i = WS2812_PIXELS - 1; i >= 2; i -= 1) {
    set_pixel_by_index(i - 2, 127, 0, 0, 0);
    set_pixel_by_index(i - 1, 0, 127, 0, 0);
    set_pixel_by_index(i - 0, 0, 0, 127, 1);
    write_pixels();
    set_pixel_by_index(i - 2, 0, 0, 0, 0);
    set_pixel_by_index(i - 1, 0, 0, 0, 0);
    set_pixel_by_index(i - 0, 0, 0, 0, 0);
    vTaskDelay((2500 / WS2812_PIXELS) / portTICK_PERIOD_MS);
  }

  for (int i = 0; i < 4; i += 1) {
    set_pixel_by_index(0, 0, 0, 0, 0);
    set_pixel_by_index(1, 0, 0, 0, 0);
    set_pixel_by_index(2, 0, 0, 0, 1);
    vTaskDelay(250 / portTICK_PERIOD_MS);
    set_pixel_by_index(0, 127, 0, 0, 0);
    set_pixel_by_index(1, 0, 127, 0, 0);
    set_pixel_by_index(2, 0, 0, 127, 1);
    vTaskDelay(250 / portTICK_PERIOD_MS);
  }

  set_pixel_by_index(0, 0, 0, 0, 0);
  set_pixel_by_index(1, 0, 0, 0, 0);
  set_pixel_by_index(2, 0, 0, 0, 1);
  vTaskDelay(500 / portTICK_PERIOD_MS);
}

void app_main(void *ignore)
{
    ESP_LOGI(RMT_TX_TAG, "Configuring transmitter");
    ESP_LOGI(RMT_TX_TAG, "APB: %dMHz\nT0H ticks: %d\nT1H ticks: %d\nT0L ticks: %d\nT1L ticks: %d\nRES ticks: %d", MY_RMT_BASECLK_APB, T0H_TICKS, T1H_TICKS, T0L_TICKS, T1L_TICKS, RES_TICKS);
    ws2812_rmt_tx_init();

    reset_pixels();
    ESP_LOGI(RMT_TX_TAG, "Resetting pixels ...");
    vTaskDelay(500 / portTICK_PERIOD_MS);

    ESP_LOGI(RMT_TX_TAG, "pixel 5 red");
    set_pixel_by_index(4, 255, 0, 0, 1);
    vTaskDelay(1500 / portTICK_PERIOD_MS);

    ESP_LOGI(RMT_TX_TAG, "pixel 8 blue");
    set_pixel_by_index(7, 0, 0, 63, 1);
    vTaskDelay(1500 / portTICK_PERIOD_MS);

    ESP_LOGI(RMT_TX_TAG, "pixel 5 green");
    set_pixel_by_index(4, 0, 63, 0, 1);
    vTaskDelay(1500 / portTICK_PERIOD_MS);

    while (1) {
      all_red();
      vTaskDelay(1500 / portTICK_PERIOD_MS);

      all_green();
      vTaskDelay(1500 / portTICK_PERIOD_MS);

      all_blue();
      vTaskDelay(1500 / portTICK_PERIOD_MS);

      all_white();
      vTaskDelay(1500 / portTICK_PERIOD_MS);

      light_demo();
    }

    vTaskDelete(NULL);
}
