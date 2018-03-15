var app = angular.module('app');
var speakers = require('./server/devices/speakers.js');
app.controller('FooterController', function ($scope, $location, $timeout) {
  $scope.volumeStatus = "volume_off";
  showMuteStatus();
  $scope.showRemote = function () {
    $location.path('remote');
  }
  $scope.raiseVolume = function () {
    speakers.raiseVolume();
  }
  $scope.lowerVolume = function () {
    speakers.lowerVolume();

  }
  function showMuteStatus() {
    speakers.getMuted().then((status) => {
      $timeout(function () {
        if (status) $scope.volumeStatus = "volume_up";
        else $scope.volumeStatus = "volume_off";
      }, 10);
    });
  }
  $scope.mute = function () {
    if ($scope.volumeStatus == "volume_off") {
      speakers.muteXdoTool().then(() => {
        showMuteStatus();
      });
    } else {
      speakers.setMuted(false).then(() => {
        showMuteStatus();
      });
    }

  }
});