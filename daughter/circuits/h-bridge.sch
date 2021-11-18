EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 13 14
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
L Open_Automation:Q_NPN_BEC Q10
U 1 1 6055EDDA
P 6600 4500
AR Path="/601F213A/6052D630/6055EDDA" Ref="Q10"  Part="1" 
AR Path="/601F213A/6088AB47/6055EDDA" Ref="Q?"  Part="1" 
AR Path="/601F213A/608C2CD3/6055EDDA" Ref="Q?"  Part="1" 
AR Path="/601F213A/608C3312/6055EDDA" Ref="Q?"  Part="1" 
AR Path="/601F213A/6051923C/6055EDDA" Ref="Q13"  Part="1" 
AR Path="/601F213A/60537A7E/6055EDDA" Ref="Q16"  Part="1" 
AR Path="/601F213A/60537FF7/6055EDDA" Ref="Q19"  Part="1" 
AR Path="/601F213A/607B7BA9/6055EDDA" Ref="Q22"  Part="1" 
F 0 "Q22" H 6791 4546 50  0000 L CNN
F 1 "Q_NPN_BEC" H 6791 4455 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 6800 4600 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Changjiang-Electronics-Tech-CJ-SS8050_C2150.pdf" H 6800 4550 50  0001 C CNN
F 4 "C2150" H 6600 4500 50  0001 C CNN "LCSC"
F 5 "SS8050" H 6900 4650 50  0001 C CNN "Part Number"
	1    6600 4500
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_10K_0402 R67
U 1 1 605659CE
P 6700 4000
AR Path="/601F213A/6052D630/605659CE" Ref="R67"  Part="1" 
AR Path="/601F213A/6088AB47/605659CE" Ref="R?"  Part="1" 
AR Path="/601F213A/608C2CD3/605659CE" Ref="R?"  Part="1" 
AR Path="/601F213A/608C3312/605659CE" Ref="R?"  Part="1" 
AR Path="/601F213A/6051923C/605659CE" Ref="R71"  Part="1" 
AR Path="/601F213A/60537A7E/605659CE" Ref="R75"  Part="1" 
AR Path="/601F213A/60537FF7/605659CE" Ref="R79"  Part="1" 
AR Path="/601F213A/607B7BA9/605659CE" Ref="R83"  Part="1" 
F 0 "R83" H 6770 4046 50  0000 L CNN
F 1 "R_10K_0402" H 6770 3955 50  0000 L CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 6630 4000 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1002TCE_C25744.pdf" V 6780 4000 50  0001 C CNN
F 4 "0402WGF1002TCE" V 6880 4100 60  0001 C CNN "Part Number"
F 5 "C25744" V 6950 4000 50  0001 C CNN "LCSC"
	1    6700 4000
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_10K_0402 R66
U 1 1 6056BCEC
P 6150 4500
AR Path="/601F213A/6052D630/6056BCEC" Ref="R66"  Part="1" 
AR Path="/601F213A/6088AB47/6056BCEC" Ref="R?"  Part="1" 
AR Path="/601F213A/608C2CD3/6056BCEC" Ref="R?"  Part="1" 
AR Path="/601F213A/608C3312/6056BCEC" Ref="R?"  Part="1" 
AR Path="/601F213A/6051923C/6056BCEC" Ref="R70"  Part="1" 
AR Path="/601F213A/60537A7E/6056BCEC" Ref="R74"  Part="1" 
AR Path="/601F213A/60537FF7/6056BCEC" Ref="R78"  Part="1" 
AR Path="/601F213A/607B7BA9/6056BCEC" Ref="R82"  Part="1" 
F 0 "R82" V 5943 4500 50  0000 C CNN
F 1 "R_10K_0402" V 6034 4500 50  0000 C CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 6080 4500 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1002TCE_C25744.pdf" V 6230 4500 50  0001 C CNN
F 4 "0402WGF1002TCE" V 6330 4600 60  0001 C CNN "Part Number"
F 5 "C25744" V 6400 4500 50  0001 C CNN "LCSC"
	1    6150 4500
	0    1    1    0   
