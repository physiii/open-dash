// ----------------------------  OPEN-DASH --- ----------------------------- //
// ---------------  https://github.com/physiii/open-dash  ------------------ //
// ----------------------------- remote.js ---------------------------------- //

var child_process = require('child_process')
var exec = child_process.exec;
var spawn = child_process.spawn;
const express = require('express')
const app = express()
var fs = require('fs');
var ping = require('ping');
var database = require('../database.js');
var remote_socket= require('socket.io-client')("http://127.0.0.1:1236");

var vnc_ip = "192.168.80.16";
var vnc_client;
vnc_started = false;

module.exports = {
  start_vnc: start_vnc,
  close_vnc: close_vnc,
  timeout: timeout,
  check_mdd_conn: check_mdd_conn,
}


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


// Start pxpress services...

app.get('/mdd', function(req, res) {
  res.send('Hello MDD!')
});

app.get('/switch-to-vnc', function(req, res) {
  remote.start_vnc();
  res.send('Hello MDD!');
})
app.listen(3001, function() {console.log('Example app listening on port 3001!')})


function test() {
  console.log("Testing remote Module");
};
