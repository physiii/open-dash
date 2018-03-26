// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- wifi.js ------------------------------------ //

const spawn = require('child_process').spawn;
var config = require("../../../config.json");
var ap_wireless = config.wireless_adapter || " ";
var ap_ethernet = config.ethernet_adapter || " ";
var ap_ssid = config.broadcast_ssid || " ";
var ap_password = config.password || " ";


module.exports = {
	ap_connect: ap_connect,
};


function ap_connect() {
  if (ap_password === " ") {
  const ap_process = spawn('sudo', ['create_ap', ap_wireless, ap_ethernet, ap_ssid]);
  ap_process.stdout.on('data', (data) => {
      data = data.toString();

      if (data.includes("Creating a virtual")){
        console.log("*** Creating a virtual Wifi Interface ***");
      };

      if (data.includes(": authenticated")){
        console.log('*** Wifi connection authenticated ***');
      };

      if (data.includes("AP-STA-CONNECTED")){
        data = data.replace('ap0: AP-STA-CONNECTED', ':');
        console.log('*** Wifi connection established ***');
      };

      if (data.includes(": deauthenticated")){
        console.log('*** Wifi has been deauthenticated ***');
      };

      if (data.includes("AP-STA-DISCONNECTED")){
        data = data.replace('ap0: AP-STA-DISCONNECTED', ':');
        console.log('*** Wifi has been disconnected ***');
      };
      ap_process.on('close', (code) => {
          console.log('Child process exited with code: ', code.toString());
      });
  });
} else {
  const ap_process = spawn('sudo', ['create_ap', ap_wireless, ap_ethernet, ap_ssid, ap_password]);
  ap_process.stdout.on('data', (data) => {
      data = data.toString();

      if (data.includes("Creating a virtual")){
        console.log("*** Creating a virtual Wifi Interface ***");
      };

      if (data.includes(": authenticated")){
        console.log('*** Wifi connection authenticated ***');
      };

      if (data.includes("AP-STA-CONNECTED")){
        data = data.replace('ap0: AP-STA-CONNECTED', ':');
        console.log('*** Wifi connection established ***');
      };

      if (data.includes(": deauthenticated")){
        console.log('*** Wifi has been deauthenticated ***');
      };

      if (data.includes("AP-STA-DISCONNECTED")){
        data = data.replace('ap0: AP-STA-DISCONNECTED', ':');
        console.log('*** Wifi has been disconnected ***');
      };
      ap_process.on('close', (code) => {
          console.log('Child process exited with code: ', code.toString());
      });
  });
 };
};


//Socket.io functionality if needed



//--End of code prior to test function for module--//
function test() {
  console.log("Testing wifi Module");
};
