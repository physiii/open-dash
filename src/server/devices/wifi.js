// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- wifi.js ------------------------------------ //

var byline = require('byline');
const spawn = require('child_process').spawn;
const EventEmitter = require("events");

var wifi_events = new EventEmitter();

var fs = require('fs');

const configuration = require("../configuration.js");

var config = {
  "wireless_adapter": "wlp3s0",
  "ethernet_adapter": "enp2s0",
  "broadcast_ssid": "dash",
  "password": ""
}

module.exports = {
	ap_connect: ap_connect,
  events: wifi_events
};

function ap_connect() {
	return new Promise(
		function(resolve, reject){
		    return configuration.readConfig(
			function(error, value){
			    if(error) return reject(error);
			    else return resolve(value);
			},
			config,
			function(path, contents){
			    console.log("created config.json");
			}
		    );
		}
	).then(
		function(config){
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
        console.log("*** Creating a virtual Wifi Interface ***", config);
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
  });
      ap_process.on('close', (code) => {
          console.log('Child process exited with code: ', code.toString());
      });
		}
	);
};


//Socket.io functionality if needed



//--End of code prior to test function for module--//
function test() {
  console.log("Testing wifi Module");
};
