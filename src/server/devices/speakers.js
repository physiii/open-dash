// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash/devices  -------------------- //
// ---------------------------------- speakers.js --------------------------------------- //

//module for system (master) volume controls
const loudness = require('./loudness'),
  spawn = require('child_process').spawn,
  can = require('./can/can.js');

module.exports = {
  getVolume: getVolume,
  setVolume: setVolume,
  raiseVolume: raiseVolume,
  lowerVolume: lowerVolume,
  getMuted: getMuted,
  setMuted: setMuted,
  muteXdoTool: muteXdoTool,
  mute: mute,
  play: play,
  next: next
}

can.on('volume-up', () => {
  raiseVolume();
});

can.on('volume-down', () => {
  lowerVolume();
});

can.on('volume-mute', () => {
  mute();
});

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
  return new Promise( function(resolve, reject) {
    loudness.setVolume(vol, function(err) {
      if(err) reject(err);
      else resolve(vol);
    });
  });
}

//raise volume by 5 units
function raiseVolume() {
  return new Promise( function(resolve, reject) {
     getVolume().then(function(vol) {
      loudness.setVolume(vol+10, function(seterr) {
          if(seterr) reject(seterr);
          else resolve(vol);
      });
     });
  });
}
//lower volume by 5 units
function lowerVolume() {
  return new Promise( function(resolve, reject) {
    getVolume().then(function(vol) {
      loudness.setVolume(vol-10, function(seterr) {
        if(seterr) reject(seterr);
        else resolve(vol);
      });
    });
  });
}

function getMuted() {
  return new Promise( function(resolve, reject) {
    loudness.getMuted(function(err, mute) {
      if(err) reject(err);
      else resolve(mute);
    });
  });
}

function setMuted(mute) {
  return new Promise( function(resolve, reject) {
    loudness.setMuted(mute, function(err) {
      if(err) reject(err);
      else resolve(mute);
    });
  });
}

function muteXdoTool() {
  return new Promise(function (resolve, reject) {
    spawn('xdotool', ['key', 'XF86AudioMute']);
    resolve(true);
  });
};

//mute if not-muted, unmute if muted
function mute() {
  return new Promise( function(resolve, reject) {
    getMuted().then(function(mute) {
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
  return new Promise( function(resolve, reject) {
    spawn('xdotool', ['key', 'XF86AudioPlay']);
    resolve(true);
  });
};

function next() {
  return new Promise( function(resolve, reject) {
    spawn('xdotool', ['key', 'XF86AudioNext']);
    resolve(true);
  });
};
