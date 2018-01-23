// ----------------------------  OPEN-DASH --- ----------------------------- //
// ---------------  https://github.com/physiii/open-dash  ------------------ //
// ----------------------------- remote.js ---------------------------------- //


var child_process = require('child_process');
var exec = child_process.exec;
var spawn = child_process.spawn;
var database = require('../database.js');
var ip = require("ip");

var vnc_ip = "127.0.0.1";
var vnc_port= "5900";
var vnc_client;
vnc_started = false;
my_ip = ip.address();

module.exports = {
  start_vnc: start_vnc,
  close_vnc: close_vnc,
}

function runScan(){
  exec('sudo nmap -sn 192.168.'+my_ip[8]+'.1/24',function(err,stdout,stderr){
    if (err){
      console.error('exec error: ' + err);
    }
    console.log(stdout);
  });
};

function start_vnc() {
  console.log("Starting vnc services. . .")
  vnc_client = spawn('vncviewer', [vnc_ip + ":" + vnc_port]);
  vnc_started= true;
}

function close_vnc() {
  if (!vnc_started) return;
  vnc_client.kill();
  vnc_started = false;
}


function remoteTest(){
  console.log('Running host discovery scan. Please wait. . .');
  runScan().then(function(){
    return runScan2();
  }).then(function(){
    console.log(result);
  });
};
