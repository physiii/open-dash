EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr B 17000 11000
encoding utf-8
Sheet 1 14
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Text Label 8900 6150 0    50   ~ 0
SCL
Text Label 8900 6250 0    50   ~ 0
SDA
Text Label 9000 7900 0    50   ~ 0
MAIN_EN
Text Label 7600 7600 2    50   ~ 0
BATTERY
Text Label 7400 5250 2    50   ~ 0
MAIN_EN
Text Label 8900 5400 0    50   ~ 0
TXD
Text Label 8900 5500 0    50   ~ 0
RXD
Text Label 7400 5350 2    50   ~ 0
AUDIO_STBY
Text Label 7400 5450 2    50   ~ 0
AUDIO_MUTE
Text Label 10950 7950 2    50   ~ 0
AUDIO_STBY
Text Label 10950 7850 2    50   ~ 0
AUDIO_MUTE
Text Label 9000 7800 0    50   ~ 0
DISPLAY_EN
Text Label 7400 5150 2    50   ~ 0
DISPLAY_EN
Text Label 7600 7700 2    50   ~ 0
5V
Text Label 4700 7000 2    50   ~ 0
CAN_RX
Text Label 4700 7100 2    50   ~ 0
CAN_TX
Text Label 5650 6800 0    50   ~ 0
CAN+
Text Label 5650 6900 0    50   ~ 0
CAN-
Text Label 4800 7700 2    50   ~ 0
5V
Text Label 4800 7800 2    50   ~ 0
ESP_EN
Text Label 4800 7900 2    50   ~ 0
PROG
Text Label 12600 7800 0    50   ~ 0
LR+
Text Label 12600 8000 0    50   ~ 0
RR+
Text Label 12600 7900 0    50   ~ 0
RF+
Text Label 12600 8450 0    50   ~ 0
RR-
Text Label 12600 8350 0    50   ~ 0
RF-
Text Label 12600 8150 0    50   ~ 0
LF-
Text Label 12600 8250 0    50   ~ 0
LR-
$Sheet
S 7650 7500 1300 1050
U 5A7BADB8
F0 "Power" 50
F1 "power.sch" 50
F2 "CURRENT_SENSE" I R 8950 8050 50 
F3 "3V3" I L 7650 7800 50 
F4 "5V" I L 7650 7700 50 
F5 "MAIN_EN" I R 8950 7900 50 
F6 "DISPLAY_EN" I R 8950 7800 50 
F7 "BATTERY" I L 7650 7600 50 
F8 "BATT_ADC" I R 8950 8150 50 
F9 "DISPLAY_POWER" I R 8950 7600 50 
F10 "MAIN_POWER" I R 8950 7700 50 
F11 "TRIGGER0" I L 7650 8150 50 
F12 "SENSE0" I L 7650 8250 50 
F13 "TRIGGER1" I L 7650 8350 50 
F14 "SENSE1" I L 7650 8450 50 
$EndSheet
Wire Wire Line
	7650 7600 7600 7600
Wire Wire Line
	7650 7700 7600 7700
Text Label 7600 7800 2    50   ~ 0
3V3
Wire Wire Line
	7650 7800 7600 7800
Wire Wire Line
	8950 7900 9000 7900
Wire Wire Line
	8950 7800 9000 7800
Text Label 9000 8050 0    50   ~ 0
CURRENT_SENSE
Wire Wire Line
	8850 6250 8900 6250
Wire Wire Line
	8900 6150 8850 6150
Wire Wire Line
	8850 5500 8900 5500
Wire Wire Line
	8900 5400 8850 5400
$Sheet
S 11000 7600 1550 950 
U 5ABD1806
F0 "Audio Amplifier" 50
F1 "audio-amplifier.sch" 50
F2 "LR_AUDIO_OUT+" I R 12550 7800 50 
F3 "RR_AUDIO_OUT+" I R 12550 8000 50 
F4 "LF_AUDIO_OUT-" I R 12550 8150 50 
F5 "RF_AUDIO_OUT-" I R 12550 8350 50 
F6 "RF_AUDIO_OUT+" I R 12550 7900 50 
F7 "RR_AUDIO_OUT-" I R 12550 8450 50 
F8 "LF_AUDIO_OUT+" I R 12550 7700 50 
F9 "LR_AUDIO_OUT-" I R 12550 8250 50 
F10 "AUDIO_STBY" I L 11000 7950 50 
F11 "AUDIO_POWER" I L 11000 7700 50 
F12 "AUDIO_MUTE" I L 11000 7850 50 
F13 "IN2" I L 11000 8200 50 
F14 "IN4" I L 11000 8400 50 
F15 "IN3" I L 11000 8300 50 
F16 "IN1" I L 11000 8100 50 
$EndSheet
Text Label 12600 7700 0    50   ~ 0
LF+
Wire Wire Line
	12600 8450 12550 8450
Wire Wire Line
	12550 8350 12600 8350
Wire Wire Line
	12600 8250 12550 8250
Wire Wire Line
	12550 8150 12600 8150
Wire Wire Line
	12600 8000 12550 8000
Wire Wire Line
	12550 7900 12600 7900
Wire Wire Line
	12600 7800 12550 7800
Wire Wire Line
	12550 7700 12600 7700
Wire Wire Line
	11000 7700 10950 7700
Wire Wire Line
	10950 7850 11000 7850
Wire Wire Line
	10950 7950 11000 7950
Text Label 10950 7700 2    50   ~ 0
BATTERY
Wire Wire Line
	5650 6800 5600 6800
Wire Wire Line
	5600 6900 5650 6900
Wire Wire Line
	4800 7700 4850 7700
Wire Wire Line
	4800 7900 4850 7900
Text Label 7400 6050 2    50   ~ 0
CURRENT_SENSE
Text Label 12450 4850 0    50   ~ 0
INSTRUMENT_SUPPLY_VOLTAGE_4
Text Label 9000 8150 0    50   ~ 0
BATTERY_VOLTAGE_SENSE
Wire Wire Line
	9000 8150 8950 8150
Wire Wire Line
	9000 8050 8950 8050
$Sheet
S 4700 5650 900  600 
U 6063934A
F0 "J1850" 50
F1 "j1850.sch" 50
F2 "3V3" I R 5600 5750 50 
F3 "J1850_TX" I R 5600 6000 50 
F4 "J1850" I L 4700 6000 50 
F5 "J1850_RX" I R 5600 5900 50 
F6 "BATTERY" I L 4700 5850 50 
$EndSheet
Text Label 5650 5750 0    50   ~ 0
3V3
Wire Wire Line
	5650 5750 5600 5750
Text Label 4650 6000 2    50   ~ 0
J1850
Wire Wire Line
	4650 6000 4700 6000
Text Label 4650 5850 2    50   ~ 0
BATTERY
Wire Wire Line
	4650 5850 4700 5850
