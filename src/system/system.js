// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- system.js ------------------------------------ //


const exec = require('child_process').exec;

var console = require('console');

module.exports = {
  reboot_sys: reboot_sys,
  canc_reboot: canc_reboot,
  shutdown: shutdown,
  cancelShutdown: cancelShutdown,
  quitApp: quitApp,
  restartApp: restartApp,
  test: test,
};

var cancVar = null;
var shutdownTimer = null;

function reboot_sys() {
  console.log("Rebooting system in 5 seconds.");
  cancVar = setTimeout(function() {exec('reboot');}, 5000);
};

function canc_reboot() {
  console.log("Cancelling System reboot");
  if(cancVar) clearTimeout(cancVar);
  cancVar = null;
}

function shutdown() {
  console.log("Shutting down system in 5 seconds.");
  shutDownTimer = setTimeout(function() {exec('shutdown now');}, 5000);
};

function cancelShutdown() {
  console.log("Cancelling System Shutdown");
  if(shutDownTimer) clearTimeout(shutDownTimer);
  shutDownTimer = null;
}

function quitApp() {
  console.log("Quitting App");
  setTimeout(function() {exec('pm2 stop open-dash');}, 100);
}

function restartApp() {
  console.log("Restarting App");
  setTimeout(function() {exec('pm2 restart open-dash');}, 100);
}

function test() {
  console.log("Testing System Module");
  reboot_sys();
  setTimeout(function() {canc_reboot();}, 3000);
  setTimeout(function() {console.log("Finished Test")}, 5000);
};
