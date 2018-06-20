#!/bin/bash

#
# bluetooth audio is driven by the MDD
# on hte dash we must accept the pair request with pin 0000 and authorize the MDD's A2DP request
#

LOCALHCIDEV=hci0
MDDBLUETOOTHADDR=${1}
#MDDBLUETOOTHADDR='B0:B4:48:A5:71:6E'

MYBLUETOOTHADDR=`hcitool dev | grep ${LOCALHCIDEV} | awk '{print $2}'`

echo -n $MYBLUETOOTHADDR

