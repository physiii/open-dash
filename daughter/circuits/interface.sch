EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr B 17000 11000
encoding utf-8
Sheet 14 14
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L Connector_Generic:Conn_02x08_Top_Bottom J?
U 1 1 657E0ED9
P 3200 1850
AR Path="/62CC146C/657E0ED9" Ref="J?"  Part="1" 
AR Path="/657E0ED9" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0ED9" Ref="J18"  Part="1" 
F 0 "J18" H 3250 2367 50  0000 C CNN
F 1 "C1" H 3250 2276 50  0000 C CNN
F 2 "Open_Automation:Conn_HVAC" H 3200 1850 50  0001 C CNN
F 3 "~" H 3200 1850 50  0001 C CNN
	1    3200 1850
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_02x08_Top_Bottom J?
U 1 1 657E0EDF
P 6200 1950
AR Path="/62CC146C/657E0EDF" Ref="J?"  Part="1" 
AR Path="/657E0EDF" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0EDF" Ref="J24"  Part="1" 
F 0 "J24" H 6250 2467 50  0000 C CNN
F 1 "C2" H 6250 2376 50  0000 C CNN
F 2 "Open_Automation:Conn_HVAC" H 6200 1950 50  0001 C CNN
F 3 "~" H 6200 1950 50  0001 C CNN
	1    6200 1950
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_02x08_Top_Bottom J?
U 1 1 657E0EE5
P 9700 1950
AR Path="/62CC146C/657E0EE5" Ref="J?"  Part="1" 
AR Path="/657E0EE5" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0EE5" Ref="J30"  Part="1" 
F 0 "J30" H 9750 2467 50  0000 C CNN
F 1 "C3" H 9750 2376 50  0000 C CNN
F 2 "Open_Automation:Conn_HVAC" H 9700 1950 50  0001 C CNN
F 3 "~" H 9700 1950 50  0001 C CNN
	1    9700 1950
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 657E0EEB
P 2950 1550
AR Path="/5ABD187E/657E0EEB" Ref="#PWR?"  Part="1" 
AR Path="/657E0EEB" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/657E0EEB" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0EEB" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0EEB" Ref="#PWR0121"  Part="1" 
F 0 "#PWR0121" H 2950 1300 50  0001 C CNN
F 1 "GND" V 2900 1400 50  0000 C CNN
F 2 "" H 2950 1550 50  0001 C CNN
F 3 "" H 2950 1550 50  0001 C CNN
	1    2950 1550
	0    1    1    0   
$EndComp
Wire Wire Line
	2950 1550 3000 1550
Wire Wire Line
	2950 1650 3000 1650
Text Label 2950 1650 2    50   ~ 0
J1850
Wire Wire Line
	3550 1550 3500 1550
Text Label 3550 1550 0    50   ~ 0
LOW_REF
Wire Wire Line
	2950 2250 3000 2250
Text Label 2950 2250 2    50   ~ 0
UPPER_RIGHT_AIR_TEMP
Wire Wire Line
	2950 2150 3000 2150
Text Label 2950 2150 2    50   ~ 0
INSIDE_AIR_TEMP
Wire Wire Line
	3550 2250 3500 2250
Text Label 3550 2250 0    50   ~ 0
UPPER_LEFT_AIR_TEMP
Wire Wire Line
	3550 2150 3500 2150
Text Label 3550 2150 0    50   ~ 0
AMBIENT_LIGHT
Wire Wire Line
	3550 2050 3500 2050
Text Label 3550 2050 0    50   ~ 0
PASSENGER_SUNLOAD
Wire Wire Line
	3550 1950 3500 1950
Text Label 3550 1950 0    50   ~ 0
DRIVER_SUNLOAD
Wire Wire Line
	3550 1850 3500 1850
Text Label 3550 1850 0    50   ~ 0
AMBIENT_AIR_TEMP
Wire Wire Line
	5950 1850 6000 1850
Text Label 5950 1850 2    50   ~ 0
INSIDE_AIR_TEMP_BLOWER
Wire Wire Line
	5950 1650 6000 1650
Text Label 5950 1650 2    50   ~ 0
REAR_DEFOG
Text Label 5950 2350 2    50   ~ 0
BATTERY
Text Label 5950 2250 2    50   ~ 0
IGNITION
Text Label 5950 2050 2    50   ~ 0
DRIVER_HEATED_SEAT_STATUS
Text Label 5950 1950 2    50   ~ 0
PASSENGER_HEATED_SEAT_STATUS
Wire Wire Line
	6000 2250 5950 2250
Wire Wire Line
	5950 2350 6000 2350
Wire Wire Line
	5950 2050 6000 2050
Wire Wire Line
	5950 1950 6000 1950
Text Label 6550 1650 0    50   ~ 0
INSTRUMENT_SUPPLY_VOLTAGE_4
Wire Wire Line
	6550 1650 6500 1650
Wire Wire Line
	6550 2050 6500 2050
Text Label 6550 2050 0    50   ~ 0
DRIVER_SEAT_TEMP_CONTROL
Wire Wire Line
	6550 1950 6500 1950
Text Label 6550 1950 0    50   ~ 0
PASSENGER_SEAT_TEMP_CONTROL
Wire Wire Line
	6550 1850 6500 1850
Text Label 6550 1850 0    50   ~ 0
BLOWER_MOTOR
Wire Wire Line
	9450 1850 9500 1850
Wire Wire Line
	9450 1950 9500 1950
Wire Wire Line
	9450 1750 9500 1750
Wire Wire Line
	9450 1650 9500 1650
Text Label 9450 1950 2    50   ~ 0
MODE_A
Text Label 9450 1850 2    50   ~ 0
RECIRCULATION_A
Text Label 9450 1750 2    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Text Label 9450 1650 2    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Wire Wire Line
	9450 2050 9500 2050
Text Label 9450 2050 2    50   ~ 0
LOW_REF
Text Label 9450 2150 2    50   ~ 0
LOWER_LEFT_AIR_TEMP
Wire Wire Line
	9450 2150 9500 2150
Wire Wire Line
	9450 2250 9500 2250
Text Label 9450 2250 2    50   ~ 0
LOW_REF
Wire Wire Line
	10000 1750 10050 1750
Text Label 10050 1750 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Wire Wire Line
	9500 2350 9450 2350
Wire Wire Line
	10000 1850 10050 1850
Wire Wire Line
	10000 1950 10050 1950
Wire Wire Line
	10000 1650 10050 1650
Text Label 10050 1950 0    50   ~ 0
MODE_B
Text Label 10050 1850 0    50   ~ 0
RECIRCULATION_B
Text Label 10050 1650 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
Text Label 9450 2350 2    50   ~ 0
LOWER_RIGHT_AIR_TEMP
Text Label 12550 1150 2    50   ~ 0
J1850
Wire Wire Line
	12550 1150 12600 1150
Text Label 12550 1650 2    50   ~ 0
WHEEL_CONTROLS_SUPPLY
Wire Wire Line
	12550 1650 12600 1650
Wire Wire Line
	12550 1750 12600 1750
Text Label 12550 1750 2    50   ~ 0
WHEEL_CONTROLS_SIGNAL
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E0F36
P 12550 2250
AR Path="/5B15E02A/657E0F36" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E0F36" Ref="#PWR?"  Part="1" 
AR Path="/657E0F36" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0F36" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0F36" Ref="#PWR0167"  Part="1" 
F 0 "#PWR0167" H 12550 2000 50  0001 C CNN
F 1 "GND" V 12500 2100 50  0000 C CNN
F 2 "" H 12550 2250 50  0000 C CNN
F 3 "" H 12550 2250 50  0000 C CNN
	1    12550 2250
	0    1    1    0   
$EndComp
Wire Wire Line
	12600 2250 12550 2250
$Comp
L Connector_Generic:Conn_02x12_Top_Bottom J?
U 1 1 657E0F3D
P 12800 1650
AR Path="/62CC146C/657E0F3D" Ref="J?"  Part="1" 
AR Path="/657E0F3D" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0F3D" Ref="J36"  Part="1" 
F 0 "J36" H 12850 2367 50  0000 C CNN
F 1 "STEREO" H 12850 2276 50  0000 C CNN
F 2 "Open_Automation:Conn_Stereo" H 12800 1650 50  0001 C CNN
F 3 "~" H 12800 1650 50  0001 C CNN
	1    12800 1650
	1    0    0    -1  
$EndComp
Text Label 13150 1150 0    50   ~ 0
BATTERY
Wire Wire Line
	13150 1150 13100 1150
Wire Wire Line
	13150 1850 13100 1850
Text Label 12550 1850 2    50   ~ 0
AUDIO_IN1
Wire Wire Line
	12550 1850 12600 1850
