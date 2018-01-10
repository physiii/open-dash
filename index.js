// ---------------------------  USPS Project -------------------------------- //
// --------------  https://github.com/physiii/open-dash  ----------------- //
// ----------------------------- index.js ---------------------------------- //

var gui = require("nw.gui");
var win = gui.Window.get();
var child_process = require('child_process')
var exec = child_process.exec;
var spawn = child_process.spawn;
var child = child_process.spawn(process.execPath, [], {detached: true});
var fs = require('fs');
var ping = require('ping');
var utils = require('./utils.js');
var database = require('./database.js');
var update = require('./update.js');
var nwpm_socket = require('socket.io-client')("http://127.0.0.1:1235");


//nwpm_socket.emit('command result',data);


/*
var dashboard = require('./dashboard.js');
var settings = require('./settings.js');
var socket = require('./socket.js');
var website = require('./website.js');
var express = require('express');
var http = require('http');
var app = express();
var exec = require('exec');
*/


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
  updateContentStyle();
};

// Functions to Launch and Close VNC Client
var vnc_ip = "192.168.0.16";

var vnc_client;
vnc_started = false;
function start_vnc() {
  if (vnc_started) return;
  vnc_started = true;
  vnc_client = spawn('vinagre', ['-f', '192.168.0.16::5900']);
  vnc_client.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  vnc_client.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  vnc_client.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
}

function close_vnc() {
  if (!vnc_started) return;
  vnc_client.kill();
  vnc_started = false;

}

// Timeout with connection testing
timeout();
function timeout() {
  setTimeout(function () {
    console.log("checking mdd connection...")
    check_mdd_conn();
    timeout();
  }, 1*1000);
}

function check_mdd_conn() {
    ping.sys.probe(vnc_ip, function(isAlive){
        var msg = isAlive ? 'host ' + vnc_ip + ' is alive' : 'host ' + vnc_ip + ' is dead';
        if (isAlive) {
	  start_vnc();
        }
        if (!isAlive) {
	  close_vnc();
        }
    });
}

// Main application running moduiles
const express = require('express')
const app = express()

app.get('/mdd', function(req, res) { 
  res.send('Hello MDD!') 
});

app.get('/switch-to-vnc', function(req, res) {
  start_vnc();
  res.send('Hello MDD!');
})
app.listen(3000, function() {console.log('Example app listening on port 3000!')})

console.log("HELLO!!!!!!");


window.onload = function() {

  document.getElementById("vnc_dashboard_btn").onclick = function() {
    start_vnc();
    win.minimize();
  };
  
  document.getElementById("phone_btn").onclick = function() {
    win.close();
  
  };

  document.getElementById("settings_btn").onclick = function() {
    //update.pull()

    //Hide currently window session prior to reload of session with 5 sec delay.
    
    nwpm_socket.emit('update',true);
    //console.warn("We are reloading the window in 5 seconds.")
    //setTimeout(function() {win.hide();}, 5000);
    //setTimeout(function() {win.reload();}, 5000);


  };

  updateContentStyle();
  win.show();


};


// ------------- //
// start servers //
// ------------- //
//website.start(app);

