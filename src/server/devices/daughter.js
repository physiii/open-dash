// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- DAUGHTER.js ------------------------------------ //

const EventEmitter = require('events'),
  SerialPort = require('serialport'),
  TAG = '[Daughter.js]';

class DaughterCard {
  init (serial_port) {

    this.serial_port = new SerialPort(serial_port);
    this.events = new EventEmitter();

    this.serial_port.on(data){
      const data = JSON.parse(data);
      this.events.emit(data.type, data.payload);
    }

  }

  send (data) {
    this.serial_port.write(data);
  }

  on () {
    this.events.on.apply(this.events, arguments)
  }


}

module.exports = new DaughterCard();
