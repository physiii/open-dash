EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 7 14
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
L open-dash-daughterboard-rescue:C_0.1uF-Open_Automation C?
U 1 1 5C04EC39
P 5200 1100
AR Path="/5B15E02A/5C04EC39" Ref="C?"  Part="1" 
AR Path="/5C04BFCE/5C04EC39" Ref="C?"  Part="1" 
AR Path="/60DDD162/5C04EC39" Ref="C31"  Part="1" 
F 0 "C31" H 5200 1175 50  0000 L CNN
F 1 "C_0.1uF" H 5200 1000 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.08x0.95mm_HandSolder" H 5300 1400 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/YAGEO-CC0603KRX7R9BB104_C14663.pdf" H 5200 850 50  0001 C CNN
F 4 "CC0603KRX7R9BB104" H 5325 1300 60  0001 C CNN "Part Number"
F 5 "C14663" H 0   0   50  0001 C CNN "LCSC"
	1    5200 1100
	1    0    0    -1  
$EndComp
Text HLabel 1350 1350 0    60   Input ~ 0
ESP_EN
Text HLabel 1350 1250 0    50   Input ~ 0
5V
Text Label 4850 3050 0    50   ~ 0
3V3OUT
Text Label 4000 4000 2    50   ~ 0
3V3OUT
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
L open-dash-daughterboard-rescue:FT231XS-Open_Automation U?
U 1 1 5CCE180E
P 4750 4000
AR Path="/5B15E02A/5CCE180E" Ref="U?"  Part="1" 
AR Path="/60DDD162/5CCE180E" Ref="U12"  Part="1" 
F 0 "U12" H 5200 3200 50  0000 C CNN
F 1 "FT231XS" H 5150 4800 50  0000 C CNN
F 2 "Package_SO:SSOP-20_3.9x8.7mm_P0.635mm" H 5350 3050 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Future-Designs-FT231XS-R_C132160.pdf" H 4750 4000 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/ftdi-future-technology-devices-international-ltd/FT231XS-R/768-1129-2-ND/3029139" H 4750 4000 50  0001 C CNN "Website"
F 5 "FT231XS-R" H 4750 4000 50  0001 C CNN "Part Number"
F 6 "C132160" H 0   0   50  0001 C CNN "LCSC"
	1    4750 4000
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:USB_MINI_B-Open_Automation J?
U 1 1 5CBFBAFC
P 2600 1300
AR Path="/5B15E02A/5CBFBAFC" Ref="J?"  Part="1" 
AR Path="/60DDD162/5CBFBAFC" Ref="J15"  Part="1" 
F 0 "J15" H 2600 1767 50  0000 C CNN
F 1 "USB_MINI_B" H 2600 1676 50  0000 C CNN
F 2 "Open_Automation:USB-mini-B-0548190519" H 2500 2050 50  0001 C CNN
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
Wire Wire Line
	3200 4150 3200 4100
Wire Wire Line
	3600 4150 3600 4100
Text Label 4800 900  2    50   ~ 0
5V
Text Label 5200 900  2    50   ~ 0
5V
Text Label 1400 1350 0    50   ~ 0
ESP_EN
Wire Wire Line
	1400 1350 1350 1350
Text Label 6500 4200 2    50   ~ 0
RTS
Text Label 6450 3700 2    50   ~ 0
DTR
Text HLabel 1350 1450 0    60   Input ~ 0
PROG
Text Label 7250 3450 0    50   ~ 0
ESP_EN
Wire Wire Line
	7250 3500 7250 3450
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
	6450 4050 7250 4050
Text Label 4000 3400 2    50   ~ 0
3V3OUT
Wire Wire Line
	4000 3400 4050 3400
Text Label 3300 1100 0    50   ~ 0
5V
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 601C912E
P 4400 1300
AR Path="/5ABD187E/601C912E" Ref="#PWR?"  Part="1" 
AR Path="/601C912E" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/601C912E" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/601C912E" Ref="#PWR092"  Part="1" 
F 0 "#PWR092" H 4400 1050 50  0001 C CNN
F 1 "GND" H 4400 1150 50  0000 C CNN
F 2 "" H 4400 1300 50  0000 C CNN
F 3 "" H 4400 1300 50  0000 C CNN
	1    4400 1300
	1    0    0    -1  
