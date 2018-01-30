
xinput set-prop "TPK USA LLC Touch Fusion 4." "Coordinate Transformation Matrix" 0 -1 1 1 0 0 0 0 1
xrandr --output HDMI-1 --rotate left

xrandr --newmode "1024x600_60.00"   49.00  1024 1072 1168 1312  600 603 613 624 -hsync +vsync
xrandr --addmode HDMI-1 "1024x600_60.00"
xrandr --output HDMI-1 --mode 1024x600_60.00
