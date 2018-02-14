sudo apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt update

sudo apt-get install -y \
 dnsmasq hostapd nodejs xinput npm libgconf2-4 gnome-tweak-tool net-tools chromium-browser \
 bluez pulseaudio-module-bluetooth python-gobject python-gobject-2 bluez-tools udev nmap \
 mongodb git openssh-server tmux 

# https://raspberrypi.stackexchange.com/questions/47708/setup-raspberry-pi-3-as-bluetooth-speaker
sudo usermod -a -G lp $(whoami)
sudo nano /etc/bluetooth/audio.conf
  Enable=Source,Sink,Media,Socket
sudo nano /etc/bluetooth/main.conf
  Class = 0x00041C
pulseaudio -D
sudo nano /etc/udev/rules.d/99-input.rules
  SUBSYSTEM="input", GROUP="input", MODE="0660"
  KERNEL=="input[0-9]*", RUN+="/usr/lib/udev/bluetooth"
sudo mkdir /usr/lib/udev
sudo nano /usr/lib/udev/bluetooth

git clone https://github.com/oblique/create_ap
cd create_ap
make install

sudo npm install -g pm2 nw  #--unsafe-perm=true --allow-root
sudo python -m pip install pymongo numpy opencv-python

create_ap wlx70f11c021d3b enp3s0 dash mypassword
systemctl enable create_ap

## install open-dash
cd ~
git clone https://github.com/physiii/open-dash
cd open-dash
npm install
