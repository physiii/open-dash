EESchema Schematic File Version 4
LIBS:open-dash-daughterboard-cache
EELAYER 29 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 5 7
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
	7600 5200 8200 5200
Wire Wire Line
	7600 5650 7600 5700
$Comp
L open-automation:GND #PWR037
U 1 1 5CC273B6
P 7600 5700
F 0 "#PWR037" H 7600 5450 50  0001 C CNN
F 1 "GND" H 7700 5600 50  0000 C CNN
F 2 "" H 7600 5700 50  0000 C CNN
F 3 "" H 7600 5700 50  0000 C CNN
	1    7600 5700
	1    0    0    -1  
$EndComp
Wire Wire Line
	7600 5350 7600 5200
$Comp
L open-automation:C_10uF C13
U 1 1 5CC273A4
P 7600 5500
F 0 "C13" H 7350 5500 50  0000 L CNN
F 1 "C_10uF" H 7300 5400 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 7700 5800 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/281/murata_03052018_GRM_Series_1-1310166.pdf" H 7600 5250 50  0001 C CNN
F 4 "GRM188R61E106KA73D" H 7725 5700 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Murata-Electronics/GRM188R61E106KA73D?qs=sGAEpiMZZMs0AnBnWHyRQN7%2FAA2D2lPPadjwaUSKtHX%252BeURw46TYGA%3D%3D" H 0   0   50  0001 C CNN "Website"
	1    7600 5500
	1    0    0    -1  
$EndComp
$Comp
L open-automation:R_2.2k R24
U 1 1 5CC27388
P 9800 5900
F 0 "R24" V 9800 5850 50  0000 L CNN
F 1 "R_2.2k" H 9850 5900 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 9730 5900 50  0001 C CNN
F 3 "" V 9880 5900 50  0001 C CNN
F 4 "ERJ-3GEYJ222V" V 9980 6000 60  0001 C CNN "Part Number"
	1    9800 5900
	1    0    0    -1  
$EndComp
Text Label 9700 5300 0    50   ~ 0
MAIN_POWER
Wire Wire Line
	9800 5700 9800 5750
Connection ~ 9800 5700
Wire Wire Line
	9650 5700 9800 5700
Wire Wire Line
	9650 5200 9650 5700
Wire Wire Line
	9300 5200 9650 5200
Connection ~ 9350 5300
Wire Wire Line
	9350 5300 9800 5300
Wire Wire Line
	9800 5650 9800 5700
Wire Wire Line
	9800 5300 9800 5350
Wire Wire Line
	9800 6100 9800 6050
$Comp
L open-automation:GND #PWR049
U 1 1 5CC27350
P 9800 6100
F 0 "#PWR049" H 9800 5850 50  0001 C CNN
F 1 "GND" H 9900 6000 50  0000 C CNN
F 2 "" H 9800 6100 50  0000 C CNN
F 3 "" H 9800 6100 50  0000 C CNN
	1    9800 6100
	1    0    0    -1  
$EndComp
Text Label 8150 5200 2    50   ~ 0
MAIN_POWER_IN
Text Label 8150 5300 2    50   ~ 0
MAIN_EN
Wire Wire Line
	8150 5400 8200 5400
Wire Wire Line
	8150 5450 8150 5400
$Comp
L open-automation:GND #PWR043
U 1 1 5CC27340
P 8150 5450
F 0 "#PWR043" H 8150 5200 50  0001 C CNN
F 1 "GND" H 8250 5350 50  0000 C CNN
F 2 "" H 8150 5450 50  0000 C CNN
F 3 "" H 8150 5450 50  0000 C CNN
	1    8150 5450
	1    0    0    -1  
$EndComp
Wire Wire Line
	9350 5700 9350 5650
$Comp
L open-automation:GND #PWR046
U 1 1 5CC27333
P 9350 5700
F 0 "#PWR046" H 9350 5450 50  0001 C CNN
F 1 "GND" H 9450 5600 50  0000 C CNN
F 2 "" H 9350 5700 50  0000 C CNN
F 3 "" H 9350 5700 50  0000 C CNN
	1    9350 5700
	1    0    0    -1  
$EndComp
Wire Wire Line
	9350 5300 9300 5300
Wire Wire Line
	9350 5350 9350 5300
$Comp
L open-automation:C_10uF_Ta C17
U 1 1 5CC27325
P 9350 5500
F 0 "C17" H 9150 5500 50  0000 L CNN
F 1 "C_10uF_Ta" H 8950 5400 50  0000 L CNN
F 2 "Capacitor_Tantalum_SMD:CP_EIA-6032-15_Kemet-U_Pad2.25x2.35mm_HandSolder" H 9450 5800 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/avx-corporation/TRJC106K035R0600/478-7582-1-ND/3660372" H 9350 5250 50  0001 C CNN
F 4 " TRJC106K035R0600" H 9475 5700 60  0001 C CNN "Part Number"
	1    9350 5500
	1    0    0    -1  
$EndComp
$Comp
L open-automation:MIC29302WU U11
U 1 1 5CC27316
P 8700 5300
F 0 "U11" H 8750 5647 60  0000 C CNN
F 1 "MIC29302WU" H 8750 5541 60  0000 C CNN
F 2 "Package_TO_SOT_SMD:TO-263-5_TabPin3" H 8800 5700 60  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/microchip-technology/MIC29302WU/576-3369-5-ND/1029125" H 8650 5000 60  0001 C CNN
F 4 " MIC29302WU" H 8750 5600 50  0001 C CNN "Part Number"
	1    8700 5300
	1    0    0    -1  
