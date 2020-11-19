EESchema Schematic File Version 4
LIBS:open-dash-daughterboard-cache
EELAYER 29 0
EELAYER END
$Descr USLetter 11000 8500
encoding utf-8
Sheet 2 7
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Text HLabel 1500 1000 0    50   Input ~ 0
5V
Wire Wire Line
	3750 1550 3750 1625
Text HLabel 1500 1200 0    50   Input ~ 0
CAN_RX
Text HLabel 1500 1100 0    50   Input ~ 0
CAN_TX
Text Label 1550 1000 0    50   ~ 0
5V
Wire Wire Line
	1550 1000 1500 1000
Text Label 2550 950  0    50   ~ 0
5V
Wire Wire Line
	2550 950  2550 1000
Wire Wire Line
	2550 1350 2550 1300
Text Label 5450 3600 2    50   ~ 0
5V
Text Label 1550 1100 0    50   ~ 0
TX
Text Label 3600 3750 0    50   ~ 0
RX
Wire Wire Line
	1550 1200 1500 1200
Text Label 4900 3850 2    50   ~ 0
TX
Text Label 4900 3950 2    50   ~ 0
RX
Text HLabel 1500 1400 0    50   Input ~ 0
CAN-
Text HLabel 1500 1300 0    50   Input ~ 0
CAN+
Text Label 1550 1300 0    50   ~ 0
CANH
Wire Wire Line
	1550 1300 1500 1300
Text Label 1550 1400 0    50   ~ 0
CANL
Wire Wire Line
	1550 1400 1500 1400
Wire Wire Line
	1500 1100 1550 1100
Text Label 6200 4150 2    50   ~ 0
CANL
Text Label 3300 750  2    50   ~ 0
CANH
Wire Wire Line
	3300 1600 3300 1550
Wire Wire Line
	6800 4050 6750 4050
Wire Wire Line
	3300 750  3300 800 
Text Label 3750 750  2    50   ~ 0
CANL
Wire Wire Line
	3750 750  3750 800 
Text Label 6200 3950 2    50   ~ 0
CANH
Wire Wire Line
	5950 4150 6350 4150
Wire Wire Line
	5950 3950 6350 3950
Wire Wire Line
	5450 3600 5450 3650
Wire Wire Line
	4900 3950 4950 3950
Wire Wire Line
	4900 3850 4950 3850
Wire Wire Line
	4900 4750 4900 4700
Wire Wire Line
	4900 4300 4900 4250
Wire Wire Line
	4900 4250 4950 4250
Wire Wire Line
	5450 4500 5450 4450
Wire Wire Line
	3750 1250 3750 1200
Wire Wire Line
	3300 1250 3300 1200
