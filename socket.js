// -----------------------------  OPEN-AUTOMATION ------------------------- //
// ------------  https://github.com/physiii/Open-dash-gateway --------------- //
// -------------------------------- socket.js ----------------------------- //

var exec = require('child_process').exec;
var config = require('./config.json');
var TAG = "[Dash_socket.js]";
var use_dev = config.use_dev || false;
var use_ssl = config.use_ssl || false;
var use_domain_ssl = config.use_domain_ssl || false;

if (use_dev == false){
var relay_server = config.relay_server;
var relay_port = config.relay_port;
}
if (use_domain_ssl || use_ssl) {
var relay_server = config.relay_server;
var relay_port = 4443;
}
if (use_dev){
var relay_server = config.relay_server;
var relay_port = 5000;
}

if (use_domain_ssl || use_ssl) {
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

relay.on('get settings', function (data) {
  var settings = database.settings;
  settings.devices = device_array;
  relay.emit('load settings', settings);
  //console.log(TAG,"load settings |", settings);
});

relay.on('get devices', function (data) {
  //console.log("get devices",data);
  database.get_devices();
});

relay.on('rename device', function (data) {
  console.log("!! rename device !!",data);
  database.store_settings(data);
});

relay.on('media', function (data) {
  media.command(data);
});

relay.on('set alarm', function (data) {
  alarm.set_alarm(data);
});

relay.on('add zwave', function (data) {
    //var secure_device = data.secure_device;
    var secure_device = true;
    /*if (zwave.hasOwnProperty('beginControllerCommand')) {
      console.log("searching for nodes");
      zwave.beginControllerCommand('AddDevice', secure_device);
    } else {*/
      console.log("searching for nodes!");
      zwave.add_node(secure_device);
    //}
});

relay.on('set zwave', function (data) {
  console.log("set zwave",data);
  //try {
    //zwave.setValue(data.node_id, 98, 1, 0, data.value);
    //zwave.setValue(data.node_id, 112, 1, 7, 'Activity');
    zwave.set_value(data.node_id, data.class_id, data.instance, data.index, data.value);
  //} catch (e) { console.log(e) }
});

relay.on('media', function (data) {
  media.command(data);
});

relay.on('add thermostat', function (data) {
  console.log("add thermostat",data);
  thermostat.add_thermostat(data);
});

relay.on('get thermostat', function (data) {
  device = data.device;
  thermostat.get_therm_state(device.local_ip);
  //console.log("get thermostat",data);
});

relay.on('set thermostat', function (data) {
  thermostat.set_thermostat(data);
});

relay.on('set lights', function (data) {
  //data.light = omit(data.light,"$$hashKey"); //bad angularjs array
  lights.set_light(data.light.id,data.light.state);
  //console.log("set lights", data.light);
});

relay.on('link lights', function (data) {
  find_hue_bridge();
  console.log("link lights");
});

relay.on('disconnect', function(data) {
  console.log("disconnected, setting got_token false",data);
  database.got_token = false;
});
