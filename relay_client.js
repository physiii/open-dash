//--------Node command terminal for Open_Dash

var TAG = "[Node Command Terminal] "
var relay = require('socket.io-client')("http://127.0.0.1:7500");


module.exports ={
  command: command,
  get_token: get_token,
  get_devices: get_devices,

}

relay.on('command result', function(data){
  console.log(TAG,"Recieved from Dash "+ data);
})

relay.on('token', function(data){
  console.log(TAG,"Recieved token from Relay "+ data.token);
  token = data.token
})

function get_token(user){
  console.log(TAG,"Sending user token creation request to relay: "+ user);
  var data = {};
  data.user = user;
  relay.emit('get token', data);
};

function add_device(token, mac){
  data.mac = mac
  relay.emit('add device', {token:token, mac:mac})

}

function command(token, device, command){
  console.log(TAG,"Sending command to Relay "+ command);
  relay.emit('command', command);
  return;
}