Text Label 7600 8150 2    50   ~ 0
IGNITION
Text Label 7600 8250 2    50   ~ 0
IGNITION_SENSE
$Sheet
S 7450 4950 1400 1550
U 6077D777
F0 "Microcontroller" 50
F1 "microcontroller.sch" 50
F2 "RXD" I R 8850 5500 50 
F3 "TXD" I R 8850 5400 50 
F4 "IO5" I R 8850 5750 50 
F5 "3V3" I R 8850 5050 50 
F6 "IO4" I R 8850 6000 50 
F7 "SCL" I R 8850 6150 50 
F8 "SDA" I R 8850 6250 50 
F9 "IO33" I L 7450 5950 50 
F10 "IO32" I L 7450 5850 50 
F11 "IO18" I L 7450 5250 50 
F12 "ESP_EN" I R 8850 5150 50 
F13 "PROG" I R 8850 5250 50 
F14 "IO35" I L 7450 6150 50 
F15 "IO34" I L 7450 6050 50 
F16 "IO16" I R 8850 5900 50 
F17 "IO17" I R 8850 5650 50 
F18 "IO13" I L 7450 5050 50 
F19 "IO15" I L 7450 5150 50 
F20 "IO25" I L 7450 5550 50 
F21 "IO19" I L 7450 5350 50 
F22 "IO23" I L 7450 5450 50 
F23 "IO26" I L 7450 5650 50 
F24 "IO27" I L 7450 5750 50 
F25 "FACT" I L 7450 6300 50 
$EndSheet
Text Label 8900 5050 0    50   ~ 0
3V3
Text Label 5650 5900 0    50   ~ 0
J1850_RX
Text Label 5650 6000 0    50   ~ 0
J1850_TX
Wire Wire Line
	5600 5900 5650 5900
Wire Wire Line
	5650 6000 5600 6000
Text Label 8900 5900 0    50   ~ 0
J1850_RX
Text Label 8900 6000 0    50   ~ 0
J1850_TX
Wire Wire Line
	8850 5900 8900 5900
Wire Wire Line
	8900 6000 8850 6000
Wire Wire Line
	8900 5650 8850 5650
Wire Wire Line
	8850 5750 8900 5750
Text Label 8900 5750 0    50   ~ 0
CAN_TX
Text Label 8900 5650 0    50   ~ 0
CAN_RX
Wire Wire Line
	8900 5050 8850 5050
Text Label 8900 5150 0    50   ~ 0
ESP_EN
Wire Wire Line
	8900 5150 8850 5150
Wire Wire Line
	8900 5250 8850 5250
Text Label 8900 5250 0    50   ~ 0
PROG
Wire Wire Line
	7400 5150 7450 5150
Wire Wire Line
	7400 5250 7450 5250
Wire Wire Line
	7400 5950 7450 5950
Wire Wire Line
	7450 5850 7400 5850
Wire Wire Line
	7400 6050 7450 6050
Wire Wire Line
	7400 6150 7450 6150
Wire Wire Line
	7400 5750 7450 5750
Wire Wire Line
	7450 5650 7400 5650
Wire Wire Line
	7400 5550 7450 5550
Wire Wire Line
	7450 5450 7400 5450
Wire Wire Line
	7400 5350 7450 5350
Text Label 9000 7600 0    50   ~ 0
DISPLAY_POWER
Text Label 9000 7700 0    50   ~ 0
MAIN_POWER
Wire Wire Line
	9000 7700 8950 7700
Wire Wire Line
	8950 7600 9000 7600
Text Label 7400 5650 2    50   ~ 0
IO26
Text Label 7400 5550 2    50   ~ 0
IO25
Wire Wire Line
	7400 5050 7450 5050
$Sheet
S 4750 6700 850  550 
U 60D3331D
F0 "CANbus" 50
F1 "canbus.sch" 50
F2 "5V" I L 4750 6800 50 
F3 "CAN_RX" I L 4750 7000 50 
F4 "CAN_TX" I L 4750 7100 50 
F5 "CAN-" I R 5600 6900 50 
F6 "CAN+" I R 5600 6800 50 
$EndSheet
Wire Wire Line
	4750 7100 4700 7100
Wire Wire Line
	4700 7000 4750 7000
Text Label 4700 6800 2    50   ~ 0
5V
Wire Wire Line
	4700 6800 4750 6800
$Sheet
S 4850 7600 700  500 
U 60DDD162
F0 "USB" 50
F1 "usb.sch" 50
F2 "RXD" I R 5550 7750 50 
F3 "TXD" I R 5550 7850 50 
F4 "ESP_EN" I L 4850 7800 50 
F5 "5V" I L 4850 7700 50 
F6 "PROG" I L 4850 7900 50 
$EndSheet
Wire Wire Line
	4800 7800 4850 7800
Text Label 5600 7750 0    50   ~ 0
RXD
Text Label 5600 7850 0    50   ~ 0
TXD
Wire Wire Line
	5600 7750 5550 7750
Wire Wire Line
	5550 7850 5600 7850
Text Label 1500 2500 2    50   ~ 0
3V3
Text Label 7400 5950 2    50   ~ 0
WHEEL_CONTROLS_SIGNAL
Wire Wire Line
	1500 2500 1550 2500
Wire Wire Line
	1850 2500 1900 2500
Text Label 1800 2100 2    50   ~ 0
LOW_REF
Wire Wire Line
	1850 2100 1800 2100
$Comp
L open-dash-daughterboard-rescue:D_1N5819HW-Open_Automation D1
U 1 1 5FC75BB4
P 1700 2500
F 0 "D1" H 1550 2550 50  0000 C CNN
F 1 "D_1N5819HW" H 1700 2375 50  0000 C CNN
F 2 "Diode_SMD:D_SOD-123" H 1700 2325 50  0001 C CNN
F 3 "http://www.diodes.com/_files/datasheets/ds23022.pdf" H 1700 2500 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/diodes-incorporated/1N5819HW-7-F/1N5819HW-FDICT-ND/815283" H 1800 2700 50  0001 C CNN "Website"
F 5 "1N5819HW-7-F" H 1700 2800 50  0001 C CNN "Part Number"
F 6 "C117948" H -10250 -700 50  0001 C CNN "LCSC"
	1    1700 2500
	-1   0    0    1   
$EndComp
Text Label 1700 4050 2    50   ~ 0
5V
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 601BFAAA
P 1850 2100
AR Path="/5ABD187E/601BFAAA" Ref="#PWR?"  Part="1" 
AR Path="/601BFAAA" Ref="#PWR04"  Part="1" 
AR Path="/5A7BADB8/601BFAAA" Ref="#PWR?"  Part="1" 
F 0 "#PWR04" H 1850 1850 50  0001 C CNN
F 1 "GND" V 1800 1950 50  0000 C CNN
F 2 "" H 1850 2100 50  0001 C CNN
F 3 "" H 1850 2100 50  0001 C CNN
	1    1850 2100
	0    -1   -1   0   
$EndComp
Wire Wire Line
	7650 8250 7600 8250
Wire Wire Line
	7600 8150 7650 8150
Text Label 7600 8350 2    50   ~ 0
TRIGGER1
Text Label 7600 8450 2    50   ~ 0
SENSE1
Wire Wire Line
	7650 8450 7600 8450
Wire Wire Line
	7600 8350 7650 8350
Text Label 2300 3950 0    50   ~ 0
TXD
Wire Wire Line
	2250 3750 2300 3750
