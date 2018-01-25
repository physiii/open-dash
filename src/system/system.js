// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- system.js ------------------------------------ //


//const exec = require('child_process').exec;

var console = require('console');
var module = require('module');

module.exports = {
  reboot_sys: reboot_sys,
  canc_reboot: canc_reboot,
  test: test,
};


function reboot_sys() {
  console.log("Rebooting system in 5 seconds.");
  cancVar = setTimeout(function() {exec('reboot');}, 5000);
};

function canc_reboot() {
  console.log("Cancelling System reboot");
  clearTimeout(cancVar);
}


function test() {
  console.log("Testing System Module");
  reboot_sys();
  setTimeout(function() {canc_reboot();}, 3000);
  setTimeout(function() {console.log("Finished Test")}, 5000);
};
