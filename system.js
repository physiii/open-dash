// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- system.js ------------------------------------ //

var http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
var os = require('os');
var console = require('console');

const server = http.createServer().listen("1250");
var process_io = require('socket.io').listen(server);

module.exports = {};


function reboot_sys() {
  exec('reboot', function(err,stdout,stderr){
    if (err) return console.log(err);
  });
}

function canc_reboot() {
  clearTimeout(cancVar);
}

process_io.on('connection', function (socket) {
  console.log("System Socket connected");

  socket.on('reboot', function (data) {
    console.log("entire system rebooting in 5 seconds", data);
    cancVar = setTimeout(function() {reboot_sys();}, 5000);

  });

  socket.on('canc_reboot', function (data) {
    console.log("aborting reboot", data)
    canc_reboot();

  });

});
