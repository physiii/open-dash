//--------Node command terminal for Open_Dash

var TAG = "[Node Command Terminal] "
var relay = require('socket.io-client')("http://127.0.0.1:7500");


module.exports ={
  command: command,
  get_token: get_token,
  add_device: add_device,
  connected_devices: connected_devices,
}

//-----Initialize User/Token for Relay_Client--------//
get_token()
function get_token(){
  console.log(TAG,"Sending user token creation request to relay");
  relay.emit('get token', {mac:"Relay Client2"});
};

//---------End Initialize. Start Socket Calls---------//
relay.on('command result', function(data){
  console.log(TAG,"Dash device: "+data.mac+" : Recieved results... \n "+ data.result);
})

relay.on('command fail', function(data){
  console.log(TAG, "Error:", data.error);
})

relay.on('token', function(data){
  console.log(TAG,"Recieved token from Relay ");
  token = data.token
})

relay.on('add device', function(data){
  console.log(TAG, "Result: "+data.result);
})

relay.on('connected devices', function(data){
  console.log(TAG,"Devices linked to " + data.mac + ":");
  list_devices(data);
})


//-------------Functions used in Sockets--------------------------------//
function list_devices(data){
  var devices = data.devices  ;
  for (i = 0; i < devices.length; i++){
    console.log(devices[i]);
  }
}

//-------------Other Functions--------------------------------//
function add_device(device){
  console.log(TAG,"Linking device to user")
  relay.emit('add device', {token:token, device:device})
}

function command(device, command){
  console.log(TAG,"Sending command to Relay "+ command);
  relay.emit('send command', {token:token, device:device, command:command});
  return;
}

function connected_devices(){
  console.log(TAG,"Grabbing list of connected devices")
  relay.emit('connected devices', {token:token});
}
