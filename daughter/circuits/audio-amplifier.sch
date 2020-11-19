EESchema Schematic File Version 4
LIBS:open-dash-daughterboard-cache
EELAYER 29 0
EELAYER END
$Descr USLetter 11000 8500
encoding utf-8
Sheet 7 7
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
L open-automation:GND #PWR062
U 1 1 5AC7C45C
P 3150 3500
F 0 "#PWR062" H 3150 3250 50  0001 C CNN
F 1 "GND" V 3100 3350 50  0000 C CNN
F 2 "" H 3150 3500 50  0000 C CNN
F 3 "" H 3150 3500 50  0000 C CNN
	1    3150 3500
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:GND #PWR067
U 1 1 5B200BCF
P 6300 3000
F 0 "#PWR067" H 6300 2750 50  0001 C CNN
F 1 "GND" H 6300 2850 50  0000 C CNN
F 2 "" H 6300 3000 50  0000 C CNN
F 3 "" H 6300 3000 50  0000 C CNN
	1    6300 3000
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_0.1uF C31
U 1 1 5B224815
P 6600 2800
F 0 "C31" H 6600 2900 50  0000 L CNN
F 1 "C_0.1uF" H 6600 2700 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 6700 3100 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 6600 2550 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 6725 3000 60  0001 C CNN "Part Number"
	1    6600 2800
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_1uF C29
U 1 1 5B2CAF63
P 6300 2800
F 0 "C29" H 6150 2900 50  0000 L CNN
F 1 "C_1uF" H 6050 2700 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 6400 3100 50  0001 C CNN
F 3 "https://www.murata.com/~/media/webrenewal/support/library/catalog/products/capacitor/mlcc/c03e.ashx?la=en-us" H 6300 2550 50  0001 C CNN
F 4 "GCM188R71C105KA64D" H 6425 3000 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/murata-electronics-north-america/GCM188R71C105KA64D/490-5241-1-ND/1979252" H 0   0   50  0001 C CNN "Website"
	1    6300 2800
	1    0    0    -1  
$EndComp
Wire Wire Line
	7100 3850 7150 3850
Wire Wire Line
	7150 3950 7100 3950
Wire Wire Line
	7100 4050 7150 4050
Wire Wire Line
	7150 4150 7100 4150
Wire Wire Line
	7100 4250 7150 4250
Wire Wire Line
	7150 4350 7100 4350
Wire Wire Line
	7100 4450 7150 4450
Wire Wire Line
	7150 4550 7100 4550
$Comp
L open-automation:GND #PWR070
U 1 1 5CBFA119
P 6650 5150
F 0 "#PWR070" H 6650 4900 50  0001 C CNN
F 1 "GND" H 6650 5000 50  0000 C CNN
F 2 "" H 6650 5150 50  0000 C CNN
F 3 "" H 6650 5150 50  0000 C CNN
	1    6650 5150
	1    0    0    -1  
$EndComp
Wire Wire Line
	6650 5050 6650 5100
Wire Wire Line
	6550 5050 6550 5100
Wire Wire Line
	6550 5100 6650 5100
Connection ~ 6650 5100
Wire Wire Line
	6650 5100 6650 5150
Wire Wire Line
	6450 5050 6450 5100
Wire Wire Line
	6450 5100 6550 5100
Connection ~ 6550 5100
Wire Wire Line
	6350 5050 6350 5100
Wire Wire Line
	6350 5100 6450 5100
Connection ~ 6450 5100
Wire Wire Line
	6250 5050 6250 5100
Wire Wire Line
	6250 5100 6350 5100
Connection ~ 6350 5100
Wire Wire Line
	6150 5050 6150 5100
Wire Wire Line
	6150 5100 6250 5100
Connection ~ 6250 5100
Wire Wire Line
	5600 3950 5550 3950
$Comp
L open-automation:C_0.1uF C23
U 1 1 5CC10031
P 4850 4350
F 0 "C23" V 4900 4150 50  0000 L CNN
F 1 "C_0.1uF" V 4800 4000 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4950 4650 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 4850 4100 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 4975 4550 60  0001 C CNN "Part Number"
	1    4850 4350
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:R_1k R33
U 1 1 5CC13A39
P 4500 4350
F 0 "R33" V 4400 4350 50  0000 C CNN
F 1 "R_1k" V 4500 4350 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 4430 4350 50  0001 C CNN
F 3 "" V 4580 4350 50  0001 C CNN
F 4 "ERJ-3GEYJ102V" V 4680 4450 60  0001 C CNN "Part Number"
	1    4500 4350
	0    1    1    0   
