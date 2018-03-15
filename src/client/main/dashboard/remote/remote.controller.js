var app = angular.module('app');
var remote = require('./server/modules/remote.js');

app.controller(
  'RemoteController',
  function($scope,$rootScope,$location,$timeout){
    $scope.back=function(){
        $location.path('/');
    }

      var that = this;
      that.jpgsrc = [
	  "data:image/gif;base64,",
	  "R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o",
	  "/XBs/fNwfjZ0frl3/zy7////w",
	  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
	  "CH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8h",
	  "BADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2h",
	  "B0SlBCBMQiB0UjIQA7"
      ].join("");
      function updateShowings(live){
	  that.showJpg = live ? "" : "hideme";
	  that.showApology = live ? "hideme" : "";
      }
      updateShowings(false);
      var jpg = $rootScope.screenSharingContext;
      jpg.changes.on(
	  "on",
	  function(){
	      updateShowings(true);
	  }
      );
      jpg.changes.on(
	  "off",
	  function(){
	      updateShowings(false);
	  }
      );
      jpg.jpgHole(
	  function(jpgBuf){
	      that.jpgsrc = "data:image/jpeg;base64," +
		  jpgBuf.toString("base64");
	      updateShowings(true);
	  }
      );
    $scope.toggleIp = remote.autoConnectEnabled;
    $rootScope.autoconnect_enabled =  true;

    $scope.connectRemote = function(ip){
        remote.connect(ip,null);
    }
    $scope.runScan = function(ip){
        remote.connect(ip,null);
    }
    $scope.autoConnectLocalIp = function(value){
        remote.setAutoConnect(value);
    };
    $scope.remoteChild = function () {
        $location.path('/remote/remote_child');
    }
    $scope.manualRun = function(){
console.log("DEPRECATION WARNING");
return; // DEPRECATE THIS
        remote.runScan().then(function (list) {
            $timeout(function() {
              $rootScope.remoteAddressInfo = list;
            }, 500);
        });
    }
  }
);
