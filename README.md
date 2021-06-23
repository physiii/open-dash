### Install OS
Download ubuntu 19.10  
Press esc to get to boot menu  
Boot manager  
Choose flash drive  
Choose Install lununtu  
Choose erase disk and install ubuntu  
Remove flash drive and reboot  

### Setup OS
Disable Power Savings.  
sudo visudo /etc/sudoers: 
```
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL  
```

sudo nano /etc/udev/rules.d/10-local.rules
```
SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", SYMLINK+="game_bill_acceptor"
SUBSYSTEM=="tty", ATTRS{manufacturer}=="Prolific Technology Inc. ", ATTRS{product}=="USB-Serial Controller D", SYMLINK+="game_touchscreen"
SUBSYSTEM=="tty", ATTRS{manufacturer}=="Prolific Technology Inc.", ATTRS{product}=="USB-Serial Controller", SYMLINK+="game_daughter"
SUBSYSTEM=="video4linux", ATTRS{idVendor}=="1e4e", ATTRS{idProduct}=="7016", SYMLINK+="game_video"
```

### Install Dependencies
sudo apt install -y curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - 
sudo apt install -y ffmpeg openssh-server nodejs udev nmap mongodb git python-pip vlc openssh-server tmux webpack  
sudo npm install -g nw-gyp  
sudo snap install atom --classic  


### NW.JS
sudo chmod 777 /usr/local/src  
cd /usr/local/src  
wget https://dl.nwjs.io/v0.54.0/nwjs-sdk-v0.54.0-linux-x64.tar.gz
tar -zxvf nwjs-sdk*  
cd nwjs-sdk*  
sudo ln -s /usr/local/src/nwjs-sdk-v0.54.0-linux-x64/nw /usr/bin/nw  

### Daughter Board Setup
sudo apt-get install git wget flex bison gperf python python-setuptools \
  python-serial python-click python-cryptography python-future python-pyparsing \
  python-pyelftools cmake ninja-build ccache libffi-dev libssl-dev  

### Install Game Machine Software
cd ~  
git clone -b dev https://github.com/physiii/GameMachine  
cd GameMachine  
npm install  
webpack  

cp config.local.json config.json  
nano config.json  
```
config.local.json:

{
  "relay_server":"192.168.1.5",
  "relay_port" : 4443,
  "use_dev" : true,
  "use_ssl" : true,
  "manufacturer" : "Pyfi Technologies",
  "acceptor_dir":"/home/game/gamemachine/src/bill-acceptor/bill-acceptor.py",
  "bill_acceptor_port" : "/dev/game_bill_acceptor",
  "game_board_video_device": "/dev/game_video",
  "daughter_port":"/dev/game_daughter",
  "game_board_touchscreen_port": "/dev/game_touchscreen"
}

config.json
{
  "relay_server":"dev.pyfi.org",
  "relay_port" : 5050,
  "use_dev" : true,
  "use_ssl" : true,
  "enable_rightclick" : false,
  "manufacturer" : "Pyfi Technologies",
  "acceptor_dir":"/home/game/gamemachine/src/bill-acceptor/bill-acceptor.py",
  "bill_acceptor_port" : "/dev/game_bill_acceptor",
  "game_board_video_device": "/dev/game_video",
  "daughter_port":"/dev/game_daughter",
  "game_board_touchscreen_port": "/dev/game_touchscreen"
}