Text Label 2300 4050 0    50   ~ 0
RXD
Wire Wire Line
	1750 4350 1700 4350
Wire Wire Line
	2250 3850 2300 3850
Text Label 2300 3850 0    50   ~ 0
SCL
Text Label 2300 3750 0    50   ~ 0
SDA
Wire Wire Line
	2250 4050 2300 4050
Wire Wire Line
	2300 3950 2250 3950
Wire Wire Line
	1750 3950 1700 3950
Text Label 1700 4250 2    50   ~ 0
PROG
Wire Wire Line
	1750 4250 1700 4250
Text Label 1700 3750 2    50   ~ 0
FACT
Text Label 1700 3850 2    50   ~ 0
ESP_EN
Wire Wire Line
	1750 3850 1700 3850
Wire Wire Line
	1700 3750 1750 3750
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5FE25541
P 1650 3550
AR Path="/5ABD187E/5FE25541" Ref="#PWR?"  Part="1" 
AR Path="/5FE25541" Ref="#PWR02"  Part="1" 
AR Path="/5A7BADDB/5FE25541" Ref="#PWR?"  Part="1" 
AR Path="/6077D777/5FE25541" Ref="#PWR?"  Part="1" 
F 0 "#PWR02" H 1650 3300 50  0001 C CNN
F 1 "GND" V 1650 3350 50  0000 C CNN
F 2 "" H 1650 3550 50  0001 C CNN
F 3 "" H 1650 3550 50  0001 C CNN
	1    1650 3550
	0    1    1    0   
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5FE25547
P 1700 4350
AR Path="/5ABD187E/5FE25547" Ref="#PWR?"  Part="1" 
AR Path="/5FE25547" Ref="#PWR03"  Part="1" 
AR Path="/5A7BADDB/5FE25547" Ref="#PWR?"  Part="1" 
AR Path="/6077D777/5FE25547" Ref="#PWR?"  Part="1" 
F 0 "#PWR03" H 1700 4100 50  0001 C CNN
F 1 "GND" V 1650 4200 50  0000 C CNN
F 2 "" H 1700 4350 50  0001 C CNN
F 3 "" H 1700 4350 50  0001 C CNN
	1    1700 4350
	0    1    1    0   
$EndComp
Text Label 1700 3950 2    50   ~ 0
3V3
Wire Wire Line
	1700 4050 1750 4050
Wire Wire Line
	1700 4150 1750 4150
Wire Wire Line
	2250 4150 2300 4150
Text Label 7400 6300 2    50   ~ 0
FACT
Wire Wire Line
	7400 6300 7450 6300
Wire Wire Line
	2250 4350 2300 4350
Wire Wire Line
	2300 4250 2250 4250
Text Label 2300 4350 0    50   ~ 0
IO26
Text Label 2300 4250 0    50   ~ 0
IO25
$Comp
L open-dash-daughterboard-rescue:Conn_02x09_Odd_Even-Connector_Generic J5
U 1 1 600AFE56
P 1950 3950
F 0 "J5" H 2000 4567 50  0000 C CNN
F 1 "Conn_02x09_Odd_Even" H 2000 4476 50  0000 C CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_2x09_P2.54mm_Vertical_SMD" H 1950 3950 50  0001 C CNN
F 3 "~" H 1950 3950 50  0001 C CNN
	1    1950 3950
	1    0    0    -1  
$EndComp
Text Label 11200 5100 2    50   ~ 0
SCL
Text Label 11200 5200 2    50   ~ 0
SDA
Text Label 11200 4950 2    50   ~ 0
3V3
Text Label 12450 5000 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Text Label 12450 5200 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Text Label 12450 5100 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
Text Label 12450 5300 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Text Label 12450 5900 0    50   ~ 0
BLOWER_MOTOR
Text Label 12450 5800 0    50   ~ 0
INSIDE_AIR_TEMP_BLOWER
Text Label 12450 5600 0    50   ~ 0
RECIRCULATION_A
Text Label 12450 5400 0    50   ~ 0
MODE_A
Text Label 12450 5700 0    50   ~ 0
RECIRCULATION_B
Text Label 12450 5500 0    50   ~ 0
MODE_B
Text Label 12450 6000 0    50   ~ 0
REAR_DEFOG
Text Label 11200 4850 2    50   ~ 0
BATTERY
Text Label 12450 6100 0    50   ~ 0
OUT11
Text Label 11200 5350 2    50   ~ 0
INSIDE_AIR_TEMP
Text Label 11200 5450 2    50   ~ 0
AMBIENT_AIR_TEMP
Text Label 11200 5550 2    50   ~ 0
UPPER_RIGHT_AIR_TEMP
Text Label 11200 5650 2    50   ~ 0
UPPER_LEFT_AIR_TEMP
Text Label 11200 5750 2    50   ~ 0
LOWER_RIGHT_AIR_TEMP
Text Label 11200 5850 2    50   ~ 0
LOWER_LEFT_AIR_TEMP
Text Label 11200 5950 2    50   ~ 0
AMBIENT_LIGHT
Text Label 11200 6050 2    50   ~ 0
DRIVER_SUNLOAD
Text Label 11200 6150 2    50   ~ 0
PASSENGER_SUNLOAD
Text Label 11200 6600 2    50   ~ 0
PASSENGER_HEATED_SEAT_STATUS
Text Label 11200 6500 2    50   ~ 0
DRIVER_HEATED_SEAT_STATUS
Text Label 12450 6350 0    50   ~ 0
PASSENGER_SEAT_TEMP_CONTROL
Text Label 12450 6250 0    50   ~ 0
DRIVER_SEAT_TEMP_CONTROL
Text Label 11200 6250 2    50   ~ 0
AIN9
Text Label 11200 6350 2    50   ~ 0
AIN10
Wire Wire Line
	11200 4850 11250 4850
Wire Wire Line
	11250 4950 11200 4950
Wire Wire Line
	11200 5100 11250 5100
Wire Wire Line
	11250 5200 11200 5200
Wire Wire Line
	11200 5350 11250 5350
Wire Wire Line
	11250 5450 11200 5450
Wire Wire Line
	11200 5550 11250 5550
Wire Wire Line
	11250 5650 11200 5650
Wire Wire Line
	11200 5750 11250 5750
Wire Wire Line
	11250 5850 11200 5850
Wire Wire Line
	11200 5950 11250 5950
Wire Wire Line
	11250 6050 11200 6050
Wire Wire Line
	11200 6150 11250 6150
Wire Wire Line
	11250 6250 11200 6250
Wire Wire Line
	11200 6350 11250 6350
Wire Wire Line
	11250 6500 11200 6500
Wire Wire Line
	11200 6600 11250 6600
Wire Wire Line
	12450 6350 12400 6350
Wire Wire Line
	12400 6250 12450 6250
Wire Wire Line
	12450 6100 12400 6100
Wire Wire Line
	12400 6000 12450 6000
Wire Wire Line
	12450 5900 12400 5900
Wire Wire Line
	12400 5800 12450 5800
Wire Wire Line
	12450 5700 12400 5700
Wire Wire Line
	12400 5600 12450 5600
Wire Wire Line
	12450 5500 12400 5500
