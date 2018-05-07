// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- wifi.js ------------------------------------ //


var byline = require('byline');
const spawn = require('child_process').spawn;
const EventEmitter = require("events");
const fs = require('fs');
const configuration = require("../configuration.js");

var wifi_events = new EventEmitter();

module.exports = {
	ap_connect: ap_connect,
  events: wifi_events
};

var configPromise = new Promise(
	function(resolve, reject){
		    return configuration.readConfig(
			function(error, value){
			    if(error) return reject(error);
			    else return resolve(value);
			},
			{
				"wireless_adapter": "wlp3s0",
				"ethernet_adapter": "enp2s0",
				"broadcast_ssid": "dash",
				"password": ""
			},
			function(path, contents){
			    console.log("created config.json");
			}
		    );
	}
);

function ProcessCreateAccessPoint(wifiIface, etherIface, ssid, password, configuration){
	password = this.constructor.guardPassword(password);
    this.process = this.constructor.createChildProcess(
	wifiIface,
	etherIface,
	ssid,
	password
    );
    this.ap_config = [
	'create_ap',
	wifiIface,
	etherIface,
	ssid
    ];
    if(null != password) this.ap_config.push(password);
    this.handleStandardOutputLines(configuration);
}
ProcessCreateAccessPoint.prototype.constructor = ProcessCreateAccessPoint;
ProcessCreateAccessPoint.guardPassword = function(password){
	if('string' !== typeof password) return null;
	if((/^\s*$/).test(password)) return null;
	console.log('WIFI PASSWORD', password);
	return password;
};
ProcessCreateAccessPoint.createChildProcess = function(wifiIface, etherIface, ssid, password){
	var processArgs = [
	    'create_ap',
	    wifiIface,
	    etherface,
	    ssid
	];
	if(password != null) processArgs.push(password);
	return spawn('sudo', processArgs);
};
ProcessCreateAccessPoint.prototype.handleStandardOutputLines = function(config){
	this.process.on(
		"close",
		this.exit.bind(this)
	);
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
};
ProcessCreateAccessPoint.prototype.exit = function(status){
	var code = status;
			console.log('Child process exited with code: ', code.toString());
};

function ap_connect() {
	return configPromise.then(
		function(config){
    var kid = new ProcessCreateAccessPoint(
	    config.wireless_adapter,
	    config.ethernet_adapter,
	    config.broadcast_ssid,
				config.password,
				config
    );
    var ap_config = kid.ap_config;
		}
	);
};

//Socket.io functionality if needed



//--End of code prior to test function for module--//
function test() {
  console.log("Testing wifi Module");
};