$EndComp
Text Label 4400 900  2    50   ~ 0
3V3OUT
$Comp
L open-dash-daughterboard-rescue:C_0.1uF-Open_Automation C?
U 1 1 5C04EC31
P 4400 1100
AR Path="/5B15E02A/5C04EC31" Ref="C?"  Part="1" 
AR Path="/5C04BFCE/5C04EC31" Ref="C?"  Part="1" 
AR Path="/60DDD162/5C04EC31" Ref="C29"  Part="1" 
F 0 "C29" H 4400 1175 50  0000 L CNN
F 1 "C_0.1uF" H 4400 1025 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.08x0.95mm_HandSolder" H 4500 1400 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/YAGEO-CC0603KRX7R9BB104_C14663.pdf" H 4400 850 50  0001 C CNN
F 4 "CC0603KRX7R9BB104" H 4525 1300 60  0001 C CNN "Part Number"
F 5 "C14663" H 0   0   50  0001 C CNN "LCSC"
	1    4400 1100
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 601D64E1
P 4800 1300
AR Path="/5ABD187E/601D64E1" Ref="#PWR?"  Part="1" 
AR Path="/601D64E1" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/601D64E1" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/601D64E1" Ref="#PWR094"  Part="1" 
F 0 "#PWR094" H 4800 1050 50  0001 C CNN
F 1 "GND" H 4800 1150 50  0000 C CNN
F 2 "" H 4800 1300 50  0000 C CNN
F 3 "" H 4800 1300 50  0000 C CNN
	1    4800 1300
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 601D67F8
P 5200 1300
AR Path="/5ABD187E/601D67F8" Ref="#PWR?"  Part="1" 
AR Path="/601D67F8" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/601D67F8" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/601D67F8" Ref="#PWR095"  Part="1" 
F 0 "#PWR095" H 5200 1050 50  0001 C CNN
F 1 "GND" H 5200 1150 50  0000 C CNN
F 2 "" H 5200 1300 50  0000 C CNN
F 3 "" H 5200 1300 50  0000 C CNN
	1    5200 1300
	1    0    0    -1  
$EndComp
Wire Wire Line
	5200 1300 5200 1250
Wire Wire Line
	4800 1300 4800 1250
Wire Wire Line
	4400 1250 4400 1300
Wire Wire Line
	4400 900  4400 950 
Wire Wire Line
	4800 900  4800 950 
Wire Wire Line
	5200 900  5200 950 
Wire Wire Line
	4650 4900 4750 4900
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 601DCE69
P 4750 4900
AR Path="/5ABD187E/601DCE69" Ref="#PWR?"  Part="1" 
AR Path="/601DCE69" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/601DCE69" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/601DCE69" Ref="#PWR093"  Part="1" 
F 0 "#PWR093" H 4750 4650 50  0001 C CNN
F 1 "GND" H 4750 4750 50  0000 C CNN
F 2 "" H 4750 4900 50  0000 C CNN
F 3 "" H 4750 4900 50  0000 C CNN
	1    4750 4900
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 601DDAAB
P 3600 4150
AR Path="/5ABD187E/601DDAAB" Ref="#PWR?"  Part="1" 
AR Path="/601DDAAB" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/601DDAAB" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/601DDAAB" Ref="#PWR091"  Part="1" 
F 0 "#PWR091" H 3600 3900 50  0001 C CNN
F 1 "GND" H 3600 4000 50  0000 C CNN
F 2 "" H 3600 4150 50  0000 C CNN
F 3 "" H 3600 4150 50  0000 C CNN
	1    3600 4150
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 601DDE83
P 3200 4150
AR Path="/5ABD187E/601DDE83" Ref="#PWR?"  Part="1" 
AR Path="/601DDE83" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/601DDE83" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/601DDE83" Ref="#PWR090"  Part="1" 
F 0 "#PWR090" H 3200 3900 50  0001 C CNN
F 1 "GND" H 3200 4000 50  0000 C CNN
F 2 "" H 3200 4150 50  0000 C CNN
F 3 "" H 3200 4150 50  0000 C CNN
	1    3200 4150
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 602A32A3
P 2250 1550
AR Path="/5ABD187E/602A32A3" Ref="#PWR?"  Part="1" 
AR Path="/602A32A3" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/602A32A3" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/602A32A3" Ref="#PWR088"  Part="1" 
F 0 "#PWR088" H 2250 1300 50  0001 C CNN
F 1 "GND" H 2250 1400 50  0000 C CNN
F 2 "" H 2250 1550 50  0000 C CNN
F 3 "" H 2250 1550 50  0000 C CNN
	1    2250 1550
	1    0    0    -1  
$EndComp
Connection ~ 4750 4900
Wire Wire Line
	4750 4900 4850 4900