$EndComp
Wire Wire Line
	1700 1800 1750 1800
Text HLabel 1700 1800 0    60   Input ~ 0
CURRENT_SENSE
Text Label 1750 1800 0    50   ~ 0
VIOUT
Text Label 4700 2450 2    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	4700 2450 4750 2450
$Comp
L open-automation:R_2.2k R15
U 1 1 5CBFDEFB
P 5250 2450
F 0 "R15" V 5250 2400 50  0000 L CNN
F 1 "R_2.2k" V 5150 2350 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 5180 2450 50  0001 C CNN
F 3 "" V 5330 2450 50  0001 C CNN
F 4 "ERJ-3GEYJ222V" V 5430 2550 60  0001 C CNN "Part Number"
	1    5250 2450
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:LED-0603-G D8
U 1 1 5CBFDEEC
P 4900 2450
F 0 "D8" H 4950 2350 50  0000 R CNN
F 1 "LED-0603-G" V 4900 2400 50  0001 R CNN
F 2 "LED_SMD:LED_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4800 2450 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/rohm-semiconductor/SML-D12M8WT86/511-1578-1-ND/1641810" H 4900 2550 50  0001 C CNN
F 4 "SML-D12M8WT86" H 5000 2650 50  0001 C CNN "Part Number"
	1    4900 2450
	-1   0    0    1   
$EndComp
Wire Wire Line
	5050 2450 5100 2450
Wire Wire Line
	5400 2450 5450 2450
$Comp
L open-automation:GND #PWR033
U 1 1 5CBFDEDB
P 5450 2450
F 0 "#PWR033" H 5450 2200 50  0001 C CNN
F 1 "GND" H 5450 2300 50  0000 C CNN
F 2 "" H 5450 2450 50  0000 C CNN
F 3 "" H 5450 2450 50  0000 C CNN
	1    5450 2450
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:GND #PWR028
U 1 1 5B15BF39
P 5450 1450
F 0 "#PWR028" H 5450 1200 50  0001 C CNN
F 1 "GND" H 5450 1300 50  0000 C CNN
F 2 "" H 5450 1450 50  0000 C CNN
F 3 "" H 5450 1450 50  0000 C CNN
	1    5450 1450
	0    -1   -1   0   
$EndComp
Text Label 4700 1950 2    50   ~ 0
POWER_IN
Text Label 4700 2200 2    50   ~ 0
MAIN_POWER
Text Label 4700 1700 2    50   ~ 0
5V
Wire Wire Line
	4700 2200 4750 2200
$Comp
L open-automation:R_2.2k R13
U 1 1 5CBFA5A5
P 5250 2200
F 0 "R13" V 5250 2150 50  0000 L CNN
F 1 "R_2.2k" V 5150 2100 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 5180 2200 50  0001 C CNN
F 3 "" V 5330 2200 50  0001 C CNN
F 4 "ERJ-3GEYJ222V" V 5430 2300 60  0001 C CNN "Part Number"
	1    5250 2200
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:LED-0603-G D6
U 1 1 5CBFA596
P 4900 2200
F 0 "D6" H 4950 2100 50  0000 R CNN
F 1 "LED-0603-G" V 4900 2150 50  0001 R CNN
F 2 "LED_SMD:LED_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4800 2200 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/rohm-semiconductor/SML-D12M8WT86/511-1578-1-ND/1641810" H 4900 2300 50  0001 C CNN
F 4 "SML-D12M8WT86" H 5000 2400 50  0001 C CNN "Part Number"
	1    4900 2200
	-1   0    0    1   
$EndComp
Wire Wire Line
	5050 2200 5100 2200
Wire Wire Line
	5400 2200 5450 2200
$Comp
L open-automation:GND #PWR031
U 1 1 5CBFA585
P 5450 2200
F 0 "#PWR031" H 5450 1950 50  0001 C CNN
F 1 "GND" H 5450 2050 50  0000 C CNN
F 2 "" H 5450 2200 50  0000 C CNN
F 3 "" H 5450 2200 50  0000 C CNN
	1    5450 2200
	0    -1   -1   0   
$EndComp
Wire Wire Line
	4700 1950 4750 1950
$Comp
L open-automation:R_2.2k R12
U 1 1 5CBFA577
P 5250 1950
F 0 "R12" V 5250 1900 50  0000 L CNN
F 1 "R_2.2k" V 5150 1850 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 5180 1950 50  0001 C CNN
F 3 "" V 5330 1950 50  0001 C CNN
F 4 "ERJ-3GEYJ222V" V 5430 2050 60  0001 C CNN "Part Number"
	1    5250 1950
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:LED-0603-G D5
U 1 1 5CBFA568
P 4900 1950
F 0 "D5" H 4950 1850 50  0000 R CNN
F 1 "LED-0603-G" V 4900 1900 50  0001 R CNN
F 2 "LED_SMD:LED_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4800 1950 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/rohm-semiconductor/SML-D12M8WT86/511-1578-1-ND/1641810" H 4900 2050 50  0001 C CNN
F 4 "SML-D12M8WT86" H 5000 2150 50  0001 C CNN "Part Number"
	1    4900 1950
	-1   0    0    1   
$EndComp
Wire Wire Line
	5050 1950 5100 1950
Wire Wire Line
	5400 1950 5450 1950
$Comp
L open-automation:GND #PWR030
U 1 1 5CBFA557
P 5450 1950
F 0 "#PWR030" H 5450 1700 50  0001 C CNN
F 1 "GND" H 5450 1800 50  0000 C CNN
F 2 "" H 5450 1950 50  0000 C CNN
F 3 "" H 5450 1950 50  0000 C CNN
	1    5450 1950
	0    -1   -1   0   
