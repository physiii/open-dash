// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- wifi.js ------------------------------------ //


const byline = require('byline'),
	spawn = require('child_process').spawn,
    exec = require('child_process').exec,
	EventEmitter = require("events"),
	fs = require('fs'),
    os = require("os"),
	configuration = require("../configuration.js");

var wifi_events = new EventEmitter();

var metadata = {
    ip: {},
    macs: {}
};
var configPromise = configuration._util.callbackToPromise(
	function(callback){
		return configuration.readConfig(
			callback,
			{
				"wireless_adapter": "wlp3s0",
				"ethernet_adapter": "enp2s0",
				"broadcast_ssid": "dash",
				"password": "qweasdzxc"
			},
			function(path, contents){
				console.log("created config.json");
			}
		);
	}
);

const promiseWifiNic = configPromise.then(
	function(config){
		return config.wireless_adapter;
	}
);
var promiseWifiMac = new Promise(
	function(resolve, reject){
		wifi_events.on(
			"mac",
	function(nic, mac){
		promiseWifiNic.then(
			function(wifiNic){
				if(nic != wifiNic) return;
				resolve(mac);
			}
		);
	}
		);
	}
);
const promiseUnderlyingMac = promiseWifiNic.then(
	function(wifiNic){
		var interfaces = os.networkInterfaces();
		if(!(wifiNic in interfaces))
			throw new Error(
				"WiFi NIC's name absent from " +
					"list of network interfaces"
			);
		var nic = interfaces[wifiNic];
		if(!nic.length)
			throw new Error("WiFi NIC lacks addresses");
		return promiseFirstPreferring(
			nic,
			function(address){
				return "IPv4" == address.family;
			}
		);
	}
).catch(
	function(){
		return promiseWifiMac;
	}
);

module.exports = {
	begin_connecting: startTrying
	, metadata: metadata
	, listen: function(message, callback){
		return wifi_events.on(message, callback);
	}
	, promiseUnderlyingMac: promiseUnderlyingMac
	, promiseMacAsToken: promiseUnderlyingMac.then(
		function(mac){
			return (
				""+mac
			).toLowerCase().replace(
				/:/g,
				''
			).replace(
				/-/g,
				''
			);
		}
	)
};


var wifiAccessPointChildProcess = null;
function kill_createAp(killback, killUsToo){
	if(killUsToo)
		if(null != wifiAccessPointChildProcess)
			return; // what did I mean by this?
	if("linux" != process.platform)
		throw new Error("killing create_ap only supports GNU/Linux");

	exec(
		"sudo create_ap --fix-unmanaged",
		function(){
			exec(
				"sudo pkill --signal USR1 create_ap",
				function(error, stdout, stderr){
					var status = 0;
					if(error) status = error.code;
					killback(status);
				}
			);
		}
	);
}

function getIpFromInterface(nic){
    // TODO: sanitize!
    exec(
	"ifconfig " + nic,
	function(error, stdout, stderr){
	    var lines = stdout.split("\n");
	    var etherLines = lines.map(
		function(line){
		    return line.split("ether ");
		}
	    ).filter(
		function(tokens){
		    return 1 != tokens.length;
		}
	    );
	    if(etherLines.length){
		var mac = etherLines[0][1].split(" ")[0];
		metadata.macs[nic] = mac;
		wifi_events.emit("mac", nic, mac);
	    }
	    stdout = lines.filter(
		function(line){
		    return 1 != line.split("inet").length;
		}
	    ).join("\n");
	    var ipv4 = stdout.split("inet ")[1].split(" ")[0];
	    metadata.ip[nic] = ipv4;
	    wifi_events.emit("ip", nic, ipv4);
	}
    );
    metadata.interfaces = os.networkInterfaces();
    wifi_events.emit("network interfaces", metadata.interfaces);
}