$Comp
L open-dash-daughterboard-rescue:Conn_02x02_Counter_Clockwise-Connector_Generic J16
U 1 1 5FDB1E21
P 2600 2150
F 0 "J16" H 2650 2367 50  0000 C CNN
F 1 "Conn_02x02_Counter_Clockwise" H 2650 2276 50  0000 C CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_2x02_P2.54mm_Vertical" H 2600 2150 50  0001 C CNN
F 3 "~" H 2600 2150 50  0001 C CNN
	1    2600 2150
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5FDB583B
P 2350 2150
AR Path="/5ABD187E/5FDB583B" Ref="#PWR?"  Part="1" 
AR Path="/5FDB583B" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/5FDB583B" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/5FDB583B" Ref="#PWR089"  Part="1" 
F 0 "#PWR089" H 2350 1900 50  0001 C CNN
F 1 "GND" V 2350 1950 50  0000 C CNN
F 2 "" H 2350 2150 50  0000 C CNN
F 3 "" H 2350 2150 50  0000 C CNN
	1    2350 2150
	0    1    1    0   
$EndComp
Wire Wire Line
	2350 2150 2400 2150
Text Label 2900 1100 0    50   ~ 0
VBUS
Text Label 2350 2250 2    50   ~ 0
VBUS
Wire Wire Line
	2350 2250 2400 2250
Wire Wire Line
	2900 1100 3000 1100
Text Label 2950 2150 0    50   ~ 0
USBDM
Wire Wire Line
	2900 2250 2950 2250
Text Label 2950 2250 0    50   ~ 0
USBDP
Wire Wire Line
	2950 2150 2900 2150
$Comp
L Open_Automation:R_27 R43
U 1 1 60555766
P 3850 3700
F 0 "R43" V 3850 3700 50  0000 C CNN
F 1 "R_27" V 3750 3700 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.98x0.95mm_HandSolder" V 3780 3700 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0603WAF270JT5E_C25190.pdf" V 3930 3700 50  0001 C CNN
F 4 "0603WAF270JT5E" V 4030 3800 60  0001 C CNN "Part Number"
F 5 "C25190" H 3850 3700 50  0001 C CNN "LCSC"
	1    3850 3700
	0    1    1    0   
$EndComp
$Comp
L Open_Automation:R_27 R44
U 1 1 60558001
P 3850 3800
F 0 "R44" V 3850 3800 50  0000 C CNN
F 1 "R_27" V 3950 3800 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.98x0.95mm_HandSolder" V 3780 3800 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0603WAF270JT5E_C25190.pdf" V 3930 3800 50  0001 C CNN
F 4 "0603WAF270JT5E" V 4030 3900 60  0001 C CNN "Part Number"
F 5 "C25190" H 3850 3800 50  0001 C CNN "LCSC"
	1    3850 3800
	0    1    1    0   
$EndComp
$Comp
L Open_Automation:Q_NPN_BEC Q1
U 1 1 6056267D
P 7150 3700
F 0 "Q1" H 7341 3746 50  0000 L CNN
F 1 "Q_NPN_BEC" H 7341 3655 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 7350 3800 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Changjiang-Electronics-Tech-CJ-SS8050_C2150.pdf" H 7350 3750 50  0001 C CNN
F 4 "C2150" H 7150 3700 50  0001 C CNN "LCSC"
F 5 "SS8050" H 7450 3850 50  0001 C CNN "Part Number"
	1    7150 3700
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:Q_PNP_BEC Q2
U 1 1 6056DCE6
P 7150 4250
F 0 "Q2" H 7340 4296 50  0000 L CNN
F 1 "Q_PNP_BEC" H 7340 4205 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 7350 4350 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Changjiang-Electronics-Tech-CJ-SS8550_C8542.pdf" H 7150 4250 50  0001 C CNN
F 4 "SS8550" H 7150 4250 50  0001 C CNN "Part Number"
F 5 "C8542" H 7150 4250 50  0001 C CNN "LCSC"
	1    7150 4250
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_10K_0402 R45
U 1 1 60498F5F
P 6700 3700
F 0 "R45" V 6700 3700 50  0000 C CNN
F 1 "R_10K_0402" V 6800 3650 50  0000 C CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 6630 3700 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1002TCE_C25744.pdf" V 6780 3700 50  0001 C CNN
F 4 "0402WGF1002TCE" V 6880 3800 60  0001 C CNN "Part Number"
F 5 "C25744" V 6950 3700 50  0001 C CNN "LCSC"
	1    6700 3700
	0    -1   -1   0   
$EndComp
$Comp
L Open_Automation:R_10K_0402 R46
U 1 1 6049BC20
P 6700 4250
F 0 "R46" V 6700 4250 50  0000 C CNN
F 1 "R_10K_0402" V 6800 4200 50  0000 C CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 6630 4250 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1002TCE_C25744.pdf" V 6780 4250 50  0001 C CNN
F 4 "0402WGF1002TCE" V 6880 4350 60  0001 C CNN "Part Number"
F 5 "C25744" V 6950 4250 50  0001 C CNN "LCSC"
	1    6700 4250
	0    -1   -1   0   
