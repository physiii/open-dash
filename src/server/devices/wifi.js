// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- wifi.js ------------------------------------ //


const byline = require('byline'),
	spawn = require('child_process').spawn,
	EventEmitter = require("events"),
	fs = require('fs'),
	configuration = require("../configuration.js");

var wifi_events = new EventEmitter();

module.exports = {
	ap_connect: ap_connect,
	events: wifi_events
};

var configPromise = new Promise((resolve, reject) => {
	return configuration.readConfig((error, value) => {
		if (error) {
			return reject(error);
		}

		resolve(value);
	});
});

function ProcessCreateAccessPoint(wifiIface, etherIface, ssid, password){
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
	this.handleStandardOutputLines();
	this.process.on("close", this.exit.bind(this));
}
ProcessCreateAccessPoint.prototype.constructor = ProcessCreateAccessPoint;
ProcessCreateAccessPoint.guardPassword = function(password){
	if('string' !== typeof password) return null;
	if((/^\s*$/).test(password)) return null;
	console.log('WIFI PASSWORD', password);
	return password;
};
ProcessCreateAccessPoint.fromConfig = function(configuration){
	return new this(
	configuration.wireless_adapter,
	configuration.ethernet_adapter,
	configuration.broadcast_ssid,
	configuration.password,
	configuration
	);
}
ProcessCreateAccessPoint.createChildProcess = function(wifiIface, etherIface, ssid, password){
	var processArgs = [
		'create_ap',
		wifiIface,
		etherIface,
		ssid
	];
	if(password != null) processArgs.push(password);
	return spawn('sudo', processArgs);
};
ProcessCreateAccessPoint.prototype.handleStandardOutputLines = function(){
	byline(this.process.stdout).on(
		"data",
		this.handleLine.bind(this)
	);
};
ProcessCreateAccessPoint.prototype.handleLine = function(data){
	  data = data.toString();

	configPromise.then(
		function(config){
	  if (data.includes("Creating a virtual")){
		console.log("*** Creating a virtual Wifi Interface ***", config);
	  };
		}
	);

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
};
ProcessCreateAccessPoint.prototype.exit = function(status){
	var code = status;
			console.log('Child process exited with code: ', code.toString());
};

function ap_connect() {
	return configPromise.then(
		function(config){
	var kid = ProcessCreateAccessPoint.fromConfig(config);
	return kid;
		}
	);
};

//Socket.io functionality if needed



//--End of code prior to test function for module--//
function test() {
  console.log("Testing wifi Module");
};
