//--------Node command terminal for Open_Dash

var TAG = "[Node Command Terminal] "
var relay = require('socket.io-client')("http://127.0.0.1:7500");


module.exports ={
  command: command,
}

relay.on('command result', function(data){
  console.log(TAG,"Recieved from Dash "+ data);
})


function get_token(){
  relay.emit('get token')
  continue;
};

function command(token, mac, command){
  console.log(TAG,"Sending command to Relay "+ command);
  relay.emit('command', command);
  return;
}
