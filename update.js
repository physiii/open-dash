// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- update.js ------------------------------------ //

var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var console = require('console');
var update_socket = require('socket.io-client')("http://127.0.0.1:1235");

module.exports = {
  pull: pull,
};


function pull() {
  console.log("checking for updates in", __dirname);
  exec(__dirname+'/update.sh', function(err,stdout,stderr) {

    if (err) return console.log(err);

    if (stdout.search("pulled") == -1) return console.log("system is up-to-date");

    if (stdout.search("pulled") != -1) {
      console.log("restart test. moving to socket...")
      update_socket.emit('restart', true);

    };
  })
};




function test() {
  return;
};
