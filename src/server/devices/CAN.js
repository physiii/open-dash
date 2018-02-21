// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- CAN.js ------------------------------------ //
var fs = require('fs');

var blank = null;


module.exports = {

};


function blank() {
  return;
};

//Socket.io functionality if needed
console.log("Initializing CAN...");
fs.read('../../../can.log', 'utf8', function(err, data) {
  if (err) throw err;
  console.log(data);
});



//--End of code prior to test function for module--//
function test() {
    console.log("Testing CAN Module");
};