$EndComp
Wire Wire Line
	4700 1700 4750 1700
$Comp
L open-automation:R_2.2k R11
U 1 1 5CBF912C
P 5250 1700
F 0 "R11" V 5250 1650 50  0000 L CNN
F 1 "R_2.2k" V 5150 1600 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 5180 1700 50  0001 C CNN
F 3 "" V 5330 1700 50  0001 C CNN
F 4 "ERJ-3GEYJ222V" V 5430 1800 60  0001 C CNN "Part Number"
	1    5250 1700
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:LED-0603-G D4
U 1 1 5CBF911D
P 4900 1700
F 0 "D4" H 4950 1600 50  0000 R CNN
F 1 "LED-0603-G" V 4900 1650 50  0001 R CNN
F 2 "LED_SMD:LED_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4800 1700 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/rohm-semiconductor/SML-D12M8WT86/511-1578-1-ND/1641810" H 4900 1800 50  0001 C CNN
F 4 "SML-D12M8WT86" H 5000 1900 50  0001 C CNN "Part Number"
	1    4900 1700
	-1   0    0    1   
$EndComp
Wire Wire Line
	5050 1700 5100 1700
Wire Wire Line
	5400 1700 5450 1700
$Comp
L open-automation:GND #PWR029
U 1 1 5CBF910C
P 5450 1700
F 0 "#PWR029" H 5450 1450 50  0001 C CNN
F 1 "GND" H 5450 1550 50  0000 C CNN
F 2 "" H 5450 1700 50  0000 C CNN
F 3 "" H 5450 1700 50  0000 C CNN
	1    5450 1700
	0    -1   -1   0   
$EndComp
Wire Wire Line
	4700 1450 4750 1450
Text Label 4700 1450 2    50   ~ 0
3V3
$Comp
L open-automation:R_2.2k R10
U 1 1 5CBF04F1
P 5250 1450
F 0 "R10" V 5250 1400 50  0000 L CNN
F 1 "R_2.2k" V 5150 1350 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 5180 1450 50  0001 C CNN
F 3 "" V 5330 1450 50  0001 C CNN
F 4 "ERJ-3GEYJ222V" V 5430 1550 60  0001 C CNN "Part Number"
	1    5250 1450
	0    -1   -1   0   
$EndComp
Wire Wire Line
	1700 1700 1750 1700
Text HLabel 1700 1700 0    60   Input ~ 0
3V3
Text Label 1750 1700 0    50   ~ 0
3V3
$Comp
L open-automation:LED-0603-G D3
U 1 1 5B15BF49
P 4900 1450
F 0 "D3" H 4950 1350 50  0000 R CNN
F 1 "LED-0603-G" V 4900 1400 50  0001 R CNN
F 2 "LED_SMD:LED_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4800 1450 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/rohm-semiconductor/SML-D12M8WT86/511-1578-1-ND/1641810" H 4900 1550 50  0001 C CNN
F 4 "SML-D12M8WT86" H 5000 1650 50  0001 C CNN "Part Number"
	1    4900 1450
	-1   0    0    1   
$EndComp
Wire Wire Line
	5050 1450 5100 1450
Wire Wire Line
	5400 1450 5450 1450
Wire Wire Line
	1700 1600 1750 1600
Text HLabel 1700 1600 0    60   Input ~ 0
5V
Text Label 1750 1600 0    50   ~ 0
5V
Wire Wire Line
	1750 1400 1700 1400
Text Label 1750 1400 0    50   ~ 0
MAIN_EN
Text HLabel 1700 1400 0    60   Input ~ 0
MAIN_EN
Text Label 1750 1500 0    50   ~ 0
POWER_IN
Wire Wire Line
	1750 1300 1700 1300
Text Label 1750 1300 0    50   ~ 0
DISPLAY_EN
Text HLabel 1700 1300 0    60   Input ~ 0
DISPLAY_EN
Wire Wire Line
	1700 1500 1750 1500
Text HLabel 1700 1500 0    60   Input ~ 0
BATTERY
Text Notes 8150 1550 0    60   ~ 0
output voltage = 1.24 (1 + R2{slash}R1)\nR1 is on high side
Wire Wire Line
	7900 2100 8150 2100
Wire Wire Line
	7550 3550 8150 3550
$Comp
L open-automation:R_6.5k R22
U 1 1 5CBDFD46
P 9800 2800
F 0 "R22" V 9800 2750 50  0000 L CNN
F 1 "R_6.5k" H 9850 2800 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 9730 2800 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/427/crcwce3-1223726.pdf" V 9880 2800 50  0001 C CNN
F 4 "CRCW06036K49FKEAC" V 9980 2900 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Vishay-Dale/CRCW06036K49FKEAC?qs=sGAEpiMZZMu61qfTUdNhG9bvwnXh9sSrI1lmGEGWpLM4TJW%252B33zaEQ%3D%3D" H 0   0   50  0001 C CNN "Website"
	1    9800 2800
	1    0    0    -1  
$EndComp
Wire Wire Line
	8150 2100 8200 2100
Connection ~ 8150 2100
Wire Wire Line
	8150 2200 8150 2100
Wire Wire Line
	8200 2200 8150 2200
Wire Wire Line
	7900 2550 7900 2600
