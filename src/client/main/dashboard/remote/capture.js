$(
    function(){
	var mddApiEndpoint = "http://127.0.0.1:8086/mdd";
	function runEveryFrame(f){
		requestAnimationFrame(function(){runEveryFrame(f);});
		f();
	}
	runEveryFrame(
	    function(){
		$.get(
		    mddApiEndpoint + "/clientLives/",
		    function(body){
			var live = JSON.parse(body);
			$(
			    "#" + (live ? "apology" : "screenshot")
			).addClass("hideme");
			$(
			    "#" + (!live ? "apology" : "screenshot")
			).removeClass("hideme");
		    }
		);
	    }
	);
	function sendMouseEvent(target, name, evt){
	    evt.preventDefault();
	    var x = evt.offsetX / target.width * 480;
	    var y = evt.offsetY / target.height * 640;
	    $.post(
		mddApiEndpoint + "/mouse",
		JSON.stringify(
		    {
			event: name,
			x: x,
			y: y
		    }
		)
	    );
	}
	"down up move".split(" ").map(
	    function(key){
		return $("#screenshot")["mouse" + key](
		    function(evt){
			return sendMouseEvent(
			    this,
			    key,
			    evt
			);
		    }
		);
	    }
	);
    }
);
