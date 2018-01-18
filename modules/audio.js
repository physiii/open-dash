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
  new Sound().play('./sounds/mouse-click.wav');
}

function alert_snd() {
  new Sound().play('./sounds/alert_snd.wav');
}

function playSoundFile(filename) {
  var music = new Sound();
  music.play(filename);
  return new Promise(function(resolve, reject) {
    music.on('complete', function() {
       resolve(true);
    });
  });
}
//Socket.io functionality if needed

//--End of code prior to test function for module--//

function testSoundsInSequence() {
  playSoundFile('./sounds/mouse-click.wav').then(function() {
     playSoundFile('./sounds/alert_snd.wav');
  });
}

function test() {
  console.log("Testing audio Module");
  btn_click();
  setTimeout(function() {alert_snd();}, 750);
}
