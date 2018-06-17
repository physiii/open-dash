#!/bin/bash

#
# bluetooth audio is driven by the MDD
# on hte dash we must accept the pair request with pin 0000 and authorize the MDD's A2DP request
#

MDDBLUETOOTHADDR=${1}
MYBLUETOOTHADDR=`hcitool dev | grep hci0 | awk '{print $2}'`

echo -n $MYBLUETOOTHADDR