$EndComp
Wire Wire Line
	6350 4500 6400 4500
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 605EA495
P 6700 4750
AR Path="/5ABD187E/605EA495" Ref="#PWR?"  Part="1" 
AR Path="/605EA495" Ref="#PWR?"  Part="1" 
AR Path="/5FBF1F61/605EA495" Ref="#PWR?"  Part="1" 
AR Path="/601F1685/605EA495" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/605EA495" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/6052D630/605EA495" Ref="#PWR0106"  Part="1" 
AR Path="/601F213A/6088AB47/605EA495" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/608C2CD3/605EA495" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/608C3312/605EA495" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/6051923C/605EA495" Ref="#PWR0109"  Part="1" 
AR Path="/601F213A/60537A7E/605EA495" Ref="#PWR0112"  Part="1" 
AR Path="/601F213A/60537FF7/605EA495" Ref="#PWR0115"  Part="1" 
AR Path="/601F213A/607B7BA9/605EA495" Ref="#PWR0118"  Part="1" 
F 0 "#PWR0118" H 6700 4500 50  0001 C CNN
F 1 "GND" H 6700 4600 50  0000 C CNN
F 2 "" H 6700 4750 50  0000 C CNN
F 3 "" H 6700 4750 50  0000 C CNN
	1    6700 4750
	-1   0    0    -1  
$EndComp
Wire Wire Line
	6700 4750 6700 4700
Text Label 6700 4250 0    50   ~ 0
C2
Text Label 5900 4500 2    50   ~ 0
B2
Wire Wire Line
	5900 4500 5950 4500
Wire Wire Line
	6700 3750 6700 3800
Wire Wire Line
	6700 4200 6700 4300
Text Label 6700 3750 2    50   ~ 0
V+
$Comp
L Open_Automation:Q_NPN_BEC Q9
U 1 1 6062E0E9
P 5100 4500
AR Path="/601F213A/6052D630/6062E0E9" Ref="Q9"  Part="1" 
AR Path="/601F213A/6088AB47/6062E0E9" Ref="Q?"  Part="1" 
AR Path="/601F213A/608C2CD3/6062E0E9" Ref="Q?"  Part="1" 
AR Path="/601F213A/608C3312/6062E0E9" Ref="Q?"  Part="1" 
AR Path="/601F213A/6051923C/6062E0E9" Ref="Q12"  Part="1" 
AR Path="/601F213A/60537A7E/6062E0E9" Ref="Q15"  Part="1" 
AR Path="/601F213A/60537FF7/6062E0E9" Ref="Q18"  Part="1" 
AR Path="/601F213A/607B7BA9/6062E0E9" Ref="Q21"  Part="1" 
F 0 "Q21" H 5291 4546 50  0000 L CNN
F 1 "Q_NPN_BEC" H 5291 4455 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 5300 4600 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Changjiang-Electronics-Tech-CJ-SS8050_C2150.pdf" H 5300 4550 50  0001 C CNN
F 4 "C2150" H 5100 4500 50  0001 C CNN "LCSC"
F 5 "SS8050" H 5400 4650 50  0001 C CNN "Part Number"
	1    5100 4500
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_10K_0402 R65
U 1 1 6062E29F
P 5200 4000
AR Path="/601F213A/6052D630/6062E29F" Ref="R65"  Part="1" 
AR Path="/601F213A/6088AB47/6062E29F" Ref="R?"  Part="1" 
AR Path="/601F213A/608C2CD3/6062E29F" Ref="R?"  Part="1" 
AR Path="/601F213A/608C3312/6062E29F" Ref="R?"  Part="1" 
AR Path="/601F213A/6051923C/6062E29F" Ref="R69"  Part="1" 
AR Path="/601F213A/60537A7E/6062E29F" Ref="R73"  Part="1" 
AR Path="/601F213A/60537FF7/6062E29F" Ref="R77"  Part="1" 
AR Path="/601F213A/607B7BA9/6062E29F" Ref="R81"  Part="1" 
F 0 "R81" H 5270 4046 50  0000 L CNN
F 1 "R_10K_0402" H 5270 3955 50  0000 L CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 5130 4000 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1002TCE_C25744.pdf" V 5280 4000 50  0001 C CNN
F 4 "0402WGF1002TCE" V 5380 4100 60  0001 C CNN "Part Number"
F 5 "C25744" V 5450 4000 50  0001 C CNN "LCSC"
	1    5200 4000
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:R_10K_0402 R64
U 1 1 6062E2AB
P 4650 4500
AR Path="/601F213A/6052D630/6062E2AB" Ref="R64"  Part="1" 
AR Path="/601F213A/6088AB47/6062E2AB" Ref="R?"  Part="1" 
AR Path="/601F213A/608C2CD3/6062E2AB" Ref="R?"  Part="1" 
AR Path="/601F213A/608C3312/6062E2AB" Ref="R?"  Part="1" 
AR Path="/601F213A/6051923C/6062E2AB" Ref="R68"  Part="1" 
AR Path="/601F213A/60537A7E/6062E2AB" Ref="R72"  Part="1" 
AR Path="/601F213A/60537FF7/6062E2AB" Ref="R76"  Part="1" 
AR Path="/601F213A/607B7BA9/6062E2AB" Ref="R80"  Part="1" 
F 0 "R80" V 4443 4500 50  0000 C CNN
F 1 "R_10K_0402" V 4534 4500 50  0000 C CNN
F 2 "Resistor_SMD:R_0402_1005Metric_Pad0.72x0.64mm_HandSolder" V 4580 4500 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/szlcsc/Uniroyal-Elec-0402WGF1002TCE_C25744.pdf" V 4730 4500 50  0001 C CNN
F 4 "0402WGF1002TCE" V 4830 4600 60  0001 C CNN "Part Number"
F 5 "C25744" V 4900 4500 50  0001 C CNN "LCSC"
	1    4650 4500
	0    1    1    0   
