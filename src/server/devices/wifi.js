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

function ProcessCreateAccessPoint(wifiIface, etherIface, ssid, password){
    var processArgs = [
	'create_ap',
	wifiIface,
	etherIface,
	ssid
    ];
    if('string' === typeof password)
	if(!(/^\s*$/).test(password)){
	    console.log('WIFI PASSWORD', password);
	    processArgs.push(password);
	}
    this.process = spawn('sudo', processArgs);
    this.ap_config = processArgs;
    this.handleStandardOutputLines();
}
ProcessCreateAccessPoint.prototype.handleStandardOutputLines = function(){
	byline(this.process.stdout).on(
		"data",
		function(data){
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
		}
	);
	this.process.on(
		"close",
		function(code){
          console.log('Child process exited with code: ', code.toString());
		}
	);
};

function ap_connect() {
    var kid = new ProcessCreateAccessPoint(
	    config.wireless_adapter,
	    config.ethernet_adapter,
	    config.broadcast_ssid,
	    config.password
    );
    var ap_config = kid.ap_config;
};


//Socket.io functionality if needed



//--End of code prior to test function for module--//
function test() {
  console.log("Testing wifi Module");
};
