var express = require("express");
var app = express();
var multiparty = require("multiparty");
var fs = require("fs");
var msgid = 0;
var currentScreenshot;
var mouseEvents = [];

app.get(
    "/mdd/screen.jpg",
    function(req, res){
	if(!currentScreenshot) return res.send("oops, not yet"); //TODO: error
	res.setHeader("Content-Type", "image/jpeg");
	res.end(currentScreenshot);
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
		mouseEvents.push(form);
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
					currentScreenshot = data;
					fs.unlink(
					    path,
					    console.trace.bind(console)
					);
				    }
				);
			    }
			);
		    if(err) console.trace(err);
		    var body = "";
		    var maxEvents = 25;
		    var myEvents = mouseEvents.slice(0, maxEvents);
		    body += myEvents.map(
			function(evt){
			    var x = evt.x;
			    var y = evt.y;
			    var l = null;
			    if(evt.event == "up") l = "u";
			    if(evt.event == "down") l = "d";
			    var result = [];
			    result.push(++msgid + " x=" + (x^0));
			    result.push(msgid + " y=" + (y^0));
			    if(l)
				result.push(++msgid + " l=" + l);
			    return result.join("\n");
			}
		    ).join("\n");
		    mouseEvents = mouseEvents.slice(maxEvents);
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
app.listen(8086, () => console.log("started"));
