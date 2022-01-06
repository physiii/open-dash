EESchema Schematic File Version 4
LIBS:open-dash-daughterboard-cache
EELAYER 26 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 12 13
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
L open-automation:GND #PWR065
U 1 1 5B1292AC
P 5400 3000
F 0 "#PWR065" H 5400 2750 50  0001 C CNN
F 1 "GND" H 5400 2850 50  0000 C CNN
F 2 "" H 5400 3000 50  0000 C CNN
F 3 "" H 5400 3000 50  0000 C CNN
	1    5400 3000
	-1   0    0    1   
$EndComp
$Comp
L open-automation:GND #PWR066
U 1 1 5B1292AD
P 6000 3000
F 0 "#PWR066" H 6000 2750 50  0001 C CNN
F 1 "GND" H 6000 2850 50  0000 C CNN
F 2 "" H 6000 3000 50  0000 C CNN
F 3 "" H 6000 3000 50  0000 C CNN
	1    6000 3000
	-1   0    0    1   
$EndComp
Text Label 4200 1025 0    197  ~ 0
mainboard-interface
Wire Wire Line
	6000 3050 6000 3000
Wire Wire Line
	5950 3050 6000 3050
Wire Wire Line
	5400 3050 5450 3050
Wire Wire Line
	5400 3000 5400 3050
Wire Wire Line
	5950 3150 6050 3150
Wire Wire Line
	6050 3350 5950 3350
Wire Wire Line
	5950 3250 6050 3250
Wire Wire Line
	5350 3150 5450 3150
Wire Wire Line
	5350 3350 5450 3350
Wire Wire Line
	5350 3250 5450 3250
Wire Wire Line
	5350 3450 5450 3450
Wire Wire Line
	5950 3450 6050 3450
Text HLabel 5350 3150 0    60   Input ~ 0
3v3
Text HLabel 5350 3250 0    60   Input ~ 0
PROG
Text HLabel 5350 3350 0    60   Input ~ 0
FACTORY
Text HLabel 5350 3450 0    60   Input ~ 0
SCL
Text HLabel 6050 3150 2    60   Input ~ 0
5V
Text HLabel 6050 3250 2    60   Input ~ 0
TXD
Text HLabel 6050 3350 2    60   Input ~ 0
RXD
Text HLabel 6050 3450 2    60   Input ~ 0
SDA
$Comp
L Connector_Generic:Conn_02x06_Odd_Even J3
U 1 1 5B1292AE
P 5650 3250
F 0 "J3" H 5700 3667 50  0000 C CNN
F 1 "Conn_02x06_Odd_Even" H 5700 2800 50  0000 C CNN
F 2 "" H 5650 3250 50  0001 C CNN
F 3 "~" H 5650 3250 50  0001 C CNN
	1    5650 3250
	1    0    0    -1  
$EndComp
Text HLabel 5325 3550 0    50   Output ~ 0
SOFT_POWER
Wire Wire Line
	5325 3550 5450 3550
Text HLabel 3650 3450 2    50   Output ~ 0
SOFT_POWER
Text HLabel 3550 2975 1    60   Input ~ 0
3v3
$Comp
L open-automation:R_10k R37
U 1 1 5B1292AF
P 3550 3200
F 0 "R37" H 3620 3246 50  0000 L CNN
F 1 "R_10k" H 3620 3155 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 3480 3200 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 3630 3200 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 3730 3300 60  0001 C CNN "Part Number"
	1    3550 3200
	1    0    0    -1  
$EndComp
Wire Wire Line
	3550 2975 3550 3050
Wire Wire Line
	3550 3350 3550 3450
Wire Wire Line
	3550 3450 3650 3450
$EndSCHEMATC