Text Label 12550 2150 2    50   ~ 0
AUDIO_IN4
Wire Wire Line
	12550 2150 12600 2150
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E0F4A
P 12550 1950
AR Path="/5B15E02A/657E0F4A" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E0F4A" Ref="#PWR?"  Part="1" 
AR Path="/657E0F4A" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0F4A" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0F4A" Ref="#PWR0165"  Part="1" 
F 0 "#PWR0165" H 12550 1700 50  0001 C CNN
F 1 "GND" V 12500 1800 50  0000 C CNN
F 2 "" H 12550 1950 50  0000 C CNN
F 3 "" H 12550 1950 50  0000 C CNN
	1    12550 1950
	0    1    1    0   
$EndComp
Wire Wire Line
	12600 1950 12550 1950
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E0F51
P 12550 2050
AR Path="/5B15E02A/657E0F51" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E0F51" Ref="#PWR?"  Part="1" 
AR Path="/657E0F51" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0F51" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0F51" Ref="#PWR0166"  Part="1" 
F 0 "#PWR0166" H 12550 1800 50  0001 C CNN
F 1 "GND" V 12500 1900 50  0000 C CNN
F 2 "" H 12550 2050 50  0000 C CNN
F 3 "" H 12550 2050 50  0000 C CNN
	1    12550 2050
	0    1    1    0   
$EndComp
Wire Wire Line
	12600 2050 12550 2050
Text Label 13150 2150 0    50   ~ 0
AUDIO_IN2
Wire Wire Line
	13150 2150 13100 2150
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E0F5A
P 13150 1950
AR Path="/5B15E02A/657E0F5A" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E0F5A" Ref="#PWR?"  Part="1" 
AR Path="/657E0F5A" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0F5A" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0F5A" Ref="#PWR0168"  Part="1" 
F 0 "#PWR0168" H 13150 1700 50  0001 C CNN
F 1 "GND" V 13100 1800 50  0000 C CNN
F 2 "" H 13150 1950 50  0000 C CNN
F 3 "" H 13150 1950 50  0000 C CNN
	1    13150 1950
	0    -1   1    0   
$EndComp
Wire Wire Line
	13100 1950 13150 1950
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E0F61
P 13150 2050
AR Path="/5B15E02A/657E0F61" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E0F61" Ref="#PWR?"  Part="1" 
AR Path="/657E0F61" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0F61" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0F61" Ref="#PWR0169"  Part="1" 
F 0 "#PWR0169" H 13150 1800 50  0001 C CNN
F 1 "GND" V 13100 1900 50  0000 C CNN
F 2 "" H 13150 2050 50  0000 C CNN
F 3 "" H 13150 2050 50  0000 C CNN
	1    13150 2050
	0    -1   1    0   
$EndComp
Wire Wire Line
	13100 2050 13150 2050
Text Label 13150 1850 0    50   ~ 0
AUDIO_IN3
$Comp
L Connector_Generic:Conn_01x08 J?
U 1 1 657E0F69
P 3050 3000
AR Path="/657E0F69" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0F69" Ref="J17"  Part="1" 
F 0 "J17" H 3000 3400 50  0000 L CNN
F 1 "Conn_01x08" H 2650 2500 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x08_P2.54mm_Vertical" H 3050 3000 50  0001 C CNN
F 3 "~" H 3050 3000 50  0001 C CNN
	1    3050 3000
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 657E0F6F
P 2800 2700
AR Path="/5ABD187E/657E0F6F" Ref="#PWR?"  Part="1" 
AR Path="/657E0F6F" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/657E0F6F" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0F6F" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0F6F" Ref="#PWR0120"  Part="1" 
F 0 "#PWR0120" H 2800 2450 50  0001 C CNN
F 1 "GND" V 2750 2550 50  0000 C CNN
F 2 "" H 2800 2700 50  0001 C CNN
F 3 "" H 2800 2700 50  0001 C CNN
	1    2800 2700
	0    1    1    0   
$EndComp
Wire Wire Line
	2800 2700 2850 2700
Wire Wire Line
	2800 2800 2850 2800
Text Label 2800 2800 2    50   ~ 0
J1850
Wire Wire Line
	3550 2700 3500 2700
Text Label 3550 2700 0    50   ~ 0
LOW_REF
Wire Wire Line
	2800 3400 2850 3400
Text Label 2800 3400 2    50   ~ 0
UPPER_RIGHT_AIR_TEMP
Wire Wire Line
	2800 3300 2850 3300
Text Label 2800 3300 2    50   ~ 0
INSIDE_AIR_TEMP
Wire Wire Line
	3550 3400 3500 3400
Text Label 3550 3400 0    50   ~ 0
UPPER_LEFT_AIR_TEMP
Wire Wire Line
	3550 3300 3500 3300
Text Label 3550 3300 0    50   ~ 0
AMBIENT_LIGHT
Wire Wire Line
	3550 3200 3500 3200
Text Label 3550 3200 0    50   ~ 0
PASSENGER_SUNLOAD
Wire Wire Line
	3550 3100 3500 3100
Text Label 3550 3100 0    50   ~ 0
DRIVER_SUNLOAD
Wire Wire Line
	3550 3000 3500 3000
Text Label 3550 3000 0    50   ~ 0
AMBIENT_AIR_TEMP
$Comp
L Connector_Generic:Conn_01x08 J?
U 1 1 657E0F88
P 3300 3000
AR Path="/657E0F88" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0F88" Ref="J19"  Part="1" 
F 0 "J19" H 3250 3400 50  0000 L CNN
F 1 "Conn_01x08" H 2900 2500 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x08_P2.54mm_Vertical" H 3300 3000 50  0001 C CNN
F 3 "~" H 3300 3000 50  0001 C CNN
	1    3300 3000
	-1   0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x08 J?
U 1 1 657E0F8E
P 6100 2900
AR Path="/657E0F8E" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0F8E" Ref="J23"  Part="1" 
F 0 "J23" H 6050 3300 50  0000 L CNN
F 1 "Conn_01x08" H 5700 2400 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x08_P2.54mm_Vertical" H 6100 2900 50  0001 C CNN
F 3 "~" H 6100 2900 50  0001 C CNN
	1    6100 2900
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x08 J?
U 1 1 657E0F94
P 6350 2900
AR Path="/657E0F94" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0F94" Ref="J25"  Part="1" 
F 0 "J25" H 6300 3300 50  0000 L CNN
F 1 "Conn_01x08" H 5950 2400 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x08_P2.54mm_Vertical" H 6350 2900 50  0001 C CNN
F 3 "~" H 6350 2900 50  0001 C CNN
	1    6350 2900
	-1   0    0    -1  
$EndComp
Text Label 6600 2600 0    50   ~ 0
INSTRUMENT_SUPPLY_VOLTAGE_4
Wire Wire Line
	6600 2600 6550 2600
Wire Wire Line
	6600 3000 6550 3000
Text Label 6600 3000 0    50   ~ 0
DRIVER_SEAT_TEMP_CONTROL
Wire Wire Line
	6600 2900 6550 2900
Text Label 6600 2900 0    50   ~ 0
PASSENGER_SEAT_TEMP_CONTROL
Wire Wire Line
	6600 2800 6550 2800
Text Label 6600 2800 0    50   ~ 0
BLOWER_MOTOR
Wire Wire Line
	5850 2800 5900 2800
Text Label 5850 2800 2    50   ~ 0
INSIDE_AIR_TEMP_BLOWER
Wire Wire Line
	5850 2600 5900 2600
Text Label 5850 2600 2    50   ~ 0
REAR_DEFOG
Text Label 5850 3300 2    50   ~ 0
BATTERY
Text Label 5850 3200 2    50   ~ 0
IGNITION
Text Label 5850 3000 2    50   ~ 0
DRIVER_HEATED_SEAT_STATUS
Text Label 5850 2900 2    50   ~ 0
PASSENGER_HEATED_SEAT_STATUS
Wire Wire Line
	5900 3200 5850 3200
Wire Wire Line
	5850 3300 5900 3300
Wire Wire Line
	5850 3000 5900 3000
Wire Wire Line
	5850 2900 5900 2900
$Comp
L Connector_Generic:Conn_01x08 J?
U 1 1 657E0FAE
P 9600 2900
AR Path="/657E0FAE" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0FAE" Ref="J29"  Part="1" 
F 0 "J29" H 9550 3300 50  0000 L CNN
F 1 "Conn_01x08" H 9200 2400 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x08_P2.54mm_Vertical" H 9600 2900 50  0001 C CNN
F 3 "~" H 9600 2900 50  0001 C CNN
	1    9600 2900
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x08 J?
U 1 1 657E0FB4
P 9850 2900
AR Path="/657E0FB4" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0FB4" Ref="J31"  Part="1" 
F 0 "J31" H 9800 3300 50  0000 L CNN
F 1 "Conn_01x08" H 9450 2400 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x08_P2.54mm_Vertical" H 9850 2900 50  0001 C CNN
F 3 "~" H 9850 2900 50  0001 C CNN
	1    9850 2900
	-1   0    0    -1  
