// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- wifi.js ------------------------------------ //

var byline = require('byline');
const spawn = require('child_process').spawn;
const EventEmitter = require("events");

var wifi_events = new EventEmitter();

var fs = require('fs');
config = {
  "wireless_adapter": "wlp3s0",
  "ethernet_adapter": "enp2s0",
  "broadcast_ssid": "dash",
  "password": ""
}

try {
  config = require('../../../config.json');
} catch (e) {
  var config_str = JSON.stringify(config).replace(/,/g, "\,\n  ").replace(/{/g, "{\n  ").replace(/}/g, "\n}");
  fs.writeFile("./config.json", config_str, (err) => {
    if (err) throw err;
    console.log("created config.json");
  });
}

module.exports = {
	ap_connect: ap_connect,
  events: wifi_events
};

function ap_connect() {
  var ap_config = [
    'create_ap',
    config.wireless_adapter,
    config.ethernet_adapter,
    config.broadcast_ssid
  ];

  if (typeof config.password === 'string' && !(/^\s*$/).test(config.password)) {
    console.log('WIFI PASSWORD', config.password);
    ap_config.push(config.password);
  }

  const ap_process = spawn('sudo', ap_config);
  var ap_stream = byline(ap_process.stdout);

  ap_stream.on('data', (data) => {
      data = data.toString();

      if (data.includes("Creating a virtual")){
        console.log("*** Creating a virtual Wifi Interface ***");
      };

      if (data.includes(": authenticated")){
        console.log('*** Wifi connection authenticated ***');
        wifi_events.emit('connected');
      };

      if (data.includes("AP-STA-CONNECTED")){
        data = data.replace('ap0: AP-STA-CONNECTED', ':');
        console.log('*** Wifi connection established ***');
      };

      if (data.includes(": deauthenticated")){
        console.log('*** Wifi has been deauthenticated ***');
      };

      if (data.includes("AP-STA-DISCONNECTED")){
        data = data.replace('ap0: AP-STA-DISCONNECTED', ':');
        console.log('*** Wifi has been disconnected ***');
        wifi_events.emit('disconnected');
      };
      ap_process.on('close', (code) => {
          console.log('Child process exited with code: ', code.toString());
      });
  });
};


//Socket.io functionality if needed



//--End of code prior to test function for module--//
function test() {
  console.log("Testing wifi Module");
};
