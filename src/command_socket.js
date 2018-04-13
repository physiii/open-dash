// -----------------------------  OPEN-AUTOMATION ------------------------- //
// ------------  https://github.com/physiii/Open-dash-gateway --------------- //
// -------------------------------- socket.js ----------------------------- //



var exec = require('child_process').exec;
var TAG = "[Dash_socket.js]";
var relay = require('socket.io-client')("http://127.0.0.1:7500");
var device_obj= []
/*
relay.on('get token', function (data) {
  var settings = database.settings;
  settings.token = data.token;
  database.store_settings(settings);
  database.got_token = true;
  if (software_version)
   settings.software_version = software_version;
  else settings.software_version = "NA";
  console.log("token received, sending settings");
  relay.emit('load settings',settings);
});


relay.on('gateway', function (data) {
  console.log(mac + " | " + data.command);
});
*/
relay.on('command', function (data) {
  var command = data;
  exec("'"+data+"'", (err, stdout, stderr) => {
    if (err) {
      console.error("exec error: ", err);
      data.error = err;
      return;
    }
   relay.emit('command result',data);
  });
  console.log("recieved command "+ command);

});


/*
relay.on('update', function (data) {
  utils.update();
});

relay.on('disconnect', function(data) {
  console.log("disconnected, setting got_token false",data);
  database.got_token = false;
});

function get_mac () {
  require('getmac').getMac(function(err,macAddress){
    if (err)  throw err
    mac = macAddress.replace(/:/g,'').replace(/-/g,'').toLowerCase();
    var token = crypto.createHash('sha512').update(mac).digest('hex');
    console.log("Device ID: " + mac);
    module.exports.mac = mac;
  });
}

*/