Wire Wire Line
	12400 5400 12450 5400
Wire Wire Line
	12450 5300 12400 5300
Wire Wire Line
	12400 5200 12450 5200
Wire Wire Line
	12450 5100 12400 5100
Wire Wire Line
	12400 5000 12450 5000
Wire Wire Line
	12450 4850 12400 4850
Text Label 2300 3550 0    50   ~ 0
OUT11
Text Label 2300 4150 0    50   ~ 0
AIN9
Text Label 2300 3650 0    50   ~ 0
AIN10
Wire Wire Line
	2300 3650 2250 3650
Wire Wire Line
	2300 3550 2250 3550
Text Label 1700 3650 2    50   ~ 0
5V
Wire Wire Line
	1650 3550 1750 3550
Wire Wire Line
	1700 3650 1750 3650
Text Label 7400 6150 2    50   ~ 0
BATTERY_VOLTAGE_SENSE
Text Label 1700 4150 2    50   ~ 0
BATTERY
Text Label 7400 5850 2    50   ~ 0
IGNITION_SENSE
Text Label 7400 5750 2    50   ~ 0
IGNITION
Text Label 7400 5050 2    50   ~ 0
SENSE1
Wire Wire Line
	12400 6600 12450 6600
Wire Wire Line
	12450 6500 12400 6500
Text Label 12450 6600 0    50   ~ 0
IO26
Text Label 12450 6500 0    50   ~ 0
IO25
$Sheet
S 11250 4800 1150 1850
U 601F213A
F0 "HVAC" 50
F1 "hvac.sch" 50
F2 "3V3" I L 11250 4950 50 
F3 "AIN1" I L 11250 5450 50 
F4 "AIN3" I L 11250 5650 50 
F5 "AIN4" I L 11250 5750 50 
F6 "AIN2" I L 11250 5550 50 
F7 "AIN5" I L 11250 5850 50 
F8 "AIN0" I L 11250 5350 50 
F9 "AIN6" I L 11250 5950 50 
F10 "AIN8" I L 11250 6150 50 
F11 "OUT4" I R 12400 5400 50 
F12 "OUT5" I R 12400 5500 50 
F13 "OUT7" I R 12400 5700 50 
F14 "OUT3" I R 12400 5300 50 
F15 "OUT1" I R 12400 5100 50 
F16 "OUT6" I R 12400 5600 50 
F17 "OUT2" I R 12400 5200 50 
F18 "OUT0" I R 12400 5000 50 
F19 "SDA" I L 11250 5200 50 
F20 "SCL" I L 11250 5100 50 
F21 "TRIGGER0" I L 11250 6500 50 
F22 "TRIGGER1" I L 11250 6600 50 
F23 "SUPPLY" I R 12400 4850 50 
F24 "AIN7" I L 11250 6050 50 
F25 "POWER" I L 11250 4850 50 
F26 "AIN10" I L 11250 6350 50 
F27 "AIN9" I L 11250 6250 50 
F28 "INTB" I R 12400 6600 50 
F29 "INTA" I R 12400 6500 50 
F30 "C_OUT0" I R 12400 5800 50 
F31 "C_OUT1" I R 12400 5900 50 
F32 "C_OUT2" I R 12400 6000 50 
F33 "C_OUT3" I R 12400 6100 50 
F34 "OUT9" I R 12400 6350 50 
F35 "OUT8" I R 12400 6250 50 
$EndSheet
Text Label 10950 8200 2    50   ~ 0
AUDIO_IN2
Text Label 10950 8100 2    50   ~ 0
AUDIO_IN1
Wire Wire Line
	10950 8100 11000 8100
Wire Wire Line
	10950 8200 11000 8200
Text Label 10950 8400 2    50   ~ 0
AUDIO_IN4
Text Label 10950 8300 2    50   ~ 0
AUDIO_IN3
Wire Wire Line
	10950 8300 11000 8300
Wire Wire Line
	10950 8400 11000 8400
Text Label 1900 2500 0    50   ~ 0
WHEEL_CONTROLS_SUPPLY
$Comp
L Connector:Conn_01x01_Female J1
U 1 1 62533331
P 1350 800
F 0 "J1" H 1378 826 50  0000 L CNN
F 1 "Conn_01x01_Female" H 1378 735 50  0000 L CNN
F 2 "Open_Automation:Mount_Hole" H 1378 689 50  0001 L CNN
F 3 "~" H 1350 800 50  0001 C CNN
	1    1350 800 
	1    0    0    -1  
$EndComp
$Comp
L Connector:Conn_01x01_Female J2
U 1 1 6253A5DC
P 1350 1000
F 0 "J2" H 1378 1026 50  0000 L CNN
F 1 "Conn_01x01_Female" H 1378 935 50  0000 L CNN
F 2 "Open_Automation:Mount_Hole" H 1378 889 50  0001 L CNN
F 3 "~" H 1350 1000 50  0001 C CNN
	1    1350 1000
	1    0    0    -1  
$EndComp
$Comp
L Connector:Conn_01x01_Female J3
U 1 1 62555B84
P 1350 1200
F 0 "J3" H 1378 1226 50  0000 L CNN
F 1 "Conn_01x01_Female" H 1378 1135 50  0000 L CNN
F 2 "Open_Automation:Mount_Hole" H 1378 1089 50  0001 L CNN
F 3 "~" H 1350 1200 50  0001 C CNN
	1    1350 1200
	1    0    0    -1  
$EndComp
$Comp
L Connector:Conn_01x01_Female J4
U 1 1 62555BDC
P 1350 1400
F 0 "J4" H 1378 1426 50  0000 L CNN
F 1 "Conn_01x01_Female" H 1378 1335 50  0000 L CNN
F 2 "Open_Automation:Mount_Hole" H 1378 1289 50  0001 L CNN
F 3 "~" H 1350 1400 50  0001 C CNN
	1    1350 1400
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR?
U 1 1 625E6B73
P 1100 1450
AR Path="/5A7BADB8/625E6B73" Ref="#PWR?"  Part="1" 
AR Path="/6045445B/625E6B73" Ref="#PWR?"  Part="1" 
AR Path="/625E6B73" Ref="#PWR01"  Part="1" 
F 0 "#PWR01" H 1100 1200 50  0001 C CNN
F 1 "GND" H 1150 1300 50  0000 R CNN
F 2 "" H 1100 1450 50  0001 C CNN
F 3 "" H 1100 1450 50  0001 C CNN
	1    1100 1450
	1    0    0    -1  
$EndComp
Wire Wire Line
	1100 1450 1100 1400
Wire Wire Line
	1100 1400 1150 1400
Wire Wire Line
	1150 800  1100 800 
Wire Wire Line
	1100 800  1100 1000
Connection ~ 1100 1400
Wire Wire Line
	1150 1200 1100 1200
Connection ~ 1100 1200
Wire Wire Line
	1100 1200 1100 1400
Wire Wire Line
	1150 1000 1100 1000
