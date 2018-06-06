// ---------------------------  OPEN-AUTOMATION -------------------------------- //
// --------------  https://github.com/physiii/open-automation  ----------------- //
// ------------------------------- camera.js ----------------------------------- //

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var TAG = "[camera.js]";
var STREAM_PORT = 8081;
var ffmpeg_pass = [];
var command = [];
ffmpeg_timer = setTimeout(function () { }, 1);
var secret = "passwd";

module.exports = {
  start_ffmpeg: start_ffmpeg,
  stop_ffmpeg: stop_ffmpeg
};
// ---------- //
// initialize //
// ---------- //

var ffmpeg = null;
var ffmpeg_proc_list = [];


function start_ffmpeg(data) {

  console.log("Starting ffmpeg");
  var camera_number = 0;
  var video_width = null;
  var video_height = null;
  if (!video_width) video_width = "640";
  if (!video_height) video_height = "480";

  for (var i = 0; i < ffmpeg_proc_list.length; i++) {
    console.log("ffmpeg_proc_list: ",  data);
    
  }

  var command = [
                     '-loglevel', 'panic',
                     //'-r', '2',
                     //'-strict', '-1',
                     '-s', video_width + "x" + video_height,
                     '-f', 'v4l2',
                     '-i', '/dev/video' + camera_number,
                     '-f', 'mpegts',
         '-codec:v', 'mpeg1video',
                     '-b:v', '600k',
                     '-r', '2',
                     '-strict', '-1',
                     "http://127.0.0.1:" + STREAM_PORT + "/" + secret
  ];
  ffmpeg = spawn('ffmpeg', command);
  ffmpeg.tag = data;
  //ffmpeg.stdout.on('data', (data) => {console.log(`stdout: ${data}`)});
  //ffmpeg.stderr.on('data', (data) => {console.log(`stderr: ${data}`)});
  ffmpeg_proc_list.push(ffmpeg);
  ffmpeg.on('close', (code) => {
    //stop_ffmpeg(ffmpeg);
    for (var i = 0; i < ffmpeg_proc_list.length; i++) {
      console.log("closed: ");
      
    }
    console.log(`child process exited with code ${code}`);
  });
}


function stop_ffmpeg(ffmpeg1) {

  if (ffmpeg) {
    ffmpeg.kill();
    ffmpeg_started = false;
    ffmpeg = null;
  }
  console.log(TAG, 'ffmpeg stop');
}



function check_ffmpeg() {
  var command = "ps aux | grep -v 'grep' | grep ffmpeg";
  exec(command, (error, stdout, stderr) => {
    if (error) {
      pass_camera_stream();
      return console.error(TAG, "check_ffmpeg failed...restarting ffmpeg!");
    }
    console.log(TAG, "ffmpeg...good");
  });
}

