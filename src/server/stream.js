const constant = require('../constants.js'),
	WebSocket = require('ws'),
	http = require('http'),
	// HTTP Server to accept incomming MPEG streams.
	streamServer = http.createServer(requestListener).listen(constant.VIDEO_STREAM_PORT),
	// Websocket server for video-streaming client on front-end.
	socketServer = new WebSocket.Server({port: constant.VIDEO_WEBSOCKET_PORT, perMessageDeflate: false}),
	TAG = '[stream.js]';

// Broadcast stream to client (front-end).
function clientBroadcast (data, settings) {
	socketServer.clients.forEach((client) => {
		if (client.readyState !== WebSocket.OPEN) {
			console.log(TAG, 'Client not connected (' + i + ')');
			return;
		}

		client.send(data);
	});
};

function requestListener (request, response) {
	const params = request.url.substr(1).split('/'),
		camera = params[0];

	response.connection.setTimeout(0);

	console.log(TAG, 'Incoming stream:', camera);

	// Broadcast the stream to the client (front-end).
	request.on('data', clientBroadcast);
}

console.log(TAG, 'Listening for MPEG stream on http://127.0.0.1:' + constant.VIDEO_STREAM_PORT + '/<camera>');
console.log(TAG, 'Awaiting WebSocket connections on ws://127.0.0.1:' + constant.VIDEO_WEBSOCKET_PORT);
