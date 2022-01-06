/*
   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/

#include <stdint.h>
#include <string.h>
#include <stdbool.h>
#include <stdio.h>
#include "nvs.h"
#include "nvs_flash.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "esp_bt.h"
#include "esp_bt_main.h"
#include "esp_gap_bt_api.h"
#include "esp_bt_device.h"
#include "esp_spp_api.h"
#include "driver/rmt.h"


// how many lights the message sender expects
#define VIRTUAL_LIGHT_COUNT (395)

// our actual physical demo strip length
#define REAL_LIGHT_COUNT (300)

#define APP_TAG "PI3_MDD_LIGHT"
#define SPP_SERVER_NAME "PI3_BT_SERVER"
#define EXAMPLE_DEVICE_NAME "Pi3 DelivByLight"

#define RMT_TX_CHANNEL RMT_CHANNEL_0
#define RMT_TX_GPIO 17

// RMT_BASECLK_APB is not defined anywhere I can see, assuming default 80MHz
#define MY_RMT_BASECLK_APB (80)

#define RMT_CLK_DIV 1

// these are defined in WS2812 datasheet
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

// arbitrary upper limit on message size
#define MSGLEN (50)

static const esp_spp_mode_t esp_spp_mode = ESP_SPP_MODE_CB;
static const esp_spp_sec_t sec_mask = ESP_SPP_SEC_NONE;
static const esp_spp_role_t role_slave = ESP_SPP_ROLE_SLAVE;

struct __attribute__((__packed__)) rgb_t {
  unsigned char r, g, b;
};

struct rgb_t pixel[REAL_LIGHT_COUNT] = {0};
// 3 channels (RGB), 8 bits each
rmt_item32_t rmt_pixel[REAL_LIGHT_COUNT][3][8];

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
  if (index >= 0 && index < REAL_LIGHT_COUNT) {
    for (bit = 7; bit >= 0; bit -= 1) {
      set_pixel_channel(&(rmt_pixel[index][0][bit]), g & (1 << bit));
      set_pixel_channel(&(rmt_pixel[index][1][bit]), r & (1 << bit));
      set_pixel_channel(&(rmt_pixel[index][2][bit]), b & (1 << bit));
    }
    if (write) {
      write_pixels();
    }
  } else {
    ESP_LOGI(APP_TAG, "pixel index %d out of bounds", index);
  }
}

void all_one_color(unsigned char r, unsigned char g, unsigned char b) {
  int index;
  for (index = 0; index < REAL_LIGHT_COUNT; index += 1) {
    set_pixel_by_index(index, r, g, b, 0);
  }
  write_pixels();
}

void reset_pixels() {
  all_one_color(0, 0, 0);
}

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

void do_light_range(int low, int high) {
  // per documentation the LOW light is NOT lit but ones afterward are
  // just set them green for now
  reset_pixels();
  int real_low, real_high;
  real_low = REAL_LIGHT_COUNT * (1.0 * low / VIRTUAL_LIGHT_COUNT);
  real_high = REAL_LIGHT_COUNT * (1.0 * high / VIRTUAL_LIGHT_COUNT);

  ESP_LOGI(APP_TAG, "mapping virtual light range (%d,%d] to real light range (%d, %d]", low, high, real_low, real_high);

  if (real_high > 0) {
    int i;
    for (i = real_low + 1; i < real_high; i += 1) {
      set_pixel_by_index(i, 0, 255, 0, 0);
    }

    set_pixel_by_index(i, 0, 255, 0, 1);
  }
}

void process_message(char * msg) {
  char * msg_high;
  int low_end, high_end;
  if ('L' == msg[0]) {
    low_end = strtol(msg + 1, &msg_high, 10);
    if ('H' == msg_high[0]) {
      high_end = strtol(msg_high + 1, NULL, 10);
      ESP_LOGI(APP_TAG, "parsed message Low: %d, High: %d, lighting...", low_end, high_end);

      do_light_range(low_end, high_end);

    } else {
      ESP_LOGE(APP_TAG, "failed to find H in message '%s'", msg);
    }
  } else {
    ESP_LOGE(APP_TAG, "failed to find L in message '%s'", msg);
  }
}

void data_to_string(char * dst, size_t maxlen, unsigned char * src) {
  int i;
  if (dst && src) {
    for (i = 0; i < maxlen && src[i]; i += 1) {
      dst[i] = src[i];
    }
    dst[i] = 0;
  }
}

static void esp_spp_cb(esp_spp_cb_event_t event, esp_spp_cb_param_t *param)
{
    char msgbuf[MSGLEN+1]; // for incoming light-up messages

    switch (event) {
    case ESP_SPP_INIT_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_INIT_EVT");
        esp_bt_dev_set_device_name(EXAMPLE_DEVICE_NAME);
        esp_bt_gap_set_scan_mode(ESP_BT_SCAN_MODE_CONNECTABLE_DISCOVERABLE);
        esp_spp_start_srv(sec_mask,role_slave, 0, SPP_SERVER_NAME);
        break;
    case ESP_SPP_DISCOVERY_COMP_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_DISCOVERY_COMP_EVT");
        break;
    case ESP_SPP_OPEN_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_OPEN_EVT");
        break;
    case ESP_SPP_CLOSE_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_CLOSE_EVT");
        break;
    case ESP_SPP_START_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_START_EVT");
        break;
    case ESP_SPP_CL_INIT_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_CL_INIT_EVT");
        break;
    case ESP_SPP_DATA_IND_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_DATA_IND_EVT len=%d handle=%d",
                 param->data_ind.len, param->data_ind.handle);
        esp_log_buffer_hex("",param->data_ind.data,param->data_ind.len);
        data_to_string(msgbuf, (param->data_ind.len < MSGLEN ? param->data_ind.len : MSGLEN), param->data_ind.data);
        ESP_LOGI(APP_TAG, "as string: '%s'", msgbuf);
        process_message(msgbuf);
        break;
    case ESP_SPP_CONG_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_CONG_EVT");
        break;
    case ESP_SPP_WRITE_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_WRITE_EVT");
        break;
    case ESP_SPP_SRV_OPEN_EVT:
        ESP_LOGI(APP_TAG, "ESP_SPP_SRV_OPEN_EVT");
        break;
    default:
        ESP_LOGI(APP_TAG, "default event");
        break;
    }
}

void app_main()
{
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK( ret );

    ws2812_rmt_tx_init();
    reset_pixels();
    // xTaskCreate(rainbow, "ws2812 rainbow demo", 4096, NULL, 10, NULL);

    esp_bt_controller_config_t bt_cfg = BT_CONTROLLER_INIT_CONFIG_DEFAULT();
    if ((ret = esp_bt_controller_init(&bt_cfg)) != ESP_OK) {
        ESP_LOGE(APP_TAG, "%s initialize controller failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

    if ((ret = esp_bt_controller_enable(ESP_BT_MODE_CLASSIC_BT)) != ESP_OK) {
        ESP_LOGE(APP_TAG, "%s enable controller failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

    if ((ret = esp_bluedroid_init()) != ESP_OK) {
        ESP_LOGE(APP_TAG, "%s initialize bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

    if ((ret = esp_bluedroid_enable()) != ESP_OK) {
        ESP_LOGE(APP_TAG, "%s enable bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

    if ((ret = esp_spp_register_callback(esp_spp_cb)) != ESP_OK) {
        ESP_LOGE(APP_TAG, "%s spp register failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

    if ((ret = esp_spp_init(esp_spp_mode)) != ESP_OK) {
        ESP_LOGE(APP_TAG, "%s spp init failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }
}

