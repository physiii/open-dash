#!/bin/bash
# onetimesetup.sh

DASHUSER=open
DASHHOME=`getent passwd ${DASHUSER} | cut -d: -f6`

tmpsudoers=`mktemp`
# replace any existing %sudo rule with the new all-inclusive no-password rule
echo '%sudo ALL=(ALL:ALL) NOPASSWD:ALL' | cat <(sudo grep -Ev ^%sudo /etc/sudoers) - > $tmpsudoers
if sudo visudo -cqf $tmpsudoers; then
  sudo cp $tmpsudoers /etc/sudoers
else
  echo failed to update sudoers $tmpsudoers
  exit 1
fi
rm $tmpsudoers
unset tmpsudoers

# disable automatic updates
sudo systemctl disable apt-daily-upgrade.timer
sudo systemctl disable apt-daily.timer
sudo sed -i /etc/apt/apt.conf.d/10periodic -e 's/^[^ \t]*APT::Periodic::Update-Package-Lists.*/APT::Periodic::Update-Package-Lists "0";/g'

if ! sudo apt remove -y light-locker; then
  echo failed to remove light-locker 
  exit 1
fi

if ! wget -qO- https://deb.nodesource.com/setup_10.x | sudo -E bash -; then
  echo failed to configure node repository
  exit 1
fi

if ! sudo apt install -y `wget -qO- https://raw.githubusercontent.com/physiii/open-dash/setupscript/deploy/open-dash-apt-packages.txt`; then
  echo failed to install package dependencies
  exit 1
fi

# these override whatever is in /etc/X11/xorg.conf or xorg.conf.d/*
# requires xfce4-power-manager
xfconf-query --channel xfce4-power-manager --create --type integer --property /xfce4-power-manager/blank-on-ac --set 0
xfconf-query --channel xfce4-power-manager --create --type bool --property /xfce4-power-manager/dpms-enabled --set false
# shutdown
xfconf-query --channel xfce4-power-manager --create --type integer --property /xfce4-power-manager/power-button-action --set 4

# autologin setup during install

#setup open-dash
sudo mkdir -p /usr/local/src
sudo chown -R $DASHUSER /usr/local/src

git clone https://github.com/physiii/open-dash /usr/local/src/open-dash
(
cd /usr/local/src/open-dash
npm install
)
git clone https://github.com/oblique/create_ap /usr/local/src/create_ap
(
cd /usr/local/src/create_ap
sudo make install
)

/usr/local/lib/node_modules/pm2/bin/pm2 startup

# touchscreen setup
wget http://home.eeti.com.tw/touch_driver/Linux/20151022/eGTouch_v2.5.5814.L-x.tar.gz
tar xvfz eGTouch_v2.5.5814.L-x.tar.gz
(cd eGTouch_v2.5.5814-L-x; echo -e 'Y\n2\n\n1\n' | ./setup.sh)
echo -e '#!/bin/sh\n/usr/bin/eGTouchD' > /etc/rc.local
chmod +x /etc/rc.local

# daughterboard toolchain
usermod -a -G dialout $DASHUSER
echo export PATH=\$PATH:/usr/local/src/esp/xtensa-esp32-elf/bin > /etc/profile.d/esp32.sh
echo export IDF_PATH=/usr/local/src/esp/esp-idf >> /etc/profile.d/esp32.sh
mkdir -p /usr/local/src/esp
wget https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz
tar xvfz xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz -C /usr/local/src/esp
(
cd /usr/local/src/esp
git clone --recursive https://github.com/espressif/esp-idf.git
git clone https://github.com/physiii/open-dash-daughter
)

sudo shutdown now -r

