// ----------------------------  OPEN-DASH --- ----------------------------- //
// ---------------  https://github.com/physiii/open-dash  ------------------ //
// ----------------------------- remote.js ---------------------------------- //


var child_process = require('child_process');
var exec = child_process.exec;
var spawn = child_process.spawn;
var database = require('../database.js');
var ip = require("ip");

var vnc_client;
vnc_started = false;
my_ip = ip.address();

module.exports = {
  connect: connect,
  close_vnc: close_vnc,
  device_list: device_list,
  runScan: runScan
}

var device_list;
runScan().then(function(list){
  device_list = list;
  console.log(device_list);
});

function runScan(){
  return new Promise(function(resolve,reject){
    var lastIndex = my_ip.lastIndexOf(".");
    console.log('nmap -sn '+my_ip.substring(0,lastIndex)+'.1/24');
    exec('nmap -sn '+my_ip.substring(0,lastIndex)+'.1/24',function(err,stdout,stderr){
      if (err){
        console.error('exec error: ' + err);
        reject(true)
      }
      var res = stdout.split("\n");
      console.log(res);

      //Reverse iteration of array so iteration isnt skipped during splice.
      //Array spliced at index if array includes info in text.
      for (i = res.length - 1; i >= 0; --i){
        console.log(res);
        res[i] = res[i].toString();
        res[i] = res[i].replace("Nmap scan report for", "Hostname: ");

        if (res[i].includes("Hostname")) {
          res[i] = res[i].replace("(", ",IP Address: ").replace(")","")
          continue;
        };
        if (res[i].includes("MAC")) {
          res[i] = res[i].replace("(", ",Device: ").replace(")",",none")
          continue;
        };
        if (res[i].includes("latency")) {
          res[i] = res[i].replace("(", "with ").replace("latency).","latency")
          continue;
        };
        if (res[i].includes("Host is up.")) {
          res[i] = res[i].replace("Host is up.", "")
          continue;
        };
        res.splice(i,1);

      };
      res = res.join().split(",");
      device_obj = {};
      device_list = []


        //for (i = 0; i < res.length; ++i){
      for (var i = 0; i < res.length; i++) {

        if(!res[i]) continue;
        if (res[i].includes("Hostname:")){
          res[i] = res[i].replace("Hostname: ","");
          device_obj = {};
          device_obj.hostname=res[i].trim();
          device_list.push(device_obj);
          continue;

        }
        if (res[i].includes("IP Address:")){
          res[i] = res[i].replace("IP Address: ","");
          device_obj.local_ip = res[i].trim();
          continue;

        }
        if (res[i].includes("MAC Address:")){
          res[i] = res[i].replace("MAC Address: ","");
          device_obj.mac = res[i].trim();
          continue;

        }
        if (res[i].includes("Device:")){
          res[i] = res[i].replace("Device: ","");
          device_obj.device = res[i].trim();
          continue;

        }
        if (res[i].includes("latency")){
          res[i] = res[i].replace("Host is up with ","").replace("latency","");
          device_obj.latency = res[i];
          continue;

        }
/*
        if (res[i].includes("none")){
          device_list.push(device_obj);
          continue;
        }
*/
      };
      resolve(device_list);
    });
  });

};

function connect(ip, port) {
  if (vnc_started) return;
  if (!ip) return;
  if (!port) port=5900;

  vnc_started = true;

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
  runScan();
  console.log(device_list);
};
