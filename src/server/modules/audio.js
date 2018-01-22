// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- audio.js ------------------------------------ //

//var ffmpeg = require('ffmpeg');
var Sound = require('aplay');
var p_snd = new Sound();
var fs = require('fs');
var TAG = "[audio.js]";
var ffmpeg_pass = [];
var command = [];
var ffmpeg_timer = setTimeout(function () {}, 1);


module.exports = {
  btn_click: btn_click,
  alert_snd: alert_snd,
  test: test,

};

function btn_click() {
  p_snd.play('../../sounds/mouse-click.wav');
  return new Promise(function(resolve, reject) {
    p_snd.on('complete', function() {
      resolve(true);
    });
  });
}

function alert_snd() {
  p_snd.play('../../sounds/alert_snd.wav');
  return new Promise(function(resolve, reject) {
    p_snd.on('complete', function() {
      resolve(true);
    });
  });
}


//Socket.io functionality if needed

//--End of code prior to test function for module--//

function test() {
  console.log("Testing audio Module");
  btn_click().then(function(){
    return alert_snd();
  }).then(function(){
    console.log("Finishing testing sounds");
  })
}
