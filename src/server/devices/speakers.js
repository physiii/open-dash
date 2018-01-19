// ------------------------------  OPEN-DASH ----------------------------------- //
// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash/devices  -------------------- //
// ---------------------------------- speakers.js --------------------------------------- //



//module for system (master) volume controls

var platform = require('platform')
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var loudness = require('loudness');

module.exports = {
  getVolume: getVolume,
  setVolume: setVolume,
  raiseVolume: raiseVolume,
  lowerVolume: lowerVolume,
  setMuted: setMuted,
  getMuted: getMuted,
  mute: mute,
  play: play,
  next: next,
  speaker_test: speaker_test,
}

// Volume: up, down, set, mute

function getVolume() {
  return promise=new Promise( function(resolve, reject) {
    loudness.getVolume(function(err, vol) {
      if(err) reject(err);
      else resolve(vol);
    });
  });
}

//volume range is 0-100

function setVolume(vol) {
  return promise=new Promise( function(resolve, reject) {
    loudness.setVolume(vol, function(err) {
      if(err) reject(err);
      else resolve(vol);
    });
  });
}



//raise volume by 5 units
function raiseVolume() {
  return promise=new Promise( function(resolve, reject) {
     getVolume().then(function(err, vol) {
      if(err) return reject(err);
      loudness.setVolume(vol+5, function(seterr) {
          if(seterr) reject(seterr);
          else resolve(vol);
      });
     });
  });
}
//lower volume by 5 units
function lowerVolume() {
  return promise=new Promise( function(resolve, reject) {
    getVolume().then(function(err, vol) {
      if(err) return reject(err);
      loudness.setVolume(vol-5, function(seterr) {
        if(seterr) reject(seterr);
        else resolve(vol);
      });
    });
  });
}

function getMuted() {
  return promise=new Promise( function(resolve, reject) {
    loudness.getMuted(function(err, mute) {
      if(err) reject(err);
      else resolve(mute);
    });
  });
}
function setMuted(mute) {
  return promise=new Promise( function(resolve, reject) {
    loudness.setMuted(mute, function(err) {
      if(err) reject(err);
      else resolve(mute);
    });
  });
}

//mute if not-muted, unmute if muted
function mute() {
  return promise=new Promise( function(resolve, reject) {
    getMuted().then(function(err, mute) {
      if(err) return reject(err);
      loudness.setMuted(!mute, function(seterr) {
        if(seterr) reject(seterr);
        else resolve(!mute);
      });
    });
  });
}

//functions play, pause, resume, next should be in media player
//but leaving play and next here for now
function play() {
   spawn('xdotool', ['key', 'XF86AudioPlay']);
}
function next() {
  spawn('xdotool', ['key', 'XF86AudioNext']);
}


//Windows Functions
function win_command(data) {loudness.setVolume(45, function (err) {
  // Done 
});
  var command = data.cmd;
  console.log("running"+platform+"platform")
  if (command == "volume down"){
    spawn('nircmd.exe', ['mutesysvolume', '0']);
    spawn('nircmd.exe', ['changesysvolume', '-5000']);
  }
  if (command == "volume up"){
    spawn('nircmd.exe', ['mutesysvolume', '0']);
    spawn('nircmd.exe', ['changesysvolume', '+5000']);
  }
  if (command == "mute"){ spawn('nircmd.exe', ['mutesysvolume', '1']) }
  if (command == "play"){ spawn('nircmd.exe', ['mutesysvolume', '1']) }

};

//Linux Functions
function linux_command(data) {
  var command = data.cmd;
  console.log("running"+platform+"platform")
  if ( command === "volume down" ) { spawn('xdotool', ['key', 'XF86AudioLowerVolume']) }
  if ( command === "volume up" ) { spawn('xdotool', ['key', 'XF86AudioRaiseVolume']) }
  if ( command === "mute" ) { spawn('xdotool', ['key', 'XF86AudioMute']) }
  if ( command === "play" ) { spawn('xdotool', ['key', 'XF86AudioPlay']) }
  if ( command === "next" ) { spawn('xdotool', ['key', 'XF86AudioNext']) }
  //for volume slider use: xodotool amixer -c 0 sset Master,0 80%

};

//Unsupported platform
function unsupp_command(data) {
  var command = data.cmd;
  console.log("Unsupported platform"+ platform);
  if ( command === "volume down" ) { spawn('xdotool', ['key', 'XF86AudioLowerVolume']) }
  if ( command === "volume up" ) { spawn('xdotool', ['key', 'XF86AudioRaiseVolume']) }
  if ( command === "mute" ) { spawn('xdotool', ['key', 'XF86AudioMute']) }
  if ( command === "play" ) { spawn('xdotool', ['key', 'XF86AudioPlay']) }
  if ( command === "next" ) { spawn('xdotool', ['key', 'XF86AudioNext']) }

};

//Test Functions

function speaker_test() {
  console.log("Testing speaker Module");
  getVolume().then(function(){
    return raiseVolume();
  }).then(function(vo) {
    return lowerVolume();
  }).then(function() {
    console.log("Finished running test.") 
  })
};