$EndComp
Text Label 5550 3850 2    50   ~ 0
POWER
Wire Wire Line
	4300 4350 4350 4350
Wire Wire Line
	4650 4350 4700 4350
$Comp
L open-automation:C_0.1uF C24
U 1 1 5CC18F9C
P 4850 4600
F 0 "C24" V 4900 4400 50  0000 L CNN
F 1 "C_0.1uF" V 4800 4250 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4950 4900 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 4850 4350 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 4975 4800 60  0001 C CNN "Part Number"
	1    4850 4600
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:R_1k R34
U 1 1 5CC18FAB
P 4500 4600
F 0 "R34" V 4400 4600 50  0000 C CNN
F 1 "R_1k" V 4500 4600 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 4430 4600 50  0001 C CNN
F 3 "" V 4580 4600 50  0001 C CNN
F 4 "ERJ-3GEYJ102V" V 4680 4700 60  0001 C CNN "Part Number"
	1    4500 4600
	0    1    1    0   
$EndComp
Wire Wire Line
	4300 4600 4350 4600
Wire Wire Line
	4650 4600 4700 4600
$Comp
L open-automation:C_0.1uF C25
U 1 1 5CC19662
P 4850 4850
F 0 "C25" V 4900 4650 50  0000 L CNN
F 1 "C_0.1uF" V 4800 4500 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4950 5150 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 4850 4600 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 4975 5050 60  0001 C CNN "Part Number"
	1    4850 4850
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:R_1k R35
U 1 1 5CC19671
P 4500 4850
F 0 "R35" V 4400 4850 50  0000 C CNN
F 1 "R_1k" V 4500 4850 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 4430 4850 50  0001 C CNN
F 3 "" V 4580 4850 50  0001 C CNN
F 4 "ERJ-3GEYJ102V" V 4680 4950 60  0001 C CNN "Part Number"
	1    4500 4850
	0    1    1    0   
$EndComp
Wire Wire Line
	4300 4850 4350 4850
Wire Wire Line
	4650 4850 4700 4850
$Comp
L open-automation:C_0.1uF C26
U 1 1 5CC19683
P 4850 5100
F 0 "C26" V 4900 4900 50  0000 L CNN
F 1 "C_0.1uF" V 4800 4750 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4950 5400 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 4850 4850 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 4975 5300 60  0001 C CNN "Part Number"
	1    4850 5100
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:R_1k R36
U 1 1 5CC19692
P 4500 5100
F 0 "R36" V 4400 5100 50  0000 C CNN
F 1 "R_1k" V 4500 5100 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 4430 5100 50  0001 C CNN
F 3 "" V 4580 5100 50  0001 C CNN
F 4 "ERJ-3GEYJ102V" V 4680 5200 60  0001 C CNN "Part Number"
	1    4500 5100
	0    1    1    0   
$EndComp
Wire Wire Line
	4300 5100 4350 5100
Wire Wire Line
	4650 5100 4700 5100
Wire Wire Line
	5000 4350 5600 4350
Wire Wire Line
	5000 4600 5100 4600
Wire Wire Line
	5100 4600 5100 4450
Wire Wire Line
	5100 4450 5600 4450
Wire Wire Line
	5000 4850 5250 4850
Wire Wire Line
	5250 4850 5250 4550
Wire Wire Line
	5250 4550 5600 4550
Wire Wire Line
	5000 5100 5350 5100
Wire Wire Line
	5350 5100 5350 4650
Wire Wire Line
	5350 4650 5600 4650
Text Label 2700 3500 0    50   ~ 0
MUTE
Text Label 5550 4250 2    50   ~ 0
MUTE
Wire Wire Line
	5550 4250 5600 4250
Text Label 5550 4150 2    50   ~ 0
STBY
Wire Wire Line
	5550 4150 5600 4150
Text Label 5550 4050 2    50   ~ 0
OD
Wire Wire Line
	5550 4050 5600 4050
Wire Wire Line
	3150 3500 3100 3500
Wire Wire Line
	2350 3500 2400 3500
