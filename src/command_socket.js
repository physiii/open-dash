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
get_token().then(function (data){
  console.log(TAG,"Device ID: " + mac);
  relay.emit('get token', {mac:mac});
}).catch(function (err){
  console.log(TAG, "Failed: "+ err)
});

function get_token () {
  return new Promise(function (resolve, reject){
    console.log(TAG,"Requesting token from Relay.")
    require('getmac').getMac(function(err,macAddress){
      if (err)  reject(err)
      mac = macAddress.replace(/:/g,'').replace(/-/g,'').toLowerCase();
      module.exports.mac = mac;
    });
    resolve(mac)
  })
}

//----------Start Socket Calls--------------//
relay.on('get command', function (data) {
  fire_command(data).then(function(data){
    relay.emit('command result', {mac:mac, result:data.result, req_socket:data.req_socket})
    console.log(TAG, "Command | " + data.command + " | recieved and issued successfully... Returning information");
  }).catch(function(result){
    relay.emit('command result', {mac:mac, result:result});
    console.log(TAG, "Command | " + data.command + " | recieved and Errored... Returning information");
  })
})

relay.on('token', function(data){
  console.log(TAG,"Recieved token from Relay", data.token);
  token = data.token
})

relay.on('add device', function(data){
  console.log(TAG, "Result: " + data.result);
})


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
