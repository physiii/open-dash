var app = angular.module('app');
var player = require('../server/modules/player.js');

app.controller('MediaController', function ($scope, $location) {

  player.getAudioFiles("../../../media").then(function (files) {
    $scope.audioFiles = files.map(function (file) {
      return "../../media/" + file;
    });
    $scope.currentIndex = 0;
  });

  $scope.back = function () {
    $location.path('dashboard');
  }
  $scope.playMedia = function () {
    var audio = document.getElementById("audioTrack");
    if (!$scope.audio) {
      $scope.audio = audio;
      if (!audio.src) {
        audio.src = $scope.audioFiles[0];
        $scope.currentIndex = 0;
      }
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
  $scope.skipPrevious = function () {
    if ($scope.currentIndex > 0) {
      var audioPaused = $scope.audio.paused;
      $scope.currentIndex -= 1;
      $scope.audio.src = $scope.audioFiles[$scope.currentIndex];
      $scope.audio.load();
      if (!audioPaused) $scope.audio.play();
    }
  }
  $scope.skipNext = function () {
    if ($scope.currentIndex < ($scope.audioFiles.length - 1)) {
      var audioPaused = $scope.audio.paused;
      $scope.currentIndex += 1;
      $scope.audio.src = $scope.audioFiles[$scope.currentIndex];
      $scope.audio.load();
      if (!audioPaused) $scope.audio.play();
    }
  }
});