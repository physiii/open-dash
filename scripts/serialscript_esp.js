const SerialPort = require('serialport'),
  fs = require('fs'),
  wstream = fs.createWriteStream('serial.log', {flags:'w'}),
  util = require('util');

let port = new SerialPort('/dev/ttyUSB0',{dataBits: 8, baudRate: 115200, stopBits:1, xon:true, xoff:true});
port.setEncoding('ascii');
//console.log(port)
var response_sent = false;


module.exports = {
  send,
  read,
  sendBill
};

function send (data) {
  port.write(data, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('sent to daughtercard: ',data);
  });
};

function sendBill(amount) {
  let json = {event_type:"bill", payload:{value:amount}};
  this.send(JSON.stringify(json));
}

function read() {
  console.log('Data', port.read());
};

// Read data that is available but keep the stream from entering "flowing mode"
port.on('readable', function () {
  console.log('readable:', port.read());
});


port.on('error', function(err) {
  console.log('Error: ', err.message);
})
