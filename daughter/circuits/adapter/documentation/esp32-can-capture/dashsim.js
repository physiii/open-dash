
const SerialPort = require('serialport'),
 port = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 });

// this is controlled by the keys 'a' for on, 'm' for off
let dash_power_state = false;

let dash_alive_response = {
    "type": "status",
    "payload": {
       "power_state": true
    }
};

let buffer = '';

port.on('data', function (data) {
    buffer += data.toString('utf8');
    lines = buffer.split('\n');
    printme = lines.slice(0, -1).join('');
    if (printme.length > 0) {
        console.log(printme); // print all messages
        if (dash_power_state) {
            let msg;
            try { msg = JSON.parse(printme); } catch (e){}
            if (msg && msg.type == 'status' && msg.payload.get_power_state) {
                console.log('received power status query, reponding with', dash_alive_response, '(press m to turn off)');
                port.write(JSON.stringify(dash_alive_response) + '\n');
            }
        } else {
            console.log('dash is off, ignoring messages (press a to turn on)');
        }
    }
    buffer = lines.slice(-1);
});

let stdin = process.openStdin();

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', function (key) {
    switch (key) {
        case '\u0003':
            console.log('BYE!');
            process.exit();

        case 'a':
            dash_power_state = true;
            break;

        case 'm':
            dash_power_state = false;
            break;
    }
});
