EESchema Schematic File Version 5
LIBS:open-dash-daughterboard-cache
EELAYER 29 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 11 9
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Wire Wire Line
	6225 3750 5925 3750
$Comp
L open-automation:GND #PWR0109
U 1 1 5B14A58A
P 3625 3200
F 0 "#PWR0109" H 3625 2950 50  0001 C CNN
F 1 "GND" H 3630 3027 50  0000 C CNN
F 2 "" H 3625 3200 50  0000 C CNN
F 3 "" H 3625 3200 50  0000 C CNN
	1    3625 3200
	1    0    0    -1  
$EndComp
Wire Wire Line
	3625 3200 3625 3150
$Comp
L open-automation:GND #PWR0110
U 1 1 5B14BBD1
P 6825 4450
F 0 "#PWR0110" H 6825 4200 50  0001 C CNN
F 1 "GND" H 6830 4277 50  0000 C CNN
F 2 "" H 6825 4450 50  0000 C CNN
F 3 "" H 6825 4450 50  0000 C CNN
	1    6825 4450
	1    0    0    -1  
$EndComp
Wire Wire Line
	6725 4350 6725 4400
Wire Wire Line
	6725 4400 6825 4400
Wire Wire Line
	6925 4400 6925 4350
Wire Wire Line
	6825 4350 6825 4400
Wire Wire Line
	6825 4400 6925 4400
Connection ~ 6825 4400
Wire Wire Line
	6825 4450 6825 4400
Text HLabel 6925 2475 1    50   Input ~ 0
3v3
Text HLabel 5925 3750 0    50   Input ~ 0
GPS_Antenna
$Comp
L open-automation:R_10k R35
U 1 1 5B16C9C4
P 7700 2750
F 0 "R35" V 7700 2700 50  0000 L CNN
F 1 "R_10k" H 7750 2800 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 7630 2750 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 7780 2750 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 7880 2850 60  0001 C CNN "Part Number"
	1    7700 2750
	1    0    0    -1  
$EndComp
Wire Wire Line
	7700 2950 7700 2900
Text HLabel 7700 2525 1    50   Input ~ 0
3v3
Wire Wire Line
	7700 2525 7700 2600
Text Label 6025 2850 0    50   ~ 0
Vout
Wire Wire Line
	6025 2850 6225 2850
Text Label 8100 3050 0    50   ~ 0
Vout
$Comp
L open-automation:R_10k R42
U 1 1 5B16D38A
P 7850 3050
F 0 "R42" V 7850 3000 50  0000 L CNN
F 1 "R_10k" V 7775 2975 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 7780 3050 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 7930 3050 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 8030 3150 60  0001 C CNN "Part Number"
	1    7850 3050
	0    1    1    0   
$EndComp
Wire Wire Line
	8100 3050 8000 3050
Text HLabel 6150 3250 0    50   Input ~ 0
SCL
Text HLabel 6150 3350 0    50   Input ~ 0
SDA
Wire Wire Line
	6150 3350 6225 3350
Wire Wire Line
	6225 3250 6150 3250
$Comp
L open-automation:CONN_01X02 RX_TX1
U 1 1 5B16E764
P 7950 3800
F 0 "RX_TX1" H 8025 3750 50  0000 L CNN
F 1 "CONN_01X02" H 7725 3650 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x02_P2.54mm_Vertical" H 7950 3800 50  0001 C CNN
F 3 "" H 7950 3800 50  0000 C CNN
	1    7950 3800
	1    0    0    -1  
$EndComp
Text Label 7750 3550 0    50   ~ 0
WAKEUP
Text Label 5925 3050 0    50   ~ 0
WAKEUP
Wire Wire Line
	5925 3050 6225 3050
Text HLabel 7900 2875 2    50   Input Italic 0
RST_GPS
Wire Wire Line
	7900 2875 7775 2875
Wire Wire Line
	7775 2875 7775 2950
Wire Wire Line
	7775 2950 7700 2950
Connection ~ 7700 2950
Text HLabel 6150 3850 0    50   Input ~ 0
3v3
Wire Wire Line
	6150 3850 6225 3850
$Comp
L open-automation:R_10k R33
U 1 1 5B1727D2
P 2050 2900
F 0 "R33" V 2050 2850 50  0000 L CNN
F 1 "R_10k" V 2125 2800 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 1980 2900 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 2130 2900 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 2230 3000 60  0001 C CNN "Part Number"
	1    2050 2900
	1    0    0    -1  
$EndComp
Wire Wire Line
	2050 3050 2050 3150
$Comp
L open-automation:R_10k R34
U 1 1 5B173FED
P 2525 2875
F 0 "R34" V 2525 2825 50  0000 L CNN
F 1 "R_10k" H 2375 3050 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 2455 2875 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 2605 2875 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 2705 2975 60  0001 C CNN "Part Number"
	1    2525 2875
	-1   0    0    1   