$Comp
L power:GND #PWR05
U 1 1 5ADD74BB
P 4900 4750
F 0 "#PWR05" H 4900 4500 50  0001 C CNN
F 1 "GND" H 4905 4577 50  0000 C CNN
F 2 "" H 4900 4750 50  0001 C CNN
F 3 "" H 4900 4750 50  0001 C CNN
	1    4900 4750
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR06
U 1 1 5ADD757D
P 5450 4500
F 0 "#PWR06" H 5450 4250 50  0001 C CNN
F 1 "GND" H 5455 4327 50  0000 C CNN
F 2 "" H 5450 4500 50  0001 C CNN
F 3 "" H 5450 4500 50  0001 C CNN
	1    5450 4500
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR08
U 1 1 5ADD7680
P 3750 1625
F 0 "#PWR08" H 3750 1375 50  0001 C CNN
F 1 "GND" H 3755 1452 50  0000 C CNN
F 2 "" H 3750 1625 50  0001 C CNN
F 3 "" H 3750 1625 50  0001 C CNN
	1    3750 1625
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR04
U 1 1 5ADD76B3
P 2550 1350
F 0 "#PWR04" H 2550 1100 50  0001 C CNN
F 1 "GND" H 2555 1177 50  0000 C CNN
F 2 "" H 2550 1350 50  0001 C CNN
F 3 "" H 2550 1350 50  0001 C CNN
	1    2550 1350
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR07
U 1 1 5CC02094
P 3300 1600
F 0 "#PWR07" H 3300 1350 50  0001 C CNN
F 1 "GND" H 3305 1427 50  0000 C CNN
F 2 "" H 3300 1600 50  0001 C CNN
F 3 "" H 3300 1600 50  0001 C CNN
	1    3300 1600
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR09
U 1 1 5CC051DA
P 6800 4050
F 0 "#PWR09" H 6800 3800 50  0001 C CNN
F 1 "GND" H 6805 3877 50  0000 C CNN
F 2 "" H 6800 4050 50  0001 C CNN
F 3 "" H 6800 4050 50  0001 C CNN
	1    6800 4050
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:R_4K7 R1
U 1 1 5B29BD7E
P 4650 4500
F 0 "R1" V 4700 4550 50  0000 L CNN
F 1 "R_4K7" V 4800 4500 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4625 4325 50  0001 C CNN
F 3 "https://industrial.panasonic.com/ww/products/resistors/chip-resistors/general-purpose-chip-resistors/thick-film-chip-resistors/ERJ3GEYJ472V" H 4650 4250 50  0001 C CNN
F 4 "ERJ-3GEYJ472V" H 4650 4575 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3GEYJ472V/P4.7KGCT-ND/135199" H 300 450 50  0001 C CNN "Website"
	1    4650 4500
	0    1    1    0   
$EndComp
$Comp
L Interface_CAN_LIN:MCP2551-I-SN U3
U 1 1 5AD6C5A2
P 5450 4050
F 0 "U3" H 5800 3700 50  0000 C CNN
F 1 "MCP2551-I_SN" H 5800 4400 50  0000 C CNN
F 2 "Package_SO:SOIC-8_3.9x4.9mm_P1.27mm" H 5450 3550 50  0001 C CIN
F 3 "http://ww1.microchip.com/downloads/en/devicedoc/21667d.pdf" H 5450 4050 50  0001 C CNN
F 4 "MCP2551-I/SN" H 5450 4050 50  0001 C CNN "Part Number"
	1    5450 4050
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_0.1uF C1
U 1 1 5B19B412
P 2550 1150
F 0 "C1" H 2665 1196 50  0000 L CNN
F 1 "C_0.1uF" H 2665 1105 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 2650 1450 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 2550 900 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 2675 1350 60  0001 C CNN "Part Number"
	1    2550 1150
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_560pF C3
U 1 1 5CC6A0A1
P 3750 1400
F 0 "C3" H 3850 1400 50  0000 L CNN
F 1 "C_560pF" H 3750 1300 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 3850 1700 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/447/UPY-GPHC_X7R_6.3V-to-50V_18-1154002.pdf" H 3750 1150 50  0001 C CNN
F 4 "CC0603KPX7R9BB561" H 3875 1600 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Yageo/CC0603KPX7R9BB561?qs=sGAEpiMZZMs0AnBnWHyRQCF1lTWZ1EBLZb6TrNZY8PI%3D" H -2000 -600 50  0001 C CNN "Website"
	1    3750 1400
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_560pF C2
U 1 1 5CC6C4BD
P 3300 1400
F 0 "C2" H 3100 1400 50  0000 L CNN
F 1 "C_560pF" H 2950 1300 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 3400 1700 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/447/UPY-GPHC_X7R_6.3V-to-50V_18-1154002.pdf" H 3300 1150 50  0001 C CNN
F 4 "CC0603KPX7R9BB561" H 3425 1600 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Yageo/CC0603KPX7R9BB561?qs=sGAEpiMZZMs0AnBnWHyRQCF1lTWZ1EBLZb6TrNZY8PI%3D" H -2000 -600 50  0001 C CNN "Website"
	1    3300 1400
	1    0    0    -1  
