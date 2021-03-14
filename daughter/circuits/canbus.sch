EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr USLetter 11000 8500
encoding utf-8
Sheet 6 14
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
	5550 2450 5550 2525
Text HLabel 1500 1200 0    50   Input ~ 0
CAN_RX
Text HLabel 1500 1100 0    50   Input ~ 0
CAN_TX
Text Label 1550 1000 0    50   ~ 0
5V
Wire Wire Line
	1550 1000 1500 1000
Text Label 4350 1850 0    50   ~ 0
5V
Wire Wire Line
	4350 1850 4350 1900
Wire Wire Line
	4350 2250 4350 2200
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
Text Label 5100 1650 2    50   ~ 0
CANH
Wire Wire Line
	5100 2500 5100 2450
Wire Wire Line
	6800 4050 6750 4050
Wire Wire Line
	5100 1650 5100 1700
Text Label 5550 1650 2    50   ~ 0
CANL
Wire Wire Line
	5550 1650 5550 1700
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
	5550 2150 5550 2100
Wire Wire Line
	5100 2150 5100 2100
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5ADD74BB
P 4900 4750
AR Path="/5A8CA1AF/5ADD74BB" Ref="#PWR?"  Part="1" 
AR Path="/60D3331D/5ADD74BB" Ref="#PWR083"  Part="1" 
F 0 "#PWR083" H 4900 4500 50  0001 C CNN
F 1 "GND" H 4905 4577 50  0000 C CNN
F 2 "" H 4900 4750 50  0001 C CNN
F 3 "" H 4900 4750 50  0001 C CNN
	1    4900 4750
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5ADD757D
P 5450 4500
AR Path="/5A8CA1AF/5ADD757D" Ref="#PWR?"  Part="1" 
AR Path="/60D3331D/5ADD757D" Ref="#PWR085"  Part="1" 
F 0 "#PWR085" H 5450 4250 50  0001 C CNN
F 1 "GND" H 5455 4327 50  0000 C CNN
F 2 "" H 5450 4500 50  0001 C CNN
F 3 "" H 5450 4500 50  0001 C CNN
	1    5450 4500
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5ADD7680
P 5550 2525
AR Path="/5A8CA1AF/5ADD7680" Ref="#PWR?"  Part="1" 
AR Path="/60D3331D/5ADD7680" Ref="#PWR086"  Part="1" 
F 0 "#PWR086" H 5550 2275 50  0001 C CNN
F 1 "GND" H 5555 2352 50  0000 C CNN
F 2 "" H 5550 2525 50  0001 C CNN
F 3 "" H 5550 2525 50  0001 C CNN
	1    5550 2525
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5ADD76B3
P 4350 2250
AR Path="/5A8CA1AF/5ADD76B3" Ref="#PWR?"  Part="1" 
AR Path="/60D3331D/5ADD76B3" Ref="#PWR082"  Part="1" 
F 0 "#PWR082" H 4350 2000 50  0001 C CNN
F 1 "GND" H 4355 2077 50  0000 C CNN
F 2 "" H 4350 2250 50  0001 C CNN
F 3 "" H 4350 2250 50  0001 C CNN
	1    4350 2250
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5CC02094
P 5100 2500
AR Path="/5A8CA1AF/5CC02094" Ref="#PWR?"  Part="1" 
AR Path="/60D3331D/5CC02094" Ref="#PWR084"  Part="1" 
F 0 "#PWR084" H 5100 2250 50  0001 C CNN
F 1 "GND" H 5105 2327 50  0000 C CNN
F 2 "" H 5100 2500 50  0001 C CNN
F 3 "" H 5100 2500 50  0001 C CNN
	1    5100 2500
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5CC051DA
P 6800 4050
AR Path="/5A8CA1AF/5CC051DA" Ref="#PWR?"  Part="1" 
AR Path="/60D3331D/5CC051DA" Ref="#PWR087"  Part="1" 
F 0 "#PWR087" H 6800 3800 50  0001 C CNN
F 1 "GND" H 6805 3877 50  0000 C CNN
F 2 "" H 6800 4050 50  0001 C CNN
F 3 "" H 6800 4050 50  0001 C CNN
	1    6800 4050
	0    -1   -1   0   
$EndComp
$Comp
L open-dash-daughterboard-rescue:C_0.1uF-Open_Automation C?
U 1 1 5B19B412
P 4350 2050
AR Path="/5A8CA1AF/5B19B412" Ref="C?"  Part="1" 
AR Path="/60D3331D/5B19B412" Ref="C24"  Part="1" 
F 0 "C24" H 4465 2096 50  0000 L CNN
F 1 "C_0.1uF" H 4465 2005 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.08x0.95mm_HandSolder" H 4450 2350 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/YAGEO-CC0603KRX7R9BB104_C14663.pdf" H 4350 1800 50  0001 C CNN
F 4 "CC0603KRX7R9BB104" H 4475 2250 60  0001 C CNN "Part Number"
F 5 "C14663" H 0   0   50  0001 C CNN "LCSC"
	1    4350 2050
	1    0    0    -1  
$EndComp
$Comp
L open-dash-daughterboard-rescue:PESD1CAN-UX-Open_Automation D?
U 1 1 5CCC0B80
P 6550 4050
AR Path="/5A8CA1AF/5CCC0B80" Ref="D?"  Part="1" 
AR Path="/60D3331D/5CCC0B80" Ref="D13"  Part="1" 
F 0 "D13" V 6892 4050 50  0000 C CNN
F 1 "PESD1CAN-UX" V 6801 4050 50  0000 C CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 6775 4000 50  0001 L CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Nexperia-PESD1CAN-UX_C152727.pdf" H 6675 4175 50  0001 C CNN
F 4 "https://www.digikey.com/product-detail/en/nexperia-usa-inc/PESD1CAN-UX/1727-1306-1-ND/4386316" H 6550 4050 50  0001 C CNN "Website"
F 5 "PESD1CAN-UX" H 6550 4050 50  0001 C CNN "Part Number"
F 6 "C152727" H 0   0   50  0001 C CNN "LCSC"
	1    6550 4050
	0    -1   -1   0   