$EndComp
$Comp
L open-automation:GND #PWR0114
U 1 1 5B1746BB
P 2525 3100
F 0 "#PWR0114" H 2525 2850 50  0001 C CNN
F 1 "GND" H 2530 2927 50  0000 C CNN
F 2 "" H 2525 3100 50  0000 C CNN
F 3 "" H 2525 3100 50  0000 C CNN
	1    2525 3100
	1    0    0    -1  
$EndComp
Wire Wire Line
	2525 3025 2525 3100
Text Label 7725 3175 0    50   ~ 0
EN_I2C
Wire Wire Line
	7725 3175 7675 3175
Wire Wire Line
	7675 3175 7675 3150
Text Label 2525 2625 1    50   ~ 0
EN_I2C
Wire Wire Line
	6925 2550 6925 2475
Text HLabel 3650 2650 1    50   Input ~ 0
3v3
Wire Wire Line
	3650 2650 3650 2700
Wire Wire Line
	2525 2625 2525 2725
$Comp
L open-automation:GND #PWR0118
U 1 1 5B17E978
P 2050 3150
F 0 "#PWR0118" H 2050 2900 50  0001 C CNN
F 1 "GND" H 2055 2977 50  0000 C CNN
F 2 "" H 2050 3150 50  0000 C CNN
F 3 "" H 2050 3150 50  0000 C CNN
	1    2050 3150
	1    0    0    -1  
$EndComp
Text Label 7725 3275 0    50   ~ 0
ANT_SW
Wire Wire Line
	7725 3275 7675 3275
Wire Wire Line
	7675 3275 7675 3250
Text Label 2050 2675 1    50   ~ 0
ANT_SW
$Comp
L open-automation:R_10k R36
U 1 1 5B1812C6
P 7800 3650
F 0 "R36" V 7800 3600 50  0000 L CNN
F 1 "R_10k" V 7725 3575 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 7730 3650 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 7880 3650 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 7980 3750 60  0001 C CNN "Part Number"
	1    7800 3650
	0    1    1    0   
$EndComp
Wire Wire Line
	7650 3650 7625 3650
$Comp
L open-automation:GND #PWR0119
U 1 1 5B181B4D
P 8025 3650
F 0 "#PWR0119" H 8025 3400 50  0001 C CNN
F 1 "GND" V 8075 3500 50  0000 C CNN
F 2 "" H 8025 3650 50  0000 C CNN
F 3 "" H 8025 3650 50  0000 C CNN
	1    8025 3650
	0    -1   -1   0   
$EndComp
Wire Wire Line
	8025 3650 7950 3650
Wire Wire Line
	2050 2675 2050 2750
Wire Wire Line
	3650 2700 3825 2700
Wire Wire Line
	3825 2750 3825 2700
Wire Wire Line
	3825 3050 3825 3150
Wire Wire Line
	3450 3050 3450 3150
Wire Wire Line
	3450 3150 3625 3150
Connection ~ 3625 3150
Wire Wire Line
	3625 3150 3825 3150
Wire Wire Line
	3650 2700 3450 2700
Wire Wire Line
	3450 2700 3450 2750
Connection ~ 3650 2700
$Comp
L open-automation:C_0.1uF C43
U 1 1 5B27EDBD
P 3825 2900
F 0 "C43" H 3940 2946 50  0000 L CNN
F 1 "C_0.1uF" H 3940 2855 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad0.99x1.00mm_HandSolder" H 3925 3200 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 3825 2650 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 3950 3100 60  0001 C CNN "Part Number"
	1    3825 2900
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_1uF C49
U 1 1 5B2CB9BD
P 3450 2900
F 0 "C49" H 3565 2946 50  0000 L CNN
F 1 "C_1uF" H 3565 2855 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad0.99x1.00mm_HandSolder" H 3550 3200 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/CGA3E1X7R1C105M080AC/445-12540-1-ND/3954206" H 3450 2650 50  0001 C CNN
F 4 "CGA3E1X7R1C105M080AC" H 3575 3100 60  0001 C CNN "Part Number"
	1    3450 2900
	1    0    0    -1  
$EndComp
$Comp
L open-automation:A2235-H U13
U 1 1 5B1FACC9
P 7025 3150
F 0 "U13" H 6700 3600 60  0000 C CNN
F 1 "A2235-H" H 6850 2100 60  0000 C CNN
F 2 "digikey-footprints:GSM_Module_17.8x16.5mm_A2235-H" H 7225 3350 60  0001 L CNN
F 3 "https://www.digikey.com/product-detail/en/maestro-wireless-solutions/A2235-H/1530-1011-1-ND/4898055" H 7225 3450 60  0001 L CNN
F 4 "A2235-H" H 7225 3650 60  0001 L CNN "Part Number"
	1    7025 3150
	-1   0    0    -1  
$EndComp
Wire Wire Line
	7625 2950 7700 2950
Wire Wire Line
	7625 3050 7700 3050
Wire Wire Line
	7625 3750 7750 3750
Wire Wire Line
	7625 3850 7750 3850
Wire Wire Line
	7625 3550 7750 3550
Wire Wire Line
	7625 3150 7675 3150
Wire Wire Line
	7625 3250 7675 3250
$EndSCHEMATC