$EndComp
Wire Wire Line
	4850 4500 4900 4500
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 6062E2B6
P 5200 4750
AR Path="/5ABD187E/6062E2B6" Ref="#PWR?"  Part="1" 
AR Path="/6062E2B6" Ref="#PWR?"  Part="1" 
AR Path="/5FBF1F61/6062E2B6" Ref="#PWR?"  Part="1" 
AR Path="/601F1685/6062E2B6" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/6062E2B6" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/6052D630/6062E2B6" Ref="#PWR0105"  Part="1" 
AR Path="/601F213A/6088AB47/6062E2B6" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/608C2CD3/6062E2B6" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/608C3312/6062E2B6" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/6051923C/6062E2B6" Ref="#PWR0108"  Part="1" 
AR Path="/601F213A/60537A7E/6062E2B6" Ref="#PWR0111"  Part="1" 
AR Path="/601F213A/60537FF7/6062E2B6" Ref="#PWR0114"  Part="1" 
AR Path="/601F213A/607B7BA9/6062E2B6" Ref="#PWR0117"  Part="1" 
F 0 "#PWR0117" H 5200 4500 50  0001 C CNN
F 1 "GND" H 5200 4600 50  0000 C CNN
F 2 "" H 5200 4750 50  0000 C CNN
F 3 "" H 5200 4750 50  0000 C CNN
	1    5200 4750
	-1   0    0    -1  
$EndComp
Wire Wire Line
	5200 4750 5200 4700
Text Label 5200 4250 0    50   ~ 0
C1
Wire Wire Line
	4400 4500 4450 4500
Wire Wire Line
	5200 3750 5200 3800
Wire Wire Line
	5200 4200 5200 4300
Text Label 5200 3750 2    50   ~ 0
V+
Text Label 4400 4500 2    50   ~ 0
B1
Text HLabel 1400 1400 0    50   Input ~ 0
OUTA
Text HLabel 1400 1500 0    50   Input ~ 0
OUTB
Text Label 1450 1500 0    50   ~ 0
OUTB
Wire Wire Line
	1450 1500 1400 1500
Text Label 1450 1400 0    50   ~ 0
OUTA
Wire Wire Line
	1450 1400 1400 1400
