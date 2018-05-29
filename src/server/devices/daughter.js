// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/Open-Dash -------------------- //
// ---------------------------------- DAUGHTER.js ------------------------------------ //

const EventEmitter = require('events'),
  SerialPort = require('serialport'),
  TAG = '[Daughter.js]';

class DaughterCard {
  constructor (data) {

    this.serial_port = new SerialPort(data.SerialPort)
    this.events = new EventEmitter();

    this.serial_port.on(data){
      const data = JSON.parse(data);
      this.events.emit(data.type, data.payload);
    }

  }

  }
}

module.eports = new DaughterCard();
