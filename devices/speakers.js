// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash/devices  -------------------- //
// ---------------------------------- speakers.js --------------------------------------- //



var platform = require('platform')
var spawn = require('child_process').spawn;

modules.exports = {
  plat_select: plat_select,
  win_command: win_command,
  linux_command: linux_command,
  unsupp_command: unsupp_command,
  speaker_test: speaker_test,
}

// Volume: up, down, set, mute

//Determine what platform is being used
function plat_select() {
  if (platform.os.family == "Win32") {win_command()};
  if (platform.os.family == "Linux") {linux_command()};
  else {function unsupp_command(data)} ;
}

//Windows Functions
function win_command(data) {
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

}

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

}

//Unsupported platform
function unsupp_command(data) {
  var command = data.cmd:
  console.log("Unsupported platform"+ platform);
  if ( command === "volume down" ) { spawn('xdotool', ['key', 'XF86AudioLowerVolume']) }
  if ( command === "volume up" ) { spawn('xdotool', ['key', 'XF86AudioRaiseVolume']) }
  if ( command === "mute" ) { spawn('xdotool', ['key', 'XF86AudioMute']) }
  if ( command === "play" ) { spawn('xdotool', ['key', 'XF86AudioPlay']) }
  if ( command === "next" ) { spawn('xdotool', ['key', 'XF86AudioNext']) }

}

//Test Functions

function speaker_test() {
  return;

}