$EndComp
Wire Wire Line
	10050 2700 10100 2700
Text Label 10100 2700 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Wire Wire Line
	10050 2800 10100 2800
Wire Wire Line
	10050 2900 10100 2900
Wire Wire Line
	10050 2600 10100 2600
Text Label 10100 2900 0    50   ~ 0
MODE_B
Text Label 10100 2800 0    50   ~ 0
RECIRCULATION_B
Text Label 10100 2600 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
Wire Wire Line
	9350 2800 9400 2800
Wire Wire Line
	9350 2900 9400 2900
Wire Wire Line
	9350 2700 9400 2700
Wire Wire Line
	9350 2600 9400 2600
Text Label 9350 2900 2    50   ~ 0
MODE_A
Text Label 9350 2800 2    50   ~ 0
RECIRCULATION_A
Text Label 9350 2700 2    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Text Label 9350 2600 2    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Wire Wire Line
	9350 3000 9400 3000
Text Label 9350 3000 2    50   ~ 0
LOW_REF
Text Label 9350 3100 2    50   ~ 0
LOWER_LEFT_AIR_TEMP
Wire Wire Line
	9350 3100 9400 3100
Wire Wire Line
	9350 3200 9400 3200
Text Label 9350 3200 2    50   ~ 0
LOW_REF
Wire Wire Line
	9400 3300 9350 3300
Text Label 9350 3300 2    50   ~ 0
LOWER_RIGHT_AIR_TEMP
$Comp
L Connector_Generic:Conn_01x12 J?
U 1 1 657E0FD2
P 12650 3050
AR Path="/657E0FD2" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0FD2" Ref="J35"  Part="1" 
F 0 "J35" H 12600 3650 50  0000 L CNN
F 1 "Conn_01x12" H 12950 2350 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x12_P2.54mm_Vertical" H 12650 3050 50  0001 C CNN
F 3 "~" H 12650 3050 50  0001 C CNN
	1    12650 3050
	1    0    0    -1  
$EndComp
Text Label 12400 2550 2    50   ~ 0
J1850
Wire Wire Line
	12400 2550 12450 2550
Text Label 12400 3050 2    50   ~ 0
WHEEL_CONTROLS_SUPPLY
Wire Wire Line
	12400 3050 12450 3050
Wire Wire Line
	12400 3150 12450 3150
Text Label 12400 3150 2    50   ~ 0
WHEEL_CONTROLS_SIGNAL
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E0FDE
P 12400 3650
AR Path="/5B15E02A/657E0FDE" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E0FDE" Ref="#PWR?"  Part="1" 
AR Path="/657E0FDE" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0FDE" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0FDE" Ref="#PWR0164"  Part="1" 
F 0 "#PWR0164" H 12400 3400 50  0001 C CNN
F 1 "GND" V 12350 3500 50  0000 C CNN
F 2 "" H 12400 3650 50  0000 C CNN
F 3 "" H 12400 3650 50  0000 C CNN
	1    12400 3650
	0    1    1    0   
$EndComp
Wire Wire Line
	12450 3650 12400 3650
Text Label 12400 3250 2    50   ~ 0
AUDIO_IN1
Wire Wire Line
	12400 3250 12450 3250
Text Label 12400 3550 2    50   ~ 0
AUDIO_IN4
Wire Wire Line
	12400 3550 12450 3550
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E0FE9
P 12400 3350
AR Path="/5B15E02A/657E0FE9" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E0FE9" Ref="#PWR?"  Part="1" 
AR Path="/657E0FE9" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0FE9" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0FE9" Ref="#PWR0162"  Part="1" 
F 0 "#PWR0162" H 12400 3100 50  0001 C CNN
F 1 "GND" V 12350 3200 50  0000 C CNN
F 2 "" H 12400 3350 50  0000 C CNN
F 3 "" H 12400 3350 50  0000 C CNN
	1    12400 3350
	0    1    1    0   
$EndComp
Wire Wire Line
	12450 3350 12400 3350
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E0FF0
P 12400 3450
AR Path="/5B15E02A/657E0FF0" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E0FF0" Ref="#PWR?"  Part="1" 
AR Path="/657E0FF0" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E0FF0" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E0FF0" Ref="#PWR0163"  Part="1" 
F 0 "#PWR0163" H 12400 3200 50  0001 C CNN
F 1 "GND" V 12350 3300 50  0000 C CNN
F 2 "" H 12400 3450 50  0000 C CNN
F 3 "" H 12400 3450 50  0000 C CNN
	1    12400 3450
	0    1    1    0   
$EndComp
Wire Wire Line
	12450 3450 12400 3450
$Comp
L Connector_Generic:Conn_01x12 J?
U 1 1 657E0FF7
P 13000 3050
AR Path="/657E0FF7" Ref="J?"  Part="1" 
AR Path="/657571BE/657E0FF7" Ref="J37"  Part="1" 
F 0 "J37" H 12950 3650 50  0000 L CNN
F 1 "Conn_01x12" H 13300 2350 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x12_P2.54mm_Vertical" H 13000 3050 50  0001 C CNN
F 3 "~" H 13000 3050 50  0001 C CNN
	1    13000 3050
	-1   0    0    -1  
$EndComp
Text Label 13250 2550 0    50   ~ 0
BATTERY
Wire Wire Line
	13250 2550 13200 2550
Wire Wire Line
	13250 3250 13200 3250
Text Label 13250 3550 0    50   ~ 0
AUDIO_IN2
Wire Wire Line
	13250 3550 13200 3550
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E1002
P 13250 3350
AR Path="/5B15E02A/657E1002" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E1002" Ref="#PWR?"  Part="1" 
AR Path="/657E1002" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E1002" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E1002" Ref="#PWR0170"  Part="1" 
F 0 "#PWR0170" H 13250 3100 50  0001 C CNN
F 1 "GND" V 13200 3200 50  0000 C CNN
F 2 "" H 13250 3350 50  0000 C CNN
F 3 "" H 13250 3350 50  0000 C CNN
	1    13250 3350
	0    -1   1    0   
$EndComp
Wire Wire Line
	13200 3350 13250 3350
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 657E1009
P 13250 3450
AR Path="/5B15E02A/657E1009" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/657E1009" Ref="#PWR?"  Part="1" 
AR Path="/657E1009" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/657E1009" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/657E1009" Ref="#PWR0171"  Part="1" 
F 0 "#PWR0171" H 13250 3200 50  0001 C CNN
F 1 "GND" V 13200 3300 50  0000 C CNN
F 2 "" H 13250 3450 50  0000 C CNN
F 3 "" H 13250 3450 50  0000 C CNN
	1    13250 3450
	0    -1   1    0   
$EndComp
Wire Wire Line
	13200 3450 13250 3450
Text Label 13250 3250 0    50   ~ 0
AUDIO_IN3
$Comp
L Connector_Generic:Conn_01x20 J?
U 1 1 657E1011
P 3850 7850
AR Path="/657E1011" Ref="J?"  Part="1" 
AR Path="/657571BE/657E1011" Ref="J20"  Part="1" 
F 0 "J20" H 3800 8850 50  0000 L CNN
F 1 "Conn_01x20" H 3450 6700 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x20_P2.54mm_Vertical" H 3850 7850 50  0001 C CNN
F 3 "~" H 3850 7850 50  0001 C CNN
	1    3850 7850
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x20 J?
U 1 1 657E1017
P 4100 7850
AR Path="/657E1017" Ref="J?"  Part="1" 
AR Path="/657571BE/657E1017" Ref="J21"  Part="1" 
F 0 "J21" H 4050 8850 50  0000 L CNN
F 1 "Conn_01x20" H 3700 6700 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x20_P2.54mm_Vertical" H 4100 7850 50  0001 C CNN
F 3 "~" H 4100 7850 50  0001 C CNN
	1    4100 7850
	-1   0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x20 J?
