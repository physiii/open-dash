var multiparty = require("multiparty");
const fs = require("fs");
const EventEmitter = require("events");
const child_process = require("child_process");
const path = require("path");

var state = {
    mouseEvents: [],
    msgid: 0,
    jpegs: new EventEmitter()
};

function respondNotFound(response){
	response.writeHead(404, "Not Found");
	response.end("Not Found");
}

function soak(stream, callback){
	var chunks = [];
	stream.on("data", chunks.push.bind(chunks));
	stream.on(
		"end",
		function(lastChunk){
			if(arguments.length >= 1) chunks.push(lastChunk);
			return callback(chunks.join(""));
		}
	);
}

var app = {
	listen: function(port){
		require("http").createServer(
			this.respond.bind(this)
		).listen(port);
	},
	respond: function(req, res){
		var path = req.url.split("?")[0];
		if(!(path in this.resources)) return respondNotFound(res);
		var resource = this.resources[path];
		if(!(req.method.toUpperCase() in resource)){
			res.writeHead(405, "Bad Method");
			return res.end("This resource does not support this method.");
		}
		return resource[req.method.toUpperCase()](req, res);
	},
	resources: {
		"/mdd/": {
			GET: function(req, res){
				res.end(
					[
						"<html>",
						" <body>",
						"  <form method=\"POST\" enctype=\"multipart/form-data\">",
						"   <input type=\"file\" name=\"file\" />",
						"   <input type=\"submit\" />",
						"  </form>",
						" </body>",
						"</html>",
						""
					].join("\r\n")
				);
			},
			POST: function(req, res){
				function firstPath(files){
					if(!files) return null;
					if(!("file" in files)) return null;
					if(!files.file.length) return null;
					return files.file[0].path;
				}
				function mouseback(){
					var body = "";
					var maxEvents = 25;
					var myEvents = state.mouseEvents.slice(
						0,
						maxEvents
					);
					body += myEvents.map(
						function(evt){
							var x = evt.x;
							var y = evt.y;
							var l = null;
							if(evt.event == "up")
								l = "u";
							if(evt.event == "down")
								l = "d";
							var result = [];
							result.push(
								++state.msgid +
									" x=" +
									(x^0)
							);
							result.push(
								state.msgid +
									" y=" +
									(y^0)
							);
							if(l)
								result.push(
									++state.msgid + " l=" + l
								);
							return result.join(
								"\n"
							);
						}
					).join("\n");
					state.mouseEvents =
						state.mouseEvents.slice(
							maxEvents
						);
					res.end(body);
				}
				function eatFile(path, databack, callback){
					if(null == path) return callback();
					return fs.readFile(
					path,
						function(err, data){
							databack(data);
							fs.unlink(
								path,
								callback
							)
						}
					);
				}
				function jpgback(jpg){
					state.currentScreenshot = jpg;
					state.jpegs.emit("jpg", jpg);
					state.lastTime = new Date();
				}
				return (
					new multiparty.Form()
				).parse(
					req,
					function(err, fields, files){
						console.log("JPEG POST");
						if(err) console.trace(err);
						return eatFile(
							firstPath(files),
							jpgback,
							mouseback
						);
					}
				);
			}
		},
		"/mdd/mouse": {
			POST: function(req, res){
				return soak(
					req,
					function(body){
						var form = JSON.parse(body);
						state.mouseEvents.push(form);
						res.end("got it");
					}
				);
			}
		},
		"/mdd/bluetooth": {
			// MDD POSTs own btaddr and we reply with ours
			POST: function(req, res){
				let script_stdout = '';
				function respond(){
					console.log('responding with own BTaddr' + script_stdout);
					res.setHeader("Content-Type", "text/plain"); // response is unsanitized
					res.end(script_stdout);
				}
				return soak(
					req,
					function(clientaddr){
						console.log('received mdd BTaddr ' + clientaddr);
						let script = child_process.spawn(
							"bash",
							[
								"/home/open/open-dash/scripts/prepare_bluetooth_audio.sh",
								clientaddr
							],
							{
								shell: false
							}
						);
						script.stdout.on('data', (data) => {
							script_stdout += data;
						});
						// script.on("close", respond.bind(this, script_stdout));
						script.on('close', respond);
					}
				);
			}
		},
	}
}

exports.app = app;
exports.state = state;
