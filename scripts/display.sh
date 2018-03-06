
xinput set-prop "eGalax Inc. USB TouchController" "Coordinate Transformation Matrix" 0 -1 1 1 0 0 0 0 1
xrandr --output HDMI-1 --rotate left

xrandr --newmode "1024x768_60.00"   63.50  1024 1072 1176 1328  768 771 775 798 -hsync +vsync
xrandr --addmode HDMI-1 "1024x768_60.00"
xrandr --output HDMI-1 --mode 1024x768_60.00
