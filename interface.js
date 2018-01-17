// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- interface.js ------------------------------------ //

var gui = require("nw.gui");
var win = gui.Window.get();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var ping = require('ping');
var utils = require('./utils.js');
var c_socket = require('socket.io-client');

var database = require('./database.js');
var update = require('./update.js');
var remote = require('./modules/remote.js');
var system = require('./system.js');


//Socket Connection
var nwpm_socket = c_socket("http://127.0.0.1:1235");


/*
// ---------------- //
// global variables //
// ---------------- //
accounts = [];
groups = [];
device_objects = [];
device_sockets = [];
status_objects = [];
user_objects = [];
user_sockets = [];
*/

module.exports = {
  sys_reboot: sys_reboot,
  canc_reboot: canc_reboot,
  pull: pull
};

function sys_reboot(){system.reboot_sys();};
function canc_reboot(){system.canc_reboot();};
function pull(){update.pull();};

// Extend application menu for Mac OS
if (process.platform == "darwin") {
  var menu = new gui.Menu({type: "menubar"});
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  gui.Window.get().menu = menu;
}

function updateCheckbox() {
  var top_checkbox = document.getElementById("top-box");
  var bottom_checkbox = document.getElementById("bottom-box");
  var left_checkbox = document.getElementById("left-box");
  var right_checkbox = document.getElementById("right-box");
  if (top_checkbox.checked || bottom_checkbox.checked) {
    left_checkbox.disabled = true;
    right_checkbox.disabled = true;
  } else if (left_checkbox.checked || right_checkbox.checked) {
    top_checkbox.disabled = true;
    bottom_checkbox.disabled = true;
  } else {
    left_checkbox.disabled = false;
    right_checkbox.disabled = false;
    top_checkbox.disabled = false;
    bottom_checkbox.disabled = false;
  }
}

function initCheckbox(checkboxId, titlebar_name, titlebar_icon_url, titlebar_text) {
  var elem = document.getElementById(checkboxId);
  if (!elem)
    return;
  elem.onclick = function() {
    if (document.getElementById(checkboxId).checked)
      addTitlebar(titlebar_name, titlebar_icon_url, titlebar_text);
    else
      removeTitlebar(titlebar_name);
    focusTitlebars(true);

    updateContentStyle();
    updateCheckbox();
  }
}

window.onfocus = function() { 
  console.log("focus");
  focusTitlebars(true);
};

window.onblur = function() { 
  console.log("blur");
  focusTitlebars(false);
};

window.onresize = function() {
  updateContentStyle();
};

test();

// Main application running modules

window.onload = function() {

  document.getElementById("vnc_dashboard_btn").onclick = function() {
    remote.start_vnc();
    win.minimize();
  };

  document.getElementById("phone_btn").onclick = function() {
    console.log("Rebooting system in 5 seconds.");
    sys_reboot();

  };

  document.getElementById("radio_btn").onclick = function() {
    console.log("Cancelling System reboot");
    canc_reboot();

  };

  document.getElementById("settings_btn").onclick = function() {
    console.log("checking for updates");
    pull();

  };

  updateContentStyle();
  win.show();

};


// ------------- //
// start servers //
// ------------- //
//website.start(app);

///////////////////////End of Code. Only Test functions below this line.


function test() {
  console.log("Testing Interface Module");
};