$Comp
L open-automation:GND #PWR063
U 1 1 5CC4D3C7
P 3250 3100
F 0 "#PWR063" H 3250 2850 50  0001 C CNN
F 1 "GND" V 3200 2950 50  0000 C CNN
F 2 "" H 3250 3100 50  0000 C CNN
F 3 "" H 3250 3100 50  0000 C CNN
	1    3250 3100
	0    -1   -1   0   
$EndComp
Wire Wire Line
	3250 3100 3200 3100
$Comp
L open-automation:C_1uF C22
U 1 1 5CC4FB58
P 3050 3100
F 0 "C22" V 3000 2900 50  0000 L CNN
F 1 "C_1uF" V 2900 3000 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 3150 3400 50  0001 C CNN
F 3 "https://www.murata.com/~/media/webrenewal/support/library/catalog/products/capacitor/mlcc/c03e.ashx?la=en-us" H 3050 2850 50  0001 C CNN
F 4 "GCM188R71C105KA64D" H 3175 3300 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/murata-electronics-north-america/GCM188R71C105KA64D/490-5241-1-ND/1979252" H 0   0   50  0001 C CNN "Website"
	1    3050 3100
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:C_1uF C21
U 1 1 5CC50D4D
P 2950 3500
F 0 "C21" V 2900 3300 50  0000 L CNN
F 1 "C_1uF" V 2800 3350 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 3050 3800 50  0001 C CNN
F 3 "https://www.murata.com/~/media/webrenewal/support/library/catalog/products/capacitor/mlcc/c03e.ashx?la=en-us" H 2950 3250 50  0001 C CNN
F 4 "GCM188R71C105KA64D" H 3075 3700 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/murata-electronics-north-america/GCM188R71C105KA64D/490-5241-1-ND/1979252" H 0   0   50  0001 C CNN "Website"
	1    2950 3500
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:C_47uF C27
U 1 1 5CC5C9F6
P 5900 5950
F 0 "C27" H 6000 5950 50  0000 L CNN
F 1 "C_47uF" H 5900 5850 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 6000 6250 50  0001 C CNN
F 3 "" H 5900 5700 50  0001 C CNN
F 4 "GRM188R60G476ME15D" H 6025 6150 60  0001 C CNN "Part Number"
	1    5900 5950
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR065
U 1 1 5CC61209
P 5900 6150
F 0 "#PWR065" H 5900 5900 50  0001 C CNN
F 1 "GND" H 5900 6000 50  0000 C CNN
F 2 "" H 5900 6150 50  0000 C CNN
F 3 "" H 5900 6150 50  0000 C CNN
	1    5900 6150
	1    0    0    -1  
$EndComp
Wire Wire Line
	5900 6150 5900 6100
Text Label 5900 5750 0    50   ~ 0
SVR
Wire Wire Line
	5900 5750 5900 5800
Text Label 5950 5100 3    50   ~ 0
SVR
Wire Wire Line
	5950 5100 5950 5050
$Comp
L open-automation:GND #PWR068
U 1 1 5CC62B1D
P 6300 6150
F 0 "#PWR068" H 6300 5900 50  0001 C CNN
F 1 "GND" H 6300 6000 50  0000 C CNN
F 2 "" H 6300 6150 50  0000 C CNN
F 3 "" H 6300 6150 50  0000 C CNN
	1    6300 6150
	1    0    0    -1  
$EndComp
Wire Wire Line
	6300 6150 6300 6100
Text Label 6300 5750 0    50   ~ 0
AC_GND
Wire Wire Line
	6300 5750 6300 5800
Text Label 6050 5100 3    50   ~ 0
AC_GND
Wire Wire Line
	6050 5100 6050 5050
$Comp
L open-automation:C_0.470uF C30
U 1 1 5CC6B3DC
P 6300 5950
F 0 "C30" H 6400 5950 50  0000 L CNN
F 1 "C_0.47uF" H 6300 5850 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 6400 6250 50  0001 C CNN
F 3 "https://www.mouser.com/datasheet/2/445/885012206075-554589.pdf" H 6300 5700 50  0001 C CNN
F 4 "885012206075" H 6425 6150 60  0001 C CNN "Part Number"
F 5 "https://www.mouser.com/ProductDetail/Wurth-Electronics/885012206075?qs=sGAEpiMZZMs0AnBnWHyRQEGbLOF2VP1i35TeX6K3n4AZTwQpyzLezQ%3D%3D" H 0   0   50  0001 C CNN "Website"
	1    6300 5950
	1    0    0    -1  
