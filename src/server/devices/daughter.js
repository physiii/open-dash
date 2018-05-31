// --------------------------------  OPEN-DASH --------------------------------- //
// ------------------  https://github.com/physiii/Open-Dash -------------------- //
// -------------------------------- daughter.js -------------------------------- //

const EventEmitter = require('events'),
  SerialPort = require('serialport'),
  TAG = '[daughter.js]';

class DaughterCard {
  constructor () {
    this._events = new EventEmitter();
  }

  init (device) {
    this.serial_port = new SerialPort(device, (error) => {
      console.error(TAG, error);
    });

    // Start listening for messages from daughter board.
    this._listen();

    // Respond when daughter board asks if main board is on.
    this.on('status', (status) => {
      if (status.get_power_state) {
        this.send('status', {power_state: true});
      }
    });
  }

  _listen () {
    this.serial_port.on('data', (data) => {
      data = JSON.parse(data);
      this._events.emit(data.type, data.payload);
    });
  }

  send (type, payload) {
    if (!this.serial_port) {
      console.error(TAG, 'Tried to send message to daughter board, but no serial port is opened.');
      return;
    }

    this.serial_port.write(JSON.stringify({type, payload}));
  }

  on () {
    this._events.on.apply(this._events, arguments);
  }
}

module.exports = new DaughterCard();
