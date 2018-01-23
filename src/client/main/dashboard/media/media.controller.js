var app = angular.module('app');

app.controller('MediaController', function ($scope, $location) {

  $scope.back = function () {
    $location.path('dashboard');
  }
  $scope.playMedia = function () {
    var audio = document.getElementById("audioTrack");
    if (!$scope.audio) {
      $scope.audio = audio;
      $scope.audio.load();
    }
    var button = document.getElementById("playButton");
    audio.addEventListener('loadedmetadata', function (metadata) {
      console.log("duration=", audio.duration);
    });
    if (audio.paused) {
      audio.play();
      button.innerHTML = "pause";
    }
    else {
      audio.pause();
      button.innerHTML = "play_arrow";
    }
  }
});