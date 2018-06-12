const speakers = require('./server/devices/speakers.js');

angular.module('app').controller('FooterController', function ($scope, $location, $timeout) {
  function setMutedState (is_muted) {
    $scope.mute_icon = is_muted ? 'volume_up' : 'volume_off';
  }

  speakers.getMuted().then(setMutedState);

  $scope.showRemote = function () {
    $location.path('remote');
  }

  $scope.mute = () => {
    speakers.toggleMuted().then(setMutedState);
  }

  $scope.raiseVolume = speakers.raiseVolume;
  $scope.lowerVolume = speakers.lowerVolume;
});