$EndComp
$Comp
L open-automation:PESD1CAN-UX D1
U 1 1 5CCC0B80
P 6550 4050
F 0 "D1" V 6892 4050 50  0000 C CNN
F 1 "PESD1CAN-UX" V 6801 4050 50  0000 C CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 6775 4000 50  0001 L CNN
F 3 "http://www.littelfuse.com/~/media/files/littelfuse/technical%20resources/documents/data%20sheets/sp05xxba.pdf" H 6675 4175 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/nexperia-usa-inc/PESD1CAN-UX/1727-1306-1-ND/4386316" H 6550 4050 50  0001 C CNN "Website"
F 5 "PESD1CAN-UX" H 6550 4050 50  0001 C CNN "Part Number"
	1    6550 4050
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:R_100 R2
U 1 1 5CC2C28A
P 3300 1000
F 0 "R2" H 3370 1046 50  0000 L CNN
F 1 "R_100" H 3370 955 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 3230 1000 50  0001 C CNN
F 3 "http://www.yageo.com/documents/recent/PYu-RC_Group_51_RoHS_L_10.pdf" V 3380 1000 50  0001 C CNN
F 4 " RC0603JR-07100RL" V 3480 1100 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-07100RL/311-100GRCT-ND/729644" H 3300 1000 50  0001 C CNN "Website"
	1    3300 1000
	1    0    0    -1  
$EndComp
$Comp
L open-automation:R_100 R3
U 1 1 5CC2C526
P 3750 1000
F 0 "R3" H 3820 1046 50  0000 L CNN
F 1 "R_100" H 3820 955 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 3680 1000 50  0001 C CNN
F 3 "http://www.yageo.com/documents/recent/PYu-RC_Group_51_RoHS_L_10.pdf" V 3830 1000 50  0001 C CNN
F 4 " RC0603JR-07100RL" V 3930 1100 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-07100RL/311-100GRCT-ND/729644" H 3750 1000 50  0001 C CNN "Website"
	1    3750 1000
	1    0    0    -1  
$EndComp
Wire Wire Line
	3600 3750 3600 3800
$Comp
L open-automation:R_10K R9
U 1 1 5D07AC60
P 3600 4500
F 0 "R9" H 3670 4546 50  0000 L CNN
F 1 "R_10K" H 3670 4455 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 3530 4500 50  0001 C CNN
F 3 "" V 3680 4500 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 3780 4600 60  0001 C CNN "Part Number"
	1    3600 4500
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR0107
U 1 1 5D07B36E
P 3600 4750
F 0 "#PWR0107" H 3600 4500 50  0001 C CNN
F 1 "GND" H 3605 4577 50  0000 C CNN
F 2 "" H 3600 4750 50  0001 C CNN
F 3 "" H 3600 4750 50  0001 C CNN
	1    3600 4750
	1    0    0    -1  
$EndComp
Wire Wire Line
	3600 4750 3600 4700
Wire Wire Line
	3600 4300 3600 4200
Text Label 3600 4250 0    50   ~ 0
CAN_RX
Text Label 1550 1200 0    50   ~ 0
CAN_RX
$Comp
L open-automation:R_4K7 R8
U 1 1 5D08134F
P 3350 4000
F 0 "R8" V 3400 4050 50  0000 L CNN
F 1 "R_4K7" V 3500 4000 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 3325 3825 50  0001 C CNN
F 3 "https://industrial.panasonic.com/ww/products/resistors/chip-resistors/general-purpose-chip-resistors/thick-film-chip-resistors/ERJ3GEYJ472V" H 3350 3750 50  0001 C CNN
F 4 "ERJ-3GEYJ472V" H 3350 4075 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3GEYJ472V/P4.7KGCT-ND/135199" H -1000 -50 50  0001 C CNN "Website"
	1    3350 4000
	0    1    1    0   
$EndComp
Text Notes 3150 3650 0    50   ~ 0
shift RX from 5 to 3.3 volts
$EndSCHEMATC
