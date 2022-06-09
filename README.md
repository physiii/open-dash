### Objective


Provide an open source platform for vehicle information and entertainment. 

This software is designed to run on Linux. I recommend Ubuntu for the main computer. Daughterboard firmware is designed around FreeRTOS. The gui is made using NodeWebkit and communicates with a custom daughterboard for interfacing with the vehicle. Supports CANbus and J1850 protocols. Daughterboard supports many functions such as HVAC control, battery monitoring, vehicle status and statistics over wifi, driver circuits for various actuators around the car. 

![Alt text](/images/dash-pcb.png?raw=true "Saving files")

![Alt text](/images/dash-schematic.png?raw=true "Saving files")


### Install OS
Download ubuntu 21.10 and create boot disk  
Press esc to get to boot menu  
Boot manager  
Choose flash drive  
Choose Install ubuntu
Choose erase disk and install ubuntu  
Remove flash drive and reboot  

### Setup OS
Set no keyring passwd  
Disable Power Savings   
sudo visudo /etc/sudoers: 
```
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL  
```

```
sudo usermod -a -G dialout $USER
sudo usermod -a -G audio $USER
```
Add startup programs  
```
pm2 start /usr/local/src/open-dash/service/index.js --time --name dash
nw /usr/local/src/open-dash
```

### Display

Set scale to 200%  
Rotate to portrait mode
Settings > Appearance > Position on screen: Bottom
```
sudo cp /usr/local/src/open-dash/scripts/99-touch.rules /etc/udev/rules.d/99-touch.rules
```

### Install Dependencies
```
sudo apt install -y curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt update
```

```
sudo wget -qnc https://repo.nordvpn.com/deb/nordvpn/debian/pool/main/nordvpn-release_1.0.0_all.deb
sudo dpkg -i ./nordvpn-release_1.0.0_all.deb
```
```
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
```

```
sudo apt-get -y install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

```
sudo apt update && sudo apt upgrade -y

sudo apt install -y \
  tmux git nodejs sshfs nmap cmake pv vlc pithos gimp librecad resolvconf openssh-server \
  net-tools v4l-utils clementine net-tools kodi nordvpn vlc-plugin-bittorrent \
  libgconf-2-4 sshpass git nodejs dnsmasq hostapd tmux xdotool libudev-dev \
  python-setuptools python3-dev libssl-dev libasound2-dev nmap ffmpeg \
  build-essential cmake pkg-config libjpeg-dev libtiff5-dev libatomic1 \
  libavcodec-dev libavformat-dev libswscale-dev libv4l-dev libxvidcore-dev libx264-dev libfreetype6-dev \
  libatlas-base-dev gfortran python3-dev libavcodec-dev libavformat-dev python3-pip \
  libasound-dev portaudio19-dev libportaudio2 libportaudiocpp0 \
  google-chrome-stable speedtest-cli mongodb-org \

```

```
sudo npm install -g nw-gyp
sudo npm install -g pm2 --unsafe-perm=true --allow-root
sudo snap install atom --classic
sudo snap install blender --channel=beta --classic
```

```
sudo apt install -y apt-transport-https curl
sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main"|sudo tee /etc/apt/sources.list.d/brave-browser-release.list
sudo apt update
sudo apt install -y brave-browser
```
### kicad
```
sudo add-apt-repository --yes ppa:js-reynaud/kicad-5.1
sudo apt update
sudo apt install -y --install-suggests kicad

mkdir ~/circuits
cd ~/circuits
git clone https://github.com/physiii/kicad-parts
# add symbol and footprint paths
```
### esp32
```
sudo ln -s /usr/bin/python3 /usr/bin/python

mkdir -p ~/esp
cd ~/esp
git clone --recursive https://github.com/espressif/esp-idf.git

cd ~/esp/esp-idf
./install.sh

echo "alias get_idf='. $HOME/esp/esp-idf/export.sh'" >> ~/.bashrc

source ~/.bashrc
get_idf

cd ~/esp
cp -r $IDF_PATH/examples/get-started/hello_world .
cd ~/esp/hello_world
idf.py set-target esp32
idf.py menuconfig
```

### audio
```
cd ~
git clone https://github.com/physiii/ardour-sessions

```
sudo nano /etc/security/limits.conf
```
  @audio          -       rtprio          99
```
```
sudo apt install -y qjackctl pulseaudio-module-jack libjack0 jackd jack-tools \
linux-lowlatency ardour a2jmidid libjack-dev pavucontrol \
```
## Jack
set interface  
Settings -> MIDI Driver: seq  
Options -> execute script after startup: pactl load-module module-jack-sink;pactl load-module module-jack-source;pactl set-default-sink jack_out  
Misc -> start JACK audio service on application startup  
```
pamcd set-default-sink jack_out
```
```
sudo apt install -y \
calf-plugins libtool autoconf libexpat1-dev libglib2.0-dev libfluidsynth-dev \
jackd libjack-dev libglade2-dev lv2-dev yoshimi ams \
blop caps cmt fil-plugins rev-plugins swh-plugins tap-plugins \
invada-studio-plugins-lv2 mda-lv2 swh-lv2 \
blepvco mcp-plugins omins so-synth-lv2 lingot \
```
## MIDI

```
pip3 install python-rtmidi pyserial mido
git clone https://github.com/physiii/wireless-midi
```

###  Popcorn
```
sudo chown -R ${USER}:${USER} /usr/local/src
cd /usr/local/src
git clone https://github.com/popcorn-official/popcorn-desktop
cd popcorn-desktop
sudo npm install -g gulp
npm install
gulp build
gulp run
nw .
```
### NW.JS
```
sudo chown -R ${USER}:${USER} /usr/local/src
cd /usr/local/src  
wget https://dl.nwjs.io/v0.54.0/nwjs-sdk-v0.54.0-linux-x64.tar.gz
tar -zxvf nwjs-sdk*  
cd nwjs-sdk*  
sudo ln -s /usr/local/src/nwjs-sdk-v0.54.0-linux-x64/nw /usr/bin/nw  
```
### Install Software
```
sudo chown -R ${USER}:${USER} /usr/local/src
cd /usr/local/src
git clone https://github.com/physiii/open-dash
cd open-dash
npm install
npm run build
```
