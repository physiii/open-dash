EESchema Schematic File Version 4
LIBS:open-dash-daughterboard-cache
EELAYER 26 0
EELAYER END
$Descr A 11000 8500
encoding utf-8
Sheet 9 14
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
L Connector_Generic:Conn_01x02 J1
U 1 1 5AE24043
P 8200 1700
F 0 "J1" H 8280 1692 50  0000 L CNN
F 1 "Conn_01x02" H 8280 1601 50  0000 L CNN
F 2 "" H 8200 1700 50  0001 C CNN
F 3 "~" H 8200 1700 50  0001 C CNN
	1    8200 1700
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x02 J2
U 1 1 5AE240A7
P 8250 2400
F 0 "J2" H 8330 2392 50  0000 L CNN
F 1 "Conn_01x02" H 8330 2301 50  0000 L CNN
F 2 "" H 8250 2400 50  0001 C CNN
F 3 "~" H 8250 2400 50  0001 C CNN
	1    8250 2400
	1    0    0    -1  
$EndComp
Text Notes 8000 1500 0    50   ~ 0
AM/FM Antenna
Text Notes 8000 2200 0    50   ~ 0
GPS Antenna
$Comp
L power:GNDA #PWR0111
U 1 1 5AE24110
P 7800 1900
F 0 "#PWR0111" H 7800 1650 50  0001 C CNN
F 1 "GNDA" H 7805 1727 50  0000 C CNN
F 2 "" H 7800 1900 50  0001 C CNN
F 3 "" H 7800 1900 50  0001 C CNN
	1    7800 1900
	1    0    0    -1  
$EndComp
$Comp
L power:GNDA #PWR0112
U 1 1 5AE24128
P 7900 2600
F 0 "#PWR0112" H 7900 2350 50  0001 C CNN
F 1 "GNDA" H 7905 2427 50  0000 C CNN
F 2 "" H 7900 2600 50  0001 C CNN
F 3 "" H 7900 2600 50  0001 C CNN
	1    7900 2600
	1    0    0    -1  
$EndComp
Wire Wire Line
	7800 1900 7800 1800
Wire Wire Line
	7800 1800 8000 1800
Wire Wire Line
	7900 2600 7900 2500
Wire Wire Line
	7900 2500 8050 2500
Text HLabel 7500 1700 0    50   Input ~ 0
AMF_Antenna
Text HLabel 7500 2400 0    50   Input ~ 0
GPS_Antenna
Wire Wire Line
	8000 1700 7500 1700
Wire Wire Line
	7500 2400 8050 2400
Text HLabel 4750 1000 0    50   Input ~ 0
can_+
Text HLabel 4750 1400 0    50   Input ~ 0
aux_R
Text HLabel 4750 1500 0    50   Input ~ 0
aux_ref
Text HLabel 4750 2150 0    50   Input ~ 0
can_-
Text HLabel 4750 2250 0    50   Input ~ 0
BL
Text HLabel 4750 2750 0    50   Input ~ 0
Ground
Text HLabel 4750 4000 0    50   Input ~ 0
Mic_-
Text HLabel 4750 4100 0    50   Input ~ 0
Mic_+
Text HLabel 4750 4300 0    50   Input ~ 0
CameraSignal
Text HLabel 4750 4400 0    50   Input ~ 0
CameraShield
Text HLabel 4750 4500 0    50   Input ~ 0
CameraReturn
Text HLabel 4750 5600 0    50   Input ~ 0
Ground
Text HLabel 4750 5700 0    50   Input ~ 0
12vAlwaysOn
Text HLabel 4750 5900 0    50   Input ~ 0
rightRearSpeaker+
Text HLabel 4750 6000 0    50   Input ~ 0
rightFrontSpeaker+
Text HLabel 4750 6100 0    50   Input ~ 0
leftFrontSpeaker+
Text HLabel 4750 6200 0    50   Input ~ 0
leftRearSpeaker+
Text HLabel 4750 6400 0    50   Input ~ 0
rightRearSpeaker-
Text HLabel 4750 6500 0    50   Input ~ 0
rightFrontSpeaker-
Text HLabel 4750 6600 0    50   Input ~ 0
leftFrontSpeaker-
Text HLabel 4750 6700 0    50   Input ~ 0
leftRearSpeaker-
Wire Wire Line
	4750 4000 5100 4000
Wire Wire Line
	5100 4100 4750 4100
Wire Wire Line
	5100 4300 4750 4300
Wire Wire Line
	4750 4400 5100 4400
Wire Wire Line
	5100 4500 4750 4500
Wire Wire Line
	4750 5600 5100 5600
Wire Wire Line
	5100 5700 4750 5700
Wire Wire Line
	4750 5900 5100 5900
Wire Wire Line
	5100 6000 4750 6000
Wire Wire Line
	4750 6100 5100 6100
Wire Wire Line
	5100 6200 4750 6200
Wire Wire Line
	4750 6400 5100 6400
Wire Wire Line
	5100 6500 4750 6500
Wire Wire Line
	4750 6600 5100 6600
Wire Wire Line
	5100 6700 4750 6700
Wire Wire Line
	5100 1400 4750 1400
Wire Wire Line
	4750 1500 5100 1500
