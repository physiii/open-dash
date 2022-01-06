EESchema Schematic File Version 5
LIBS:open-dash-daughterboard-cache
EELAYER 29 0
EELAYER END
$Descr A4 11693 8268
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
Text HLabel 6425 4975 2    60   Input ~ 0
RXD
Text HLabel 6075 5075 2    60   Input ~ 0
TXD
Wire Wire Line
	6075 5075 5975 5075
Wire Wire Line
	6075 4975 5975 4975
$Comp
L open-automation:USB_IC-CP2104 U17
U 1 1 5B157129
P 5275 5075
F 0 "U17" H 5800 4100 50  0000 C CNN
F 1 "USB_IC-CP2104" H 4875 4125 50  0000 C CNN
F 2 "Housings_DFN_QFN:QFN-24-1EP_3x3mm_Pitch0.4mm" H 5425 4125 50  0001 L CNN
F 3 "https://www.digikey.com/product-detail/en/silicon-labs/CP2102N-A01-GQFN20/336-3692-ND/6012517" H 4725 6325 50  0001 C CNN
F 4 "CP2102N-A01-GQFN20" H 5275 3807 50  0001 C CNN "Part Number"
	1    5275 5075
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR0115
U 1 1 5B15ED00
P 5275 6125
F 0 "#PWR0115" H 5275 5875 50  0001 C CNN
F 1 "GND" H 5275 5975 50  0000 C CNN
F 2 "" H 5275 6125 50  0000 C CNN
F 3 "" H 5275 6125 50  0000 C CNN
	1    5275 6125
	1    0    0    -1  
$EndComp
Wire Wire Line
	5275 6075 5275 6100
Text HLabel 3425 4475 0    60   Input ~ 0
5V
Wire Wire Line
	3775 4825 3775 4775
$Comp
L open-automation:GND #PWR0116
U 1 1 5B1612EC
P 3900 4875
F 0 "#PWR0116" H 3900 4625 50  0001 C CNN
F 1 "GND" H 3900 4725 50  0000 C CNN
F 2 "" H 3900 4875 50  0000 C CNN
F 3 "" H 3900 4875 50  0000 C CNN
	1    3900 4875
	1    0    0    -1  
$EndComp
Wire Wire Line
	3900 4825 3775 4825
Text Label 4400 4975 0    50   ~ 0
D_N
Text Label 4400 5075 0    50   ~ 0
D_P
Wire Wire Line
	4400 4975 4575 4975
Wire Wire Line
	4575 5075 4400 5075
Wire Wire Line
	4575 4675 4475 4675
Wire Wire Line
	4475 4675 4475 4475
Wire Wire Line
	4475 4475 4575 4475
Text Label 6025 4675 0    50   ~ 0
DTR
Text Label 6025 5275 0    50   ~ 0
RTS
Wire Wire Line
	6025 5275 5975 5275
Wire Wire Line
	6025 4675 5975 4675
$Comp
L open-automation:R_470 R37
U 1 1 5B166157
P 6225 4975
F 0 "R37" V 6225 4975 50  0000 C CNN
F 1 "R_470" V 6150 4975 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 6155 4975 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603FR-07470RL/311-470HRCT-ND/730203" V 6305 4975 50  0001 C CNN
F 4 "RC0603FR-07470RL" V 6405 5075 60  0001 C CNN "Part Number"
	1    6225 4975
	0    1    1    0   
$EndComp
Wire Wire Line
	6425 4975 6375 4975
$Comp
L Device:Q_NPN_BCE Q4
U 1 1 5B167526
P 2775 3225
F 0 "Q4" H 2966 3271 50  0000 L CNN
F 1 "Q_NPN_BCE" H 2966 3180 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 2975 3325 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/micro-commercial-co/MMSS8050-H-TP/MMSS8050-H-TPMSCT-ND/2825945" H 2775 3225 50  0001 C CNN
F 4 "MMSS8050-H-TP" H 2775 3225 50  0001 C CNN "Part Number"
	1    2775 3225
	1    0    0    -1  
