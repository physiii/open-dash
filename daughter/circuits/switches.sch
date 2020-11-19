EESchema Schematic File Version 4
LIBS:open-dash-daughterboard-cache
EELAYER 26 0
EELAYER END
$Descr USLetter 11000 8500
encoding utf-8
Sheet 12 14
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
L open-dash-daughterboard-rescue:LED-open-automation D2
U 1 1 59092D24
P 3225 3325
F 0 "D2" V 3200 3425 50  0000 C CNN
F 1 "LED" V 3325 3250 50  0000 C CNN
F 2 "LEDs:LED_0603_HandSoldering" H 3225 3325 50  0001 C CNN
F 3 "http://www.osram-os.com/Graphics/XPic9/00128792_0.pdf" H 3225 3325 50  0001 C CNN
F 4 "475-2512-2-ND" H 3225 3325 60  0001 C CNN "Part Number"
	1    3225 3325
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:touchpad U10
U 1 1 590F8D3B
P 7950 4800
F 0 "U10" H 8100 4600 60  0000 C CNN
F 1 "touchpad" H 7950 5000 60  0000 C CNN
F 2 "open-automation:touch-pad" H 7950 4800 60  0001 C CNN
F 3 "" H 7950 4800 60  0001 C CNN
	1    7950 4800
	1    0    0    -1  
$EndComp
$Comp
L open-automation:USB_A_2 P5
U 1 1 59693837
P 7850 3000
F 0 "P5" H 8100 2800 50  0000 C CNN
F 1 "USB_A_2" H 7800 3200 50  0000 C CNN
F 2 "open-automation:USB_A_2" V 7800 2900 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/cnc-tech/1002-004-01010/1175-1018-ND/3064749" V 7800 2900 50  0001 C CNN
F 4 "1002-004-01010" H 7850 3000 60  0001 C CNN "Part Number"
	1    7850 3000
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR0121
U 1 1 5B1799B0
P 8000 3400
F 0 "#PWR0121" H 8000 3150 50  0001 C CNN
F 1 "GND" H 8000 3250 50  0000 C CNN
F 2 "" H 8000 3400 50  0000 C CNN
F 3 "" H 8000 3400 50  0000 C CNN
	1    8000 3400
	1    0    0    -1  
$EndComp
Wire Wire Line
	8000 3300 8000 3350
Wire Wire Line
	8250 2900 8250 3350
Wire Wire Line
	8250 3350 8000 3350
Connection ~ 8000 3350
Wire Wire Line
	7400 3300 7400 3400
Wire Wire Line
	7400 3400 7350 3400
$Comp
L open-automation:housing-mounts U4
U 1 1 5B1799B1
P 7925 4225
F 0 "U4" H 8075 4125 60  0000 C CNN
F 1 "housing-mounts" H 7925 4425 60  0000 C CNN
F 2 "open-automation:enclosure-25x38" H 7925 4275 60  0001 C CNN
F 3 "https://www.mcmaster.com/#catalog/123/904/=18nyvt2" H 7925 4275 60  0001 C CNN
	1    7925 4225
	1    0    0    -1  
$EndComp
$Comp
L open-automation:SW_PUSH FACTORY1
U 1 1 59C587B8
P 3225 4175
F 0 "FACTORY1" H 3225 4350 50  0000 C CNN
F 1 "SW_PUSH" H 3225 4095 50  0000 C CNN
F 2 "Buttons_Switches_SMD:SW_SPST_KMR2" H 3225 4175 50  0001 C CNN
F 3 "http://www.mouser.com/ds/2/60/KMR2_9aug12-25127.pdf" H 3225 4175 50  0001 C CNN
F 4 "KMR211NG LFS" H 3225 4175 60  0001 C CNN "Part Number"
	1    3225 4175
	0    1    1    0   
$EndComp
$Comp
L open-automation:GND #PWR0122
U 1 1 5B1799B3
P 3225 4550
F 0 "#PWR0122" H 3225 4300 50  0001 C CNN
F 1 "GND" H 3225 4400 50  0000 C CNN
F 2 "" H 3225 4550 50  0000 C CNN
F 3 "" H 3225 4550 50  0000 C CNN
	1    3225 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	3225 4550 3225 4475
$Comp
L open-automation:R_10k R2
U 1 1 59E3E4D2
P 3225 3675
F 0 "R2" V 3225 3675 50  0000 C CNN
F 1 "R_10k" V 3125 3675 50  0000 C CNN
F 2 "Resistors_SMD:R_0603_HandSoldering" V 3155 3675 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 3305 3675 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 3405 3775 60  0001 C CNN "Part Number"
	1    3225 3675
	1    0    0    -1  
$EndComp
Wire Wire Line
	3225 3475 3225 3525
Wire Wire Line
	3225 3125 3225 3175
Wire Wire Line
	3225 3825 3225 3850
Wire Wire Line
	3350 3850 3225 3850
Connection ~ 3225 3850
$Comp
L open-dash-daughterboard-rescue:LED-open-automation D3
U 1 1 59E3EE41
P 4175 3325
F 0 "D3" V 4150 3425 50  0000 C CNN
F 1 "LED" V 4275 3250 50  0000 C CNN
F 2 "LEDs:LED_0603_HandSoldering" H 4175 3325 50  0001 C CNN
F 3 "http://www.osram-os.com/Graphics/XPic9/00128792_0.pdf" H 4175 3325 50  0001 C CNN
F 4 "475-2512-2-ND" H 4175 3325 60  0001 C CNN "Part Number"
	1    4175 3325
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:SW_PUSH REBOOT1
U 1 1 59E3EE49
P 4175 4175
F 0 "REBOOT1" H 4175 4350 50  0000 C CNN
F 1 "SW_PUSH" H 4175 4095 50  0000 C CNN
F 2 "Buttons_Switches_SMD:SW_SPST_KMR2" H 4175 4175 50  0001 C CNN
F 3 "http://www.mouser.com/ds/2/60/KMR2_9aug12-25127.pdf" H 4175 4175 50  0001 C CNN
F 4 "KMR211NG LFS" H 4175 4175 60  0001 C CNN "Part Number"
	1    4175 4175
	0    1    1    0   
