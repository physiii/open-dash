#!/bin/bash
# onetimesetup.sh

#DASHUSER=open
#DASHHOME=`getent passwd ${DASHUSER} | cut -d: -f6`

if ! [ $(id -u) = 0 ]; then
  echo must run as root
  exit 1
fi

tmpsudoers=`mktemp`
# replace any existing %sudo rule with the new all-inclusive no-password rule
echo '%sudo ALL=(ALL:ALL) NOPASSWD:ALL' | cat <(grep -Ev ^%sudo /etc/sudoers) - > $tmpsudoers
if visudo -cfq $tmpsudoers; then
  cp $tmpsudoers /etc/sudoers
else
  echo failed to update sudoers $tmpsudoers
  exit 1
fi
rm $tmpsudoers
unset tmpsudoers

if ! apt remove light-locker; then
  echo failed to disable screenlocker
  exit 1
fi

# these override whatever is in /etc/X11/xorg.conf or xorg.conf.d/*
xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/blank-on-ac -s 0
xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/enable-dpms -s false
# shutdown
xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/power-button-action -s 4

if ! wget -qO- https://deb.nodesource.com/setup_10.x | bash -; then
  echo failed to configure node repository
  exit 1
fi

if ! apt install -y `cat open-dash-apt-packages.txt`; then
  echo failed to install dependencies
  exit 1
fi

# autologin setup during install

#setup open-dash
git clone https://github.com/physiii/open-dash /usr/local/src/open-dash
(
cd /usr/local/src/open-dash
npm install
)
git clone https://github.com/oblique/create_ap /usr/local/src/create_ap
(
cd /usr/local/src/create_ap
make install
)

# touchscreen setup
wget http://home.eeti.com.tw/touch_driver/Linux/20151022/eGTouch_v2.5.5814.L-x.tar.gz
tar xvfz eGTouch_v2.5.5814.L-x.tar.gz -C ~
(cd eGTouch_v2.5.5814-L-x; echo -e 'Y\n2\n\n1\n' | ./setup.sh)
echo -e '#!/bin/sh\n/usr/bin/eGTouchD' > /etc/rc.local
chmod +x /etc/rc.local

# daughterboard toolchain
usermod -a -G dialout open
echo export PATH="\"${PATH}:/usr/local/src/esp/xtensa-esp32-elf/bin\"" > /etc/profile.d/esp32.sh
echo export IDF_PATH=/usr/local/src/esp/esp-idf >> /etc/profile.d/esp32.sh
wget https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz
mkdir -p /usr/local/src/esp
(
cd /usr/local/src/esp
tar xvfz xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz
git clone --recursive https://github.com/espressif/esp-idf.git
git clone https://github.com/physiii/open-dash-daughter
)

