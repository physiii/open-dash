// ---------------------------  USPS Project -------------------------------- //
// --------------  https://github.com/physiii/open-dash  ----------------- //
// ----------------------------- webserver.js ---------------------------------- //




var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var console = require('console');

var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};

const webserv = https.createServer(handler);
webserv.listen(8080);

const server = http.createServer().listen("1235");
var web_io = require('socket.io').listen(server);
var nwpm_socket = require('socket.io-client')("http://127.0.0.1:1235");


module.exports = {}



function handler (req, res) {
  fs.readFile(__dirname + './interface.js',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading interface.js');
    }

    res.writeHead(200);
    res.end(data);
  });
}

web_io.on('connection', function(socket) {
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
//});as