$EndComp
$Comp
L Device:Q_PNP_BEC Q5
U 1 1 5B16769F
P 2775 3825
F 0 "Q5" H 2966 3871 50  0000 L CNN
F 1 "Q_PNP_BCE" H 2966 3780 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 2975 3925 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/micro-commercial-co/MMSS8550-L-TP/MMSS8550-L-TPMSCT-ND/2827205" H 2775 3825 50  0001 C CNN
F 4 "MMSS8550-L-TP" H 2775 3825 50  0001 C CNN "Part Number"
	1    2775 3825
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_02x04_Odd_Even P4
U 1 1 5B1561A8
P 3800 1800
F 0 "P4" H 3850 2117 50  0000 C CNN
F 1 "CONN_01X04" H 3850 2026 50  0000 C CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_2x04_P2.54mm_Vertical" H 3877 1704 50  0001 L CNN
F 3 "https://www.digikey.com/products/en?keywords=88738-8000" H 3878 1704 50  0001 L CNN
F 4 "0887388000" H 3800 1800 50  0001 C CNN "Part Number"
	1    3800 1800
	1    0    0    -1  
$EndComp
$Comp
L open-automation:GND #PWR0117
U 1 1 5B156693
P 3550 2050
F 0 "#PWR0117" H 3550 1800 50  0001 C CNN
F 1 "GND" H 3550 1900 50  0000 C CNN
F 2 "" H 3550 2050 50  0000 C CNN
F 3 "" H 3550 2050 50  0000 C CNN
	1    3550 2050
	1    0    0    -1  
$EndComp
Wire Wire Line
	3550 2050 3550 2000
Wire Wire Line
	3550 2000 3600 2000
Text HLabel 3570 1660 1    60   Input ~ 0
5V
Text Label 3450 1800 0    50   ~ 0
D_N
Text Label 3450 1900 0    50   ~ 0
D_P
Wire Wire Line
	3570 1660 3570 1700
Wire Wire Line
	3570 1700 3600 1700
Wire Wire Line
	3450 1800 3600 1800
Wire Wire Line
	3600 1900 3450 1900
$Comp
L open-automation:R_12k R40
U 1 1 5B178943
P 2325 3225
F 0 "R40" V 2325 3225 50  0000 C CNN
F 1 "R_12k" V 2250 3225 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 2255 3225 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0712KL/311-12KGRCT-ND/729656" V 2405 3225 50  0001 C CNN
F 4 "RC0603JR-0712KL" V 2505 3325 60  0001 C CNN "Part Number"
	1    2325 3225
	0    1    1    0   
$EndComp
$Comp
L open-automation:R_12k R41
U 1 1 5B178CF5
P 2325 3825
F 0 "R41" V 2325 3825 50  0000 C CNN
F 1 "R_12k" V 2250 3825 50  0000 C CNN
F 2 "Resistor_SMD:R_0603_1608Metric_Pad0.99x1.00mm_HandSolder" V 2255 3825 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/yageo/RC0603JR-0712KL/311-12KGRCT-ND/729656" V 2405 3825 50  0001 C CNN
F 4 "RC0603JR-0712KL" V 2505 3925 60  0001 C CNN "Part Number"
	1    2325 3825
	0    1    1    0   
$EndComp
Wire Wire Line
	2475 3825 2575 3825
Wire Wire Line
	2575 3225 2475 3225
Text HLabel 2900 2900 2    60   Input ~ 0
EN_ESP
Wire Wire Line
	2900 2900 2875 2900
Wire Wire Line
	2875 2900 2875 3025
Text HLabel 2900 4150 2    60   Input ~ 0
PROG
Wire Wire Line
	2900 4150 2875 4150
Wire Wire Line
	2875 4150 2875 4025
Text Label 1900 3225 0    50   ~ 0
DTR
Wire Wire Line
	1900 3225 2100 3225
Text Label 1900 3825 0    50   ~ 0
RTS
Wire Wire Line
	1900 3825 2150 3825
Wire Wire Line
	2875 3625 2875 3575