$Comp
L open-automation:GND #PWR038
U 1 1 5CC305FE
P 7900 2600
F 0 "#PWR038" H 7900 2350 50  0001 C CNN
F 1 "GND" H 8000 2500 50  0000 C CNN
F 2 "" H 7900 2600 50  0000 C CNN
F 3 "" H 7900 2600 50  0000 C CNN
	1    7900 2600
	1    0    0    -1  
$EndComp
Wire Wire Line
	7900 2250 7900 2100
$Comp
L open-automation:C_10uF C14
U 1 1 5CC305EC
P 7900 2400
F 0 "C14" H 7700 2400 50  0000 L CNN
F 1 "C_10uF" H 7600 2300 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 8000 2700 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/281/murata_03052018_GRM_Series_1-1310166.pdf" H 7900 2150 50  0001 C CNN
F 4 "GRM188R61E106KA73D" H 8025 2600 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Murata-Electronics/GRM188R61E106KA73D?qs=sGAEpiMZZMs0AnBnWHyRQN7%2FAA2D2lPPadjwaUSKtHX%252BeURw46TYGA%3D%3D" H 0   0   50  0001 C CNN "Website"
	1    7900 2400
	1    0    0    -1  
$EndComp
Text Label 9750 2200 0    50   ~ 0
5V
Wire Wire Line
	9800 2600 9800 2650
Connection ~ 9800 2600
Wire Wire Line
	9650 2600 9800 2600
Wire Wire Line
	9650 2100 9650 2600
Wire Wire Line
	9300 2100 9650 2100
Connection ~ 9350 2200
Wire Wire Line
	9350 2200 9800 2200
Wire Wire Line
	9800 2550 9800 2600
Wire Wire Line
	9800 2200 9800 2250
Wire Wire Line
	9800 3000 9800 2950
$Comp
L open-automation:GND #PWR048
U 1 1 5CC30598
P 9800 3000
F 0 "#PWR048" H 9800 2750 50  0001 C CNN
F 1 "GND" H 9900 2900 50  0000 C CNN
F 2 "" H 9800 3000 50  0000 C CNN
F 3 "" H 9800 3000 50  0000 C CNN
	1    9800 3000
	1    0    0    -1  
$EndComp
Text Label 8100 2100 2    50   ~ 0
POWER_IN
Wire Wire Line
	8150 2300 8200 2300
Wire Wire Line
	8150 2350 8150 2300
$Comp
L open-automation:GND #PWR042
U 1 1 5CC30588
P 8150 2350
F 0 "#PWR042" H 8150 2100 50  0001 C CNN
F 1 "GND" H 8250 2250 50  0000 C CNN
F 2 "" H 8150 2350 50  0000 C CNN
F 3 "" H 8150 2350 50  0000 C CNN
	1    8150 2350
	1    0    0    -1  
$EndComp
Wire Wire Line
	9350 2600 9350 2550
$Comp
L open-automation:GND #PWR045
U 1 1 5CC3057B
P 9350 2600
F 0 "#PWR045" H 9350 2350 50  0001 C CNN
F 1 "GND" H 9450 2500 50  0000 C CNN
F 2 "" H 9350 2600 50  0000 C CNN
F 3 "" H 9350 2600 50  0000 C CNN
	1    9350 2600
	1    0    0    -1  
$EndComp
Wire Wire Line
	9350 2200 9300 2200
Wire Wire Line
	9350 2250 9350 2200
$Comp
L open-automation:C_10uF_Ta C16
U 1 1 5CC3056D
P 9350 2400
F 0 "C16" H 9100 2400 50  0000 L CNN
F 1 "C_10uF_Ta" H 8950 2300 50  0000 L CNN
F 2 "Capacitor_Tantalum_SMD:CP_EIA-6032-15_Kemet-U_Pad2.25x2.35mm_HandSolder" H 9450 2700 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/avx-corporation/TRJC106K035R0600/478-7582-1-ND/3660372" H 9350 2150 50  0001 C CNN
F 4 " TRJC106K035R0600" H 9475 2600 60  0001 C CNN "Part Number"
	1    9350 2400
	1    0    0    -1  
$EndComp
$Comp
L open-automation:MIC29302WU U10
U 1 1 5CC3055E
P 8700 2200
F 0 "U10" H 8750 2547 60  0000 C CNN
F 1 "MIC29302WU" H 8750 2441 60  0000 C CNN
F 2 "Package_TO_SOT_SMD:TO-263-5_TabPin3" H 8800 2600 60  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/microchip-technology/MIC29302WU/576-3369-5-ND/1029125" H 8650 1900 60  0001 C CNN
F 4 " MIC29302WU" H 8750 2500 50  0001 C CNN "Part Number"
	1    8700 2200
	1    0    0    -1  
$EndComp
Wire Wire Line
	7550 4000 7550 4050
$Comp
L open-automation:GND #PWR036
U 1 1 5CC0E285
P 7550 4050
F 0 "#PWR036" H 7550 3800 50  0001 C CNN
F 1 "GND" H 7650 3950 50  0000 C CNN
F 2 "" H 7550 4050 50  0000 C CNN
F 3 "" H 7550 4050 50  0000 C CNN
	1    7550 4050
	1    0    0    -1  
$EndComp
Wire Wire Line
	7550 3700 7550 3550