U 1 1 657E109F
P 8050 7850
AR Path="/657E109F" Ref="J?"  Part="1" 
AR Path="/657571BE/657E109F" Ref="J26"  Part="1" 
F 0 "J26" H 8000 8850 50  0000 L CNN
F 1 "Conn_01x20" H 7650 6700 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x20_P2.54mm_Vertical" H 8050 7850 50  0001 C CNN
F 3 "~" H 8050 7850 50  0001 C CNN
	1    8050 7850
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x20 J?
U 1 1 657E10A5
P 8300 7850
AR Path="/657E10A5" Ref="J?"  Part="1" 
AR Path="/657571BE/657E10A5" Ref="J28"  Part="1" 
F 0 "J28" H 8250 8850 50  0000 L CNN
F 1 "Conn_01x20" H 7900 6700 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x20_P2.54mm_Vertical" H 8300 7850 50  0001 C CNN
F 3 "~" H 8300 7850 50  0001 C CNN
	1    8300 7850
	-1   0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x20 J?
U 1 1 657E10AB
P 11100 7850
AR Path="/657E10AB" Ref="J?"  Part="1" 
AR Path="/657571BE/657E10AB" Ref="J33"  Part="1" 
F 0 "J33" H 11050 8900 50  0000 L CNN
F 1 "Conn_01x20" H 10700 8850 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x20_P2.54mm_Vertical" H 11100 7850 50  0001 C CNN
F 3 "~" H 11100 7850 50  0001 C CNN
	1    11100 7850
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x20 J?
U 1 1 657E10B1
P 11350 7850
AR Path="/657E10B1" Ref="J?"  Part="1" 
AR Path="/657571BE/657E10B1" Ref="J34"  Part="1" 
F 0 "J34" H 11300 8900 50  0000 L CNN
F 1 "Conn_01x20" H 10950 8850 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x20_P2.54mm_Vertical" H 11350 7850 50  0001 C CNN
F 3 "~" H 11350 7850 50  0001 C CNN
	1    11350 7850
	-1   0    0    -1  
$EndComp
$Comp
L Connector:Conn_01x01_Female J?
U 1 1 604EAA50
P 1350 800
AR Path="/604EAA50" Ref="J?"  Part="1" 
AR Path="/657571BE/604EAA50" Ref="J38"  Part="1" 
F 0 "J38" H 1378 826 50  0000 L CNN
F 1 "Conn_01x01_Female" H 1378 735 50  0000 L CNN
F 2 "Open_Automation:Mount_Hole" H 1378 689 50  0001 L CNN
F 3 "~" H 1350 800 50  0001 C CNN
	1    1350 800 
	1    0    0    -1  
$EndComp
$Comp
L Connector:Conn_01x01_Female J?
U 1 1 604EAA56
P 1350 1000
AR Path="/604EAA56" Ref="J?"  Part="1" 
AR Path="/657571BE/604EAA56" Ref="J39"  Part="1" 
F 0 "J39" H 1378 1026 50  0000 L CNN
F 1 "Conn_01x01_Female" H 1378 935 50  0000 L CNN
F 2 "Open_Automation:Mount_Hole" H 1378 889 50  0001 L CNN
F 3 "~" H 1350 1000 50  0001 C CNN
	1    1350 1000
	1    0    0    -1  
$EndComp
$Comp
L Connector:Conn_01x01_Female J?
U 1 1 604EAA5C
P 1350 1200
AR Path="/604EAA5C" Ref="J?"  Part="1" 
AR Path="/657571BE/604EAA5C" Ref="J40"  Part="1" 
F 0 "J40" H 1378 1226 50  0000 L CNN
F 1 "Conn_01x01_Female" H 1378 1135 50  0000 L CNN
F 2 "Open_Automation:Mount_Hole" H 1378 1089 50  0001 L CNN
F 3 "~" H 1350 1200 50  0001 C CNN
	1    1350 1200
	1    0    0    -1  
$EndComp
$Comp
L Connector:Conn_01x01_Female J?
U 1 1 604EAA62
P 1350 1400
AR Path="/604EAA62" Ref="J?"  Part="1" 
AR Path="/657571BE/604EAA62" Ref="J41"  Part="1" 
F 0 "J41" H 1378 1426 50  0000 L CNN
F 1 "Conn_01x01_Female" H 1378 1335 50  0000 L CNN
F 2 "Open_Automation:Mount_Hole" H 1378 1289 50  0001 L CNN
F 3 "~" H 1350 1400 50  0001 C CNN
	1    1350 1400
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR?
U 1 1 604EAA68
P 1100 1450
AR Path="/5A7BADB8/604EAA68" Ref="#PWR?"  Part="1" 
AR Path="/6045445B/604EAA68" Ref="#PWR?"  Part="1" 
AR Path="/604EAA68" Ref="#PWR?"  Part="1" 
AR Path="/657571BE/604EAA68" Ref="#PWR0172"  Part="1" 
F 0 "#PWR0172" H 1100 1200 50  0001 C CNN
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
Text Label 11000 5700 0    50   ~ 0
BATTERY
Wire Wire Line
	11000 5700 10950 5700
Text Label 7800 5300 2    50   ~ 0
RR-
Wire Wire Line
	7800 4900 7850 4900
Text Label 7800 5000 2    50   ~ 0
LR+
Wire Wire Line
	7800 4600 7850 4600
Text Label 5350 5000 2    50   ~ 0
BATTERY
Wire Wire Line
	5350 5000 5400 5000
Wire Wire Line
	5400 4500 5350 4500
Text Label 5350 4500 2    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Wire Wire Line
	5400 4300 5350 4300
Text Label 5350 4300 2    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 621C4581
P 8350 6150
AR Path="/5ABD187E/621C4581" Ref="#PWR?"  Part="1" 
AR Path="/621C4581" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/621C4581" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C4581" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 8350 5900 50  0001 C CNN
F 1 "GND" H 8350 6000 50  0000 C CNN
F 2 "" H 8350 6150 50  0001 C CNN
F 3 "" H 8350 6150 50  0001 C CNN
	1    8350 6150
	1    0    0    -1  
$EndComp
Text Label 7800 4200 2    50   ~ 0
BATTERY
Wire Wire Line
	7800 4200 7850 4200
Wire Wire Line
	7800 4300 7850 4300
Text Label 8400 4200 0    50   ~ 0
BATTERY
Wire Wire Line
	8400 4200 8350 4200
Wire Wire Line
	8400 4300 8350 4300
Text Label 7800 4900 2    50   ~ 0
RF-
Wire Wire Line
	7800 5300 7850 5300
Text Label 10400 5700 2    50   ~ 0
BATTERY
Wire Wire Line
	10400 5700 10450 5700
Text Label 10400 5500 2    50   ~ 0
BATTERY
Wire Wire Line
	10400 5500 10450 5500
Text Label 11000 5500 0    50   ~ 0
BATTERY
Wire Wire Line
	11000 5500 10950 5500
Text Label 5950 5400 0    50   ~ 0
IGNITION
Wire Wire Line
	5950 5400 5900 5400
Text Label 5350 5800 2    50   ~ 0
MAIN_POWER
Text Label 5350 5700 2    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	5350 5700 5400 5700
Wire Wire Line
	5350 5800 5400 5800
Wire Wire Line
	5350 5300 5400 5300
Text Label 5350 5300 2    50   ~ 0
WHEEL_CONTROLS_SIGNAL
Wire Wire Line
	11000 5400 10950 5400
Text Label 11000 5400 0    50   ~ 0
LOW_REF
Text Label 10400 5600 2    50   ~ 0
BATTERY
Wire Wire Line
	10400 5600 10450 5600
Text Label 11000 5600 0    50   ~ 0
BATTERY
Wire Wire Line
	11000 5600 10950 5600
Wire Wire Line
	5350 5100 5400 5100
Wire Wire Line
	5400 5500 5350 5500
Text Label 5350 5400 2    50   ~ 0
J1850
Text Label 5350 5500 2    50   ~ 0
CAN+
Wire Wire Line
	5350 5400 5400 5400
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 621C45A8
P 10950 6150
AR Path="/5ABD187E/621C45A8" Ref="#PWR?"  Part="1" 
AR Path="/621C45A8" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/621C45A8" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C45A8" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 10950 5900 50  0001 C CNN
F 1 "GND" H 10950 6000 50  0000 C CNN
F 2 "" H 10950 6150 50  0001 C CNN
F 3 "" H 10950 6150 50  0001 C CNN
	1    10950 6150
	1    0    0    -1  
$EndComp
Text Label 11000 5200 0    50   ~ 0
SENSE1
Text Label 5950 5800 0    50   ~ 0
MAIN_POWER
Text Label 5950 5700 0    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	11000 5200 10950 5200
Wire Wire Line
	5950 5700 5900 5700
Wire Wire Line
	5950 5800 5900 5800
Wire Wire Line
	7800 5200 7850 5200