Text Label 1450 1150 0    50   ~ 0
B1
Wire Wire Line
	1450 1150 1400 1150
Text HLabel 1400 1250 0    50   Input ~ 0
CONTROL2
Text Label 1450 1250 0    50   ~ 0
B2
Wire Wire Line
	1450 1250 1400 1250
Text HLabel 1400 1000 0    50   Input ~ 0
V+
Text Label 1450 1000 0    50   ~ 0
V+
Wire Wire Line
	1450 1000 1400 1000
Text HLabel 1400 1150 0    50   Input ~ 0
CONTROL1
$Comp
L Open_Automation:Q_AO3401A Q11
U 1 1 619BDA1A
P 5400 1950
AR Path="/601F213A/6052D630/619BDA1A" Ref="Q11"  Part="1" 
AR Path="/601F213A/6051923C/619BDA1A" Ref="Q23"  Part="1" 
AR Path="/601F213A/60537A7E/619BDA1A" Ref="Q27"  Part="1" 
AR Path="/601F213A/60537FF7/619BDA1A" Ref="Q31"  Part="1" 
AR Path="/601F213A/607B7BA9/619BDA1A" Ref="Q35"  Part="1" 
F 0 "Q35" H 5200 2000 50  0000 L CNN
F 1 "Q_AO3401A" H 4950 1850 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 5600 2050 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/lcsc/1810171817_Alpha-&-Omega-Semicon-AO3401A_C15127.pdf" H 5600 2000 50  0001 C CNN
F 4 "AO3401A" H 5700 2100 60  0001 C CNN "Part Number"
F 5 "C15127" H 5700 2200 50  0001 C CNN "LCSC"
	1    5400 1950
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:Q_AO3400A Q14
U 1 1 619CB5F7
P 5400 2450
AR Path="/601F213A/6052D630/619CB5F7" Ref="Q14"  Part="1" 
AR Path="/601F213A/6051923C/619CB5F7" Ref="Q24"  Part="1" 
AR Path="/601F213A/60537A7E/619CB5F7" Ref="Q28"  Part="1" 
AR Path="/601F213A/60537FF7/619CB5F7" Ref="Q32"  Part="1" 
AR Path="/601F213A/607B7BA9/619CB5F7" Ref="Q36"  Part="1" 
F 0 "Q36" H 5200 2500 50  0000 L CNN
F 1 "Q_AO3400A" H 4950 2350 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 5600 2550 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/lcsc/1811081213_Alpha-&-Omega-Semicon-AO3400A_C20917.pdf" H 5600 2500 50  0001 C CNN
F 4 "AO3400A" H 5700 2600 60  0001 C CNN "Part Number"
F 5 "C20917" H 5400 2450 50  0001 C CNN "LCSC"
	1    5400 2450
	1    0    0    -1  
$EndComp
$Comp
L Open_Automation:Q_AO3401A Q17
U 1 1 619F76B8
P 5900 1950
AR Path="/601F213A/6052D630/619F76B8" Ref="Q17"  Part="1" 
AR Path="/601F213A/6051923C/619F76B8" Ref="Q25"  Part="1" 
AR Path="/601F213A/60537A7E/619F76B8" Ref="Q29"  Part="1" 
AR Path="/601F213A/60537FF7/619F76B8" Ref="Q33"  Part="1" 
AR Path="/601F213A/607B7BA9/619F76B8" Ref="Q37"  Part="1" 
F 0 "Q37" H 5700 2000 50  0000 L CNN
F 1 "Q_AO3401A" H 5450 1850 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 6100 2050 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/lcsc/1810171817_Alpha-&-Omega-Semicon-AO3401A_C15127.pdf" H 6100 2000 50  0001 C CNN
F 4 "AO3401A" H 6200 2100 60  0001 C CNN "Part Number"
F 5 "C15127" H 6200 2200 50  0001 C CNN "LCSC"
	1    5900 1950
	-1   0    0    -1  
