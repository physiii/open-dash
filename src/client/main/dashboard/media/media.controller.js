var app = angular.module('app');
var media = require('./server/modules/media.js');

app.controller('MediaController', function ($scope, $rootScope, $location, $timeout, AudioService) {
  $scope.audio = document.getElementById("audioTrack");
  $scope.playIcon = "play_arrow";
  $scope.songs=[];
    $scope.back = function () {
    $location.path('dashboard');
  };
  $scope.currentTime = 0;
  $scope.currentTimeCallback = function () {
    $timeout(function () {
      $scope.currentTime = AudioService.currentTime;
      $scope.currentTimeFormatted = $scope.formatTime($scope.currentTime);

    }, 0);
  };
  $scope.seekToPos = function () {
    AudioService.seekToPos($scope.currentTime);
  };
  AudioService.setTimeCallback($scope.currentTimeCallback);
  $scope.formatTime = function (t) {
    if (t <= 0) return "00:00";
    var hours = Math.floor(t / 3600);
    var min = Math.floor((t - hours * 3600) / 60);
    var sec = Math.floor(t - hours * 3600 - min * 60);
    var hoursStr = "";
    var minStr = "";
    var secStr = "";
    if (!hours) hoursStr = "";
    else hoursStr = hours;
    if (hours && !min) minStr = "00";
    else if (min < 10) minStr = "0" + min;
    else minStr = min;
    if ((hours || min) && !sec) secStr = "00";
    else if (sec < 10) secStr = "0" + sec;
    else secStr = sec;
    if (hoursStr) return `${hoursStr}:${minStr}:${secStr}`;
    else return `${minStr}:${secStr}`;
  }

  $scope.getAudioState = function () {
    AudioService.getAudioState().then(function () {
      $timeout(function () {
        $scope.duration = AudioService.duration;
        $scope.playList = AudioService.playList;
        $scope.currentIndex = AudioService.currentIndex;
        $scope.currentTime = AudioService.currentTime || 0;

        $scope.songs = $scope.playList.map(function (song, idx) {
          return { song: song, selected: idx === $scope.currentIndex };
        });
        $scope.durationFormatted = $scope.formatTime($scope.duration);

        $scope.audioDir = AudioService.audioDir;
        $scope.playing = AudioService.playing;
        if ($scope.playing) {
          $scope.playIcon = "pause";
        } else {
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
    $scope.getAudioState();
  };
});