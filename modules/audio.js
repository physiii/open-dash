// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- audio.js ------------------------------------ //

//var ffmpeg = require('ffmpeg');
var Sound = require('aplay');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var TAG = "[audio.js]";
var ffmpeg_pass = [];
var command = [];
ffmpeg_timer = setTimeout(function () {}, 1);


module.exports = {
  btn_click: btn_click,
  alert_snd: alert_snd,
  test: test,

};

function btn_click() {
  var click = new Sound();
  click.play('./sounds/mouse-click.wav');
  return new Promise(function(resolve, reject) {
    click.on('complete', function() {
      resolve(true);
    });
  });
}

function alert_snd() {
  var alert = new Sound();
  alert.play('./sounds/alert_snd.wav');
  return new Promise(function(resolve, reject) {
    alert.on('complete', function() {
      resolve(true);
    });
  });
}
 

//Socket.io functionality if needed

//--End of code prior to test function for module--//

function test() {
  console.log("Testing audio Module");
  btn_click().then(function(){
     alert_snd();
  })
}
