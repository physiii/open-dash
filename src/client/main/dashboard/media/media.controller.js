var app = angular.module('app');
var media = require('./server/modules/media.js');

app.controller('MediaController', function ($scope, $rootScope, $location, $timeout, AudioService) {
  $scope.audio = document.getElementById("audioTrack");
  $scope.playIcon = "play_arrow";

  $scope.back = function () {
    $location.path('dashboard');
  };

  $scope.getAudioState = function (initial) {
    AudioService.getAudioState().then(function () {
      $timeout(function () {
        $scope.duration = AudioService.duration;
        $scope.playList = AudioService.playList;
        $scope.audioDir = AudioService.audioDir;
        $scope.playing = AudioService.playing;
        console.log("PLAYING = "+$scope.playing);
        if(!initial) $scope.currentIndex = AudioService.currentIndex;
        if ($scope.playing) {
          $scope.playIcon = "pause";
      }else{
          $scope.playIcon = "play_arrow";
        }
      }, 100);
    });
  }

  $scope.back = function () {
    $location.path('dashboard');
  };

  $scope.playMedia = function () {
    AudioService.playMedia().then(function () {
      $scope.getAudioState();
    });
  };

  $scope.skipPrevious = function () {
    AudioService.skipPrevious().then(function () {
      $scope.getAudioState();
    });
  };

  $scope.skipNext = function () {
    AudioService.skipNext().then(function () {
      $scope.getAudioState();
    });
  };

  $scope.playSong = function (idx) {
    AudioService.playSong(idx).then(function () {
      $scope.getAudioState();
    });
  };

  $scope.onload = function () {
    $scope.getAudioState(true);
  };
});