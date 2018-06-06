// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- update.js ------------------------------------ //

var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = {
  pull: pull,
  getVersion: getVersion,
  //test: test,
};

function getVersion() {
  return new Promise(function (resolve, reject) {
    exec("git rev-parse @", function (err, stdout, stderr) {

      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(stdout);
      return resolve(stdout || stdout.toString());
    });
  });
}
function pull() {
  console.log("checking for updates in", __dirname);
  return new Promise(function (resolve, reject) {
    exec(__dirname + '/update.sh', function (err, stdout, stderr) {

      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(stdout);
      if (stdout.search("Aborting") != -1) {
        console.log("Local uncommitted changes present, aborting.");
        return resolve("Local uncommitted changes present, aborting.");
      }
      if (stdout.search("pulled") == -1) {
        console.log("system is up-to-date");
        return resolve("system is up-to-date");
      }

      if (stdout.search("pulled") != -1) {
        console.log("restart test. moving to socket...")
        return resolve(true);

      };
      resolve(false);
    })
  });
};




function test() {
  console.log("Testing Update Module with pull function...");
  pull()
};