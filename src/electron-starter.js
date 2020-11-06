const electron = require('electron'),
	TAG = "[electron-starter.js]",
	SerialPort = require('serialport'),
	Exec = require('child_process').exec,
	port = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 });

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

console.log(TAG, "starting open-dash");

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function parseMessage(msg) {
	console.log(TAG, msg);
	if (msg.ignition === "off") {
  	Exec("gnome-session-quit --power-off");
	}

	if (msg.ignition === "on") {
		Exec("xdotool key 0xff1b");
	}
}

let buffer = '';
// port.on('data', function (data) {
//     buffer += data.toString('utf8');
//     lines = buffer.split('\n');
//     printme = lines.slice(0, -1).join('');
// 		if (isJson(printme)) {
// 			let daughterMessage = JSON.parse(printme);
// 			console.log("ignition:", daughterMessage.ignition);
// 		}
//     if (printme.length > 0) console.log(printme);
//     buffer = lines.slice(-1);
// });

port.on('readable', function () {
	buffer += port.read().toString('utf8');
	console.log(TAG, buffer.slice(-1));
	if (buffer.slice(-1) === "\n") {
	  let lines = buffer.split('\n');
		for (let i=0; i < lines.length; i++) {
			let line = lines[i];
			if (isJson(line)) {
				let message = JSON.parse(line);
				parseMessage(message)
			} else {
				// console.log(TAG, "[NOT JSON]", line);
			}
		}
		buffer = '';
	}
})

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


function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: { nodeIntegration: true }});

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