$EndComp
Wire Wire Line
	6900 3700 6950 3700
Wire Wire Line
	6450 4050 6450 3700
Wire Wire Line
	6450 3700 6500 3700
$Comp
L Open_Automation:C_47pF C30
U 1 1 604AA3C1
P 3600 3950
F 0 "C30" H 3400 3950 50  0000 L CNN
F 1 "C_47pF" H 3300 3850 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.08x0.95mm_HandSolder" H 3700 4250 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Guangdong-Fenghua-Advanced-Tech-0402CG470J500NT_C1567.pdf" H 3600 3700 50  0001 C CNN
F 4 "0402CG470J500NT" H 3725 4150 60  0001 C CNN "Part Number"
F 5 "C1567" H 3600 3950 50  0001 C CNN "LCSC"
	1    3600 3950
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:C_47pF C28
U 1 1 604ABFFB
P 3200 3950
F 0 "C28" H 3000 3950 50  0000 L CNN
F 1 "C_47pF" H 2900 3850 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.08x0.95mm_HandSolder" H 3300 4250 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Guangdong-Fenghua-Advanced-Tech-0402CG470J500NT_C1567.pdf" H 3200 3700 50  0001 C CNN
F 4 "0402CG470J500NT" H 3325 4150 60  0001 C CNN "Part Number"
F 5 "C1567" H 3200 3950 50  0001 C CNN "LCSC"
	1    3200 3950
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:C_4.7uF C32
U 1 1 604B5BCC
P 4800 1100
F 0 "C32" H 4800 1200 50  0000 L CNN
F 1 "C_4.7uF" H 4800 1000 50  0000 L CNN
F 2 "Capacitor_SMD:C_0805_2012Metric_Pad1.18x1.45mm_HandSolder" H 4900 1400 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Samsung-Electro-Mechanics-CL21A475KAQNNNE_C1779.pdf" H 4800 850 50  0001 C CNN
F 4 "CL21A475KAQNNNE" H 4925 1300 60  0001 C CNN "Part Number"
F 5 "C1779" H 4800 1100 50  0001 C CNN "LCSC"
	1    4800 1100
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:Conn_02x02_Counter_Clockwise-Connector_Generic J42
U 1 1 60569BF3
P 2600 2650
F 0 "J42" H 2650 2867 50  0000 C CNN
F 1 "Conn_02x02_Counter_Clockwise" H 2650 2776 50  0000 C CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_2x02_P2.54mm_Vertical" H 2600 2650 50  0001 C CNN
F 3 "~" H 2600 2650 50  0001 C CNN
	1    2600 2650
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 60569D73
P 2350 2650
AR Path="/5ABD187E/60569D73" Ref="#PWR?"  Part="1" 
AR Path="/60569D73" Ref="#PWR?"  Part="1" 
AR Path="/5A7BADB8/60569D73" Ref="#PWR?"  Part="1" 
AR Path="/60DDD162/60569D73" Ref="#PWR0173"  Part="1" 
F 0 "#PWR0173" H 2350 2400 50  0001 C CNN
F 1 "GND" V 2350 2450 50  0000 C CNN
F 2 "" H 2350 2650 50  0000 C CNN
F 3 "" H 2350 2650 50  0000 C CNN
	1    2350 2650
	0    1    1    0   
$EndComp
Wire Wire Line
	2350 2650 2400 2650
Wire Wire Line
	2350 2750 2400 2750
Wire Wire Line
	2900 2650 2950 2650
Wire Wire Line
	2950 2750 2900 2750
Text Label 2350 2750 2    50   ~ 0
5V
Text Label 2950 2750 0    50   ~ 0
USB_RXD
Text Label 2950 2650 0    50   ~ 0
USB_TXD
$Comp
L Open_Automation:D_1N5819HW D?
U 1 1 60770B3C
P 3150 1100
AR Path="/6063934A/60770B3C" Ref="D?"  Part="1" 
AR Path="/60DDD162/60770B3C" Ref="D14"  Part="1" 
F 0 "D14" H 3150 1000 50  0000 C CNN
F 1 "D_1N5819HW" H 2800 1150 50  0000 C CNN
F 2 "Diode_SMD:D_SOD-123" H 3150 925 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Diodes-Incorporated-1N5819HW-7-F_C82544.pdf" H 3150 1100 50  0001 C CNN
F 4 "1N5819HW-7-F" H 3150 1400 50  0001 C CNN "Part Number"
F 5 "C82544" H 3150 1500 50  0001 C CNN "LCSC"
	1    3150 1100
	-1   0    0    1   
$EndComp
$EndSCHEMATC
