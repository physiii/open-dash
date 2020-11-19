EESchema Schematic File Version 4
LIBS:open-dash-daughterboard-cache
EELAYER 29 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 4 7
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Text HLabel 1350 1150 0    60   Input ~ 0
RXD
Text Label 5500 3800 0    50   ~ 0
DTR
Text Label 5500 3600 0    50   ~ 0
RTS
Text Label 5500 3900 0    50   ~ 0
DSR
Text Label 5500 4000 0    50   ~ 0
DCD
Text HLabel 1350 1050 0    60   Input ~ 0
TXD
$Comp
L open-automation:C_47pF C5
U 1 1 5C04EC17
P 3600 3950
AR Path="/5B15E02A/5C04EC17" Ref="C5"  Part="1" 
AR Path="/5C04BFCE/5C04EC17" Ref="C?"  Part="1" 
F 0 "C5" H 3400 3950 50  0000 L CNN
F 1 "C_47pF" H 3300 3850 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 3700 4250 50  0001 C CNN
F 3 "https://search.murata.co.jp/Ceramy/image/img/A01X/G101/ENG/GCM1885C2A470FA16-01.pdf" H 3600 3700 50  0001 C CNN
F 4 " GCM1885C2A470FA16D" H 3725 4150 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/murata-electronics-north-america/GCM1885C2A470FA16D/490-16408-1-ND/7363390" H 0   0   50  0001 C CNN "Website"
	1    3600 3950
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR017
U 1 1 5C04EC24
P 4625 1400
AR Path="/5B15E02A/5C04EC24" Ref="#PWR017"  Part="1" 
AR Path="/5C04BFCE/5C04EC24" Ref="#PWR?"  Part="1" 
F 0 "#PWR017" H 4625 1150 50  0001 C CNN
F 1 "GND" H 4630 1227 50  0000 C CNN
F 2 "" H 4625 1400 50  0000 C CNN
F 3 "" H 4625 1400 50  0000 C CNN
	1    4625 1400
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR018
U 1 1 5C04EC2A
P 4750 4900
AR Path="/5B15E02A/5C04EC2A" Ref="#PWR018"  Part="1" 
AR Path="/5C04BFCE/5C04EC2A" Ref="#PWR?"  Part="1" 
F 0 "#PWR018" H 4750 4650 50  0001 C CNN
F 1 "GND" H 4755 4727 50  0000 C CNN
F 2 "" H 4750 4900 50  0000 C CNN
F 3 "" H 4750 4900 50  0000 C CNN
	1    4750 4900
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_0.1uF C6
U 1 1 5C04EC31
P 4625 1200
AR Path="/5B15E02A/5C04EC31" Ref="C6"  Part="1" 
AR Path="/5C04BFCE/5C04EC31" Ref="C?"  Part="1" 
F 0 "C6" H 4625 1275 50  0000 L CNN
F 1 "C_0.1uF" H 4625 1125 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 4725 1500 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 4625 950 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 4750 1400 60  0001 C CNN "Part Number"
	1    4625 1200
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_0.1uF C8
U 1 1 5C04EC39
P 5450 1200
AR Path="/5B15E02A/5C04EC39" Ref="C8"  Part="1" 
AR Path="/5C04BFCE/5C04EC39" Ref="C?"  Part="1" 
F 0 "C8" H 5450 1275 50  0000 L CNN
F 1 "C_0.1uF" H 5450 1125 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 5550 1500 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X8R1H104K080AB/445-8818-1-ND/3248223" H 5450 950 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 5575 1400 60  0001 C CNN "Part Number"
	1    5450 1200
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_4.7uF C7
U 1 1 5C04EC41
P 5050 1200
AR Path="/5B15E02A/5C04EC41" Ref="C7"  Part="1" 
AR Path="/5C04BFCE/5C04EC41" Ref="C?"  Part="1" 
F 0 "C7" H 5050 1275 50  0000 L CNN
F 1 "C_4.7uF" H 5050 1125 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 5150 1500 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X7S0J475K080AC/445-9120-1-ND/3661604" H 5050 950 50  0001 C CNN
F 4 "C1608X7S0J475K080AC" H 5175 1400 60  0001 C CNN "Part Number"
	1    5050 1200
	1    0    0    -1  
$EndComp
Wire Wire Line
	5050 1350 5050 1400
Wire Wire Line
	5450 1350 5450 1400