$EndComp
$Comp
L open-automation:R_47.5k R37
U 1 1 5CC75CA6
P 6800 5950
F 0 "R37" V 6800 5900 50  0000 L CNN
F 1 "R_47.5k" V 6900 5800 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 6730 5950 50  0001 C CNN
F 3 "" V 6880 5950 50  0001 C CNN
F 4 "ERJ-3EKF4752V" V 6980 6050 60  0001 C CNN "Part Number"
	1    6800 5950
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR071
U 1 1 5CC7689C
P 6800 6150
F 0 "#PWR071" H 6800 5900 50  0001 C CNN
F 1 "GND" H 6800 6000 50  0000 C CNN
F 2 "" H 6800 6150 50  0000 C CNN
F 3 "" H 6800 6150 50  0000 C CNN
	1    6800 6150
	1    0    0    -1  
$EndComp
Wire Wire Line
	6800 6150 6800 6100
Text Label 6800 5750 0    50   ~ 0
OD
Wire Wire Line
	6800 5750 6800 5800
$Comp
L open-automation:R_47.5k R32
U 1 1 5CC79680
P 2550 3500
F 0 "R32" V 2550 3450 50  0000 L CNN
F 1 "R_47.5k" V 2650 3400 50  0000 L CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 2480 3500 50  0001 C CNN
F 3 "" V 2630 3500 50  0001 C CNN
F 4 "ERJ-3EKF4752V" V 2730 3600 60  0001 C CNN "Part Number"
	1    2550 3500
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:GND #PWR061
U 1 1 5CBD5444
P 2600 4750
F 0 "#PWR061" H 2600 4500 50  0001 C CNN
F 1 "GND" H 2600 4600 50  0000 C CNN
F 2 "" H 2600 4750 50  0000 C CNN
F 3 "" H 2600 4750 50  0000 C CNN
	1    2600 4750
	1    0    0    -1  
$EndComp
Wire Wire Line
	2550 4400 2600 4400
Wire Wire Line
	2600 4700 2550 4700
Text Label 2600 4600 0    50   ~ 0
IN1
Wire Wire Line
	2600 4750 2600 4700
Text Label 2600 4400 0    50   ~ 0
IN2
Wire Wire Line
	2600 4600 2550 4600
$Comp
L open-automation:GND #PWR064
U 1 1 5CC0386A
P 3550 4750
F 0 "#PWR064" H 3550 4500 50  0001 C CNN
F 1 "GND" H 3550 4600 50  0000 C CNN
F 2 "" H 3550 4750 50  0000 C CNN
F 3 "" H 3550 4750 50  0000 C CNN
	1    3550 4750
	1    0    0    -1  
$EndComp
Wire Wire Line
	3500 4400 3550 4400
Wire Wire Line
	3550 4700 3500 4700
Text Label 3550 4600 0    50   ~ 0
IN3
Wire Wire Line
	3550 4750 3550 4700
Text Label 3550 4400 0    50   ~ 0
IN4
Wire Wire Line
	3550 4600 3500 4600
Text Label 4300 4350 2    50   ~ 0
IN1
Text Label 4300 4600 2    50   ~ 0
IN2
Text Label 4300 4850 2    50   ~ 0
IN3
Text Label 4300 5100 2    50   ~ 0
IN4
Text Label 2800 3100 0    50   ~ 0
STBY
Wire Wire Line
	2700 3500 2800 3500
Text HLabel 3150 1750 0    60   Input ~ 0
LR_AUDIO_OUT+
Text HLabel 3150 1950 0    60   Input ~ 0
RR_AUDIO_OUT+
Text HLabel 3150 1250 0    60   Input ~ 0
LF_AUDIO_OUT-
Text HLabel 3150 1450 0    60   Input ~ 0
RF_AUDIO_OUT-
Text HLabel 3150 1550 0    60   Input ~ 0
RF_AUDIO_OUT+
Text HLabel 3150 1850 0    60   Input ~ 0
RR_AUDIO_OUT-
Text HLabel 3150 1350 0    60   Input ~ 0
LF_AUDIO_OUT+
Text HLabel 3150 1650 0    60   Input ~ 0
LR_AUDIO_OUT-
Wire Wire Line
	3200 1950 3150 1950
Wire Wire Line
	3150 1850 3200 1850
