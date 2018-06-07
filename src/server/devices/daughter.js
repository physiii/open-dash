// --------------------------------  OPEN-DASH --------------------------------- //
// ------------------  https://github.com/physiii/Open-Dash -------------------- //
// -------------------------------- daughter.js -------------------------------- //

const EventEmitter = require('events'),
  SerialPort = require('serialport'),
  byline = require('byline'),
  TAG = '[daughter.js]';

class DaughterCard {
  constructor () {
    this._events = new EventEmitter();

    this._handleSerialPortData = this._handleSerialPortData.bind(this);

    // Respond when daughter board asks if main board is on.
    this.on('status', (status) => {
      if (status && status.get_power_state) {
        this.send('status', {power_state: true});
      }
    });
  }

  openSerialPort (device_path) {
    this.closeSerialPort(() => {
      this.serial_port = new SerialPort(device_path, {baudRate: 115200}, (error) => {
        if (error) {
          console.error(TAG, 'Error opening serial port:', error);
          return;
        }

        // Wrap the serialport in byline to chunk data by line.
        this.serial_port_stream = byline(this.serial_port);

        // Start listening for messages from daughter board.
        this._listen();
      });
    });
  }

  closeSerialPort (callback) {
    if (!this.serial_port || !this.serial_port.isOpen) {
      if (typeof callback === 'function') {
        callback();
      }

      return;
    }

    this.serial_port.drain(() => {
      this.serial_port.close();
      this.serial_port_stream.removeListener('data', this._handleSerialPortData);

      this.serial_port = null;
      this.serial_port_stream = null;

      if (typeof callback === 'function') {
        callback();
      }
    });
  }

  _listen () {
    this.serial_port_stream.on('data', this._handleSerialPortData);
  }

  _handleSerialPortData (data) {
    let message;

    try {
      message = JSON.parse(data);
    } catch (error) {}

    if (message && message.type && message.payload) {
      this._events.emit(message.type, message.payload);
    }
  }

  send (type, payload) {
    if (!this.serial_port || !this.serial_port.isOpen) {
      console.error(TAG, 'Tried to send message to daughter board, but serial port is not open.');
      return;
    }

    this.serial_port.write(JSON.stringify({type, payload}));
  }

  on () {
    this._events.on.apply(this._events, arguments);
  }
}

module.exports = new DaughterCard();