$Comp
L open-automation:GND #PWR020
U 1 1 5C04EC4A
P 5450 1400
AR Path="/5B15E02A/5C04EC4A" Ref="#PWR020"  Part="1" 
AR Path="/5C04BFCE/5C04EC4A" Ref="#PWR?"  Part="1" 
F 0 "#PWR020" H 5450 1150 50  0001 C CNN
F 1 "GND" H 5455 1227 50  0000 C CNN
F 2 "" H 5450 1400 50  0000 C CNN
F 3 "" H 5450 1400 50  0000 C CNN
	1    5450 1400
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR019
U 1 1 5C04EC50
P 5050 1400
AR Path="/5B15E02A/5C04EC50" Ref="#PWR019"  Part="1" 
AR Path="/5C04BFCE/5C04EC50" Ref="#PWR?"  Part="1" 
F 0 "#PWR019" H 5050 1150 50  0001 C CNN
F 1 "GND" H 5055 1227 50  0000 C CNN
F 2 "" H 5050 1400 50  0000 C CNN
F 3 "" H 5050 1400 50  0000 C CNN
	1    5050 1400
	1    0    0    -1  
$EndComp
Text HLabel 1350 1350 0    60   Input ~ 0
ESP_EN
Text HLabel 1350 1250 0    50   Input ~ 0
5V
Wire Wire Line
	4625 1400 4625 1350
Wire Wire Line
	5050 1000 5050 1050
Wire Wire Line
	5450 1000 5450 1050
Text Label 4850 3050 0    50   ~ 0
3V3OUT
Text Label 4000 4000 2    50   ~ 0
3V3OUT
Text Label 4625 1000 2    50   ~ 0
3V3OUT
Wire Wire Line
	4625 1000 4625 1050
$Comp
L open-automation:GND #PWR014
U 1 1 5BB6DCA8
P 2250 1550
AR Path="/5B15E02A/5BB6DCA8" Ref="#PWR014"  Part="1" 
AR Path="/5C04BFCE/5BB6DCA8" Ref="#PWR?"  Part="1" 
F 0 "#PWR014" H 2250 1300 50  0001 C CNN
F 1 "GND" H 2255 1377 50  0000 C CNN
F 2 "" H 2250 1550 50  0000 C CNN
F 3 "" H 2250 1550 50  0000 C CNN
	1    2250 1550
	1    0    0    -1  
$EndComp
Wire Wire Line
	2950 1100 2900 1100
Text Label 3350 3700 2    50   ~ 0
USBDM
Text Label 3650 3800 2    50   ~ 0
USBDP
Text Label 2950 1300 0    50   ~ 0
USBDM
Wire Wire Line
	2950 1400 2900 1400
Text Label 2950 1400 0    50   ~ 0
USBDP
Wire Wire Line
	2950 1300 2900 1300
$Comp
L open-automation:FT231XS U6
U 1 1 5CCE180E
P 4750 4000
F 0 "U6" H 5200 3200 50  0000 C CNN
F 1 "FT231XS" H 5150 4800 50  0000 C CNN
F 2 "Package_SO:SSOP-20_3.9x8.7mm_P0.635mm" H 5350 3050 50  0001 C CNN
F 3 "https://www.ftdichip.com/Support/Documents/DataSheets/ICs/DS_FT231X.pdf" H 4750 4000 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/ftdi-future-technology-devices-international-ltd/FT231XS-R/768-1129-2-ND/3029139" H 4750 4000 50  0001 C CNN "Website"
F 5 "FT231XS-R" H 4750 4000 50  0001 C CNN "Part Number"
	1    4750 4000
	1    0    0    -1  
$EndComp
Wire Wire Line
	4650 4900 4750 4900
Connection ~ 4750 4900
Wire Wire Line
	4750 4900 4850 4900
$Comp
L open-automation:USB_MINI_B J4
U 1 1 5CBFBAFC
P 2600 1300
F 0 "J4" H 2600 1767 50  0000 C CNN
F 1 "USB_MINI_B" H 2600 1676 50  0000 C CNN
F 2 "open-automation:USB-mini-B-0548190519" H 2500 2050 50  0001 C CNN
F 3 "https://www.molex.com/pdm_docs/sd/548190519_sd.pdf" H 2500 1950 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/molex/0548190519/WM17115-ND/773802" H 2600 1950 50  0001 C CNN "Website"
F 5 "0548190519" H 2500 1850 50  0001 C CNN "Part Number"
	1    2600 1300
	1    0    0    -1  
$EndComp
Wire Wire Line
	2250 1550 2250 1500
Wire Wire Line
	2250 1500 2300 1500
Wire Wire Line
	5500 4000 5450 4000
Wire Wire Line
	5450 3900 5500 3900
