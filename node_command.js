//--------Node command terminal for Open_Dash

var TAG = "[Node Command Terminal] "
var config = require('./config.json');
var relay_server = config.relay_server || "pyfi.org"
var relay_port = config.relay_port || 7500

var relay = require('socket.io-client')("http://"+relay_server+":"+relay_port);
console.log('Connected to:',relay_server+":"+relay_port);


module.exports = {
  relay: relay
}

function command(command){
  console.log(TAG,"Sending command to Relay "+ command);
  relay.emit('command', command);
  return;
}

relay.on('command result', function(data){
  result = data.stdout
  console.log(TAG,"Recieved from relay "+ result);
})
