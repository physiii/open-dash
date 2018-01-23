// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- display.js ------------------------------------ //

var blank = null;


module.exports = {

};


function blank() {
  return;
};


//Socket.io functionality if needed

var child_process = require('child_process');
var exec = child_process.exec;
var spawn = child_process.spawn;
var ip = require("ip");
var my_ip;
var result;

function find_ip() {
  return new Promise(function(resolve, reject){
    my_ip = ip.address();
    resolve(true);
  });
};

function netSearch() {
  return new Promise(function(resolve, reject){
    result = exec('sudo nmap -sn 192.168.' + my_ip[8] + '.1/24');
    resolve(true);
  });
};


//--End of code prior to test function for module--//
function test() {
    console.log("Testing Display Module");
    find_ip().then(function(){
      return netSearch();
    }).then(function() {
      console.log(result);
    })
};

find_ip();
setTimeout(function() {spawn('sudo', ['nmap', '-sn', '192.168.1.1/24'])}, 3000);