$EndComp
$Comp
L open-automation:GND #PWR0123
U 1 1 59E3EE50
P 4175 4550
F 0 "#PWR0123" H 4175 4300 50  0001 C CNN
F 1 "GND" H 4175 4400 50  0000 C CNN
F 2 "" H 4175 4550 50  0000 C CNN
F 3 "" H 4175 4550 50  0000 C CNN
	1    4175 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	4175 4550 4175 4475
$Comp
L open-automation:R_10k R3
U 1 1 59E3EE58
P 4175 3675
F 0 "R3" V 4175 3675 50  0000 C CNN
F 1 "R_10k" V 4075 3675 50  0000 C CNN
F 2 "Resistors_SMD:R_0603_HandSoldering" V 4105 3675 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 4255 3675 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 4355 3775 60  0001 C CNN "Part Number"
	1    4175 3675
	1    0    0    -1  
$EndComp
Wire Wire Line
	4175 3475 4175 3525
Wire Wire Line
	4175 3125 4175 3175
Wire Wire Line
	4175 3825 4175 3850
Wire Wire Line
	4300 3850 4175 3850
Connection ~ 4175 3850
$Comp
L open-dash-daughterboard-rescue:LED-open-automation D5
U 1 1 59E3F1C3
P 5000 3325
F 0 "D5" V 4975 3425 50  0000 C CNN
F 1 "LED" V 5100 3250 50  0000 C CNN
F 2 "LEDs:LED_0603_HandSoldering" H 5000 3325 50  0001 C CNN
F 3 "http://www.osram-os.com/Graphics/XPic9/00128792_0.pdf" H 5000 3325 50  0001 C CNN
F 4 "475-2512-2-ND" H 5000 3325 60  0001 C CNN "Part Number"
	1    5000 3325
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:SW_PUSH PROG1
U 1 1 59E3F1CB
P 5000 4175
F 0 "PROG1" H 5000 4350 50  0000 C CNN
F 1 "SW_PUSH" H 5000 4095 50  0000 C CNN
F 2 "Buttons_Switches_SMD:SW_SPST_KMR2" H 5000 4175 50  0001 C CNN
F 3 "http://www.mouser.com/ds/2/60/KMR2_9aug12-25127.pdf" H 5000 4175 50  0001 C CNN
F 4 "KMR211NG LFS" H 5000 4175 60  0001 C CNN "Part Number"
	1    5000 4175
	0    1    1    0   
$EndComp
$Comp
L open-automation:GND #PWR0124
U 1 1 5B1799BB
P 5000 4550
F 0 "#PWR0124" H 5000 4300 50  0001 C CNN
F 1 "GND" H 5000 4400 50  0000 C CNN
F 2 "" H 5000 4550 50  0000 C CNN
F 3 "" H 5000 4550 50  0000 C CNN
	1    5000 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	5000 4550 5000 4475
$Comp
L open-automation:R_10k R4
U 1 1 59E3F1DA
P 5000 3675
F 0 "R4" V 5000 3675 50  0000 C CNN
F 1 "R_10k" V 4900 3675 50  0000 C CNN
F 2 "Resistors_SMD:R_0603_HandSoldering" V 4930 3675 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0710KL/311-10KGRCT-ND/729647" V 5080 3675 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 5180 3775 60  0001 C CNN "Part Number"
	1    5000 3675
	1    0    0    -1  
$EndComp
Wire Wire Line
	5000 3475 5000 3525
Wire Wire Line
	5000 3125 5000 3175
Wire Wire Line
	5000 3825 5000 3850
Wire Wire Line
	5125 3850 5000 3850
Connection ~ 5000 3850
Wire Wire Line
	7850 3400 7850 3300
Wire Wire Line
	7750 3400 7750 3300
Wire Wire Line
	7650 3400 7650 3300
Wire Wire Line
	7550 3400 7550 3300
Wire Wire Line
	8000 3350 8000 3400
Wire Wire Line
	3225 3850 3225 3875
Wire Wire Line
	4175 3850 4175 3875
Wire Wire Line
	5000 3850 5000 3875
Text HLabel 7350 3400 0    60   Input ~ 0
V_USB
Text HLabel 7550 3400 3    60   Input ~ 0
TXD
Text HLabel 7650 3400 3    60   Input ~ 0
RXD
Text HLabel 7750 3400 3    60   Input ~ 0
TXD
Text HLabel 7850 3400 3    60   Input ~ 0
RXD
Text HLabel 7450 4800 0    60   Input ~ 0
FACTORY
Wire Wire Line
	7550 4800 7450 4800
Text HLabel 3350 3850 2    60   Input ~ 0
FACTORY
Text HLabel 4300 3850 2    60   Input ~ 0
EN
Text HLabel 5125 3850 2    60   Input ~ 0
PROG
Text HLabel 4175 3125 1    60   Input ~ 0
3v3
Text HLabel 5000 3125 1    60   Input ~ 0
3v3
Text HLabel 3225 3125 1    60   Input ~ 0
3v3
$EndSCHEMATC
