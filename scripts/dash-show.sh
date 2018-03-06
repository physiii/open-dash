#!/bin/bash

sudo ls || exit 1
export DISPLAY=:0
~open/open-dash/scripts/display.sh
xset -dpms
xset s noblank
xset s off
sudo eGTouchD
cd ~open/open-dash/
nw .
