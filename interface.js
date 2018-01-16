// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- interface.js ------------------------------------ //

var gui = require("nw.gui");
var win = gui.Window.get();
var child_process = require('child_process')
var exec = child_process.exec;
var spawn = child_process.spawn;
var fs = require('fs');
var ping = require('ping');
var utils = require('./utils.js');///////////////////////End of Code. Only Test functions below this line.

var database = require('./database.js');
var update = require('./update.js');
var remote = require('./modules/remote.js');

//Socket Connections
var nwpm_socket = require('socket.io-client')("http://127.0.0.1:1235");
var system_socket = require('socket.io-client')("http://127.0.0.1:1250");
var update_socket = require('socket.io-client')("http://127.0.0.1:1240");


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

// Extend application menu for Mac OS
if (process.platform == "darwin") {
  var menu = new gui.Menu({type: "menubar"});
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  win.menu = menu;
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
  updateContentStyle();function reboot_sys() {
  exec('reboot', function(err,stdout,stderr){
    if (err) return console.log(err);

  });
}

function canc_reboot() {
  clearTimeout(cancVar);

}
};


// Main application running modules

window.onload = function() {

  document.getElementById("vnc_dashboard_btn").onclick = function() {
    remote.start_vnc();
    win.minimize();
  };

  document.getElementById("phone_btn").onclick = function() {
    //Socket to nwpm to reboot function
    system_socket.emit('reboot', true)

  };

  document.getElementById("radio_btn").onclick = function() {
    //Socket to nwpm to cancel reboot function
    system_socket.emit('canc_reboot', true)

  };

  document.getElementById("settings_btn").onclick = function() {
    update_socket.emit('update', true)
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
  return;
};