$Comp
L open-automation:C_10uF C12
U 1 1 5CC07B1D
P 7550 3850
F 0 "C12" H 7350 3850 50  0000 L CNN
F 1 "C_10uF" H 7250 3750 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 7650 4150 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/281/murata_03052018_GRM_Series_1-1310166.pdf" H 7550 3600 50  0001 C CNN
F 4 "GRM188R61E106KA73D" H 7675 4050 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Murata-Electronics/GRM188R61E106KA73D?qs=sGAEpiMZZMs0AnBnWHyRQN7%2FAA2D2lPPadjwaUSKtHX%252BeURw46TYGA%3D%3D" H 0   0   50  0001 C CNN "Website"
	1    7550 3850
	1    0    0    -1  
$EndComp
$Comp
L open-automation:R_2.2k R20
U 1 1 5CC044FA
P 9750 4250
F 0 "R20" V 9750 4200 50  0000 L CNN
F 1 "R_2.2k" H 9800 4250 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 9680 4250 50  0001 C CNN
F 3 "" V 9830 4250 50  0001 C CNN
F 4 "ERJ-3GEYJ222V" V 9930 4350 60  0001 C CNN "Part Number"
	1    9750 4250
	1    0    0    -1  
$EndComp
Text Label 9650 3650 0    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	9750 4050 9750 4100
Connection ~ 9750 4050
Wire Wire Line
	9600 4050 9750 4050
Wire Wire Line
	9600 3550 9600 4050
Wire Wire Line
	9250 3550 9600 3550
Connection ~ 9300 3650
Wire Wire Line
	9300 3650 9750 3650
Wire Wire Line
	9750 4000 9750 4050
Wire Wire Line
	9750 3650 9750 3700
Wire Wire Line
	9750 4450 9750 4400
$Comp
L open-automation:GND #PWR047
U 1 1 5CBE0131
P 9750 4450
F 0 "#PWR047" H 9750 4200 50  0001 C CNN
F 1 "GND" H 9850 4350 50  0000 C CNN
F 2 "" H 9750 4450 50  0000 C CNN
F 3 "" H 9750 4450 50  0000 C CNN
	1    9750 4450
	1    0    0    -1  
$EndComp
Text Label 7950 3550 2    50   ~ 0
POWER_IN
Text Label 8100 3650 2    50   ~ 0
DISPLAY_EN
Wire Wire Line
	8100 3750 8150 3750
Wire Wire Line
	8100 3800 8100 3750
$Comp
L open-automation:GND #PWR041
U 1 1 5CBD7AFF
P 8100 3800
F 0 "#PWR041" H 8100 3550 50  0001 C CNN
F 1 "GND" H 8200 3700 50  0000 C CNN
F 2 "" H 8100 3800 50  0000 C CNN
F 3 "" H 8100 3800 50  0000 C CNN
	1    8100 3800
	1    0    0    -1  
$EndComp
Wire Wire Line
	9300 4050 9300 4000
$Comp
L open-automation:GND #PWR044
U 1 1 5CBD624B
P 9300 4050
F 0 "#PWR044" H 9300 3800 50  0001 C CNN
F 1 "GND" H 9400 3950 50  0000 C CNN
F 2 "" H 9300 4050 50  0000 C CNN
F 3 "" H 9300 4050 50  0000 C CNN
	1    9300 4050
	1    0    0    -1  
$EndComp
Wire Wire Line
	9300 3650 9250 3650
Wire Wire Line
	9300 3700 9300 3650
$Comp
L open-automation:C_10uF_Ta C15
U 1 1 5CBD4A36
P 9300 3850
F 0 "C15" H 9100 3850 50  0000 L CNN
F 1 "C_10uF_Ta" H 8900 3750 50  0000 L CNN
F 2 "Capacitor_Tantalum_SMD:CP_EIA-6032-15_Kemet-U_Pad2.25x2.35mm_HandSolder" H 9400 4150 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/avx-corporation/TRJC106K035R0600/478-7582-1-ND/3660372" H 9300 3600 50  0001 C CNN
F 4 " TRJC106K035R0600" H 9425 4050 60  0001 C CNN "Part Number"
	1    9300 3850
	1    0    0    -1  
$EndComp
$Comp
L open-automation:MIC29302WU U9
U 1 1 5CBD35FE
P 8650 3650
F 0 "U9" H 8700 3997 60  0000 C CNN
F 1 "MIC29302WU" H 8700 3891 60  0000 C CNN
F 2 "Package_TO_SOT_SMD:TO-263-5_TabPin3" H 8750 4050 60  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/microchip-technology/MIC29302WU/576-3369-5-ND/1029125" H 8600 3350 60  0001 C CNN
F 4 " MIC29302WU" H 8700 3950 50  0001 C CNN "Part Number"
	1    8650 3650
	1    0    0    -1  
$EndComp
$Comp
L open-automation:Barrel_Jack_OD5.5_ID2.5 J6
U 1 1 5CBE83E4
P 2750 2900
F 0 "J6" H 2600 3100 50  0000 C CNN
F 1 "Barrel_Jack_OD5.5_ID2.5" H 2750 2700 50  0001 C CNN
F 2 "open-automation:BarrelJack_OD5.5_ID2.5" H 2750 2600 50  0001 C CNN
F 3 "https://www.cui.com/product/resource/pj-202b.pdf" H 2800 2860 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/cui-inc/PJ-202B/CP-202B-ND/252008" H 2700 2500 50  0001 C CNN "Website"
F 5 "PJ-202A" H 2750 2900 50  0001 C CNN "Part Number"
	1    2750 2900
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR023
U 1 1 5CBE9929
P 3100 3050
F 0 "#PWR023" H 3100 2800 50  0001 C CNN
F 1 "GND" H 3100 2900 50  0000 C CNN
F 2 "" H 3100 3050 50  0000 C CNN
F 3 "" H 3100 3050 50  0000 C CNN
	1    3100 3050
	1    0    0    -1  
