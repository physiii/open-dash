EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A 11000 8500
encoding utf-8
Sheet 3 9
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Text HLabel 1350 1250 0    50   Input ~ 0
3V3
$Comp
L open-automation:GND #PWR011
U 1 1 5AE0458E
P 4650 3300
F 0 "#PWR011" H 4650 3050 50  0001 C CNN
F 1 "GND" H 4655 3127 50  0000 C CNN
F 2 "" H 4650 3300 50  0000 C CNN
F 3 "" H 4650 3300 50  0000 C CNN
	1    4650 3300
	1    0    0    -1  
$EndComp
Text HLabel 1350 1450 0    50   Input ~ 0
SDA
Text HLabel 1350 1350 0    50   Input ~ 0
SCL
Text Label 1400 1250 0    50   ~ 0
3V3
Wire Wire Line
	1350 1250 1400 1250
Wire Wire Line
	4650 3300 4650 3250
Wire Wire Line
	4650 3250 4600 3250
Text Label 4650 2950 0    50   ~ 0
L_FM
Wire Wire Line
	4650 2950 4600 2950
Text Label 4650 3150 0    50   ~ 0
R_FM
Wire Wire Line
	4650 3150 4600 3150
Text Label 1400 1350 0    50   ~ 0
SCL
Text Label 1400 1450 0    50   ~ 0
SDA
Wire Wire Line
	1400 1350 1350 1350
Wire Wire Line
	1350 1450 1400 1450
$Comp
L open-automation:RDA5807M U5
U 1 1 5CC6B0DA
P 5900 3250
F 0 "U5" H 6150 3275 50  0000 C CNN
F 1 "RDA5807M" H 6150 3184 50  0000 C CNN
F 2 "open-automation:RDA5807M" H 6150 3450 50  0001 C CNN
F 3 "http://cxem.net/tuner/files/tuner84_RDA5807M_datasheet_v1.pdf" H 5900 2450 50  0001 C CNN
F 4 "https://store.open-electronics.org/87.6-108-MHz-StereoFM-Radio-Module-RDA5807M" H 5950 3350 50  0001 C CNN "Website"
F 5 "RDA5807M" H 6150 3250 50  0001 C CNN "Part Number"
	1    5900 3250
	1    0    0    -1  
$EndComp
Text Label 6550 3550 0    50   ~ 0
SDA
Text Label 6550 3650 0    50   ~ 0
SCL
Text Label 6550 3450 0    50   ~ 0
3V3
Text Label 5750 3550 2    50   ~ 0
L_FM
Text Label 5750 3650 2    50   ~ 0
R_FM
$Comp
L open-automation:GND #PWR013
U 1 1 5CC6BDF5
P 5750 3800
F 0 "#PWR013" H 5750 3550 50  0001 C CNN
F 1 "GND" H 5755 3627 50  0000 C CNN
F 2 "" H 5750 3800 50  0000 C CNN
F 3 "" H 5750 3800 50  0000 C CNN
	1    5750 3800
	1    0    0    -1  
$EndComp
Wire Wire Line
	5750 3800 5750 3750
Wire Wire Line
	5750 3750 5800 3750
Wire Wire Line
	5800 3650 5750 3650
Wire Wire Line
	5750 3550 5800 3550
Wire Wire Line
	6550 3650 6500 3650
Wire Wire Line
	6500 3550 6550 3550
Wire Wire Line
	6550 3450 6500 3450
Text Label 5750 3450 2    50   ~ 0
AMF_Antenna
Wire Wire Line
	5750 3450 5800 3450
$Comp
L open-automation:AudioJack_3.5TRS J2
U 1 1 5CD611B3
P 4400 3050
F 0 "J2" H 4357 3283 50  0000 C CNN
F 1 "AudioJack_3.5TRS" H 4350 2700 50  0001 C CNN
F 2 "open-automation:AudioJack_SJ1-3525N" H 4350 2500 50  0001 C CNN
F 3 "https://www.cui.com/product/resource/sj1-352xn-series.pdf" H 4400 3050 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/cui-inc/SJ1-3525N/CP1-3525N-ND/738687" H 4050 2600 50  0001 C CNN "Website"
F 5 "SJ1-3525N" H 4300 2400 50  0001 C CNN "Part Number"
	1    4400 3050
	1    0    0    -1  
$EndComp
$Comp
L open-automation:Coax_U.FL U4
U 1 1 5CD48F7F
P 4300 4700
F 0 "U4" H 4500 4750 50  0000 L CNN
F 1 "Coax_U.FL" H 4300 4450 50  0000 L CNN
F 2 "open-automation:CONN-COAX-UFL-A-4JA" H 4300 4700 50  0001 C CNN
F 3 "https://www.amphenolrf.com/downloads/dl/file/id/8661/product/9127/a_4ja_customer_drawing.pdf" H 4300 4700 50  0001 C CNN
F 4 "A-4JA" H 4300 4700 50  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/amphenol-rf-division/A-4JA/ARF3390CT-ND/9860928" H 4300 4700 50  0001 C CNN "Website"
	1    4300 4700
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR0105
U 1 1 5CD4931B
P 4150 4900
F 0 "#PWR0105" H 4150 4650 50  0001 C CNN
F 1 "GND" H 4155 4727 50  0000 C CNN
F 2 "" H 4150 4900 50  0000 C CNN
F 3 "" H 4150 4900 50  0000 C CNN
	1    4150 4900
	1    0    0    -1  
$EndComp
Wire Wire Line
	4150 4900 4150 4850
Wire Wire Line
	4150 4850 4200 4850
Text Label 4150 4750 2    50   ~ 0
AMF_Antenna
Wire Wire Line
	4150 4750 4200 4750
$Comp
L open-automation:CONN_01X02 P2
U 1 1 5CD62517
P 4450 4150
F 0 "P2" H 4528 4191 50  0000 L CNN
F 1 "CONN_01X02" H 4528 4100 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x02_P2.54mm_Vertical" H 4350 4200 50  0001 C CNN
F 3 "" H 4450 4150 50  0000 C CNN
	1    4450 4150
	1    0    0    -1  
$EndComp
Text Label 4200 4100 2    50   ~ 0
AMF_Antenna
$Comp
L open-automation:GND #PWR0106
U 1 1 5CD62ADE
P 4200 4250
F 0 "#PWR0106" H 4200 4000 50  0001 C CNN
F 1 "GND" H 4205 4077 50  0000 C CNN
F 2 "" H 4200 4250 50  0000 C CNN
F 3 "" H 4200 4250 50  0000 C CNN
	1    4200 4250
	1    0    0    -1  
$EndComp
Wire Wire Line
	4200 4250 4200 4200
Wire Wire Line
	4200 4200 4250 4200
Wire Wire Line
	4250 4100 4200 4100
$EndSCHEMATC
