// -----------------------------  OPEN-AUTOMATION ------------------------- //
// ------------  https://github.com/physiii/Open-dash-gateway --------------- //
// -------------------------------- socket.js ----------------------------- //

var exec = require('child_process').exec;
var config = require('../config.json');
var TAG = "[Dash_socket.js]";
var use_ssl = config.use_ssl || false;
var relay_server = config.relay_server;
var relay_port = config.relay_port;


if (use_ssl) {
var relay = require('socket.io-client')("https://"+relay_server+":"+relay_port);
console.log('Connected to:',relay_server+":"+relay_port);
} else {
var relay = require('socket.io-client')("http://"+relay_server+":"+relay_port);
console.log('Connected to:',relay_server+":"+relay_port);
}
//var load_settings_timer;

module.exports = {
  relay: relay
}

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

relay.on('command', function (data) {
  var command = data.command;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      data.error = error;
      relay.emit('command result',data);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    data.stdout = stdout;
    data.stderr = stderr;
   relay.emit('command result',data);
  });
  console.log('command',command);
});

relay.on('update', function (data) {
  utils.update();
});

relay.on('disconnect', function(data) {
  console.log("disconnected, setting got_token false",data);
  database.got_token = false;
});
