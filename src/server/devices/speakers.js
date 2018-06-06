// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash/devices  -------------------- //
// ---------------------------------- speakers.js --------------------------------------- //



//module for system (master) volume controls
var loudness = require('./loudness');

var spawn = require('child_process').spawn;
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
  next: next,
  speaker_test: speaker_test,
}

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
     getVolume().then(function(vol) {
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
    getVolume().then(function(vol) {
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

function muteXdoTool() {
  return new Promise(function (resolve, reject) {
    spawn('xdotool', ['key', 'XF86AudioMute']);
    resolve(true);
  });
};

//mute if not-muted, unmute if muted
function mute() {
  return promise=new Promise( function(resolve, reject) {
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

//Test Functions

function speaker_test() {
  console.log("Testing speaker Module");
  lowerVolume().then(function(){
    return raiseVolume();
  }).then(function() {
    return lowerVolume();
  }).then(function() {
    return mute();
  }).then(function() {
    console.log("Finished running test.")
  })
};



/*
var loudness = require('loudness');

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
     getVolume().then(function(vol) {
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
    getVolume().then(function(vol) {
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

*/