$EndComp
Wire Wire Line
	3050 3000 3100 3000
Wire Wire Line
	3100 3000 3100 3050
Wire Wire Line
	3050 2900 3100 2900
Wire Wire Line
	3100 2900 3100 3000
Connection ~ 3100 3000
Text Label 3100 2800 0    50   ~ 0
DISPLAY_POWER
Wire Wire Line
	3100 2800 3050 2800
$Comp
L open-automation:Barrel_Jack_OD5.5_ID2.5 J5
U 1 1 5CBEBB3C
P 1450 2900
F 0 "J5" H 1300 3100 50  0000 C CNN
F 1 "Barrel_Jack_OD5.5_ID2.5" H 1450 2700 50  0001 C CNN
F 2 "open-automation:BarrelJack_OD5.5_ID2.5" H 1450 2600 50  0001 C CNN
F 3 "https://www.cui.com/product/resource/pj-202b.pdf" H 1500 2860 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/cui-inc/PJ-202B/CP-202B-ND/252008" H 1400 2500 50  0001 C CNN "Website"
F 5 "PJ-202A" H 1450 2900 50  0001 C CNN "Part Number"
	1    1450 2900
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR022
U 1 1 5CBEBB48
P 1800 3050
F 0 "#PWR022" H 1800 2800 50  0001 C CNN
F 1 "GND" H 1800 2900 50  0000 C CNN
F 2 "" H 1800 3050 50  0000 C CNN
F 3 "" H 1800 3050 50  0000 C CNN
	1    1800 3050
	1    0    0    -1  
$EndComp
Wire Wire Line
	1750 3000 1800 3000
Wire Wire Line
	1800 3000 1800 3050
Wire Wire Line
	1750 2900 1800 2900
Wire Wire Line
	1800 2900 1800 3000
Connection ~ 1800 3000
Wire Wire Line
	1800 2800 1750 2800
Text Label 1800 2800 0    50   ~ 0
MAIN_POWER
$Comp
L open-automation:GND #PWR024
U 1 1 5CC376B4
P 3400 1400
F 0 "#PWR024" H 3400 1150 50  0001 C CNN
F 1 "GND" H 3400 1250 50  0000 C CNN
F 2 "" H 3400 1400 50  0000 C CNN
F 3 "" H 3400 1400 50  0000 C CNN
	1    3400 1400
	0    -1   1    0   
$EndComp
Wire Wire Line
	3350 1400 3400 1400
Text Label 3000 1400 2    50   ~ 0
POWER_IN
Wire Wire Line
	3050 1400 3000 1400
$Comp
L open-automation:C_1000uF C?
U 1 1 5CC3872E
P 3200 1750
AR Path="/5ABD18ED/5CC3872E" Ref="C?"  Part="1" 
AR Path="/5CC3872E" Ref="C?"  Part="1" 
AR Path="/5A7BADB8/5CC3872E" Ref="C9"  Part="1" 
F 0 "C9" V 3350 1700 50  0000 L CNN
F 1 "C_1000uF" V 3050 1550 50  0000 L CNN
F 2 "Capacitor_THT:CP_Radial_D12.5mm_P5.00mm" H 3300 2050 50  0001 C CNN
F 3 "https://industrial.panasonic.com/ww/products/capacitors/aluminum-capacitors/aluminum-cap-lead/fc/EEUFC1E102" H 3200 1500 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/panasonic-electronic-components/EEU-FC1E102/P10278-ND/266287" H 3200 1750 50  0001 C CNN "Website"
F 5 " EEU-FC1E102" H 3325 1950 60  0001 C CNN "Part Number"
F 6 "https://www.digikey.com/product-detail/en/panasonic-electronic-components/EEU-FC1E102/P10278-ND/266287" H 0   0   50  0001 C CNN "Supplier"
	1    3200 1750
	0    -1   -1   0   
$EndComp
Text Label 3000 1750 2    50   ~ 0
BATTERY
Wire Wire Line
	3050 1750 3000 1750
$Comp
L open-automation:GND #PWR?
U 1 1 5CC38737
P 3400 1750
AR Path="/5ABD187E/5CC38737" Ref="#PWR?"  Part="1" 
AR Path="/5CC38737" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/5CC38737" Ref="#PWR025"  Part="1" 
F 0 "#PWR025" H 3400 1500 50  0001 C CNN
F 1 "GND" H 3400 1600 50  0000 C CNN
F 2 "" H 3400 1750 50  0000 C CNN
F 3 "" H 3400 1750 50  0000 C CNN
	1    3400 1750
	0    -1   -1   0   
$EndComp
Wire Wire Line
	3400 1750 3350 1750
$Comp
L open-automation:GND #PWR034
U 1 1 5B1782DE
P 5625 4175
F 0 "#PWR034" H 5625 3925 50  0001 C CNN
F 1 "GND" H 5625 4025 50  0000 C CNN
F 2 "" H 5625 4175 50  0000 C CNN
F 3 "" H 5625 4175 50  0000 C CNN
	1    5625 4175
	1    0    0    -1  
$EndComp
Wire Wire Line
	5625 4175 5625 4150
Wire Wire Line
	5625 4150 5675 4150
Wire Wire Line
	6425 4050 6500 4050
Wire Wire Line
	6500 4050 6500 4100