Wire Wire Line
	2875 3575 2100 3575
Wire Wire Line
	2100 3575 2100 3225
Connection ~ 2100 3225
Wire Wire Line
	2100 3225 2175 3225
Wire Wire Line
	2875 3425 2875 3475
Wire Wire Line
	2875 3475 2150 3475
Wire Wire Line
	2150 3475 2150 3825
Connection ~ 2150 3825
Wire Wire Line
	2150 3825 2175 3825
Wire Wire Line
	5275 4100 5275 4175
$Comp
L open-automation:GND #PWR0111
U 1 1 5B180278
P 5275 3750
F 0 "#PWR0111" H 5275 3500 50  0001 C CNN
F 1 "GND" H 5275 3600 50  0000 C CNN
F 2 "" H 5275 3750 50  0000 C CNN
F 3 "" H 5275 3750 50  0000 C CNN
	1    5275 3750
	-1   0    0    1   
$EndComp
Wire Wire Line
	5275 3750 5275 3800
Text Label 6025 4775 0    50   ~ 0
DSR
Wire Wire Line
	6025 4775 5975 4775
Text Label 6025 4575 0    50   ~ 0
DCD
Wire Wire Line
	6025 4575 5975 4575
Text Label 4150 1700 0    50   ~ 0
DCD
Text Label 4150 1800 0    50   ~ 0
DTR
Text Label 4150 1900 0    50   ~ 0
DSR
Wire Wire Line
	4150 1900 4100 1900
Wire Wire Line
	4150 1800 4100 1800
Wire Wire Line
	4150 1700 4100 1700
Text Label 4150 2000 0    50   ~ 0
RTS
Wire Wire Line
	4150 2000 4100 2000
Wire Wire Line
	5375 6075 5375 6100
Wire Wire Line
	5375 6100 5275 6100
Connection ~ 5275 6100
Wire Wire Line
	5275 6100 5275 6125
Connection ~ 4475 4475
Wire Wire Line
	3900 4825 3900 4875
Connection ~ 3900 4825
Wire Wire Line
	4000 4825 3900 4825
Wire Wire Line
	4000 4775 4000 4825
$Comp
L open-automation:C_0.1uF C14
U 1 1 5B1608B3
P 4000 4625
F 0 "C14" H 4100 4650 50  0000 L CNN
F 1 "C_0.1uF" H 4000 4550 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad0.99x1.00mm_HandSolder" H 4100 4925 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/C1608X7S0J475K080AC/445-9120-1-ND/3661604" H 4000 4375 50  0001 C CNN
F 4 "C1608X8R1H104K080AB" H 4125 4825 60  0001 C CNN "Part Number"
	1    4000 4625
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_10uF C52
U 1 1 5B27C012
P 3775 4625
F 0 "C52" H 3500 4650 50  0000 L CNN
F 1 "C_10uF" H 3500 4550 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad0.99x1.00mm_HandSolder" H 3875 4925 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/samsung-electro-mechanics/CL10A106MP8NNNC/1276-1871-1-ND/3889957" H 3775 4375 50  0001 C CNN
F 4 "CL10A106MP8NNNC" H 3900 4825 60  0001 C CNN "Part Number"
	1    3775 4625
	1    0    0    -1  
$EndComp
$Comp
L open-automation:C_1uF C50
U 1 1 5B2C9FB8
P 5275 3950
F 0 "C50" H 5390 3996 50  0000 L CNN
F 1 "C_1uF" H 5390 3905 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad0.99x1.00mm_HandSolder" H 5375 4250 50  0001 C CNN
F 3 "https://www.digikey.com/product-detail/en/tdk-corporation/CGA3E1X7R1C105M080AC/445-12540-1-ND/3954206" H 5275 3700 50  0001 C CNN
F 4 "CGA3E1X7R1C105M080AC" H 5400 4150 60  0001 C CNN "Part Number"
	1    5275 3950
	1    0    0    -1  
$EndComp
Wire Wire Line
	3425 4475 4475 4475
$EndSCHEMATC
