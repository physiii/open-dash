/* Timer group-hardware timer example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include <stdio.h>
#include "esp_types.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/periph_ctrl.h"
#include "driver/timer.h"

#define BLOWER_MOTOR											B1
#define LEVEL_0								(0)
#define LEVEL_1								(0.016)
#define LEVEL_2								(0.016)
#define LEVEL_3								(0.016)
#define LEVEL_4								(0.016)
#define LEVEL_5								(0.016)
#define LEVEL_6								(0.016)
#define LEVEL_7								(0.016)


#define TIMER_DIVIDER         2  //  Hardware timer clock divider
#define TIMER_SCALE           (TIMER_BASE_CLK / TIMER_DIVIDER)  // convert counter value to seconds
#define PWM_INTERVAL 				  (0.0275) // sample test interval for the first timer
#define TEST_WITHOUT_RELOAD   0        // testing will be done without auto reload
#define TEST_WITH_RELOAD      1        // testing will be done with auto reload

double pwm_width = LEVEL_3;

typedef struct {
    int type;  // the type of timer's event
    int timer_group;
    int timer_idx;
    uint64_t timer_counter_value;
} timer_event_t;

xQueueHandle timer_queue;

static void inline print_timer_counter(uint64_t counter_value)
{
    printf("Counter: 0x%08x%08x\n", (uint32_t) (counter_value >> 32),
           (uint32_t) (counter_value));
    printf("Time   : %.8f s\n", (double) counter_value / TIMER_SCALE);
}

/*
 * Timer group0 ISR handler
 *
 * Note:
 * We don't call the timer API here because they are not declared with IRAM_ATTR.
 * If we're okay with the timer irq not being serviced while SPI flash cache is disabled,
 * we can allocate this interrupt without the ESP_INTR_FLAG_IRAM flag and use the normal API.
 */
void IRAM_ATTR timer_group0_isr(void *para)
{
    timer_spinlock_take(TIMER_GROUP_0);
    int timer_idx = (int) para;

    /* Retrieve the interrupt status and the counter value
       from the timer that reported the interrupt */
    uint32_t timer_intr = timer_group_get_intr_status_in_isr(TIMER_GROUP_0);
    uint64_t timer_counter_value = timer_group_get_counter_value_in_isr(TIMER_GROUP_0, timer_idx);

    /* Prepare basic event data
       that will be then sent back to the main program task */
    timer_event_t evt;
    evt.timer_group = 0;
    evt.timer_idx = timer_idx;
    evt.timer_counter_value = timer_counter_value;

    /* Clear the interrupt
       and update the alarm time for the timer with without reload */
    if (timer_intr & TIMER_INTR_T0) {
        evt.type = TEST_WITHOUT_RELOAD;
        timer_group_clr_intr_status_in_isr(TIMER_GROUP_0, TIMER_0);
        timer_counter_value += (uint64_t) (PWM_INTERVAL * TIMER_SCALE);
        timer_group_set_alarm_value_in_isr(TIMER_GROUP_0, timer_idx, timer_counter_value);

		    /* After the alarm has been triggered
		      we need enable it again, so it is triggered the next time */
		    timer_group_enable_alarm_in_isr(TIMER_GROUP_0, TIMER_0);
				timer_group_enable_alarm_in_isr(TIMER_GROUP_0, TIMER_1);
    } else if (timer_intr & TIMER_INTR_T1) {
        evt.type = TEST_WITH_RELOAD;
        timer_group_clr_intr_status_in_isr(TIMER_GROUP_0, TIMER_1);
    } else {
        evt.type = -1; // not supported even type
    }

    /* Now just send the event data back to the main program task */
    xQueueSendFromISR(timer_queue, &evt, NULL);
    timer_spinlock_give(TIMER_GROUP_0);
}

/*
 * Initialize selected timer of the timer group 0
 *
 * timer_idx - the timer number to initialize
 * auto_reload - should the timer auto reload on alarm?
 * timer_interval_sec - the interval of alarm to set
 */
static void example_tg0_timer_init(int timer_idx,
                                   bool auto_reload, double timer_interval_sec)
{
    /* Select and initialize basic parameters of the timer */
    timer_config_t config = {
        .divider = TIMER_DIVIDER,
        .counter_dir = TIMER_COUNT_UP,
        .counter_en = TIMER_PAUSE,
        .alarm_en = TIMER_ALARM_EN,
        .auto_reload = auto_reload,
    }; // default clock source is APB
    timer_init(TIMER_GROUP_0, timer_idx, &config);

    /* Timer's counter will initially start from value below.
       Also, if auto_reload is set, this value will be automatically reload on alarm */
    timer_set_counter_value(TIMER_GROUP_0, timer_idx, 0x00000000ULL);

    /* Configure the alarm value and the interrupt on alarm. */
    timer_set_alarm_value(TIMER_GROUP_0, timer_idx, timer_interval_sec * TIMER_SCALE);
    timer_enable_intr(TIMER_GROUP_0, timer_idx);
    timer_isr_register(TIMER_GROUP_0, timer_idx, timer_group0_isr,
                       (void *) timer_idx, ESP_INTR_FLAG_IRAM, NULL);

    timer_start(TIMER_GROUP_0, timer_idx);
}

void set_blower_pwm_width (int level) {

	timer_deinit(TIMER_GROUP_0, TIMER_1);

	if (level == 0)	pwm_width = LEVEL_0;
	if (level == 1)	pwm_width = LEVEL_1;
	if (level == 2)	pwm_width = LEVEL_2;
	if (level == 3)	pwm_width = LEVEL_3;
	if (level == 4)	pwm_width = LEVEL_4;
	if (level == 5)	pwm_width = LEVEL_5;
	if (level == 6)	pwm_width = LEVEL_6;
	if (level == 7)	pwm_width = LEVEL_7;

	example_tg0_timer_init(TIMER_1, TEST_WITH_RELOAD, pwm_width);
}

static void timer_example_evt_task(void *arg)
{
    while (1) {
        timer_event_t evt;
        xQueueReceive(timer_queue, &evt, portMAX_DELAY);

        /* Print information that the timer reported an event */
        if (evt.timer_idx == 0) {
					set_mcp_io(BLOWER_MOTOR, true);
            // printf("\n    Example timer without reload\n");
        } else if (evt.timer_idx == 1) {
					set_mcp_io(BLOWER_MOTOR, false);
            // printf("\n    Example timer with auto reload\n");
        }
        // printf("Group[%d], timer[%d] alarm event\n", evt.timer_group, evt.timer_idx);
				//
        // /* Print the timer values passed by event */
        // printf("------- EVENT TIME --------\n");
        // print_timer_counter(evt.timer_counter_value);
				//
        // /* Print the timer values as visible by this task */
        // printf("-------- TASK TIME --------\n");
        // uint64_t task_counter_value;
        // timer_get_counter_value(evt.timer_group, evt.timer_idx, &task_counter_value);
        // print_timer_counter(task_counter_value);

    }
}

void timer_main(void)
{
    timer_queue = xQueueCreate(10, sizeof(timer_event_t));
    example_tg0_timer_init(TIMER_0, TEST_WITHOUT_RELOAD, PWM_INTERVAL);
    example_tg0_timer_init(TIMER_1, TEST_WITH_RELOAD, pwm_width);
    xTaskCreate(timer_example_evt_task, "timer_evt_task", 2048, NULL, 5, NULL);
}