$Comp
L open-automation:GND #PWR035
U 1 1 5B18B8C6
P 6500 4450
F 0 "#PWR035" H 6500 4200 50  0001 C CNN
F 1 "GND" H 6500 4300 50  0000 C CNN
F 2 "" H 6500 4450 50  0000 C CNN
F 3 "" H 6500 4450 50  0000 C CNN
	1    6500 4450
	1    0    0    -1  
$EndComp
Wire Wire Line
	6500 4450 6500 4400
$Comp
L open-automation:REG-3.3v U8
U 1 1 5B2197B1
P 6075 4050
F 0 "U8" H 6050 4375 50  0000 C CNN
F 1 "REG-3.3v" H 6050 4284 50  0000 C CNN
F 2 "Package_TO_SOT_SMD:TO-252-2" H 6025 3775 50  0001 C CIN
F 3 "https://www.digikey.com/product-detail/en/on-semiconductor/NCP1117DT33T5G/NCP1117DT33T5GOSCT-ND/2121236" H 6050 3700 50  0001 C CNN
F 4 "NCP1117DT33T5G" H 6100 4375 60  0001 C CNN "Part Number"
	1    6075 4050
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR026
U 1 1 5B21A954
P 5400 4300
F 0 "#PWR026" H 5400 4050 50  0001 C CNN
F 1 "GND" H 5400 4150 50  0000 C CNN
F 2 "" H 5400 4300 50  0000 C CNN
F 3 "" H 5400 4300 50  0000 C CNN
	1    5400 4300
	1    0    0    -1  
$EndComp
Wire Wire Line
	5400 4250 5400 4300
Wire Wire Line
	5400 3950 5675 3950
Text Label 5500 3950 2    50   ~ 0
5V
Text Label 6450 4050 0    50   ~ 0
3V3
$Comp
L open-automation:C_10uF C10
U 1 1 5CBEA12D
P 5400 4100
F 0 "C10" H 5200 4100 50  0000 L CNN
F 1 "C_10uF" H 5100 4000 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 5500 4400 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/281/murata_03052018_GRM_Series_1-1310166.pdf" H 5400 3850 50  0001 C CNN
F 4 "GRM188R61E106KA73D" H 5525 4300 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Murata-Electronics/GRM188R61E106KA73D?qs=sGAEpiMZZMs0AnBnWHyRQN7%2FAA2D2lPPadjwaUSKtHX%252BeURw46TYGA%3D%3D" H 0   0   50  0001 C CNN "Website"
	1    5400 4100
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_10uF C11
U 1 1 5CBEB247
P 6500 4250
F 0 "C11" H 6300 4250 50  0000 L CNN
F 1 "C_10uF" H 6200 4150 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 6600 4550 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/281/murata_03052018_GRM_Series_1-1310166.pdf" H 6500 4000 50  0001 C CNN
F 4 "GRM188R61E106KA73D" H 6625 4450 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Murata-Electronics/GRM188R61E106KA73D?qs=sGAEpiMZZMs0AnBnWHyRQN7%2FAA2D2lPPadjwaUSKtHX%252BeURw46TYGA%3D%3D" H 0   0   50  0001 C CNN "Website"
	1    6500 4250
	1    0    0    -1  
$EndComp
$Comp
L open-automation:ACS711 U7
U 1 1 5CBE85D6
P 5850 5800
F 0 "U7" H 5825 6325 50  0000 C CNN
F 1 "ACS711" H 5825 6234 50  0000 C CNN
F 2 "Package_SO:SOIC-8_3.9x4.9mm_P1.27mm" H 5900 6450 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/allegro-microsystems-llc/ACS711KEXLT-15AB-T/620-1483-1-ND/3868192" H 5650 6650 50  0001 C CNN
F 4 " ACS711ELCTR-12AB-T " H 5900 6350 50  0001 C CNN "Part Number"
	1    5850 5800
	1    0    0    -1  
$EndComp
Text Label 6550 5500 0    50   ~ 0
3V3
$Comp
L open-automation:GND #PWR027
U 1 1 5CBEAC72
P 6250 5850
F 0 "#PWR027" H 6250 5600 50  0001 C CNN
F 1 "GND" H 6250 5700 50  0000 C CNN
F 2 "" H 6250 5850 50  0000 C CNN
F 3 "" H 6250 5850 50  0000 C CNN
	1    6250 5850
	1    0    0    -1  
$EndComp
Wire Wire Line
	5400 5700 5450 5700
Text Label 5400 5500 2    50   ~ 0
POWER_IN
Wire Wire Line
	5400 5500 5450 5500
Text Label 5400 5700 2    50   ~ 0
MAIN_POWER_IN
Wire Wire Line
	5400 5600 5450 5600
Text Label 6250 5600 0    50   ~ 0
FAULT
Text Label 6250 5700 0    50   ~ 0
VIOUT
Wire Wire Line
	6250 5700 6200 5700
Wire Wire Line
	6200 5600 6450 5600
Wire Wire Line
	6750 5500 6750 5600
Wire Wire Line
	6200 5500 6750 5500
$Comp
L open-automation:R_20K R21
U 1 1 5CC94E35
P 9800 2400
F 0 "R21" H 9850 2350 50  0000 L CNN
F 1 "R_20K" H 9800 2250 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 9730 2400 50  0001 C CNN
F 3 "" V 9880 2400 50  0001 C CNN
F 4 "RC0603JR-0720KL" V 9980 2500 60  0001 C CNN "Part Number"
	1    9800 2400
	1    0    0    -1  
