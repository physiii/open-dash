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
  console.log("Rebooting system in 5 seconds.");
  cancVar = setTimeout(function() {
    exec('reboot');}, 5000);

};

function canc_reboot() {
  console.log("Cancelling System reboot");
  clearTimeout(cancVar);
}


function test() {
  console.log("Testing System Module")
};
