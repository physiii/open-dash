//--------Node command terminal for Open_Dash

var TAG = "[Node Command Terminal] "
var relay = require('socket.io-client')("http://127.0.0.1:7500");


module.exports ={
  command: command,
  get_token: get_token,
  get_devices: get_devices,

}

//-----Initialize User/Token for Relay_Client--------//
get_token()
function get_token(){
  console.log(TAG,"Sending user token creation request to relay: "+ user);
  var data = {};
  data.mac = "Relay_Client";
  relay.emit('get token', data);
};

//---------End Initialize. Start Socket Calls---------//


relay.on('command result', function(data){
  console.log(TAG,"Recieved from Dash "+ data);
})

relay.on('token', function(data){
  console.log(TAG,"Recieved token from Relay ");
  token = data.token
})

//-------------End Socket Calls. Start command Functions----------------------//

function add_device(token, device){
  console.log(TAG,"Linking device to user")
  relay.emit('add device', {token:token, device:device})
}

function command(device, command){
  console.log(TAG,"Sending command to Relay "+ command);
  relay.emit('command', {token:token, device:device, command:command});
  return;
}

function list(){
  console.log(TAG,"Grabbing list of connected devices")
  relay.emit('list devices', {token:token, mac:"Relay_Client"});
}
