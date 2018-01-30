// ----------------------------  OPEN-DASH --- ----------------------------- //
// ---------------  https://github.com/physiii/open-dash  ------------------ //
// ----------------------------- remote.js ---------------------------------- //


var child_process = require('child_process');
var exec = child_process.exec;
var spawn = child_process.spawn;
var database = require('../database.js');
var ip = require("ip");
var path = require('path');
const AUTOCONNECT_INTERVAL = 5000;

var result;
var vnc_client;
vnc_started = false;
my_ip = ip.address();
var lastDeviceIP = null;
var autoConnectEnabled = false;

module.exports = {
  connect: connect,
  connectIfNotConnected: connectIfNotConnected,
  close_vnc: close_vnc,
  device_list: device_list,
  runScan: runScan,
  autoConnectEnabled: autoConnectEnabled,
  setAutoConnect: setAutoConnect
}

var device_list;
runScan().then(function(list){
  device_list = list;
  console.log(device_list);
});


var autoConnectTimer = null;

function getMDD() {
  return new Promise(function (resolve, reject) {
    result = exec('xdotool search --name "MDD"', function (err, stdout, stderr) {
      if (err) return reject(err);
      console.log(stdout);
      return resolve(stdout);
    });
  });
}

function mdd_WindowSet(result) {
  var firstWindow=result && result.split("\n")[0];
  return new Promise(function (resolve,reject) {
    //Window resizing
    exec('xdotool windowsize '+firstWindow.trim()+' 642 800', function(err,stdout,stderr){
      if (err) return reject(err);
      console.log("Resizing Window")
      //Moving window to new position X Y
      exec('xdotool windowmove '+firstWindow.trim()+' 0 0', function(err,stdout,stderr){
        if (err) return reject(err);
        console.log("Moving Window")
        return resolve(firstWindow);
      });
    });
  });
};

function mdd_win_set(){
  console.log("moving window");
  getMDD().then(function(stdout) {
    if(stdout) return mdd_WindowSet(stdout);
    else {
      console.log("No window named MDD to move");
    }
  }).then(function() {
      console.log("Completed windowmove");
  });
}


function reconnect() {
  if(!lastDeviceIP && device_list.length > 0) {
     device_list.forEach(function(d) {
     });
     var validIPs = device_list.filter(function(d) {
       return d.local_ip && d.hostname;
     });
     lastDeviceIP = validIPs.length ? validIPs[0].local_ip : null;
  }
  if(!lastDeviceIP) return;
  exec("xwininfo -tree -root | grep -i remmina", function(err, stdout, stderr) {
    console.log(err);
    if(stdout && (stdout.includes("MDD") || stdout.toString().includes("MDD"))) {
      console.log(stdout);
    } else {
     connect(lastDeviceIP);
    }
  });
}

function setAutoConnect(flag) {
  autoConnectEnabled = flag;
  if (autoConnectTimer) {
    clearInterval(autoConnectTimer);
    autoConnectTimer = null;
  }
  if (flag) {
    //   the timer for autoconnect runs on the from front-end
    //   autoConnectTimer = setInterval(reconnect, AUTOCONNECT_INTERVAL);
  }
}

function runScan(){
  return new Promise(function(resolve,reject){
    var lastIndex = my_ip.lastIndexOf(".");
    console.log('sudo nmap -sn '+my_ip.substring(0,lastIndex)+'.1/24');
    exec('sudo nmap -sn '+my_ip.substring(0,lastIndex)+'.1/24',function(err,stdout,stderr){
      if (err){
        console.error('exec error: ' + err);
        reject(true)
      }
      var res = stdout.split("\n");
      //console.log(res);

      //Reverse iteration of array so iteration isnt skipped during splice.
      //Array spliced at index if array includes info in text.
      for (i = res.length - 1; i >= 0; --i){
        //console.log(res);
        res[i] = res[i].toString();
        res[i] = res[i].replace("Nmap scan report for", "Hostname:");

        if (res[i].includes("Hostname")) {
          res[i] = res[i].replace("192","(192").replace("((","(")
                         .replace("(", ",IP Address:").replace(")","");
          continue;
        };
        if (res[i].includes("MAC")) {
          res[i] = res[i].replace("(", ",Device:").replace(")","")
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
      //console.log(res)



      for (var i = 0; i < res.length; i++) {

        if(!res[i]) continue;
        if (res[i].includes("Hostname:")){
          res[i] = res[i].replace("Hostname:","");
          device_obj = {};
          device_obj.hostname=res[i].trim();
          if (i != 0) {
            device_list.push(device_obj);
          };
          continue;

        }
        if (res[i].includes("IP Address:")){
          res[i] = res[i].replace("IP Address:","");
          device_obj.local_ip = res[i].trim();
          continue;

        }
        if (res[i].includes("MAC Address:")){
          res[i] = res[i].replace("MAC Address:","");
          device_obj.mac = res[i].trim();
          continue;

        }
        if (res[i].includes("Device:")){
          res[i] = res[i].replace("Device:","");
          device_obj.device = res[i].trim();
          continue;

        }
        if (res[i].includes("latency")){
          res[i] = res[i].replace("Host is up with ","").replace("latency","");
          device_obj.latency = res[i];
          continue;

        }

      };
      resolve(device_list);
    });
  });

};

function connectIfNotConnected(deviceIP, port) {
  getMDD().then(function (mdd) {
    if (!mdd) connect(deviceIP, port);
  }).catch(function (err) {
    connect(deviceIP, port);
  });
}

function connect(deviceIP, port) {

  console.log("Connect called for " + deviceIP);
  //have only one vnc client running at a time
  if (vnc_started) {
    close_vnc();
  }
  lastDeviceIP = deviceIP;
  if (port) deviceIP += ":" + port;

  vnc_started = true;

  var promise = new Promise(function (resolve, reject) {

    var dir = path.join(__dirname, "../../../scripts");
    var mdd = path.join(dir, "mdd.remmina");
    var mddtmp = path.join(dir, "mddtmp.remmina");
    console.log("sed s/server=.*/server=" + deviceIP + "/ " + mdd + " > " + mddtmp + " && remmina -c " + mddtmp);
    exec("sed s/server=.*/server=" + deviceIP + "/ " + mdd + " > " + mddtmp, function (error, stdout, stderr) {
      if (error) return reject(error);
      vnc_client = spawn("remmina", ['-c', mddtmp]);
      vnc_client.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });
      console.log("PROCESS PID = "+vnc_client.pid);
      vnc_client.on("close", function(closeData) {
         console.log(closeData);
      });
      vnc_client.on("exit", function(exitData) {
         console.log(exitData);
         vnc_started = false;
      });

  vnc_client.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

      vnc_client.on('close', function (code) {
        console.log('child process exited with code ' + code);
      });
      resolve(true);
    });
  });
  return promise;
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
