var express = require("express");
var multiparty = require("multiparty");
var fs = require("fs");

var state = {
    mouseEvents: [],
    msgid: 0
};

var app = express();
app.get(
    "/mdd/clientLives/",
    function(req, res){
	function clientLives(){
	    if(!("lastTime" in state)) return false;
	    var now = new Date();
	    return now - state.lastTime < 1000 * 5;
	}
	res.send(clientLives());
    }
);
app.get(
    "/mdd/screen.jpg",
    function(req, res){
	if(!("currentScreenshot" in state))
	    return res.send("oops, not yet"); //TODO: error
	res.setHeader("Content-Type", "image/jpeg");
	res.end(state.currentScreenshot);
    }
);
app.post(
    "/mdd/mouse",
    function(req, res){
	var body = [];
	req.on("data", body.push.bind(body));
	req.on(
	    "end",
	    function(){
		var form = JSON.parse(body.join(""));
		state.mouseEvents.push(form);
		res.send("got it");
	    }
	);
    }
);
app.post(
    "/mdd/",
    function(req, res){
	if(!true){
	    console.log("request:");
	    console.log(req.headers);
	    /*
	    req.on(
		"data",
		function(chunk){
		    console.log("\tchunk", chunk);
		}
	    );
	    */
	    req.on("end", res.send.bind(res, "got it, thanks"));
	    return;
	}
	else
	    (
		new multiparty.Form()
	    ).parse(
		req,
		function(err, fields, files){
		    if(files)
			files.file.map(
			    function(file){
				var path = file.path;
				fs.readFile(
				    path,
				    function(err, data){
					// TODO: check for err
					state.currentScreenshot = data;
					fs.unlink(
					    path,
					    console.trace.bind(console)
					);
				    }
				);
				state.lastTime = new Date();
			    }
			);
		    if(err) console.trace(err);
		    var body = "";
		    var maxEvents = 25;
		    var myEvents = state.mouseEvents.slice(0, maxEvents);
		    body += myEvents.map(
			function(evt){
			    var x = evt.x;
			    var y = evt.y;
			    var l = null;
			    if(evt.event == "up") l = "u";
			    if(evt.event == "down") l = "d";
			    var result = [];
			    result.push(++state.msgid + " x=" + (x^0));
			    result.push(state.msgid + " y=" + (y^0));
			    if(l)
				result.push(++state.msgid + " l=" + l);
			    return result.join("\n");
			}
		    ).join("\n");
		    state.mouseEvents = state.mouseEvents.slice(maxEvents);
		    res.send(body);
		}
	    )
    }
);
app.get(
    "/mdd/",
    function(req, res){
	res.send(
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
    }
);

exports.app = app;
exports.state = state;
