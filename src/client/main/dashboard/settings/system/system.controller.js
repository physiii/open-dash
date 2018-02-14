var app = angular.module('app');
var gui = require('nw.gui');
app.controller('SystemController', function ($scope, $location, $timeout) {
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
  socketProcessIO.on("version", function (version) {

   $timeout(function() {
     $scope.version=version;
   }, 10);

  });
  socketProcessIO.emit("get-version");
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
});
