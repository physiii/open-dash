// -----------------------------  OPEN-AUTOMATION ------------------------- //
// ------------  https://github.com/physiii/Open-dash-gateway --------------- //
// -------------------------------- socket.js ----------------------------- //

var exec = require('child_process').exec;
const crypto = require('crypto');
var TAG = "[Dash_socket.js]";
var relay = require('socket.io-client')("http://127.0.0.1:7500");

module.exports ={

};

//-------_Initialize Device/token to Relay-------//
get_token();
function get_token () {
  console.log(TAG,"Requesting token from Relay.")
  require('getmac').getMac(function(err,macAddress){
    if (err)  throw err
    mac = macAddress.replace(/:/g,'').replace(/-/g,'').toLowerCase();
    module.exports.mac = mac;
    console.log(TAG,"Device ID: " + mac);
    relay.emit('get token', {mac:mac});
  });
}

//----------Start Socket Calls--------------//
relay.on('command', function (data) {
  var command = data.command;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error("exec error: ", err);
      data.error = err;
      return;
    }
   relay.emit('command result', {mac:mac, result:stdout});
  });
  console.log(TAG, "Command recieved and issued successfully returning information");
});

relay.on('token', function(data){
  console.log(TAG,"Recieved token from Relay");
  token = data.token
})


//-------------End of Socket Calls. Start Functions. ----------------------//
