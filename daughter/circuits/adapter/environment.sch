EESchema Schematic File Version 5
LIBS:open-dash-daughterboard-cache
EELAYER 29 0
EELAYER END
$Descr USLetter 11000 8500
encoding utf-8
Sheet 6 13
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
L open-automation:GND #PWR037
U 1 1 59C50BD3
P 3325 3550
F 0 "#PWR037" H 3325 3300 50  0001 C CNN
F 1 "GND" H 3325 3400 50  0000 C CNN
F 2 "" H 3325 3550 50  0000 C CNN
F 3 "" H 3325 3550 50  0000 C CNN
	1    3325 3550
	1    0    0    -1  
$EndComp
$Comp
L open-automation:SI7020-A20 U9
U 1 1 59C50BD4
P 3825 3500
F 0 "U9" H 4025 3400 60  0000 C CNN
F 1 "SI7020-A20" H 3825 3700 60  0000 C CNN
F 2 "open-automation:SI7020-A20" H 3825 3200 60  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/silicon-labs/SI7020-A20-GM1R/336-3596-1-ND/5823452" H 3825 3300 60  0001 C CNN
F 4 "SI7020-A20-GM1R" H 3925 3300 60  0001 C CNN "Part Number"
	1    3825 3500
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR036
U 1 1 59C50BD6
P 3050 3800
F 0 "#PWR036" H 3050 3550 50  0001 C CNN
F 1 "GND" H 3050 3650 50  0000 C CNN
F 2 "" H 3050 3800 50  0000 C CNN
F 3 "" H 3050 3800 50  0000 C CNN
	1    3050 3800
	1    0    0    -1  
$EndComp
Text Label 3525 3175 0    60   ~ 0
Temp-Humidty
Wire Wire Line
	3375 3500 3325 3500
Wire Wire Line
	4325 3500 4225 3500
Wire Wire Line
	4225 3400 4325 3400
Wire Wire Line
	3325 3500 3325 3550
Text HLabel 2875 3400 0    60   Input ~ 0
3v3
Text HLabel 4325 3400 2    60   Input ~ 0
SCL
Text HLabel 4325 3500 2    60   Input ~ 0
SDA
$Comp
L open-automation:C_0.1uF C18
U 1 1 5B22240F
P 3050 3600
F 0 "C18" H 3165 3646 50  0000 L CNN
F 1 "C_0.1uF" H 3165 3555 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad0.99x1.00mm_HandSolder" H 3150 3900 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 3050 3350 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 3175 3800 60  0001 C CNN "Part Number"
	1    3050 3600
	1    0    0    -1  
$EndComp
Wire Wire Line
	2875 3400 3050 3400
Wire Wire Line
	3050 3400 3050 3450
Connection ~ 3050 3400
Wire Wire Line
	3050 3400 3375 3400
Wire Wire Line
	3050 3750 3050 3800
$EndSCHEMATC
