### installing OS
download lubuntu 18.04
Press esc to get to boot menu\
Boot manager\
Choose flash drive\
Choose Install lununtu\
Choose erase disk and install lubuntu\
Remove flash drive and reboot


### no sudo password
sudo visudo /etc/sudoers and change to: %sudo   ALL=(ALL:ALL) NOPASSWD:ALL

### dependencies
sudo apt install -y curl \
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - \
sudo apt install -y ffmpeg openssh-server xfce4-power-manager hostapd dnsmasq hostapd nodejs xinput libgconf2-4 gnome-tweak-tool net-tools bluez pulseaudio-module-bluetooth python-gobject python-gobject-2 bluez-tools udev nmap mongodb git openssh-server tmux wmctrl make cmake

sudo npm install -g pm2 nw-gyp nw --nwjs_build_type=sdk --unsafe-perm=true --allow-root

## autologin
sudo nano /etc/lightdm/lightdm.conf.d/10-autologin.conf

[Seat:*]\
autologin-guest = false\
autologin-user = open
autologin-user-timeout = 0

[SeatDefaults]
allow-guest = false

## power mgmt
xfce4-power-manager-settings: turn off display power management, shutdown when power button is pressed

## open-dash install
sudo chmod 777 -R /usr/local/\
cd /usr/local/src/\
git clone -b build https://github.com/physiii/open-dash \
cd open-dash\
npm install \
cd node_modules/serialport \
nw-gyp build --target=0.31.1

cd /usr/local/src/\
git clone https://github.com/oblique/create_ap \
cd create_ap\
sudo make install

sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup /usr/local/src/dash-usps/scripts/dash-show.sh -u open --hp /home/open

## NW SDK
wget https://dl.nwjs.io/v0.31.2/nwjs-sdk-v0.31.2-linux-x64.tar.gz \
tar -zxvf nwjs-sdk* \
cd nwjs-sdk* \
sudo mv /usr/local/bin/nw /usr/local/bin/nw-old \
sudo mv /usr/bin/nw /usr/bin/nw-old \
sudo ln -s nw /usr/local/bin/nw \
sudo ln -s nw /usr/bin/nw

## touchscreen setup
cd /usr/local/src/open-dash/build\
tar -zxvf eGTouch_v2.5.5814.L-x.tar.gz -C ~\
cd ~/eGTouch_v2*\
sudo sh setup.sh\
sudo ~/eGTouch_v2.5.5814.L-x/eGTouch64/eGTouch64withX/eGTouchD\
echo -e '#!/bin/sh -e '"\nsudo eGTouchD" | sudo tee /etc/rc.local\
sudo chmod u+wx /etc/rc.local

## daughter board setup
sudo apt-get install -y gcc g++ git wget make libncurses-dev flex bison gperf python python-serial \
sudo usermod -a -G dialout $USER \
echo 'export PATH="$PATH:/usr/local/src/esp/xtensa-esp32-elf/bin"' >> ~/.bashrc \
echo 'export IDF_PATH="/usr/local/src/esp/esp-idf"'  >> ~/.bashrc \
source ~/.bashrc \
cd /usr/local/src \
mkdir esp \
cd esp \
git clone --recursive https://github.com/espressif/esp-idf.git \
wget https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz \
tar -zxvf xtensa-esp32* \
git clone https://github.com/physiii/open-dash-daughter