Text Label 7800 4600 2    50   ~ 0
LF+
Text Label 7800 5100 2    50   ~ 0
LR-
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 621C45B7
P 5400 6150
AR Path="/5B15E02A/621C45B7" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/621C45B7" Ref="#PWR?"  Part="1" 
AR Path="/621C45B7" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C45B7" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 5400 5900 50  0001 C CNN
F 1 "GND" V 5350 6000 50  0000 C CNN
F 2 "" H 5400 6150 50  0000 C CNN
F 3 "" H 5400 6150 50  0000 C CNN
	1    5400 6150
	1    0    0    -1  
$EndComp
Text Label 11050 5100 0    50   ~ 0
TRIGGER1
Wire Wire Line
	11050 5100 10950 5100
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 621C45BF
P 5900 6150
AR Path="/5B15E02A/621C45BF" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/621C45BF" Ref="#PWR?"  Part="1" 
AR Path="/621C45BF" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C45BF" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 5900 5900 50  0001 C CNN
F 1 "GND" V 5900 5950 50  0000 C CNN
F 2 "" H 5900 6150 50  0000 C CNN
F 3 "" H 5900 6150 50  0000 C CNN
	1    5900 6150
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 621C45C5
P 7850 6150
AR Path="/5B15E02A/621C45C5" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/621C45C5" Ref="#PWR?"  Part="1" 
AR Path="/621C45C5" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C45C5" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 7850 5900 50  0001 C CNN
F 1 "GND" H 7850 6000 50  0000 C CNN
F 2 "" H 7850 6150 50  0000 C CNN
F 3 "" H 7850 6150 50  0000 C CNN
	1    7850 6150
	1    0    0    -1  
$EndComp
Text Label 5350 5600 2    50   ~ 0
CAN-
Wire Wire Line
	5400 6100 5400 6150
Wire Wire Line
	5400 5600 5350 5600
Text Label 7800 4700 2    50   ~ 0
LF-
Wire Wire Line
	5400 5200 5350 5200
Wire Wire Line
	5400 4900 5350 4900
Wire Wire Line
	5400 4700 5350 4700
Text Label 5350 4700 2    50   ~ 0
MODE_B
Text Label 5350 4900 2    50   ~ 0
RECIRCULATION_B
Text Label 5350 5200 2    50   ~ 0
LOWER_RIGHT_AIR_TEMP
Wire Wire Line
	10400 5400 10450 5400
Text Label 5950 5200 0    50   ~ 0
LOWER_LEFT_AIR_TEMP
Wire Wire Line
	5950 5200 5900 5200
Text Label 10400 5400 2    50   ~ 0
LOW_REF
Wire Wire Line
	5350 4800 5400 4800
Wire Wire Line
	5350 4600 5400 4600
Wire Wire Line
	5350 4400 5400 4400
Wire Wire Line
	5350 4200 5400 4200
Text Label 5350 4600 2    50   ~ 0
MODE_A
Text Label 5350 4800 2    50   ~ 0
RECIRCULATION_A
Text Label 5350 4400 2    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Text Label 5350 4200 2    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Text Label 11000 5000 0    50   ~ 0
BATTERY
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 621C45E2
P 11000 5300
AR Path="/5ABD187E/621C45E2" Ref="#PWR?"  Part="1" 
AR Path="/621C45E2" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/621C45E2" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C45E2" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 11000 5050 50  0001 C CNN
F 1 "GND" V 11000 5100 50  0000 C CNN
F 2 "" H 11000 5300 50  0001 C CNN
F 3 "" H 11000 5300 50  0001 C CNN
	1    11000 5300
	0    -1   -1   0   
$EndComp
Text Label 11000 4900 0    50   ~ 0
INSTRUMENT_SUPPLY_VOLTAGE_4
Wire Wire Line
	11000 5300 10950 5300
Wire Wire Line
	11000 5000 10950 5000
Wire Wire Line
	11000 4900 10950 4900
Wire Wire Line
	11000 4800 10950 4800
Text Label 11000 4800 0    50   ~ 0
DRIVER_SEAT_TEMP_CONTROL
Wire Wire Line
	11000 4700 10950 4700
Text Label 11000 4700 0    50   ~ 0
PASSENGER_SEAT_TEMP_CONTROL
Wire Wire Line
	11000 4600 10950 4600
Text Label 11000 4600 0    50   ~ 0
BLOWER_MOTOR
Text Label 11000 4500 0    50   ~ 0
BATTERY
Text Label 11000 4400 0    50   ~ 0
IGNITION
Text Label 11000 4300 0    50   ~ 0
DRIVER_HEATED_SEAT_STATUS
Text Label 11000 4200 0    50   ~ 0
PASSENGER_HEATED_SEAT_STATUS
Wire Wire Line
	10950 4400 11000 4400
Wire Wire Line
	11000 4500 10950 4500
Wire Wire Line
	11000 4300 10950 4300
Wire Wire Line
	11000 4200 10950 4200
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 621C45FA
P 10400 5300
AR Path="/5ABD187E/621C45FA" Ref="#PWR?"  Part="1" 
AR Path="/621C45FA" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/621C45FA" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C45FA" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 10400 5050 50  0001 C CNN
F 1 "GND" V 10400 5100 50  0000 C CNN
F 2 "" H 10400 5300 50  0001 C CNN
F 3 "" H 10400 5300 50  0001 C CNN
	1    10400 5300
	0    1    1    0   
$EndComp
Wire Wire Line
	10400 5300 10450 5300
Wire Wire Line
	10400 5200 10450 5200
Text Label 10400 5200 2    50   ~ 0
INSIDE_AIR_TEMP_BLOWER
Wire Wire Line
	10400 5100 10450 5100
Text Label 10400 5100 2    50   ~ 0
REAR_DEFOG
Wire Wire Line
	10400 5000 10450 5000
Text Label 10400 5000 2    50   ~ 0
UPPER_LEFT_AIR_TEMP
Wire Wire Line
	10400 4900 10450 4900
Text Label 10400 4900 2    50   ~ 0
AMBIENT_LIGHT
Wire Wire Line
	10400 4800 10450 4800
Text Label 10400 4800 2    50   ~ 0
PASSENGER_SUNLOAD
Wire Wire Line
	10400 4700 10450 4700
Text Label 10400 4700 2    50   ~ 0
DRIVER_SUNLOAD
Wire Wire Line
	10400 4600 10450 4600
Text Label 10400 4600 2    50   ~ 0
AMBIENT_AIR_TEMP
Wire Wire Line
	10400 4500 10450 4500
Text Label 10400 4500 2    50   ~ 0
LOW_REF
Wire Wire Line
	10400 4400 10450 4400
Text Label 10400 4400 2    50   ~ 0
UPPER_RIGHT_AIR_TEMP
Wire Wire Line
	10400 4300 10450 4300
Text Label 10400 4300 2    50   ~ 0
INSIDE_AIR_TEMP
Wire Wire Line
	10400 4200 10450 4200
Text Label 10400 4200 2    50   ~ 0
J1850
Text Label 5950 5300 0    50   ~ 0
WHEEL_CONTROLS_SUPPLY
Wire Wire Line
	5950 5300 5900 5300
$Comp
L Open_Automation:Conn_IDE_40 J?
U 1 1 621C461A
P 5600 5100
F 0 "J?" H 5650 6217 50  0000 C CNN
F 1 "Conn_IDE_40" H 5650 6126 50  0000 C CNN
F 2 "Connector_IDC:IDC-Header_2x20_P2.54mm_Vertical" H 5600 5100 50  0001 C CNN
F 3 "https://s3.amazonaws.com/catalogspreads-pdf/PAGE122%20.100%20SBH11%20SERIES%20MALE%20BOX%20HDR%20ST%20RA%20SMT.pdf" H 5600 5100 50  0001 C CNN
F 4 "SBH11-PBPC-D20-ST-BK" H 5600 5100 50  0001 C CNN "Part Number"
	1    5600 5100
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:Conn_IDE_40 J?
U 1 1 621C4621
P 10650 5100
F 0 "J?" H 10700 6217 50  0000 C CNN
F 1 "Conn_IDE_40" H 10700 6126 50  0000 C CNN
F 2 "Connector_IDC:IDC-Header_2x20_P2.54mm_Vertical" H 10650 5100 50  0001 C CNN
F 3 "https://s3.amazonaws.com/catalogspreads-pdf/PAGE122%20.100%20SBH11%20SERIES%20MALE%20BOX%20HDR%20ST%20RA%20SMT.pdf" H 10650 5100 50  0001 C CNN
F 4 "SBH11-PBPC-D20-ST-BK" H 10650 5100 50  0001 C CNN "Part Number"
	1    10650 5100
	1    0    0    -1  
$EndComp
Text Label 8400 5500 0    50   ~ 0
AUDIO_IN3
Text Label 8400 5400 0    50   ~ 0
AUDIO_IN4
Wire Wire Line
	8400 5600 8350 5600