$EndComp
$Comp
L open-automation:R_20K R19
U 1 1 5CC96EC7
P 9750 3850
F 0 "R19" H 9800 3800 50  0000 L CNN
F 1 "R_20K" H 9750 3700 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 9680 3850 50  0001 C CNN
F 3 "" V 9830 3850 50  0001 C CNN
F 4 "RC0603JR-0720KL" V 9930 3950 60  0001 C CNN "Part Number"
	1    9750 3850
	1    0    0    -1  
$EndComp
$Comp
L open-automation:R_20K R23
U 1 1 5CC982EC
P 9800 5500
F 0 "R23" H 9850 5450 50  0000 L CNN
F 1 "R_20K" H 9800 5350 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 9730 5500 50  0001 C CNN
F 3 "" V 9880 5500 50  0001 C CNN
F 4 "RC0603JR-0720KL" V 9980 5600 60  0001 C CNN "Part Number"
	1    9800 5500
	1    0    0    -1  
$EndComp
$Comp
L open-automation:R_20K R16
U 1 1 5CC9A81F
P 6600 5600
F 0 "R16" V 6600 5550 50  0000 L CNN
F 1 "R_20K" V 6700 5500 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 6530 5600 50  0001 C CNN
F 3 "" V 6680 5600 50  0001 C CNN
F 4 "RC0603JR-0720KL" V 6780 5700 60  0001 C CNN "Part Number"
	1    6600 5600
	0    1    1    0   
$EndComp
$Comp
L open-automation:D_Zener D2
U 1 1 5CCCC8DF
P 3200 1400
F 0 "D2" H 3200 1524 50  0000 C CNN
F 1 "D_Zener" H 3200 1300 50  0001 C CNN
F 2 "Diode_SMD:D_SMB_Handsoldering" H 3200 1400 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/54/mbj-778392.pdf" H 3200 1400 50  0001 C CNN
F 4 "https://www.mouser.com/ProductDetail/Bourns/SMBJ26CA-H?qs=sGAEpiMZZMvxHShE6WhpuzFJKAwOiSVmlqTrfISDsZs%3D" H 3200 1400 50  0001 C CNN "Website"
F 5 "SMBJ26CA-H" H 3200 1400 50  0001 C CNN "Part Number"
	1    3200 1400
	1    0    0    -1  
$EndComp
$Comp
L open-automation:Barrel_Jack_OD5.5_ID2.5 J11
U 1 1 5CCAD62A
P 2750 3600
F 0 "J11" H 2600 3800 50  0000 C CNN
F 1 "Barrel_Jack_OD5.5_ID2.5" H 2750 3400 50  0001 C CNN
F 2 "open-automation:BarrelJack_OD5.5_ID2.5" H 2750 3300 50  0001 C CNN
F 3 "https://www.cui.com/product/resource/pj-202b.pdf" H 2800 3560 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/cui-inc/PJ-202B/CP-202B-ND/252008" H 2700 3200 50  0001 C CNN "Website"
F 5 "PJ-202A" H 2750 3600 50  0001 C CNN "Part Number"
	1    2750 3600
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR0104
U 1 1 5CCAD634
P 3100 3750
F 0 "#PWR0104" H 3100 3500 50  0001 C CNN
F 1 "GND" H 3100 3600 50  0000 C CNN
F 2 "" H 3100 3750 50  0000 C CNN
F 3 "" H 3100 3750 50  0000 C CNN
	1    3100 3750
	1    0    0    -1  
$EndComp
Wire Wire Line
	3050 3700 3100 3700
Wire Wire Line
	3100 3700 3100 3750
Wire Wire Line
	3050 3600 3100 3600
Wire Wire Line
	3100 3600 3100 3700
Connection ~ 3100 3700
Text Label 3100 3500 0    50   ~ 0
BATTERY
Wire Wire Line
	3100 3500 3050 3500
Text Label 6150 1450 2    50   ~ 0
3V3
$Comp
L open-automation:R_20K R18
U 1 1 5CF849C8
P 6350 1700
F 0 "R18" V 6350 1650 50  0000 L CNN
F 1 "R_20K" V 6250 1600 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 6280 1700 50  0001 C CNN
F 3 "" V 6430 1700 50  0001 C CNN
F 4 "RC0603JR-0720KL" V 6530 1800 60  0001 C CNN "Part Number"
	1    6350 1700
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:R_20K R17
U 1 1 5CF897E8
P 6350 1450
F 0 "R17" V 6350 1400 50  0000 L CNN
F 1 "R_20K" V 6450 1300 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 6280 1450 50  0001 C CNN
F 3 "" V 6430 1450 50  0001 C CNN
F 4 "RC0603JR-0720KL" V 6530 1550 60  0001 C CNN "Part Number"
	1    6350 1450
	0    1    1    0   
$EndComp
Wire Wire Line
	6200 1700 6150 1700
Wire Wire Line
	6200 1450 6150 1450
Text Label 6550 1450 0    50   ~ 0
DISPLAY_EN
Text Label 6550 1700 0    50   ~ 0
MAIN_EN
Wire Wire Line
	6550 1700 6500 1700
Wire Wire Line
	6550 1450 6500 1450
Wire Wire Line
	8100 3650 8150 3650
Wire Wire Line
	8150 5300 8200 5300
Text Label 6150 1700 2    50   ~ 0
3V3
Text Notes 6000 1300 0    50   ~ 0
power enable pullups 
Wire Wire Line
	6250 5850 6250 5800
Wire Wire Line
	6250 5800 6200 5800
Wire Wire Line
	5400 5800 5450 5800
Wire Wire Line
	5400 5700 5400 5800
Wire Wire Line
	5400 5600 5400 5500
$EndSCHEMATC