function ProcessCreateAccessPoint(childProcess, ssid, password){
	this.process = childProcess;
	if(null != password)
		this.performStandardInput(ssid, password);
	else
		this.performStandardInput(ssid);
	this.handleStandardOutputLines();
	this.process.on("close", this.exit.bind(this));
	wifi_events.emit("child process", this.process);
	//byline(this.process.stderr).on("data", function(data){console.log("STDERR> " + data);});
}
ProcessCreateAccessPoint.prototype.constructor = ProcessCreateAccessPoint;
ProcessCreateAccessPoint.guardPassword = function(config, allow_nopass){
	var password = null;
	var didSetPassword = false;
	if("password" in config)
		if('string' === typeof config.password)
			if(!(/^\s*$/).test(config.password)){
				password = config.password;
				didSetPassword = true;
				console.log('WIFI PASSWORD', config.password);
			}
	if(!didSetPassword)
		if(!allow_nopass)
			throw new Error(
				"open-dash does not support " +
					"calling ap_connect without " +
					"WiFi password." +
				"  Set the password in your configuration file."
			);
	return password;
};
ProcessCreateAccessPoint.fromConfig = function(configuration, password){
	return new this(
		this.createChildProcess(
			configuration.wireless_adapter,
			configuration.ethernet_adapter
		),
		configuration.broadcast_ssid,
		password
	);
};
ProcessCreateAccessPoint.prototype.handleStandardOutputLines = function(){
	byline(this.process.stdout).on(
		"data",
		this.handleLine.bind(this)
	);
};
ProcessCreateAccessPoint.prototype.performStandardInput = function(
	ssid,
	password
){
	// create_ap can take a password from a pipe
	if(null == password)
		//https://github.com/oblique/create_ap/blame/8bee5d61ba4d75ea1e74ed1b0246554b90beb3eb/README.md#L53
		return this.process.stdin.end(
			ssid + "\n"
		);
	//https://github.com/oblique/create_ap/blame/8bee5d61ba4d75ea1e74ed1b0246554b90beb3eb/README.md#L56
	this.process.stdin.end(
		ssid + "\n" + password + "\n"
	);
};
ProcessCreateAccessPoint.createChildProcess = function(wifiIface, etherIface){
	return spawn(
			"sudo",
			[
				'create_ap',
				wifiIface,
				etherIface
			]
	);
};
ProcessCreateAccessPoint.prototype.handleLine = function(data){
      console.log("hit ap_stream "+data);
      data = data.toString();

      if (data.includes("Creating a virtual")){

	  configPromise.then(
	      function(config){
        console.log("*** Creating a virtual Wifi Interface ***", config);
	      }
	  );
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
        wifi_events.emit('disconnected');
      };

      if (data.includes("AP-STA-DISCONNECTED")){
        data = data.replace('ap0: AP-STA-DISCONNECTED', ':');
        console.log('*** Wifi has been disconnected ***');
        wifi_events.emit('disconnected');
      };


      if(data.includes("Using interface"))
	  if(data.includes(" with hwaddr "))
	      if(data.includes(" and ssid ")){
		  var part = data.split("Using interface ")[1];
		  var someTokens = part.split(" with hwaddr ");
		  var mac = someTokens[1].split(" and ssid")[0];
		  wifi_events.emit("hardware address", mac);
		  metadata.mac = mac;
		  var nic = someTokens[0];
		  metadata.ap = nic;
		  getIpFromInterface(nic);
	      }

};
ProcessCreateAccessPoint.prototype.exit = function(status){
	wifiAccessPointChildProcess = null;
	wifi_events.emit(
		"child exit",
		this.process,
		status
	);
};

promiseWifiNic.then(
	function(wifiNic){
		metadata.wifiNic = wifiNic;
		if(!("interfaces" in metadata))
			getIpFromInterface(wifiNic);
		else if(!(wifiNic in metadata.interfaces))
			getIpFromInterface(wifiNic);
	}
);
function first(candidates){
	if(!candidates.length)
		throw new Error("wanted first element, but list was empty");
	return candidates[0];
}
function filterPromises(promises){
	return Promise.all(
		promises.map(
			function(prom){
				return Promise.resolve(prom).then(
					function(value){return {value};},
					function(error){return {error};}
				);
			}
		)
	).then(
		function(results){
			return results.filter(
				function(result){
					return "value" in result;
				}
			).map(
				function(result){
					return result.value;
				}
			);
		}
	);
}
function promiseFirstPreferring(promises, preferredp){
	promises = Promise.resolve(promises).then(filterPromises);
	return promises.then(
		function(xs){
			return xs.filter(preferredp);
		}
	).then(first).catch(
		function(){
			return Promise.resolve(promises).then(first);
		}
	);
}
function NOP(){}

function ap_connect(allow_nopass) {
	return configPromise.then(
		function(config){
			metadata.etherNic = config.ethernet_adapter;
			getIpFromInterface(
				metadata.etherNic
			);

			// We would inline guardPassword here,
			//  but we want to handle failures in this order.
			var password = ProcessCreateAccessPoint.guardPassword(
				config,
				allow_nopass
			);
			if(null != wifiAccessPointChildProcess)
				throw new Error(
					"There should only be " +
						"one WiFi AP child process " +
						"at a time."
			);

			var kid = ProcessCreateAccessPoint.fromConfig(
				config,
				password
			);
			wifiAccessPointChildProcess = kid.process;

			var ap_config = [
				'create_ap',
				config.wireless_adapter,
				config.ethernet_adapter,
				config.broadcast_ssid
			];
			if(null != password)
				ap_config.push(password);
			console.log("ap_config: " + ap_config);
			return kid;
		}
	);
}

wifi_events.on(
	"child exit",
	function(kid, exitStatus){
		console.log(
			'create_ap child process exited with code: ' +
				exitStatus
		);
	}
);


var dead = false;
var triesLeft = 8;
var backoff = 500;
function retry(){
    if(dead) return;
    if(triesLeft <= 0){
	dead = true;
	wifi_events.emit("dead");
	return;
    }
    triesLeft--;
    backoff++;
    backoff *= 2;
    function connect(){
	return Promise.resolve(
	    false
	).then(
	    ap_connect
	).catch(
	    retry
	);
    }
    function tryAgain(){
	return kill_createAp(
	    function(status){
		var killed = 0 == status;
		var absent = 1 == status;
		var success = killed || absent;
		if(!success) return retry();
		setTimeout(connect, 5000 + backoff);
	    },
	    false
	);
    }
    setTimeout(tryAgain, backoff);
}
var lastTime = new Date();
function rez(){
    var thisTime = new Date();
    var age = thisTime - lastTime;
    var failedAge = 20000;
    if(age - failedAge > backoff * 10){
	triesLeft += 3;
	backoff /= 16;
    }
    lastTime = thisTime;
    retry();
}
function startTrying(){
	wifi_events.on("child exit", rez)
	retry();
}

//Socket.io functionality if needed



//--End of code prior to test function for module--//
function test() {
  console.log("Testing wifi Module");
};
