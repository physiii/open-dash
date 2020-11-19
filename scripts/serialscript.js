const SerialPort = require('serialport'),
  fs = require('fs'),
  wstream = fs.createWriteStream('serial.log', {flags:'w'}),
  util = require('util');

let port = new SerialPort('/dev/ttyUSB0',{dataBits: 8, baudRate: 2400, stopBits:1, xon:true, xoff:true});
port.setEncoding('hex');
//console.log(port)
var response_sent = false;


module.exports = {
  help_button,
  readline,
  pay_table,
  return_to_game,
  spin_reel
};

var count = 0;
var count2 = 5

var connection = '01300d'

port.on('data', function (data) {
  console.log('Data:', data);

  if (data == '0d') {
    count++;


    if (count === 3) {
      port.write(connection, 'hex');
      console.log('Writing to board Response 1');
    }

    if (count === 5) {
      port.write(connection, 'hex');
      console.log('Writing to board Response 2');
      setTimeout(() => {
        port.write(connection, 'hex');
        port.write(connection, 'hex');
        console.log('Writing to board response 3');
      }, 350);
    }

    if (count > 6 && count < 13) {
      port.write(connection, 'hex');
      console.log('Writing to board reponse', count2);
      count2++;
    }
  }

  if (data == '4e') {
    port.write(connection, 'hex');
    console.log('Writing to board Response 4');
  }

});


function send_coord (x, y) {
  console.log('Sending coords => ('+ x + ', ' + y + ')');
  port.write('d8'+ x.toString(16) + y.toString(16) + '98' + x.toString(16) + y.toString(16), 'hex');
  console.log('write log is => ' + 'd8'+ x.toString(16) + y.toString(16) + '98' + x.toString(16) + y.toString(16));
};

function readline() {
  console.log('Data', port.read());
};

function help_button () {
  console.log('sending help button');
  //port.write('\xd3\x4d\x2b\xab\xdf\x4b\x2d\x17\xe7\xf3\xe9');
  //port.write('d34d2babce530d2babdf4b2d17e7f3e9','hex');
  port.write('d84a1c6609984a1c6609','hex');
};

function pay_table () {
  console.log('sending pay Table');
  //port.write('d853274a08d853274a08d84d274b08d84a274b08d84a274708984a274708', 'hex');
  port.write('d84a274708984a274708', 'hex');
};

function return_to_game () {
  console.log('sending return');
  port.write('d81f767928981f767928', 'hex');
  //port.write('d81f767928981f767928', 'hex');
};

function spin_reel () {
  console.log('Spinning reel');
  //port.write('d854643708', 'hex');
  //port.write('d854643e08d84d644a08d848645208d847645208d842645508d8426451089842645108', 'hex');
  port.write('d8426451089842645108', 'hex');
};