Connection ~ 1100 1000
Wire Wire Line
	1100 1000 1100 1200
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 63879F60
P 11050 3050
AR Path="/5ABD187E/63879F60" Ref="#PWR?"  Part="1" 
AR Path="/63879F60" Ref="#PWR016"  Part="1" 
AR Path="/5A7BADB8/63879F60" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/63879F60" Ref="#PWR?"  Part="1" 
F 0 "#PWR016" H 11050 2800 50  0001 C CNN
F 1 "GND" V 11100 2900 50  0000 C CNN
F 2 "" H 11050 3050 50  0001 C CNN
F 3 "" H 11050 3050 50  0001 C CNN
	1    11050 3050
	0    1    1    0   
$EndComp
Wire Wire Line
	11050 3050 11100 3050
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A393
P 11050 3150
AR Path="/5ABD187E/6387A393" Ref="#PWR?"  Part="1" 
AR Path="/6387A393" Ref="#PWR017"  Part="1" 
AR Path="/5A7BADB8/6387A393" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A393" Ref="#PWR?"  Part="1" 
F 0 "#PWR017" H 11050 2900 50  0001 C CNN
F 1 "GND" V 11100 3000 50  0000 C CNN
F 2 "" H 11050 3150 50  0001 C CNN
F 3 "" H 11050 3150 50  0001 C CNN
	1    11050 3150
	0    1    1    0   
$EndComp
Wire Wire Line
	11050 3150 11100 3150
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A39E
P 11650 3050
AR Path="/5ABD187E/6387A39E" Ref="#PWR?"  Part="1" 
AR Path="/6387A39E" Ref="#PWR021"  Part="1" 
AR Path="/5A7BADB8/6387A39E" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A39E" Ref="#PWR?"  Part="1" 
F 0 "#PWR021" H 11650 2800 50  0001 C CNN
F 1 "GND" V 11600 2900 50  0000 C CNN
F 2 "" H 11650 3050 50  0001 C CNN
F 3 "" H 11650 3050 50  0001 C CNN
	1    11650 3050
	0    -1   -1   0   
$EndComp
Wire Wire Line
	11650 3050 11600 3050
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A3A9
P 11650 3150
AR Path="/5ABD187E/6387A3A9" Ref="#PWR?"  Part="1" 
AR Path="/6387A3A9" Ref="#PWR022"  Part="1" 
AR Path="/5A7BADB8/6387A3A9" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A3A9" Ref="#PWR?"  Part="1" 
F 0 "#PWR022" H 11650 2900 50  0001 C CNN
F 1 "GND" V 11600 3000 50  0000 C CNN
F 2 "" H 11650 3150 50  0001 C CNN
F 3 "" H 11650 3150 50  0001 C CNN
	1    11650 3150
	0    -1   -1   0   
$EndComp
Wire Wire Line
	11650 3150 11600 3150
Text Label 11650 2950 0    50   ~ 0
BATTERY
Wire Wire Line
	11650 2950 11600 2950
Wire Wire Line
	9050 2950 9050 2850
Wire Wire Line
	9000 2950 9050 2950
Wire Wire Line
	9050 3150 9050 3050
Wire Wire Line
	9000 3150 9050 3150
Wire Wire Line
	8450 2950 8450 2850
Wire Wire Line
	8500 2950 8450 2950
Wire Wire Line
	8450 3150 8450 3050
Wire Wire Line
	8450 3150 8500 3150
Connection ~ 9050 2650
Wire Wire Line
	9050 2650 9050 2550
Wire Wire Line
	9050 2750 9050 2650
Connection ~ 9050 2350
Wire Wire Line
	9050 2350 9050 2250
Wire Wire Line
	9050 2450 9050 2350
Wire Wire Line
	9050 2050 9050 1950
Connection ~ 9050 2050
Wire Wire Line
	9000 2050 9050 2050
Wire Wire Line
	9050 2150 9050 2050
Wire Wire Line
	9000 2150 9050 2150
Wire Wire Line
	9050 1750 9050 1650
Connection ~ 9050 1750
Wire Wire Line
	9000 1750 9050 1750
Wire Wire Line
	9050 1850 9050 1750
Wire Wire Line
	9000 1650 9050 1650
Text Label 8450 2250 2    50   ~ 0
RR-
Connection ~ 8450 2350
Wire Wire Line
	8450 2350 8450 2250
Wire Wire Line
	8450 2450 8450 2350
Connection ~ 8450 2650
Wire Wire Line
	8450 2650 8450 2550
Wire Wire Line
	8450 2750 8450 2650
Text Label 9050 2550 0    50   ~ 0
RF+
Wire Wire Line
	8500 2550 8450 2550
Wire Wire Line
	8450 2450 8500 2450
Connection ~ 8450 2050
Wire Wire Line
	8450 2050 8450 1950
Wire Wire Line
	8450 2150 8450 2050
Wire Wire Line
	8450 1750 8450 1850
Connection ~ 8450 1750
Wire Wire Line
	8450 1750 8450 1650
Wire Wire Line
	8450 1950 8500 1950
Text Label 9050 1650 0    50   ~ 0
LR+
Wire Wire Line
	8450 1650 8500 1650
Text Label 8450 2550 2    50   ~ 0
RR+
Text Label 6600 3050 0    50   ~ 0
BATTERY
Wire Wire Line
	6600 3050 6550 3050
Text Label 6000 3050 2    50   ~ 0
BATTERY
Wire Wire Line
	6000 3050 6050 3050
Wire Wire Line
	6600 3250 6550 3250
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6387A3E7
P 6600 3250
AR Path="/5B15E02A/6387A3E7" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/6387A3E7" Ref="#PWR?"  Part="1" 
AR Path="/6387A3E7" Ref="#PWR09"  Part="1" 
AR Path="/62CC146C/6387A3E7" Ref="#PWR?"  Part="1" 
F 0 "#PWR09" H 6600 3000 50  0001 C CNN
F 1 "GND" V 6600 3050 50  0000 C CNN
F 2 "" H 6600 3250 50  0000 C CNN
F 3 "" H 6600 3250 50  0000 C CNN
	1    6600 3250
	0    -1   -1   0   
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6387A3F1
P 6000 3250
AR Path="/5B15E02A/6387A3F1" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/6387A3F1" Ref="#PWR?"  Part="1" 
AR Path="/6387A3F1" Ref="#PWR06"  Part="1" 
AR Path="/62CC146C/6387A3F1" Ref="#PWR?"  Part="1" 
F 0 "#PWR06" H 6000 3000 50  0001 C CNN
F 1 "GND" V 5950 3100 50  0000 C CNN
F 2 "" H 6000 3250 50  0000 C CNN
F 3 "" H 6000 3250 50  0000 C CNN
	1    6000 3250
	0    1    1    0   
$EndComp
Wire Wire Line
	6050 3250 6000 3250
Wire Wire Line
	6000 2150 6050 2150
Text Label 6000 2150 2    50   ~ 0
RECIRCULATION_A
Wire Wire Line
	6000 1950 6050 1950
Text Label 6000 1950 2    50   ~ 0
MODE_A
Wire Wire Line
	6000 1750 6050 1750
Text Label 6000 1750 2    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Wire Wire Line
	6000 1550 6050 1550
Text Label 6000 1550 2    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Wire Wire Line
	6550 2150 6600 2150