Wire Wire Line
	3200 1750 3150 1750
Wire Wire Line
	3150 1650 3200 1650
Wire Wire Line
	3200 1550 3150 1550
Wire Wire Line
	3150 1450 3200 1450
Wire Wire Line
	3200 1350 3150 1350
Wire Wire Line
	3150 1250 3200 1250
Text Label 3200 1250 0    50   ~ 0
OUT1-
Text Label 3200 1350 0    50   ~ 0
OUT1+
Text Label 3200 1450 0    50   ~ 0
OUT2-
Text Label 3200 1550 0    50   ~ 0
OUT2+
Text Label 3200 1650 0    50   ~ 0
OUT3-
Text Label 3200 1750 0    50   ~ 0
OUT3+
Text Label 3200 1850 0    50   ~ 0
OUT4-
Text Label 3200 1950 0    50   ~ 0
OUT4+
Text Label 7150 3850 0    50   ~ 0
OUT1-
Text Label 7150 3950 0    50   ~ 0
OUT1+
Text Label 7150 4050 0    50   ~ 0
OUT2-
Text Label 7150 4150 0    50   ~ 0
OUT2+
Text Label 7150 4250 0    50   ~ 0
OUT3-
Text Label 7150 4350 0    50   ~ 0
OUT3+
Text Label 7150 4450 0    50   ~ 0
OUT4-
Text Label 7150 4550 0    50   ~ 0
OUT4+
Text HLabel 1700 1300 0    60   Input ~ 0
AUDIO_STBY
Wire Wire Line
	1700 1300 1750 1300
Text HLabel 1700 1400 0    60   Input ~ 0
AUDIO_MUTE
Wire Wire Line
	1700 1400 1750 1400
Text Label 2300 3100 2    50   ~ 0
AUDIO_STBY
Wire Wire Line
	2350 3100 2300 3100
Wire Wire Line
	2750 3100 2900 3100
Text Label 2350 3500 2    50   ~ 0
AUDIO_MUTE
Text HLabel 1700 1500 0    60   Input ~ 0
AUDIO_POWER
Text Label 1750 1500 0    50   ~ 0
POWER
Wire Wire Line
	1700 1500 1750 1500
$Comp
L open-automation:GND #PWR066
U 1 1 5CC0A9BD
P 5950 3000
F 0 "#PWR066" H 5950 2750 50  0001 C CNN
F 1 "GND" H 5950 2850 50  0000 C CNN
F 2 "" H 5950 3000 50  0000 C CNN
F 3 "" H 5950 3000 50  0000 C CNN
	1    5950 3000
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR069
U 1 1 5CC0C325
P 6600 3000
F 0 "#PWR069" H 6600 2750 50  0001 C CNN
F 1 "GND" H 6600 2850 50  0000 C CNN
F 2 "" H 6600 3000 50  0000 C CNN
F 3 "" H 6600 3000 50  0000 C CNN
	1    6600 3000
	1    0    0    -1  
$EndComp
Text Label 6200 2650 2    50   ~ 0
POWER
Wire Wire Line
	5950 3000 5950 2950
Wire Wire Line
	6300 3000 6300 2950
Wire Wire Line
	6300 2650 5950 2650
Wire Wire Line
	6600 2650 6300 2650
Connection ~ 6300 2650
Wire Wire Line
	6600 2950 6600 3000
Wire Wire Line
	2800 5350 2750 5350
Wire Wire Line
	2800 5450 2750 5450
Wire Wire Line
	2800 5650 2750 5650
Text Label 2800 5650 0    50   ~ 0
IN1
Text Label 2800 5550 0    50   ~ 0
IN2
Text Label 2800 5350 0    50   ~ 0
IN4
Text Label 2800 5450 0    50   ~ 0
IN3
Wire Wire Line
	2800 5550 2750 5550
Wire Wire Line
	5550 3950 5550 3850
Wire Wire Line
	5550 3850 5600 3850
