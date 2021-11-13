const crypto = require('crypto'),
  Exec = require('child_process').exec,
  spawn = require('child_process').spawn,
  http = require('http'),
	url = require('url'),
	SerialPort = require('serialport'),
	port = new SerialPort('/dev/ttyUSB0', {
		baudRate: 115200,
	}),
  os = require('os'),
	fs = require('fs'),
	io = require('socket.io')(http),
	socketPort = 3030,
	TAG = "[index.js]";

let state = {
	displayPower: false,
	mainPower: false,
	audioPower: false,
	ignition: "off"
};

// --- webserver --- //
var server= http.createServer(function(request,response){
var path = url.parse(request.url).pathname;

    switch(path) {
        case '/' :
            response.writeHead(200,{'Content-Type':'text/html'})
            response.write('Hello World, Welcome to Socket Programming');
            response.end();
            break;
        case '/chatexample.html' :
            fs.readFile(__dirname + path,function(error,data){
                if(error)
                {
                   response.writeHead(404);
                   response.write(error);
                   response.end();
                } else {
                    response.writeHead(200,{'Content-Type':'text/html'});
                    response.write(data);
                    response.end();
                }
            });
            break;
        default :
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }

});
server.listen(socketPort);
var listener = io.listen(server);
listener.sockets.on('connection',function(socket){
	console.log(TAG, "Client connected.");

	socket.on('daughter',(msg) => {
		console.log(TAG, "Sending:", msg);
    port.write(msg);
	});

	socket.on('disconnect',function(socket){
		console.log(TAG, "Client disconnected.");
	});
});

	// ------------------------------- //
	function isJson(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

	function parseMessage(msg) {
		if (msg.type == "j1850") {
			io.emit('j1850', msg);
  		// console.log(JSON.stringify(msg));
		} else
		if (msg.type == "hvac") {
			io.emit('hvac', msg);
    	console.log(JSON.stringify(msg));
		} else
		if (msg.type == "power") {
			io.emit('power', msg);
  		console.log(JSON.stringify(msg));
      if (msg.ignition === "off") {
        if (state.ignition === "on") {
          state.ignition = msg.ignition;
          Exec("gnome-session-quit --power-off");
          console.log("!! SHUTDOWN IN 60 SECONDS !!");
        }
      } else
      if (msg.ignition === "on") {
        if (state.ignition === "off") {
          state.ignition = msg.ignition;
          Exec("xdotool key 0xff1b");
          console.log("!! CANCEL SHUTDOWN !!");
        }
      }
		}
	}

  console.log(TAG, "Starting dash service on port", socketPort);

	let buffer = '';

	port.on('readable', () => {
		buffer += port.read().toString('utf8');
		if (buffer.slice(-1) === "\n") {
		  let lines = buffer.split('\n');
			for (let i=0; i < lines.length; i++) {
				let line = lines[i];
				if (line.length <= 2) continue;
				if (isJson(line)) {
					let message = JSON.parse(line);
					parseMessage(message)
				} else {
					console.log(TAG, "[NOT JSON]", line);
				}
			}
			buffer = '';
		}
	})

	port.on('open', function() {
		let msg = {eventType:"power", payload: {set_audio_power: true}}
		port.write(JSON.stringify(msg));
	})

	let interval = 4000;
  setInterval(()=>{
		let get_state = {eventType: "power", payload: {get_state: true}};

		// console.log("sending.....", JSON.stringify(get_state));
		port.write(JSON.stringify(get_state));

	  setTimeout(()=>{
			let get_state = {eventType: "hvac", payload: {get_state: true}};

			// console.log("sending.....", JSON.stringify(get_state));
			port.write(JSON.stringify(get_state));
	  }, interval / 2);
  }, interval);
