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

};

function btn_click() {
  new Sound().play('./mouse-click.wav');
}

//Socket.io functionality if needed

//--End of code prior to test function for module--//

function test() {
  console.log("Testing audio Module");
  btn_click()
}