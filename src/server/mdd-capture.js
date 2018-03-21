var multiparty = require("multiparty");
var fs = require("fs");
const EventEmitter = require("events");

var state = {
    mouseEvents: [],
    msgid: 0,
    jpegs: new EventEmitter()
};

function respondNotFound(response){
	response.writeHead(404, "Not Found");
	response.end("Not Found");
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
				var body = [];
				req.on("data", body.push.bind(body));
				req.on(
					"end",
					function(){
						var form = JSON.parse(
							body.join("")
						);
						state.mouseEvents.push(form);
						res.end("got it");
					}
				);
			}
		},
	}
}

exports.app = app;
exports.state = state;
