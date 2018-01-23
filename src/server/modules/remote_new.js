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
  return new Promise(function(resolve, reject){
    exec('sudo nmap -sn 192.168.'+my_ip[8]+'.1/24',function(err,stdout,stderr){
      if (err){
        console.error('exec error: ' + err);
        reject(true)
      }
      first = stdout.replace(/Nmap scan report for /g,"Hostname: ");
      res = first.split("\n");

      //Reverse iteration of array so iteration isnt skipped during splice.
      //Array spliced at index if array includes info in text.
      for (i = res.length - 1; i >= 0; --i){
        result = res[i].includes("Host is");
        result2 = res[i].includes("done");
        result3 = res[i].includes("Starting");
        if (result == true || result2 == true ||result3 == true) res.splice(i,1);
      };

      console.log(res);
      resolve(true);
    });
  });
};

function connect() {
  if (vnc_started) return;
  vnc_started = true;
  if (!port) port=5900;

  vnc_client = spawn('vncviewer', [ip + ":" + port]);
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


function remoteTest(){
  console.log('Running host discovery scan. Please wait. . .');
  runScan().then(function(){
    return runScan2();
  }).then(function(){
    console.log(result);
  });
};