$Comp
L open-automation:R_10K R?
U 1 1 5CC3371E
P 2550 3100
AR Path="/5A7BADDB/5CC3371E" Ref="R?"  Part="1" 
AR Path="/5ABD1806/5CC3371E" Ref="R31"  Part="1" 
F 0 "R31" V 2550 3100 50  0000 C CNN
F 1 "R_10K" V 2650 3100 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 2480 3100 50  0001 C CNN
F 3 "" V 2630 3100 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 2730 3200 60  0001 C CNN "Part Number"
	1    2550 3100
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:TDA7851F U14
U 1 1 5CBEF223
P 6350 4200
F 0 "U14" H 6350 4815 50  0000 C CNN
F 1 "TDA7851F" H 6350 4724 50  0000 C CNN
F 2 "open-automation:Flexiwatt25-V" H 6350 4800 50  0001 C CNN
F 3 "https://www.st.com/content/ccc/resource/technical/document/datasheet/04/31/d3/4a/29/2a/41/b6/CD00278573.pdf/files/CD00278573.pdf/jcr:content/translations/en.CD00278573.pdf" H 6900 4700 50  0001 C CNN
F 4 "TDA7851F" H 6350 4700 50  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/stmicroelectronics/TDA7851F/497-11760-5-ND/2214752" H 0   0   50  0001 C CNN "Website"
	1    6350 4200
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x05 J10
U 1 1 5CC71579
P 2550 5550
F 0 "J10" H 2468 5125 50  0000 C CNN
F 1 "Conn_01x05" H 2468 5216 50  0000 C CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x05_P2.54mm_Vertical" H 2550 5550 50  0001 C CNN
F 3 "~" H 2550 5550 50  0001 C CNN
	1    2550 5550
	-1   0    0    1   
$EndComp
$Comp
L open-automation:GND #PWR0102
U 1 1 5CC7B1B2
P 2800 5800
F 0 "#PWR0102" H 2800 5550 50  0001 C CNN
F 1 "GND" H 2800 5650 50  0000 C CNN
F 2 "" H 2800 5800 50  0000 C CNN
F 3 "" H 2800 5800 50  0000 C CNN
	1    2800 5800
	1    0    0    -1  
$EndComp
Wire Wire Line
	2800 5800 2800 5750
Wire Wire Line
	2800 5750 2750 5750
Text Label 1750 1300 0    50   ~ 0
AUDIO_STBY
Text Label 1750 1400 0    50   ~ 0
AUDIO_MUTE
$Comp
L open-automation:AudioJack_3.5TRS J8
U 1 1 5CD5A35B
P 2350 4500
F 0 "J8" H 2307 4725 50  0000 C CNN
F 1 "AudioJack_3.5TRS" H 2300 4150 50  0001 C CNN
F 2 "open-automation:AudioJack_SJ1-3525N" H 2300 3950 50  0001 C CNN
F 3 "https://www.cui.com/product/resource/sj1-352xn-series.pdf" H 2350 4500 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/cui-inc/SJ1-3525N/CP1-3525N-ND/738687" H 2000 4050 50  0001 C CNN "Website"
F 5 "SJ1-3525N" H 2250 3850 50  0001 C CNN "Part Number"
	1    2350 4500
	1    0    0    -1  
$EndComp
$Comp
L open-automation:AudioJack_3.5TRS J9
U 1 1 5CD5F394
P 3300 4500
F 0 "J9" H 3257 4725 50  0000 C CNN
F 1 "AudioJack_3.5TRS" H 3250 4150 50  0001 C CNN
F 2 "open-automation:AudioJack_SJ1-3525N" H 3250 3950 50  0001 C CNN
F 3 "https://www.cui.com/product/resource/sj1-352xn-series.pdf" H 3300 4500 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/cui-inc/SJ1-3525N/CP1-3525N-ND/738687" H 2950 4050 50  0001 C CNN "Website"
F 5 "SJ1-3525N" H 3200 3850 50  0001 C CNN "Part Number"
	1    3300 4500
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_470uF C28
U 1 1 5D065E91
P 5950 2800
F 0 "C28" H 5750 2800 50  0000 L CNN
F 1 "C_470uF" H 5600 2700 50  0000 L CNN
F 2 "Capacitor_THT:CP_Radial_D8.0mm_P3.50mm" H 5950 2800 50  0001 C CNN
F 3 "https://katalog.we-online.de/pbs/datasheet/860020474014.pdf" H 5950 2800 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/wurth-electronics-inc/860020474014/732-8831-3-ND/5727068" H 5950 2800 50  0001 C CNN "Supplier"
F 5 " 860020474014" H 5950 2800 50  0001 C CNN "Part Number"
	1    5950 2800
	1    0    0    -1  
$EndComp
$EndSCHEMATC
