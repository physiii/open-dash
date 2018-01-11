// ---------------------------  USPS Project -------------------------------- //
// --------------  https://github.com/physiii/open-dash  ----------------- //
// ----------------------------- webserver.js ---------------------------------- //





var http = require('http');
var io = require('socket.io')(http);
const webserv = http.createServer().listen("8080");
var web_io = require('socket.io').listen(webserv);

//var webserv_launch = spawn('node', ['./webserver.js'])

app.get('/', function(req, res) {
   res.sendfile('index.html');

web_io.on('connection', function(socket) {
   console.log('A user connected');
   
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });


});

//http.listen(3000, function() {
//   console.log('listening on *:3000');
//});