Wire Wire Line
	8400 5400 8350 5400
Text Label 8400 5700 0    50   ~ 0
AUDIO_IN1
Text Label 8400 5600 0    50   ~ 0
AUDIO_IN2
Wire Wire Line
	8400 5500 8350 5500
Wire Wire Line
	8400 5700 8350 5700
$Comp
L Open_Automation:Conn_IDE_40 J?
U 1 1 621C4630
P 8050 5100
F 0 "J?" H 8100 6217 50  0000 C CNN
F 1 "Conn_IDE_40" H 8100 6126 50  0000 C CNN
F 2 "Connector_IDC:IDC-Header_2x20_P2.54mm_Vertical" H 8050 5100 50  0001 C CNN
F 3 "https://s3.amazonaws.com/catalogspreads-pdf/PAGE122%20.100%20SBH11%20SERIES%20MALE%20BOX%20HDR%20ST%20RA%20SMT.pdf" H 8050 5100 50  0001 C CNN
F 4 "SBH11-PBPC-D20-ST-BK" H 8050 5100 50  0001 C CNN "Part Number"
	1    8050 5100
	1    0    0    -1  
$EndComp
Text Label 7800 5200 2    50   ~ 0
RR+
Text Label 7800 4800 2    50   ~ 0
RF+
Wire Wire Line
	7800 4700 7850 4700
Wire Wire Line
	7800 4800 7850 4800
Wire Wire Line
	7800 5000 7850 5000
Wire Wire Line
	7800 5100 7850 5100
Wire Wire Line
	7800 5700 7850 5700
Wire Wire Line
	7800 5500 7850 5500
Text Label 7800 5600 2    50   ~ 0
AUDIO_IN2
Text Label 7800 5700 2    50   ~ 0
AUDIO_IN1
Wire Wire Line
	7800 5400 7850 5400
Wire Wire Line
	7800 5600 7850 5600
Text Label 7800 5400 2    50   ~ 0
AUDIO_IN4
Text Label 7800 5500 2    50   ~ 0
AUDIO_IN3
Wire Wire Line
	7800 4300 7800 4200
Wire Wire Line
	7850 4400 7800 4400
Wire Wire Line
	7800 4400 7800 4300
Connection ~ 7800 4300
Wire Wire Line
	7800 4400 7800 4500
Wire Wire Line
	7800 4500 7850 4500
Connection ~ 7800 4400
Wire Wire Line
	8350 4500 8400 4500
Wire Wire Line
	8400 4500 8400 4400
Wire Wire Line
	8350 4400 8400 4400
Connection ~ 8400 4400
Wire Wire Line
	8400 4400 8400 4300
Wire Wire Line
	8400 4300 8400 4200
Connection ~ 8400 4300
Text Label 8400 5300 0    50   ~ 0
RR-
Wire Wire Line
	8400 4900 8350 4900
Text Label 8400 5000 0    50   ~ 0
LR+
Wire Wire Line
	8400 4600 8350 4600
Text Label 8400 4900 0    50   ~ 0
RF-
Wire Wire Line
	8400 5300 8350 5300
Wire Wire Line
	8400 5200 8350 5200
Text Label 8400 4600 0    50   ~ 0
LF+
Text Label 8400 5100 0    50   ~ 0
LR-
Text Label 8400 4700 0    50   ~ 0
LF-
Text Label 8400 5200 0    50   ~ 0
RR+
Text Label 8400 4800 0    50   ~ 0
RF+
Wire Wire Line
	8400 4700 8350 4700
Wire Wire Line
	8400 4800 8350 4800
Wire Wire Line
	8400 5000 8350 5000
Wire Wire Line
	8400 5100 8350 5100
Wire Wire Line
	5900 4500 5950 4500
Text Label 5950 4500 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Wire Wire Line
	5900 4300 5950 4300
Text Label 5950 4300 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
Wire Wire Line
	5900 4900 5950 4900
Wire Wire Line
	5900 4700 5950 4700
Text Label 5950 4700 0    50   ~ 0
MODE_B
Text Label 5950 4900 0    50   ~ 0
RECIRCULATION_B
Wire Wire Line
	5950 4800 5900 4800
Wire Wire Line
	5950 4600 5900 4600
Wire Wire Line
	5950 4400 5900 4400
Wire Wire Line
	5950 4200 5900 4200
Text Label 5950 4600 0    50   ~ 0
MODE_A
Text Label 5950 4800 0    50   ~ 0
RECIRCULATION_A
Text Label 5950 4400 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Text Label 5950 4200 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Wire Wire Line
	5400 6000 5400 6100
Connection ~ 5400 6100
Wire Wire Line
	5900 6150 5900 6100
Wire Wire Line
	5900 6100 5900 6000
Connection ~ 5900 6100
Wire Wire Line
	5350 5100 5350 5000
Text Label 5950 5000 0    50   ~ 0
BATTERY
Wire Wire Line
	5950 5000 5900 5000
Wire Wire Line
	5950 5100 5900 5100
Wire Wire Line
	5950 5100 5950 5000
Wire Wire Line
	5400 5900 5400 6000
Connection ~ 5400 6000
Wire Wire Line
	5900 5900 5900 6000
Connection ~ 5900 6000
Text Label 5950 5500 0    50   ~ 0
BATTERY
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 621C4681
P 5950 5600
AR Path="/5B15E02A/621C4681" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/621C4681" Ref="#PWR?"  Part="1" 
AR Path="/621C4681" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C4681" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 5950 5350 50  0001 C CNN
F 1 "GND" V 6000 5450 50  0000 C CNN
F 2 "" H 5950 5600 50  0000 C CNN
F 3 "" H 5950 5600 50  0000 C CNN
	1    5950 5600
	0    -1   -1   0   
$EndComp
Wire Wire Line
	5950 5600 5900 5600
Wire Wire Line
	5900 5500 5950 5500
Wire Wire Line
	10950 5800 10950 5900
Wire Wire Line
	10950 5900 10950 6000
Connection ~ 10950 5900
Wire Wire Line
	10950 6100 10950 6000
Connection ~ 10950 6000
Wire Wire Line
	10950 6100 10950 6150
Connection ~ 10950 6100
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 621C4690
P 10450 6150
AR Path="/5ABD187E/621C4690" Ref="#PWR?"  Part="1" 
AR Path="/621C4690" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/621C4690" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/621C4690" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 10450 5900 50  0001 C CNN
F 1 "GND" H 10450 6000 50  0000 C CNN
F 2 "" H 10450 6150 50  0001 C CNN
F 3 "" H 10450 6150 50  0001 C CNN
	1    10450 6150
	1    0    0    -1  
$EndComp
Wire Wire Line
	10450 5800 10450 5900
Wire Wire Line
	10450 5900 10450 6000
Connection ~ 10450 5900
Wire Wire Line
	10450 6100 10450 6000
Connection ~ 10450 6000
Wire Wire Line
	10450 6100 10450 6150
Connection ~ 10450 6100
Wire Wire Line
	7850 6150 7850 6100
Wire Wire Line
	7850 6000 7850 6100
Connection ~ 7850 6100
Wire Wire Line
	7850 6000 7850 5900
Connection ~ 7850 6000
Wire Wire Line
	7850 5900 7850 5800
Connection ~ 7850 5900
Wire Wire Line
	8350 6100 8350 6150
Wire Wire Line
	8350 5800 8350 5900
Wire Wire Line
	8350 5900 8350 6000
Connection ~ 8350 5900
Wire Wire Line
	8350 6000 8350 6100
Connection ~ 8350 6000
Connection ~ 8350 6100
Text Label 3600 7750 2    50   ~ 0
BATTERY
Wire Wire Line
	3600 7750 3650 7750
Wire Wire Line
	3650 7250 3600 7250
Text Label 3600 7250 2    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Wire Wire Line
	3650 7050 3600 7050
Text Label 3600 7050 2    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
Text Label 3600 8550 2    50   ~ 0
MAIN_POWER
Text Label 3600 8450 2    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	3600 8450 3650 8450
Wire Wire Line
	3600 8550 3650 8550
Wire Wire Line
	3600 8050 3650 8050
Text Label 3600 8050 2    50   ~ 0
WHEEL_CONTROLS_SIGNAL
Wire Wire Line
	3600 7850 3650 7850
Wire Wire Line
	3650 8250 3600 8250
Text Label 3600 8150 2    50   ~ 0
J1850
Text Label 3600 8250 2    50   ~ 0
CAN+
Wire Wire Line
	3600 8150 3650 8150
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6228785A
P 3650 8900
AR Path="/5B15E02A/6228785A" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/6228785A" Ref="#PWR?"  Part="1" 
AR Path="/6228785A" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6228785A" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 3650 8650 50  0001 C CNN
F 1 "GND" V 3600 8750 50  0000 C CNN
F 2 "" H 3650 8900 50  0000 C CNN
F 3 "" H 3650 8900 50  0000 C CNN
	1    3650 8900
	1    0    0    -1  