Text Label 6600 2150 0    50   ~ 0
RECIRCULATION_B
Wire Wire Line
	6550 1950 6600 1950
Text Label 6600 1950 0    50   ~ 0
MODE_B
Wire Wire Line
	6550 1750 6600 1750
Text Label 6600 1750 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Wire Wire Line
	6550 1650 6600 1650
Text Label 6600 1650 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Wire Wire Line
	6550 1550 6600 1550
Text Label 6600 1550 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A40E
P 11650 3250
AR Path="/5ABD187E/6387A40E" Ref="#PWR?"  Part="1" 
AR Path="/6387A40E" Ref="#PWR023"  Part="1" 
AR Path="/5A7BADB8/6387A40E" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A40E" Ref="#PWR?"  Part="1" 
F 0 "#PWR023" H 11650 3000 50  0001 C CNN
F 1 "GND" V 11600 3100 50  0000 C CNN
F 2 "" H 11650 3250 50  0001 C CNN
F 3 "" H 11650 3250 50  0001 C CNN
	1    11650 3250
	0    -1   -1   0   
$EndComp
Wire Wire Line
	11650 3250 11600 3250
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A419
P 11050 3250
AR Path="/5ABD187E/6387A419" Ref="#PWR?"  Part="1" 
AR Path="/6387A419" Ref="#PWR018"  Part="1" 
AR Path="/5A7BADB8/6387A419" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A419" Ref="#PWR?"  Part="1" 
F 0 "#PWR018" H 11050 3000 50  0001 C CNN
F 1 "GND" V 11100 3100 50  0000 C CNN
F 2 "" H 11050 3250 50  0001 C CNN
F 3 "" H 11050 3250 50  0001 C CNN
	1    11050 3250
	0    1    1    0   
$EndComp
Wire Wire Line
	11050 3250 11100 3250
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A424
P 9050 3250
AR Path="/5ABD187E/6387A424" Ref="#PWR?"  Part="1" 
AR Path="/6387A424" Ref="#PWR013"  Part="1" 
AR Path="/5A7BADB8/6387A424" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A424" Ref="#PWR?"  Part="1" 
F 0 "#PWR013" H 9050 3000 50  0001 C CNN
F 1 "GND" V 9100 3100 50  0000 C CNN
F 2 "" H 9050 3250 50  0001 C CNN
F 3 "" H 9050 3250 50  0001 C CNN
	1    9050 3250
	0    -1   -1   0   
$EndComp
Wire Wire Line
	9050 3250 9000 3250
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A42F
P 9050 3350
AR Path="/5ABD187E/6387A42F" Ref="#PWR?"  Part="1" 
AR Path="/6387A42F" Ref="#PWR014"  Part="1" 
AR Path="/5A7BADB8/6387A42F" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A42F" Ref="#PWR?"  Part="1" 
F 0 "#PWR014" H 9050 3100 50  0001 C CNN
F 1 "GND" V 9100 3200 50  0000 C CNN
F 2 "" H 9050 3350 50  0001 C CNN
F 3 "" H 9050 3350 50  0001 C CNN
	1    9050 3350
	0    -1   -1   0   
$EndComp
Wire Wire Line
	9050 3350 9000 3350
Text Label 8450 1450 2    50   ~ 0
BATTERY
Wire Wire Line
	8450 1450 8500 1450
Text Label 8450 1550 2    50   ~ 0
BATTERY
Wire Wire Line
	8450 1550 8500 1550
Text Label 9050 1450 0    50   ~ 0
BATTERY
Wire Wire Line
	9050 1450 9000 1450
Text Label 9050 1550 0    50   ~ 0
BATTERY
Wire Wire Line
	9050 1550 9000 1550
Text Label 9050 2250 0    50   ~ 0
RF-
Wire Wire Line
	9000 2750 9050 2750
Wire Wire Line
	8450 2350 8500 2350
Wire Wire Line
	8500 2750 8450 2750
Wire Wire Line
	9050 2550 9000 2550
Wire Wire Line
	8450 2150 8500 2150
Wire Wire Line
	9050 2350 9000 2350
Wire Wire Line
	8450 1750 8500 1750
Wire Wire Line
	9000 1850 9050 1850
Wire Wire Line
	9050 3050 9000 3050
Wire Wire Line
	9050 2850 9000 2850
Text Label 9050 2850 0    50   ~ 0
AUDIO_IN3
Text Label 9050 3050 0    50   ~ 0
AUDIO_IN4
Wire Wire Line
	8450 3050 8500 3050
Wire Wire Line
	8450 2850 8500 2850
Text Label 8450 2850 2    50   ~ 0
AUDIO_IN1
Text Label 8450 3050 2    50   ~ 0
AUDIO_IN2
Text Label 11050 2950 2    50   ~ 0
BATTERY
Wire Wire Line
	11050 2950 11100 2950
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6387A45F
P 8450 3250
AR Path="/5B15E02A/6387A45F" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/6387A45F" Ref="#PWR?"  Part="1" 
AR Path="/6387A45F" Ref="#PWR011"  Part="1" 
AR Path="/62CC146C/6387A45F" Ref="#PWR?"  Part="1" 
F 0 "#PWR011" H 8450 3000 50  0001 C CNN
F 1 "GND" V 8400 3100 50  0000 C CNN
F 2 "" H 8450 3250 50  0000 C CNN
F 3 "" H 8450 3250 50  0000 C CNN
	1    8450 3250
	0    1    1    0   
$EndComp
Wire Wire Line
	8450 3250 8500 3250
Text Label 11050 2750 2    50   ~ 0
BATTERY
Wire Wire Line
	11050 2750 11100 2750
Text Label 11650 2750 0    50   ~ 0
BATTERY
Wire Wire Line
	11650 2750 11600 2750
Text Label 6000 2950 2    50   ~ 0
IGNITION
Wire Wire Line
	6000 2950 6050 2950
Text Label 6000 2750 2    50   ~ 0
MAIN_POWER
Text Label 6000 2650 2    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	6000 2650 6050 2650
Wire Wire Line
	6000 2750 6050 2750
Wire Wire Line
	6000 2550 6050 2550
Text Label 6000 2550 2    50   ~ 0
WHEEL_CONTROLS_SIGNAL
Wire Wire Line
	11650 2650 11600 2650
Text Label 11650 2650 0    50   ~ 0
LOW_REF
Text Label 11050 2850 2    50   ~ 0
BATTERY
Wire Wire Line
	11050 2850 11100 2850
Text Label 11650 2850 0    50   ~ 0
BATTERY
Wire Wire Line
	11650 2850 11600 2850
Text Label 6000 3150 2    50   ~ 0
BATTERY
Wire Wire Line
	6000 3150 6050 3150
Text Label 6600 3150 0    50   ~ 0
BATTERY
Wire Wire Line
	6600 3150 6550 3150
Wire Wire Line
	6050 2850 6000 2850
