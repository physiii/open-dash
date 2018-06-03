#!/bin/bash

sudo ls || exit 1
sudo rm /var/crash/*
export DISPLAY=:0
~open/open-dash/scripts/display.sh
~open/open-dash/scripts/fight-screensaver.sh &
sudo eGTouchD

bluetoothctl <<-EOF
	power on
	default-agent
	discoverable on
	trust 00:17: 	 
	quit
EOF

cd ~open/open-dash/
nw .