Wire Wire Line
	5500 3800 5450 3800
Wire Wire Line
	5500 3600 5450 3600
Wire Wire Line
	5450 3500 5500 3500
Wire Wire Line
	5500 3400 5450 3400
Text Label 5500 3400 0    50   ~ 0
USB_TXD
Text Label 5500 3500 0    50   ~ 0
USB_RXD
Wire Wire Line
	1350 1150 1400 1150
Wire Wire Line
	1400 1050 1350 1050
Text Label 1400 1150 0    50   ~ 0
USB_TXD
Text Label 1400 1050 0    50   ~ 0
USB_RXD
Wire Wire Line
	4850 3050 4850 3100
Text Label 4650 3050 2    50   ~ 0
5V
Wire Wire Line
	4650 3050 4650 3100
Wire Wire Line
	1350 1250 1400 1250
Text Label 1400 1250 0    50   ~ 0
5V
Wire Wire Line
	4000 4000 4050 4000
Wire Wire Line
	4000 3700 4050 3700
Wire Wire Line
	4050 3800 4000 3800
Wire Wire Line
	3600 3800 3700 3800
Wire Wire Line
	3200 3800 3200 3700
Wire Wire Line
	3200 3700 3700 3700
$Comp
L open-automation:GND #PWR016
U 1 1 5CC0C44E
P 3600 4150
AR Path="/5B15E02A/5CC0C44E" Ref="#PWR016"  Part="1" 
AR Path="/5C04BFCE/5CC0C44E" Ref="#PWR?"  Part="1" 
F 0 "#PWR016" H 3600 3900 50  0001 C CNN
F 1 "GND" H 3605 3977 50  0000 C CNN
F 2 "" H 3600 4150 50  0000 C CNN
F 3 "" H 3600 4150 50  0000 C CNN
	1    3600 4150
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR015
U 1 1 5CC0CA16
P 3200 4150
AR Path="/5B15E02A/5CC0CA16" Ref="#PWR015"  Part="1" 
AR Path="/5C04BFCE/5CC0CA16" Ref="#PWR?"  Part="1" 
F 0 "#PWR015" H 3200 3900 50  0001 C CNN
F 1 "GND" H 3205 3977 50  0000 C CNN
F 2 "" H 3200 4150 50  0000 C CNN
F 3 "" H 3200 4150 50  0000 C CNN
	1    3200 4150
	1    0    0    -1  
$EndComp
Wire Wire Line
	3200 4150 3200 4100
Wire Wire Line
	3600 4150 3600 4100
Text Label 5050 1000 2    50   ~ 0
5V
Text Label 5450 1000 2    50   ~ 0
5V
Text Label 1400 1350 0    50   ~ 0
ESP_EN
Wire Wire Line
	1400 1350 1350 1350
Text Label 6500 4200 2    50   ~ 0
RTS
Text Label 6500 3700 2    50   ~ 0
DTR
Text HLabel 1350 1450 0    60   Input ~ 0
PROG
Text Label 7250 3450 0    50   ~ 0
ESP_EN
Wire Wire Line
	7250 3500 7250 3450
$Comp
L Device:Q_NPN_BCE Q1
U 1 1 5CC1FFC3
P 7150 3700
AR Path="/5B15E02A/5CC1FFC3" Ref="Q1"  Part="1" 
AR Path="/5C04BFCE/5CC1FFC3" Ref="Q?"  Part="1" 
F 0 "Q1" H 7341 3746 50  0000 L CNN
F 1 "Q_NPN_BCE" H 7341 3655 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 7350 3800 50  0001 C CNN
F 3 "~" H 7150 3700 50  0001 C CNN
F 4 "MMSS8050-H-TP" H 7150 3700 50  0001 C CNN "Part Number"
	1    7150 3700
	1    0    0    -1  
$EndComp
$Comp
L Device:Q_PNP_BEC Q2
U 1 1 5CC1FFB2
P 7150 4250
AR Path="/5B15E02A/5CC1FFB2" Ref="Q2"  Part="1" 
AR Path="/5C04BFCE/5CC1FFB2" Ref="Q?"  Part="1" 
F 0 "Q2" H 7341 4296 50  0000 L CNN
F 1 "Q_PNP_BCE" H 7341 4205 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 7350 4350 50  0001 C CNN
F 3 "~" H 7150 4250 50  0001 C CNN
F 4 "MMSS8550-L-TP" H 7150 4250 50  0001 C CNN "Part Number"
	1    7150 4250
	1    0    0    -1  
$EndComp
Text Label 1400 1450 0    50   ~ 0
PROG
Wire Wire Line
	1400 1450 1350 1450
