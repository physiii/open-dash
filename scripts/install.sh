sudo apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt update

sudo apt-get install -y \
 dnsmasq hostapd nodejs xinput npm libgconf2-4 gnome-tweak-tool net-tools chromium-browser nmap mongodb git openssh-server tmux

sudo npm install -g pm2 nw  #--unsafe-perm=true --allow-root
sudo python -m pip install pymongo numpy opencv-python

git clone https://github.com/oblique/create_ap
cd create_ap
make install
# create_ap wlx70f11c021d3b enp3s0 dash mypassword

## install open-dash
cd ~
git clone https://github.com/physiii/open-dash
cd open-dash
npm install
