// ------------------------------  OPEN-AUTOMATION ----------------------------------- //
// -----------------  https://github.com/physiii/open-automation  -------------------- //
// ---------------------------------- update.js ------------------------------------ //

//module.exports = {
// pull: pull
//};


var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var console = require('console');
//var update_socket = require('socket.io-client')("http://127.0.0.1:1235");

function pull() {
  console.log("Performing Update. One moment please.", __dirname);
  exec(__dirname+'/update.sh', function(err,stdout,stderr) {
    if (err) {
      console.log(err)
      return;
    }
    console.log(stdout);
  });

};


module.exports = {
  pull: pull,
  
};