Text Label 7250 4550 0    50   ~ 0
PROG
Wire Wire Line
	7250 4550 7250 4450
Text Label 5500 4300 0    50   ~ 0
VSENSE
Wire Wire Line
	5500 4300 5450 4300
Wire Wire Line
	6500 4250 6500 3900
Wire Wire Line
	6500 3900 7250 3900
Wire Wire Line
	6900 4250 6950 4250
Wire Wire Line
	6450 4050 6450 3700
Wire Wire Line
	6450 3700 6550 3700
Wire Wire Line
	6450 4050 7250 4050
$Comp
L open-automation:R_10K R7
U 1 1 5CC1ED63
P 6750 3700
F 0 "R7" V 6750 3700 50  0000 C CNN
F 1 "R_10K" V 6634 3700 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 6680 3700 50  0001 C CNN
F 3 "" V 6830 3700 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 6930 3800 60  0001 C CNN "Part Number"
	1    6750 3700
	0    1    1    0   
$EndComp
$Comp
L open-automation:R_10K R6
U 1 1 5CC209A3
P 6700 4250
F 0 "R6" V 6700 4250 50  0000 C CNN
F 1 "R_10K" V 6600 4250 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 6630 4250 50  0001 C CNN
F 3 "" V 6780 4250 50  0001 C CNN
F 4 "RC0603JR-0710KL" V 6880 4350 60  0001 C CNN "Part Number"
	1    6700 4250
	0    -1   -1   0   
$EndComp
$Comp
L open-automation:R_27 R4
U 1 1 5CC410DE
P 3850 3700
F 0 "R4" V 3850 3700 50  0000 C CNN
F 1 "R_27" V 3750 3700 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 3780 3700 50  0001 C CNN
F 3 "" V 3930 3700 50  0001 C CNN
F 4 "ERJ-3GEYJ2R2V" V 4030 3800 60  0001 C CNN "Part Number"
	1    3850 3700
	0    1    1    0   
$EndComp
$Comp
L open-automation:R_27 R5
U 1 1 5CC41378
P 3850 3800
F 0 "R5" V 3850 3800 50  0000 C CNN
F 1 "R_27" V 3900 4000 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad1.05x0.95mm_HandSolder" V 3780 3800 50  0001 C CNN
F 3 "" V 3930 3800 50  0001 C CNN
F 4 "ERJ-3GEYJ2R2V" V 4030 3900 60  0001 C CNN "Part Number"
	1    3850 3800
	0    1    1    0   
$EndComp
$Comp
L open-automation:C_47pF C4
U 1 1 5CC29668
P 3200 3950
AR Path="/5B15E02A/5CC29668" Ref="C4"  Part="1" 
AR Path="/5C04BFCE/5CC29668" Ref="C?"  Part="1" 
F 0 "C4" H 3000 3950 50  0000 L CNN
F 1 "C_47pF" H 2900 3850 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.05x0.95mm_HandSolder" H 3300 4250 50  0001 C CNN
F 3 "https://search.murata.co.jp/Ceramy/image/img/A01X/G101/ENG/GCM1885C2A470FA16-01.pdf" H 3200 3700 50  0001 C CNN
F 4 " GCM1885C2A470FA16D" H 3325 4150 60  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/murata-electronics-north-america/GCM1885C2A470FA16D/490-16408-1-ND/7363390" H 0   0   50  0001 C CNN "Website"
	1    3200 3950
	1    0    0    -1  
$EndComp
Text Label 4000 3400 2    50   ~ 0
3V3OUT
Wire Wire Line
	4000 3400 4050 3400
Text Label 3250 1100 0    50   ~ 0
5V
$Comp
L open-automation:D_1N5819HW D7
U 1 1 5CD8937E
P 3100 1100
F 0 "D7" H 3100 884 50  0000 C CNN
F 1 "D_1N5819HW" H 3100 975 50  0000 C CNN
F 2 "Diode_SMD:D_SOD-123" H 3100 925 50  0001 C CNN
F 3 "http://www.diodes.com/_files/datasheets/ds23022.pdf" H 3100 1100 50  0001 C CNN
F 4 "1N5819HW-7-F" H 3100 1400 50  0001 C CNN "Part Number"
F 5 "https://www.digikey.com/product-detail/en/diodes-incorporated/1N5819HW-7-F/1N5819HW-FDICT-ND/815283" H 3200 1300 50  0001 C CNN "Website"
	1    3100 1100
	-1   0    0    1   
$EndComp
$EndSCHEMATC
