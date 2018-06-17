const wifi = require('./server/devices/wifi.js');

var app = angular.module('app');
var gui = require('nw.gui');

function listenVersion($scope, $timeout, socketProcessIO){
  socketProcessIO.on("version", function (version) {

   $timeout(function() {
     $scope.version=version;
   }, 10);

  });
    $scope.version = "checking...";
  socketProcessIO.emit("get-version");
}

app.controller(
	'SystemController',
	function ($scope, $location, $timeout, socketProcessIO) {
  $scope.rebooting = false;
  $scope.shuttingDown = false;
  $scope.updating = false;
  $scope.version = "";

  $scope.rebootStatus = "Reboot";
  $scope.shutdownStatus = "Shutdown";
  $scope.updateStatus = "";
  socketProcessIO.on("updated", function (data) {
    if (data === true) {
      console.log("Updated the app, restarting");
      $scope.restartApp();
    } else {
       $timeout(function() {
         $scope.updateStatus=data;
       }, 10);
      console.log(data);
    }
  });
  socketProcessIO.on("update-failure", function (err) {

     $timeout(function() {
       $scope.updateStatus=err;
     }, 10);
     console.log(err);

  });

	    listenVersion($scope, $timeout, socketProcessIO);

  $scope.back = function () {
    $location.path('settings');
  }
  $scope.restartApp = function () {
    socketProcessIO.emit("restart","");
    //chrome.runtime.reload();
  }
  $scope.quitApp = function () {
    socketProcessIO.emit("quit", "");
    //gui.App.quit();
  }
  $scope.reboot = function () {
    $timeout(function () {
      if (!$scope.rebooting) {
        $scope.rebooting = true;
        $scope.rebootStatus = "Cancel Reboot";
        socketProcessIO.emit("reboot", "");
      } else {
        $scope.rebooting = false;
        $scope.rebootStatus = "Reboot";
        socketProcessIO.emit("cancel-reboot", "");
      }

    }, 500);
  }
  $scope.shutdown = function () {
    $timeout(function () {
      if (!$scope.shuttingDown) {
        $scope.shuttingDown = true;
        $scope.shutdownStatus = "Cancel Shutdown";
        socketProcessIO.emit("shutdown", "");
      } else {
        $scope.shuttingDown = false;
        $scope.shutdownStatus = "Shutdown";
        socketProcessIO.emit("cancel-shutdown", "");
      }

    }, 500);
  }
  $scope.update = function () {
    $timeout(function () {
      socketProcessIO.emit("update", "");
      $scope.updating = true;

    }, 500);
  }
		$scope.goToDeviceInfo = function(){
		    $location.path("/settings/system/device-info/");
		};
	}
);

var device_info = {
	mac: "unknown",
	localip: "unknown",
	pubip: "unknown"
	, interfaces: null
};
wifi.listen(
	"ip",
	function(nic, addr){
		if(nic == wifi.metadata.ap)
			device_info.localip = addr;
	}
);
if(wifi.metadata.ap in wifi.metadata.ip)
	device_info.localip = wifi.metadata.ip[wifi.metadata.ap];
wifi.listen(
    "network interfaces",
    function(interfaces){
	device_info.interfaces = interfaces;
    }
);
wifi.promiseUnderlyingMac.then(
	function(mac){
		device_info.mac = mac;
	}
);
function lookupPublicIpAddress(){
	$.get(
		"https://api.ipify.org/",
		function(ip){
			device_info.pubip = ip;
		}
	);
}
lookupPublicIpAddress();
app.controller(
	'DeviceInfoController',
	function ($scope, $location, $timeout) {
	    $scope.back = function(){
		$location.path("/settings/system/");
	    };
		lookupPublicIpAddress();
		$scope.devinfo = device_info;
		var that = this;
		that.devinfo = device_info;
	    function updateScope(){
			lookupPublicIpAddress();
		$scope.devinfo = null;
		$scope.devinfo = device_info;
		that.devinfo = device_info;
		if(null != device_info.interfaces)
		    device_info.ipV4s = Object.keys(device_info.interfaces).map(
			function(key){
			    return [
				key,
				device_info.interfaces[key].filter(
				    function(addr){
					return "IPv4" == addr.family;
				    }
				)
			    ];
			}
		    ).filter(
			function(kv){
			    return kv[1].length;
			}
		    ).map(
			function(kv){
			    return {
				"name": kv[0],
				"address": kv[1][0].address
			    };
			}
		    );
	    }
	    wifi.listen(
		"hardware address",
		updateScope
	    );
	    wifi.listen(
		"network interfaces",
		updateScope
	    );
	    $scope.version = "unknown";
	    listenVersion($scope, $timeout);
	    wifi.listen(
		"ip",
		function(){
		    that.devinfo = null;
		    that.devinfo = device_info;
		    $timeout(
			function(){
			    that.devinfo = null;
			    updateScope();
			},
			10
		    );
		}
	    );
	}
);