Wire Wire Line
	4750 1000 5100 1000
Wire Wire Line
	4750 2150 5100 2150
Wire Wire Line
	5100 2250 4750 2250
Wire Wire Line
	4750 2750 5100 2750
Text HLabel 4750 2650 0    50   Input ~ 0
auxDet
Text HLabel 4750 2550 0    50   Input ~ 0
auxL
Wire Wire Line
	5100 2550 4750 2550
$Comp
L Connector_Specialized:USB_B_Mini J?
U 1 1 5AE8CF4C
P 8800 4000
F 0 "J?" H 8571 3991 50  0000 R CNN
F 1 "USB_B_Mini" H 8571 3900 50  0000 R CNN
F 2 "" H 8950 3950 50  0001 C CNN
F 3 "~" H 8950 3950 50  0001 C CNN
	1    8800 4000
	-1   0    0    -1  
$EndComp
$Comp
L power:GNDA #PWR0113
U 1 1 5AE9B8A3
P 8800 4850
F 0 "#PWR0113" H 8800 4600 50  0001 C CNN
F 1 "GNDA" H 8805 4677 50  0000 C CNN
F 2 "" H 8800 4850 50  0001 C CNN
F 3 "" H 8800 4850 50  0001 C CNN
	1    8800 4850
	1    0    0    -1  
$EndComp
$Comp
L Device:C C23
U 1 1 5AE9BFA0
P 6950 4000
F 0 "C23" H 7065 4046 50  0000 L CNN
F 1 "0.1uF" H 7065 3955 50  0000 L CNN
F 2 "" H 6988 3850 50  0001 C CNN
F 3 "~" H 6950 4000 50  0001 C CNN
	1    6950 4000
	1    0    0    -1  
$EndComp
$Comp
L Device:CP1 C24
U 1 1 5AE9C0EA
P 7400 4000
F 0 "C24" H 7515 4046 50  0000 L CNN
F 1 "10uF" H 7515 3955 50  0000 L CNN
F 2 "" H 7400 4000 50  0001 C CNN
F 3 "~" H 7400 4000 50  0001 C CNN
	1    7400 4000
	1    0    0    -1  
$EndComp
$Comp
L power:GNDA #PWR0117
U 1 1 5AE9C895
P 7400 4250
F 0 "#PWR0117" H 7400 4000 50  0001 C CNN
F 1 "GNDA" H 7405 4077 50  0000 C CNN
F 2 "" H 7400 4250 50  0001 C CNN
F 3 "" H 7400 4250 50  0001 C CNN
	1    7400 4250
	1    0    0    -1  
$EndComp
$Comp
L power:GNDA #PWR0118
U 1 1 5AE9C8AC
P 6950 4250
F 0 "#PWR0118" H 6950 4000 50  0001 C CNN
F 1 "GNDA" H 6955 4077 50  0000 C CNN
F 2 "" H 6950 4250 50  0001 C CNN
F 3 "" H 6950 4250 50  0001 C CNN
	1    6950 4250
	1    0    0    -1  
$EndComp
Wire Wire Line
	7400 4250 7400 4150
Wire Wire Line
	6950 4150 6950 4250
Wire Wire Line
	7400 3800 7400 3850
Wire Wire Line
	7400 3800 6950 3800
Wire Wire Line
	6950 3800 6950 3850
Connection ~ 7400 3800
$Comp
L Device:Ferrite_Bead_Small L4
U 1 1 5AE9EE99
P 8900 4550
F 0 "L4" H 9000 4596 50  0000 L CNN
F 1 "Ferrite_Bead_Small" H 9000 4505 50  0000 L CNN
F 2 "" V 8830 4550 50  0001 C CNN
F 3 "~" H 8900 4550 50  0001 C CNN
	1    8900 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	8800 4750 8900 4750
Wire Wire Line
	8900 4750 8900 4650
Wire Wire Line
	8800 4400 8800 4750
Connection ~ 8800 4750
Wire Wire Line
	8900 4450 8900 4400
Wire Wire Line
	8800 4850 8800 4750
Text HLabel 7950 4000 0    50   Input ~ 0
D+
Text HLabel 7950 4100 0    50   Input ~ 0
D-
Wire Wire Line
	8800 4750 8350 4750
Wire Wire Line
	8350 4750 8350 4200
Wire Wire Line
	8350 4200 8500 4200
Wire Wire Line
	7950 4000 8500 4000
Wire Wire Line
	8500 4100 7950 4100
Wire Wire Line
	7400 3800 8500 3800
$Comp
L open-automation:RADIO-CONN-776932-1 P?
U 1 1 5B0E3305
P 4650 8000
F 0 "P?" V -2500 9250 50  0000 L CNN
F 1 "RADIO-CONN-776932-1" V -2650 8450 50  0000 L CNN
F 2 "" V 1800 9200 50  0001 C CNN
F 3 "https://www.mouser.com/ProductDetail/?qs=jDDLxflrbZ8Jr72cLXTEfA%3D%3D" H 800 9450 50  0001 C CNN
	1    4650 8000
	0    1    1    0   
$EndComp
Wire Wire Line
	4750 2650 5100 2650
$EndSCHEMATC