$EndComp
$Comp
L Open_Automation:Q_AO3400A Q20
U 1 1 619F7C84
P 5900 2450
AR Path="/601F213A/6052D630/619F7C84" Ref="Q20"  Part="1" 
AR Path="/601F213A/6051923C/619F7C84" Ref="Q26"  Part="1" 
AR Path="/601F213A/60537A7E/619F7C84" Ref="Q30"  Part="1" 
AR Path="/601F213A/60537FF7/619F7C84" Ref="Q34"  Part="1" 
AR Path="/601F213A/607B7BA9/619F7C84" Ref="Q38"  Part="1" 
F 0 "Q38" H 5700 2500 50  0000 L CNN
F 1 "Q_AO3400A" H 5450 2350 50  0000 L CNN
F 2 "Package_TO_SOT_SMD:SOT-23" H 6100 2550 50  0001 C CNN
F 3 "https://datasheet.lcsc.com/lcsc/1811081213_Alpha-&-Omega-Semicon-AO3400A_C20917.pdf" H 6100 2500 50  0001 C CNN
F 4 "AO3400A" H 6200 2600 60  0001 C CNN "Part Number"
F 5 "C20917" H 5900 2450 50  0001 C CNN "LCSC"
	1    5900 2450
	-1   0    0    -1  
$EndComp
Text Label 5650 1700 0    50   ~ 0
V+
Wire Wire Line
	5650 1700 5650 1750
Wire Wire Line
	5500 1750 5650 1750
Wire Wire Line
	5650 1750 5800 1750
Connection ~ 5650 1750
Wire Wire Line
	5650 2700 5650 2650
$Comp
L open-dash-daughterboard-rescue:GND-open-automation #PWR?
U 1 1 61A2F624
P 5650 2700
AR Path="/5ABD187E/61A2F624" Ref="#PWR?"  Part="1" 
AR Path="/61A2F624" Ref="#PWR?"  Part="1" 
AR Path="/5FBF1F61/61A2F624" Ref="#PWR?"  Part="1" 
AR Path="/601F1685/61A2F624" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/61A2F624" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/6052D630/61A2F624" Ref="#PWR0156"  Part="1" 
AR Path="/601F213A/6088AB47/61A2F624" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/608C2CD3/61A2F624" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/608C3312/61A2F624" Ref="#PWR?"  Part="1" 
AR Path="/601F213A/6051923C/61A2F624" Ref="#PWR0157"  Part="1" 
AR Path="/601F213A/60537A7E/61A2F624" Ref="#PWR0160"  Part="1" 
AR Path="/601F213A/60537FF7/61A2F624" Ref="#PWR0161"  Part="1" 
AR Path="/601F213A/607B7BA9/61A2F624" Ref="#PWR0174"  Part="1" 
F 0 "#PWR0174" H 5650 2450 50  0001 C CNN
F 1 "GND" H 5650 2550 50  0000 C CNN
F 2 "" H 5650 2700 50  0000 C CNN
F 3 "" H 5650 2700 50  0000 C CNN
	1    5650 2700
	-1   0    0    -1  
$EndComp
Wire Wire Line
	5500 2650 5650 2650
Wire Wire Line
	5650 2650 5800 2650
Connection ~ 5650 2650
Text Label 5150 1950 2    50   ~ 0
C1
Wire Wire Line
	5150 1950 5200 1950
Text Label 5150 2450 2    50   ~ 0
C1
Text Label 5450 2200 2    50   ~ 0
OUTA
Wire Wire Line
	5150 2450 5200 2450
Text Label 5850 2200 0    50   ~ 0
OUTB
Text Label 6150 1950 0    50   ~ 0
C2
Wire Wire Line
	6150 1950 6100 1950
Text Label 6150 2450 0    50   ~ 0
C2
Wire Wire Line
	6150 2450 6100 2450
Wire Wire Line
	5500 2150 5500 2200
Wire Wire Line
	5450 2200 5500 2200
Connection ~ 5500 2200
Wire Wire Line
	5500 2200 5500 2250
Wire Wire Line
	5800 2150 5800 2200
Wire Wire Line
	5850 2200 5800 2200
Connection ~ 5800 2200
Wire Wire Line
	5800 2200 5800 2250
$EndSCHEMATC
