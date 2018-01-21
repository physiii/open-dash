// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- radio.js ------------------------------------ //

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var console = require('console');

module.exports = {
  pull: pull,
};


function pull() {
  console.log("switch to settings screen!");
  exec('cd ~/code/open-dash;git pull', function(err, stdout, stderr) {
    if (err) {
      console.log(err)
      return;
    }

    console.log(stdout);

  });
};

function test() {
    console.log("Testing radio Module");
};