Text Label 6600 2950 0    50   ~ 0
J1850
Text Label 6000 2850 2    50   ~ 0
CAN+
Wire Wire Line
	6600 2950 6550 2950
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A484
P 11050 3350
AR Path="/5ABD187E/6387A484" Ref="#PWR?"  Part="1" 
AR Path="/6387A484" Ref="#PWR019"  Part="1" 
AR Path="/5A7BADB8/6387A484" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A484" Ref="#PWR?"  Part="1" 
F 0 "#PWR019" H 11050 3100 50  0001 C CNN
F 1 "GND" V 11100 3200 50  0000 C CNN
F 2 "" H 11050 3350 50  0001 C CNN
F 3 "" H 11050 3350 50  0001 C CNN
	1    11050 3350
	0    1    1    0   
$EndComp
Wire Wire Line
	11050 3350 11100 3350
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A48F
P 11650 3350
AR Path="/5ABD187E/6387A48F" Ref="#PWR?"  Part="1" 
AR Path="/6387A48F" Ref="#PWR024"  Part="1" 
AR Path="/5A7BADB8/6387A48F" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A48F" Ref="#PWR?"  Part="1" 
F 0 "#PWR024" H 11650 3100 50  0001 C CNN
F 1 "GND" V 11600 3200 50  0000 C CNN
F 2 "" H 11650 3350 50  0001 C CNN
F 3 "" H 11650 3350 50  0001 C CNN
	1    11650 3350
	0    -1   -1   0   
$EndComp
Wire Wire Line
	11650 3350 11600 3350
Text Label 11650 2450 0    50   ~ 0
SENSE1
Wire Wire Line
	9000 1950 9050 1950
Wire Wire Line
	9050 2250 9000 2250
Text Label 6600 2750 0    50   ~ 0
MAIN_POWER
Text Label 6600 2650 0    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	11650 2450 11600 2450
Wire Wire Line
	6600 2650 6550 2650
Wire Wire Line
	6600 2750 6550 2750
Wire Wire Line
	8450 2250 8500 2250
Wire Wire Line
	8500 2650 8450 2650
Text Label 8450 1650 2    50   ~ 0
LF+
Text Label 9050 1950 0    50   ~ 0
LR-
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6387A4A6
P 6000 3350
AR Path="/5B15E02A/6387A4A6" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/6387A4A6" Ref="#PWR?"  Part="1" 
AR Path="/6387A4A6" Ref="#PWR07"  Part="1" 
AR Path="/62CC146C/6387A4A6" Ref="#PWR?"  Part="1" 
F 0 "#PWR07" H 6000 3100 50  0001 C CNN
F 1 "GND" V 5950 3200 50  0000 C CNN
F 2 "" H 6000 3350 50  0000 C CNN
F 3 "" H 6000 3350 50  0000 C CNN
	1    6000 3350
	0    1    1    0   
$EndComp
Text Label 11700 2350 0    50   ~ 0
TRIGGER1
Wire Wire Line
	8450 2050 8500 2050
Wire Wire Line
	8450 1850 8500 1850
Wire Wire Line
	11700 2350 11600 2350
Wire Wire Line
	6600 3350 6550 3350
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6387A4B5
P 6600 3350
AR Path="/5B15E02A/6387A4B5" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/6387A4B5" Ref="#PWR?"  Part="1" 
AR Path="/6387A4B5" Ref="#PWR010"  Part="1" 
AR Path="/62CC146C/6387A4B5" Ref="#PWR?"  Part="1" 
F 0 "#PWR010" H 6600 3100 50  0001 C CNN
F 1 "GND" V 6600 3150 50  0000 C CNN
F 2 "" H 6600 3350 50  0000 C CNN
F 3 "" H 6600 3350 50  0000 C CNN
	1    6600 3350
	0    -1   -1   0   
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6387A4BF
P 8450 3350
AR Path="/5B15E02A/6387A4BF" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/6387A4BF" Ref="#PWR?"  Part="1" 
AR Path="/6387A4BF" Ref="#PWR012"  Part="1" 
AR Path="/62CC146C/6387A4BF" Ref="#PWR?"  Part="1" 
F 0 "#PWR012" H 8450 3100 50  0001 C CNN
F 1 "GND" V 8400 3200 50  0000 C CNN
F 2 "" H 8450 3350 50  0000 C CNN
F 3 "" H 8450 3350 50  0000 C CNN
	1    8450 3350
	0    1    1    0   
$EndComp
Text Label 6600 2850 0    50   ~ 0
CAN-
Wire Wire Line
	6050 3350 6000 3350
Wire Wire Line
	8450 3350 8500 3350
Wire Wire Line
	6550 2850 6600 2850
Wire Wire Line
	9000 2650 9050 2650
Wire Wire Line
	9050 2450 9000 2450
Text Label 8450 1950 2    50   ~ 0
LF-
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A4D0
P 6600 2450
AR Path="/5ABD187E/6387A4D0" Ref="#PWR?"  Part="1" 
AR Path="/6387A4D0" Ref="#PWR08"  Part="1" 
AR Path="/5A7BADB8/6387A4D0" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A4D0" Ref="#PWR?"  Part="1" 
F 0 "#PWR08" H 6600 2200 50  0001 C CNN
F 1 "GND" V 6650 2300 50  0000 C CNN
F 2 "" H 6600 2450 50  0001 C CNN
F 3 "" H 6600 2450 50  0001 C CNN
	1    6600 2450
	0    -1   -1   0   
$EndComp
Text Label 6600 2350 0    50   ~ 0
BATTERY
Wire Wire Line
	6600 2450 6550 2450
Wire Wire Line
	6600 2350 6550 2350
Wire Wire Line
	6550 2250 6600 2250
Wire Wire Line
	6550 2050 6600 2050
Wire Wire Line
	6550 1850 6600 1850
Wire Wire Line
	6550 1450 6600 1450
Text Label 6600 1850 0    50   ~ 0
MODE_B
Text Label 6600 2050 0    50   ~ 0
RECIRCULATION_B
Text Label 6600 1450 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
Text Label 6600 2250 0    50   ~ 0
LOWER_RIGHT_AIR_TEMP
Text Label 6000 2350 2    50   ~ 0
BATTERY
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A4E6
P 6000 2450
AR Path="/5ABD187E/6387A4E6" Ref="#PWR?"  Part="1" 
AR Path="/6387A4E6" Ref="#PWR05"  Part="1" 
AR Path="/5A7BADB8/6387A4E6" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A4E6" Ref="#PWR?"  Part="1" 
F 0 "#PWR05" H 6000 2200 50  0001 C CNN
F 1 "GND" V 6000 2250 50  0000 C CNN
F 2 "" H 6000 2450 50  0001 C CNN
F 3 "" H 6000 2450 50  0001 C CNN
	1    6000 2450
	0    1    1    0   
$EndComp
Wire Wire Line
	11050 2650 11100 2650
Wire Wire Line
	6000 2450 6050 2450
Wire Wire Line
	6000 2350 6050 2350
Text Label 6000 2250 2    50   ~ 0
LOWER_LEFT_AIR_TEMP
Wire Wire Line
	6000 2250 6050 2250
Text Label 11050 2650 2    50   ~ 0
LOW_REF
Wire Wire Line
	6000 2050 6050 2050
Wire Wire Line
	6000 1850 6050 1850
Wire Wire Line
	6000 1650 6050 1650
Wire Wire Line
	6000 1450 6050 1450