$EndComp
Text Label 3600 8350 2    50   ~ 0
CAN-
Wire Wire Line
	3650 8350 3600 8350
Wire Wire Line
	3650 7950 3600 7950
Wire Wire Line
	3650 7650 3600 7650
Wire Wire Line
	3650 7450 3600 7450
Text Label 3600 7450 2    50   ~ 0
MODE_B
Text Label 3600 7650 2    50   ~ 0
RECIRCULATION_B
Text Label 3600 7950 2    50   ~ 0
LOWER_RIGHT_AIR_TEMP
Wire Wire Line
	3600 7550 3650 7550
Wire Wire Line
	3600 7350 3650 7350
Wire Wire Line
	3600 7150 3650 7150
Wire Wire Line
	3600 6950 3650 6950
Text Label 3600 7350 2    50   ~ 0
MODE_A
Text Label 3600 7550 2    50   ~ 0
RECIRCULATION_A
Text Label 3600 7150 2    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Text Label 3600 6950 2    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Wire Wire Line
	3600 7850 3600 7750
Wire Wire Line
	3650 8650 3650 8750
Wire Wire Line
	3650 8750 3650 8850
Connection ~ 3650 8750
Wire Wire Line
	3650 8850 3650 8900
Connection ~ 3650 8850
Text Label 4350 8150 0    50   ~ 0
IGNITION
Wire Wire Line
	4350 8150 4300 8150
Text Label 4350 8550 0    50   ~ 0
MAIN_POWER
Text Label 4350 8450 0    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	4350 8450 4300 8450
Wire Wire Line
	4350 8550 4300 8550
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 623A8C21
P 4300 8900
AR Path="/5B15E02A/623A8C21" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/623A8C21" Ref="#PWR?"  Part="1" 
AR Path="/623A8C21" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/623A8C21" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 4300 8650 50  0001 C CNN
F 1 "GND" V 4300 8700 50  0000 C CNN
F 2 "" H 4300 8900 50  0000 C CNN
F 3 "" H 4300 8900 50  0000 C CNN
	1    4300 8900
	1    0    0    -1  
$EndComp
Text Label 4350 7950 0    50   ~ 0
LOWER_LEFT_AIR_TEMP
Wire Wire Line
	4350 7950 4300 7950
Text Label 4350 8050 0    50   ~ 0
WHEEL_CONTROLS_SUPPLY
Wire Wire Line
	4350 8050 4300 8050
Wire Wire Line
	4300 7250 4350 7250
Text Label 4350 7250 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_B
Wire Wire Line
	4300 7050 4350 7050
Text Label 4350 7050 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_B
Wire Wire Line
	4300 7650 4350 7650
Wire Wire Line
	4300 7450 4350 7450
Text Label 4350 7450 0    50   ~ 0
MODE_B
Text Label 4350 7650 0    50   ~ 0
RECIRCULATION_B
Wire Wire Line
	4350 7550 4300 7550
Wire Wire Line
	4350 7350 4300 7350
Wire Wire Line
	4350 7150 4300 7150
Wire Wire Line
	4350 6950 4300 6950
Text Label 4350 7350 0    50   ~ 0
MODE_A
Text Label 4350 7550 0    50   ~ 0
RECIRCULATION_A
Text Label 4350 7150 0    50   ~ 0
RIGHT_AIR_TEMP_CONTROL_A
Text Label 4350 6950 0    50   ~ 0
LEFT_AIR_TEMP_CONTROL_A
Text Label 4350 7750 0    50   ~ 0
BATTERY
Wire Wire Line
	4350 7750 4300 7750
Wire Wire Line
	4350 7850 4300 7850
Wire Wire Line
	4350 7850 4350 7750
Text Label 4350 8250 0    50   ~ 0
BATTERY
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 623A8C40
P 4350 8350
AR Path="/5B15E02A/623A8C40" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/623A8C40" Ref="#PWR?"  Part="1" 
AR Path="/623A8C40" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/623A8C40" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 4350 8100 50  0001 C CNN
F 1 "GND" V 4400 8200 50  0000 C CNN
F 2 "" H 4350 8350 50  0000 C CNN
F 3 "" H 4350 8350 50  0000 C CNN
	1    4350 8350
	0    -1   -1   0   
$EndComp
Wire Wire Line
	4350 8350 4300 8350
Wire Wire Line
	4300 8250 4350 8250
Wire Wire Line
	4300 8900 4300 8850
Wire Wire Line
	4300 8750 4300 8850
Connection ~ 4300 8850
Wire Wire Line
	4300 8650 4300 8750
Connection ~ 4300 8750
Text Label 11600 8450 0    50   ~ 0
BATTERY
Wire Wire Line
	11600 8450 11550 8450
Text Label 10850 8450 2    50   ~ 0
BATTERY
Wire Wire Line
	10850 8450 10900 8450
Text Label 10850 8250 2    50   ~ 0
BATTERY
Wire Wire Line
	10850 8250 10900 8250
Text Label 11600 8250 0    50   ~ 0
BATTERY
Wire Wire Line
	11600 8250 11550 8250
Wire Wire Line
	11600 8150 11550 8150
Text Label 11600 8150 0    50   ~ 0
LOW_REF
Text Label 10850 8350 2    50   ~ 0
BATTERY
Wire Wire Line
	10850 8350 10900 8350
Text Label 11600 8350 0    50   ~ 0
BATTERY
Wire Wire Line
	11600 8350 11550 8350
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6259E53D
P 11550 8900
AR Path="/5ABD187E/6259E53D" Ref="#PWR?"  Part="1" 
AR Path="/6259E53D" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/6259E53D" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6259E53D" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 11550 8650 50  0001 C CNN
F 1 "GND" H 11550 8750 50  0000 C CNN
F 2 "" H 11550 8900 50  0001 C CNN
F 3 "" H 11550 8900 50  0001 C CNN
	1    11550 8900
	1    0    0    -1  
$EndComp
Text Label 11600 7950 0    50   ~ 0
SENSE1
Wire Wire Line
	11600 7950 11550 7950
Text Label 11650 7850 0    50   ~ 0
TRIGGER1
Wire Wire Line
	11650 7850 11550 7850
Wire Wire Line
	10850 8150 10900 8150
Text Label 10850 8150 2    50   ~ 0
LOW_REF
Text Label 11600 7750 0    50   ~ 0
BATTERY
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6259E54E
P 11600 8050
AR Path="/5ABD187E/6259E54E" Ref="#PWR?"  Part="1" 
AR Path="/6259E54E" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/6259E54E" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6259E54E" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 11600 7800 50  0001 C CNN
F 1 "GND" V 11600 7850 50  0000 C CNN
F 2 "" H 11600 8050 50  0001 C CNN
F 3 "" H 11600 8050 50  0001 C CNN
	1    11600 8050
	0    -1   -1   0   
$EndComp
Text Label 11600 7650 0    50   ~ 0
INSTRUMENT_SUPPLY_VOLTAGE_4
Wire Wire Line
	11600 8050 11550 8050
Wire Wire Line
	11600 7750 11550 7750
Wire Wire Line
	11600 7650 11550 7650
Wire Wire Line
	11600 7550 11550 7550
Text Label 11600 7550 0    50   ~ 0
DRIVER_SEAT_TEMP_CONTROL
Wire Wire Line
	11600 7450 11550 7450
Text Label 11600 7450 0    50   ~ 0
PASSENGER_SEAT_TEMP_CONTROL
Wire Wire Line
	11600 7350 11550 7350
Text Label 11600 7350 0    50   ~ 0
BLOWER_MOTOR
Text Label 11600 7250 0    50   ~ 0
BATTERY
Text Label 11600 7150 0    50   ~ 0
IGNITION
Text Label 11600 7050 0    50   ~ 0
DRIVER_HEATED_SEAT_STATUS
Text Label 11600 6950 0    50   ~ 0
PASSENGER_HEATED_SEAT_STATUS
Wire Wire Line
	11550 7150 11600 7150
Wire Wire Line
	11600 7250 11550 7250
Wire Wire Line
	11600 7050 11550 7050
Wire Wire Line
	11600 6950 11550 6950
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6259E56A
P 10850 8050
AR Path="/5ABD187E/6259E56A" Ref="#PWR?"  Part="1" 
AR Path="/6259E56A" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/6259E56A" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6259E56A" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 10850 7800 50  0001 C CNN
F 1 "GND" V 10850 7850 50  0000 C CNN
F 2 "" H 10850 8050 50  0001 C CNN
F 3 "" H 10850 8050 50  0001 C CNN
	1    10850 8050
	0    1    1    0   