$EndComp
Wire Wire Line
	3600 3750 3600 3800
$Comp
L open-dash-daughterboard-rescue:GND-power #PWR?
U 1 1 5D07B36E
P 3600 4750
AR Path="/5A8CA1AF/5D07B36E" Ref="#PWR?"  Part="1" 
AR Path="/60D3331D/5D07B36E" Ref="#PWR081"  Part="1" 
F 0 "#PWR081" H 3600 4500 50  0001 C CNN
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
Text Notes 3150 3650 0    50   ~ 0
shift RX from 5 to 3.3 volts
$Comp
L Open_Automation:R_10K_0402 R39
U 1 1 605738FD
P 3600 4500
F 0 "R39" H 3670 4546 50  0000 L CNN
F 1 "R_10K_0402" H 3670 4455 50  0000 L CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 3530 4500 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1002TCE_C25744.pdf" V 3680 4500 50  0001 C CNN
F 4 "0402WGF1002TCE" V 3780 4600 60  0001 C CNN "Part Number"
F 5 "C25744" V 3850 4500 50  0001 C CNN "LCSC"
	1    3600 4500
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_4.7K R38
U 1 1 6057A3E4
P 3600 4000
F 0 "R38" H 3670 4046 50  0000 L CNN
F 1 "R_4.7K" H 3670 3955 50  0000 L CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 3530 4000 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF4701TCE_C25900.pdf" V 3680 4000 50  0001 C CNN
F 4 "0402WGF4701TCE" V 3780 4100 60  0001 C CNN "Part Number"
F 5 "C25900" V 3850 4000 50  0001 C CNN "LCSC"
	1    3600 4000
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_4.7K R40
U 1 1 6057D4BE
P 4900 4500
F 0 "R40" H 4970 4546 50  0000 L CNN
F 1 "R_4.7K" H 4970 4455 50  0000 L CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 4830 4500 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF4701TCE_C25900.pdf" V 4980 4500 50  0001 C CNN
F 4 "0402WGF4701TCE" V 5080 4600 60  0001 C CNN "Part Number"
F 5 "C25900" V 5150 4500 50  0001 C CNN "LCSC"
	1    4900 4500
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:C_470pF C27
U 1 1 6047599C
P 5550 2300
F 0 "C27" H 5650 2300 50  0000 L CNN
F 1 "C_470pF" H 5550 2200 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.08x0.95mm_HandSolder" H 5650 2600 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Guangdong-Fenghua-Advanced-Tech-0402B471K500NT_C1537.pdf" H 5550 2050 50  0001 C CNN
F 4 "0402B471K500NT" H 5675 2500 60  0001 C CNN "Part Number"
F 5 "C1537" H 5550 2700 50  0001 C CNN "LCSC"
	1    5550 2300
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:C_470pF C26
U 1 1 604775F0
P 5100 2300
F 0 "C26" H 4900 2300 50  0000 L CNN
F 1 "C_470pF" H 4750 2200 50  0000 L CNN
F 2 "Capacitor_SMD:C_0603_1608Metric_Pad1.08x0.95mm_HandSolder" H 5200 2600 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Guangdong-Fenghua-Advanced-Tech-0402B471K500NT_C1537.pdf" H 5100 2050 50  0001 C CNN
F 4 "0402B471K500NT" H 5225 2500 60  0001 C CNN "Part Number"
F 5 "C1537" H 5100 2700 50  0001 C CNN "LCSC"
	1    5100 2300
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_100 R41
U 1 1 604944AE
P 5100 1900
F 0 "R41" V 5100 1850 50  0000 L CNN
F 1 "R_100" H 5100 1750 50  0000 L CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 5030 1900 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1000TCE_C25076.pdf" V 5180 1900 50  0001 C CNN
F 4 "0402WGF1000TCE" V 5280 2000 60  0001 C CNN "Part Number"
F 5 "C25076" V 5400 1900 50  0001 C CNN "LCSC"
	1    5100 1900
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_100 R42
U 1 1 60494C03
P 5550 1900
F 0 "R42" V 5550 1850 50  0000 L CNN
F 1 "R_100" H 5550 1750 50  0000 L CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 5480 1900 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1000TCE_C25076.pdf" V 5630 1900 50  0001 C CNN
F 4 "0402WGF1000TCE" V 5730 2000 60  0001 C CNN "Part Number"
F 5 "C25076" V 5850 1900 50  0001 C CNN "LCSC"
	1    5550 1900
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:CAN_MCP2551-I-SN U3
U 1 1 60714385
P 5450 4050
F 0 "U3" H 5100 4400 50  0000 C CNN
F 1 "CAN_MCP2551-I-SN" H 5850 4400 50  0000 C CNN
F 2 "Package_SO:SOIC-8_3.9x4.9mm_P1.27mm" H 5450 3550 50  0001 C CIN
F 3 "https://datasheet.lcsc.com/szlcsc/Microchip-Tech-MCP2551-I-SN_C7376.pdf" H 5450 4050 50  0001 C CNN
F 4 "MCP2551-I/SN" H 5850 4500 50  0001 C CNN "Part Number"
F 5 "C7376" H 5800 4600 50  0001 C CNN "LCSC"
	1    5450 4050
	1    0    0    -1  
$EndComp
$EndSCHEMATC