Text Label 6000 1850 2    50   ~ 0
MODE_A
Text Label 6000 2050 2    50   ~ 0
RECIRCULATION_A
Text Label 6000 1650 2    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Text Label 6000 1450 2    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Text Label 11650 2250 0    50   ~ 0
BATTERY
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A509
P 11650 2550
AR Path="/5ABD187E/6387A509" Ref="#PWR?"  Part="1" 
AR Path="/6387A509" Ref="#PWR020"  Part="1" 
AR Path="/5A7BADB8/6387A509" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A509" Ref="#PWR?"  Part="1" 
F 0 "#PWR020" H 11650 2300 50  0001 C CNN
F 1 "GND" V 11650 2350 50  0000 C CNN
F 2 "" H 11650 2550 50  0001 C CNN
F 3 "" H 11650 2550 50  0001 C CNN
	1    11650 2550
	0    -1   -1   0   
$EndComp
Text Label 11650 2150 0    50   ~ 0
INSTRUMENT_SUPPLY_VOLTAGE_4
Wire Wire Line
	11650 2550 11600 2550
Wire Wire Line
	11650 2250 11600 2250
Wire Wire Line
	11650 2150 11600 2150
Wire Wire Line
	11650 2050 11600 2050
Text Label 11650 2050 0    50   ~ 0
DRIVER_SEAT_TEMP_CONTROL
Wire Wire Line
	11650 1950 11600 1950
Text Label 11650 1950 0    50   ~ 0
PASSENGER_SEAT_TEMP_CONTROL
Wire Wire Line
	11650 1850 11600 1850
Text Label 11650 1850 0    50   ~ 0
BLOWER_MOTOR
Text Label 11650 1750 0    50   ~ 0
BATTERY
Text Label 11650 1650 0    50   ~ 0
IGNITION
Text Label 11650 1550 0    50   ~ 0
DRIVER_HEATED_SEAT_STATUS
Text Label 11650 1450 0    50   ~ 0
PASSENGER_HEATED_SEAT_STATUS
Wire Wire Line
	11600 1650 11650 1650
Wire Wire Line
	11650 1750 11600 1750
Wire Wire Line
	11650 1550 11600 1550
Wire Wire Line
	11650 1450 11600 1450
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6387A525
P 11050 2550
AR Path="/5ABD187E/6387A525" Ref="#PWR?"  Part="1" 
AR Path="/6387A525" Ref="#PWR015"  Part="1" 
AR Path="/5A7BADB8/6387A525" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6387A525" Ref="#PWR?"  Part="1" 
F 0 "#PWR015" H 11050 2300 50  0001 C CNN
F 1 "GND" V 11050 2350 50  0000 C CNN
F 2 "" H 11050 2550 50  0001 C CNN
F 3 "" H 11050 2550 50  0001 C CNN
	1    11050 2550
	0    1    1    0   
$EndComp
Wire Wire Line
	11050 2550 11100 2550
Wire Wire Line
	11050 2450 11100 2450
Text Label 11050 2450 2    50   ~ 0
INSIDE_AIR_TEMP_BLOWER
Wire Wire Line
	11050 2350 11100 2350
Text Label 11050 2350 2    50   ~ 0
REAR_DEFOG
Wire Wire Line
	11050 2250 11100 2250
Text Label 11050 2250 2    50   ~ 0
UPPER_LEFT_AIR_TEMP
Wire Wire Line
	11050 2150 11100 2150
Text Label 11050 2150 2    50   ~ 0
AMBIENT_LIGHT
Wire Wire Line
	11050 2050 11100 2050
Text Label 11050 2050 2    50   ~ 0
PASSENGER_SUNLOAD
Wire Wire Line
	11050 1950 11100 1950
Text Label 11050 1950 2    50   ~ 0
DRIVER_SUNLOAD
Wire Wire Line
	11050 1850 11100 1850
Text Label 11050 1850 2    50   ~ 0
AMBIENT_AIR_TEMP
Wire Wire Line
	11050 1750 11100 1750
Text Label 11050 1750 2    50   ~ 0
LOW_REF
Wire Wire Line
	11050 1650 11100 1650
Text Label 11050 1650 2    50   ~ 0
UPPER_RIGHT_AIR_TEMP
Wire Wire Line
	11050 1550 11100 1550
Text Label 11050 1550 2    50   ~ 0
INSIDE_AIR_TEMP
Wire Wire Line
	11050 1450 11100 1450
Text Label 11050 1450 2    50   ~ 0
J1850
Text Label 6600 2550 0    50   ~ 0
WHEEL_CONTROLS_SUPPLY
Wire Wire Line
	6600 2550 6550 2550
$Sheet
S 1550 5000 900  750 
U 657571BE
F0 "Interface" 50
F1 "interface.sch" 50
$EndSheet
$Comp
L Open_Automation:Conn_IDE_40 J6
U 1 1 659B5A32
P 6250 2350
F 0 "J6" H 6300 3467 50  0000 C CNN
F 1 "Conn_IDE_40" H 6300 3376 50  0000 C CNN
F 2 "Connector_IDC:IDC-Header_2x20_P2.54mm_Vertical" H 6250 2350 50  0001 C CNN
F 3 "https://s3.amazonaws.com/catalogspreads-pdf/PAGE122%20.100%20SBH11%20SERIES%20MALE%20BOX%20HDR%20ST%20RA%20SMT.pdf" H 6250 2350 50  0001 C CNN
F 4 "SBH11-PBPC-D20-ST-BK" H 6250 2350 50  0001 C CNN "Part Number"
	1    6250 2350
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:Conn_IDE_40 J7
U 1 1 659BAB3D
P 8700 2350
F 0 "J7" H 8750 3467 50  0000 C CNN
F 1 "Conn_IDE_40" H 8750 3376 50  0000 C CNN
F 2 "Connector_IDC:IDC-Header_2x20_P2.54mm_Vertical" H 8700 2350 50  0001 C CNN
F 3 "https://s3.amazonaws.com/catalogspreads-pdf/PAGE122%20.100%20SBH11%20SERIES%20MALE%20BOX%20HDR%20ST%20RA%20SMT.pdf" H 8700 2350 50  0001 C CNN
F 4 "SBH11-PBPC-D20-ST-BK" H 8700 2350 50  0001 C CNN "Part Number"
	1    8700 2350
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:Conn_IDE_40 J8
U 1 1 659BC0F8
P 11300 2350
F 0 "J8" H 11350 3467 50  0000 C CNN
F 1 "Conn_IDE_40" H 11350 3376 50  0000 C CNN
F 2 "Connector_IDC:IDC-Header_2x20_P2.54mm_Vertical" H 11300 2350 50  0001 C CNN
F 3 "https://s3.amazonaws.com/catalogspreads-pdf/PAGE122%20.100%20SBH11%20SERIES%20MALE%20BOX%20HDR%20ST%20RA%20SMT.pdf" H 11300 2350 50  0001 C CNN
F 4 "SBH11-PBPC-D20-ST-BK" H 11300 2350 50  0001 C CNN "Part Number"
	1    11300 2350
	1    0    0    -1  
$EndComp
$EndSCHEMATC
