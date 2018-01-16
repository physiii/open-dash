// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- system.js ------------------------------------ //

var http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
var os = require('os');
var console = require('console');

module.exports = {
  reboot_sys: reboot_sys,
  canc_reboot: canc_reboot,
};


function reboot_sys() {
  exec('reboot', function(err,stdout,stderr){
    if (err) return console.log(err);
  });
}

function canc_reboot() {
  clearTimeout(cancVar);
}


function test() {
  return;
};
