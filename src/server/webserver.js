// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash -------------------- //
// ---------------------------------- webserver.js ------------------------------------ //

var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var console = require('console');
var socket = require('socket.io');
var system = require('../system/system.js');

var port = 8080

/*
var options = {
   key  : fs.readFileSync('./server.key'),
   cert : fs.readFileSync('./server.crt'),
   ca: fs.readFileSync('./server.csr'),
};
*/

//Create SSL Server
const server = http.createServer(app).listen(port, function(){
  console.log("Express Server listening on port " + port);
});
var process_io = socket(server);

module.exports = {

};


process_io.on('connection', function(socket) {
   console.log('A user connected');

   socket.emit('news', { hello: 'world' });

   socket.on('my other event', function (data) {
     console.log(data);
   });

   socket.on('disconnect', function () {
     console.log('A user disconnected');
   });


});

//http.listen(3000, function() {
//   console.log('listening on *:3000');
//});

function test() {
  console.log("Testing Webserver Module");
};
