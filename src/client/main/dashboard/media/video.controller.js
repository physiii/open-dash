var app = angular.module('app');
var media = require('./server/modules/media.js');

app.controller('VideoController', function ($scope, $rootScope, $location, $timeout, VideoService) {
  $scope.video = document.getElementById("videoTrack");
  $scope.playIcon = "play_arrow";
  $scope.videos=[];
    $scope.back = function () {
    $location.path('/media');
  };
  $scope.currentTime = 0;
  $scope.currentTimeCallback = function () {
    $timeout(function () {
      $scope.currentTime = VideoService.currentTime;
      $scope.currentTimeFormatted = $scope.formatTime($scope.currentTime);
      $scope.playing = VideoService.playing;
      if ($scope.playing) {
        $scope.playIcon = "pause";
      } else {
        $scope.playIcon = "play_arrow";
      }
    }, 0);
  };
  $scope.seekToPos = function () {
    VideoService.seekToPos($scope.currentTime);
  };
  VideoService.setTimeCallback($scope.currentTimeCallback);
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

  $scope.getVideoState = function () {
    VideoService.getVideoState().then(function () {
      $timeout(function () {
        $scope.duration = VideoService.duration;
        $scope.playList = VideoService.playList;
        $scope.currentIndex = VideoService.currentIndex;
        $scope.currentTime = VideoService.currentTime || 0;

        $scope.videos = $scope.playList.map(function (video, idx) {
          return { video: video, selected: idx === $scope.currentIndex };
        });
        $scope.durationFormatted = $scope.formatTime($scope.duration);

        $scope.videoDir = VideoService.videoDir;
        $scope.playing = VideoService.playing;
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
    VideoService.playMedia().then(function () {
      $scope.getVideoState();
    });
  };

  $scope.skipPrevious = function () {
    VideoService.skipPrevious().then(function () {
      $scope.getVideoState();
    });
  };

  $scope.skipNext = function () {
    VideoService.skipNext().then(function () {
      $scope.getVideoState();
    });
  };

  $scope.playVideo = function (idx) {
    VideoService.playVideo(idx).then(function () {
      $scope.getVideoState();
    });
  };

  $scope.onload = function () {
    $scope.getVideoState();
  };
});