$EndComp
Wire Wire Line
	10850 8050 10900 8050
Wire Wire Line
	10850 7950 10900 7950
Text Label 10850 7950 2    50   ~ 0
INSIDE_AIR_TEMP_BLOWER
Wire Wire Line
	10850 7850 10900 7850
Text Label 10850 7850 2    50   ~ 0
REAR_DEFOG
Wire Wire Line
	10850 7750 10900 7750
Text Label 10850 7750 2    50   ~ 0
UPPER_LEFT_AIR_TEMP
Wire Wire Line
	10850 7650 10900 7650
Text Label 10850 7650 2    50   ~ 0
AMBIENT_LIGHT
Wire Wire Line
	10850 7550 10900 7550
Text Label 10850 7550 2    50   ~ 0
PASSENGER_SUNLOAD
Wire Wire Line
	10850 7450 10900 7450
Text Label 10850 7450 2    50   ~ 0
DRIVER_SUNLOAD
Wire Wire Line
	10850 7350 10900 7350
Text Label 10850 7350 2    50   ~ 0
AMBIENT_AIR_TEMP
Wire Wire Line
	10850 7250 10900 7250
Text Label 10850 7250 2    50   ~ 0
LOW_REF
Wire Wire Line
	10850 7150 10900 7150
Text Label 10850 7150 2    50   ~ 0
UPPER_RIGHT_AIR_TEMP
Wire Wire Line
	10850 7050 10900 7050
Text Label 10850 7050 2    50   ~ 0
INSIDE_AIR_TEMP
Wire Wire Line
	10850 6950 10900 6950
Text Label 10850 6950 2    50   ~ 0
J1850
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6259E59D
P 10900 8900
AR Path="/5ABD187E/6259E59D" Ref="#PWR?"  Part="1" 
AR Path="/6259E59D" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/6259E59D" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6259E59D" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 10900 8650 50  0001 C CNN
F 1 "GND" H 10900 8750 50  0000 C CNN
F 2 "" H 10900 8900 50  0001 C CNN
F 3 "" H 10900 8900 50  0001 C CNN
	1    10900 8900
	1    0    0    -1  
$EndComp
Wire Wire Line
	10900 8550 10900 8650
Wire Wire Line
	11550 8550 11550 8650
Connection ~ 10900 8650
Wire Wire Line
	10900 8650 10900 8750
Connection ~ 10900 8750
Wire Wire Line
	10900 8750 10900 8850
Connection ~ 10900 8850
Wire Wire Line
	10900 8850 10900 8900
Connection ~ 11550 8650
Wire Wire Line
	11550 8650 11550 8750
Connection ~ 11550 8750
Wire Wire Line
	11550 8750 11550 8850
Connection ~ 11550 8850
Wire Wire Line
	11550 8850 11550 8900
Text Label 7800 8050 2    50   ~ 0
RR-
Wire Wire Line
	7800 7650 7850 7650
Text Label 7800 7750 2    50   ~ 0
LR+
Wire Wire Line
	7800 7350 7850 7350
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 6263B2DA
P 8500 8900
AR Path="/5ABD187E/6263B2DA" Ref="#PWR?"  Part="1" 
AR Path="/6263B2DA" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/6263B2DA" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6263B2DA" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 8500 8650 50  0001 C CNN
F 1 "GND" H 8500 8750 50  0000 C CNN
F 2 "" H 8500 8900 50  0001 C CNN
F 3 "" H 8500 8900 50  0001 C CNN
	1    8500 8900
	1    0    0    -1  
$EndComp
Text Label 7800 6950 2    50   ~ 0
BATTERY
Wire Wire Line
	7800 6950 7850 6950
Wire Wire Line
	7800 7050 7850 7050
Text Label 8550 6950 0    50   ~ 0
BATTERY
Wire Wire Line
	8550 6950 8500 6950
Wire Wire Line
	8550 7050 8500 7050
Text Label 7800 7650 2    50   ~ 0
RF-
Wire Wire Line
	7800 8050 7850 8050
Wire Wire Line
	7800 7950 7850 7950
Text Label 7800 7350 2    50   ~ 0
LF+
Text Label 7800 7850 2    50   ~ 0
LR-
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6263B2EF
P 7850 8900
AR Path="/5B15E02A/6263B2EF" Ref="#PWR?"  Part="1" 
AR Path="/5C04BFCE/6263B2EF" Ref="#PWR?"  Part="1" 
AR Path="/6263B2EF" Ref="#PWR?"  Part="1" 
AR Path="/62CC146C/6263B2EF" Ref="#PWR?"  Part="1" 
F 0 "#PWR?" H 7850 8650 50  0001 C CNN
F 1 "GND" H 7850 8750 50  0000 C CNN
F 2 "" H 7850 8900 50  0000 C CNN
F 3 "" H 7850 8900 50  0000 C CNN
	1    7850 8900
	1    0    0    -1  
$EndComp
Text Label 7800 7450 2    50   ~ 0
LF-
Text Label 8550 8250 0    50   ~ 0
AUDIO_IN3
Text Label 8550 8150 0    50   ~ 0
AUDIO_IN4
Wire Wire Line
	8550 8350 8500 8350
Wire Wire Line
	8550 8150 8500 8150
Text Label 8550 8450 0    50   ~ 0
AUDIO_IN1
Text Label 8550 8350 0    50   ~ 0
AUDIO_IN2
Wire Wire Line
	8550 8250 8500 8250
Wire Wire Line
	8550 8450 8500 8450
Text Label 7800 7950 2    50   ~ 0
RR+
Text Label 7800 7550 2    50   ~ 0
RF+
Wire Wire Line
	7800 7450 7850 7450
Wire Wire Line
	7800 7550 7850 7550
Wire Wire Line
	7800 7750 7850 7750
Wire Wire Line
	7800 7850 7850 7850
Wire Wire Line
	7800 8450 7850 8450
Wire Wire Line
	7800 8250 7850 8250
Text Label 7800 8350 2    50   ~ 0
AUDIO_IN2
Text Label 7800 8450 2    50   ~ 0
AUDIO_IN1
Wire Wire Line
	7800 8150 7850 8150
Wire Wire Line
	7800 8350 7850 8350
Text Label 7800 8150 2    50   ~ 0
AUDIO_IN4
Text Label 7800 8250 2    50   ~ 0
AUDIO_IN3
Wire Wire Line
	7800 7050 7800 6950
Wire Wire Line
	7850 7150 7800 7150
Wire Wire Line
	7800 7150 7800 7050
Connection ~ 7800 7050
Wire Wire Line
	7800 7150 7800 7250
Wire Wire Line
	7800 7250 7850 7250
Connection ~ 7800 7150
Wire Wire Line
	8500 7250 8550 7250
Wire Wire Line
	8550 7250 8550 7150
Wire Wire Line
	8500 7150 8550 7150
Connection ~ 8550 7150
Wire Wire Line
	8550 7150 8550 7050
Wire Wire Line
	8550 7050 8550 6950
Connection ~ 8550 7050
Text Label 8550 8050 0    50   ~ 0
RR-
Wire Wire Line
	8550 7650 8500 7650
Text Label 8550 7750 0    50   ~ 0
LR+
Wire Wire Line
	8550 7350 8500 7350
Text Label 8550 7650 0    50   ~ 0
RF-
Wire Wire Line
	8550 8050 8500 8050
Wire Wire Line
	8550 7950 8500 7950
Text Label 8550 7350 0    50   ~ 0
LF+
Text Label 8550 7850 0    50   ~ 0
LR-
Text Label 8550 7450 0    50   ~ 0
LF-
Text Label 8550 7950 0    50   ~ 0
RR+
Text Label 8550 7550 0    50   ~ 0
RF+
Wire Wire Line
	8550 7450 8500 7450
Wire Wire Line
	8550 7550 8500 7550
Wire Wire Line
	8550 7750 8500 7750
Wire Wire Line
	8550 7850 8500 7850
Wire Wire Line
	7850 8550 7850 8650
Wire Wire Line
	8500 8550 8500 8650
Connection ~ 7850 8650
Wire Wire Line
	7850 8650 7850 8750
Connection ~ 7850 8750
Wire Wire Line
	7850 8750 7850 8850
Connection ~ 7850 8850
Wire Wire Line
	7850 8850 7850 8900
Connection ~ 8500 8650
Wire Wire Line
	8500 8650 8500 8750
Connection ~ 8500 8750
Wire Wire Line
	8500 8750 8500 8850
Connection ~ 8500 8850
Wire Wire Line
	8500 8850 8500 8900
$EndSCHEMATC
