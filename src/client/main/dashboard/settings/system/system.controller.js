var app = angular.module('app');
var gui = require('nw.gui');
app.controller('SystemController', function ($scope, $location, $timeout) {
  $scope.rebooting = false;
  $scope.shuttingDown = false;
  $scope.updating = false;
    $scope.rebootStatus = "Reboot";
    $scope.shutdownStatus = "Shutdown";
    $scope.back=function(){
        $location.path('settings');
    }
    $scope.restartApp = function () {
      //socketProcessIO.emit("restart","");
      chrome.runtime.reload();
    }
    $scope.quitApp = function () {
      // socketProcessIO.emit("quit", "");
      gui.App.quit();
    }
    $scope.reboot = function () {
      $timeout(function () {
        if(!$scope.rebooting) {
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
        if(!$scope.shuttingDown) {
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
