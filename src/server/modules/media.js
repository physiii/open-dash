// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- player.js ------------------------------------ //

var fs = require('fs')
var path = require('path')

var blank = null;


module.exports = {
  getMediaFiles: getMediaFiles,
  getAudioFiles: getAudioFiles,
  getVideoFiles: getVideoFiles
};


function blank() {
  return;
};

function getMediaFiles(dir) {
  return new Promise(function (resolve, reject) {
    resolve(getFiles(path.join(__dirname, dir)));
  });
}

function getAudioFiles(dir) {
  console.log(__dirname);
  console.log(dir);
  return new Promise(function (resolve, reject) {
    resolve(getFiles(path.join(__dirname, dir), null, "", [".mp3", ".wav", ".ogg"]));
  });
}
function getVideoFiles(dir) {
  return new Promise(function (resolve, reject) {
    resolve(getFiles(path.join(__dirname, dir), null, "", [".webm", ".mpg", ".mov", ".wmv", ".avi", ".mp4"]));
  });
}

function getFiles(dir, files_, subfolder, types) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    var relativeName = subfolder ? subfolder + '/' + files[i] : files[i];
    if (fs.statSync(name).isDirectory()) {
      // don't look in subfolders
      // getFiles(name, files_, relativeName, types);
    } else {
      if (types && types.indexOf(path.extname(name).toLowerCase()) != -1) files_.push(relativeName);
      else if (!types) files_.push(relativeName);
    }
  }
  return files_;
}


//Socket.io functionality if needed



//--End of code prior to test function for module--//
function test() {
  console.log("Testing media Player Module");
  console.log("All media=", getMediaFiles('../../../media'));
  console.log("Audio = ", getAudioFiles('../../../media'));
  console.log("Video = ", getVideoFiles('../../../media'));
};
