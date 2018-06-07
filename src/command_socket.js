// -----------------------------  OPEN-AUTOMATION ------------------------- //
// ------------  https://github.com/physiii/Open-dash-gateway --------------- //
// -------------------------------- socket.js ----------------------------- //

const {
    exec
} = require("child_process");
const crypto = require('crypto');
const socketIoClient = require('socket.io-client');

var TAG = "[Dash_socket.js]";
var relay;

module.exports ={
	init: init,
	promiseGetMac: get_token,
	relaySocketIoEndpointUrl: "http://127.0.0.1:7500"
};

//-------_Initialize Device/token to Relay-------//
function init(mac, relaySocket){
	var relaySocketUrl = module.exports.relaySocketIoEndpointUrl;
	if("string" == typeof relaySocket) relaySocketUrl = relaySocket;
	if(arguments.length < 2)
		relay = socketIoClient(relaySocketUrl);
	else if("string" == typeof relaySocket)
		relay = socketIoClient(relaySocketUrl);
	else relay = relaySocket;
	relaySocket = relay; // in case someone uses it

	if(!("macPromise" in module.exports)){
		mac = Promise.resolve(mac);
		if(arguments.length < 1)
		    mac = mac.then(get_token);
		module.exports.macPromise = mac;
	}

	var result = module.exports.macPromise.then(
		function(mac){
  console.log(TAG,"Device ID: " + mac);
  relay.emit('get token', {mac:mac});
}).catch(function (err){
  console.log(TAG, "Failed: "+ err)
});
	listenSocket(relay);
	return result;
}

function get_token () {
  return new Promise(function (resolve, reject){
    console.log(TAG,"Requesting token from Relay.")
    require('getmac').getMac(function(err,macAddress){
      if (err)  reject(err)
      mac = macAddress.replace(/:/g,'').replace(/-/g,'').toLowerCase();
      module.exports.mac = mac;
    resolve(mac)
    });
  })
}

//----------Start Socket Calls--------------//
function onGetCommand(data){
		Promise.all(
			[
				macPromise.then(
					function(){
						return fire_command(data);
					}
				),
				macPromise
			]
		).then(function(args){
			var data = args[0];
			var mac = args[1];
    relay.emit('command result', {mac:mac, result:data.result, req_socket:data.req_socket})
    console.log(TAG, "Command | " + data.command + " | recieved and issued successfully... Returning information");
  }).catch(function(result){
    relay.emit('command result', {mac:mac, result:result});
    console.log(TAG, "Command | " + data.command + " | recieved and Errored... Returning information");
  })
}

function onToken(data){
  console.log(TAG,"Recieved token from Relay", data.token);
  token = data.token
}

function onAddDevice(data){
  console.log(TAG, "Result: " + data.result);
}

function listenSocket(relaySocket){
	relaySocket.on('get command', onGetCommand);
	relaySocket.on('token', onToken);
	relaySocket.on('add device', onAddDevice);
}


//-------------End of Socket Calls. Start Functions. ----------------------//

function fire_command(data){
  var command = data.command;
  var req_socket = data.req_socket
  return new Promise(function (resolve, reject){
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error("exec error: ", err);
        var error = "" + err
        reject(error);
      }
      data.result = stdout
      data.req_socket = req_socket
      resolve(data)
    })
  })
}

if(module === require.main)
	// https://stackoverflow.com/questions/4981891/node-js-equivalent-of-pythons-if-name-main#6090287
	init(
		get_token(),
		socketIoClient("http://127.0.0.1:7500")
	);
