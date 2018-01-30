var app = angular.module('app');
var media = require('../server/modules/media.js');

app.controller('MediaController', function ($scope, $rootScope, $location, $timeout) {
  $scope.playIcon = "play_arrow";
  $scope.audio = document.getElementById("audioTrack");

  $scope.back = function () {
    $location.path('dashboard');
  };

  $scope.playMedia = function () {
      if (!$scope.audioFiles) {
          var dir = "../../../media/music";
          media.getAudioFiles(dir).then(function (files) {
              $scope.playList = files;
              $scope.audioDir = dir;
              var audioFiles = files.map(function (file) {
                  return path.join(dir, file);
              });
              $scope.audioFiles = audioFiles;
              $scope.playPauseAudio();
          });
      } else {
          $scope.playPauseAudio();
      }
      if ($scope.audio && !$scope.audio.paused) {
          $scope.playIcon = "pause";
      }else{
          $scope.playIcon = "play_arrow";
      }
  };

  $scope.playPauseAudio =function() {
    if (!$scope.audio) {
        if (!audio.src) {
            audio.src = $scope.audioFiles[0];
            $scope.currentIndex = 0;
        }
        $scope.audio.load();
        $scope.audio .addEventListener("loadedmetadata", function (metadata) {
            $scope.duration = audio.duration;
        });
        $scope.audio .addEventListener("timeupdate", function (metadata) {
            $scope.currentTime = audio.currentTime;
        });
    }
    if ($scope.audio.paused) {
        $scope.audio.play();
    } else {
        $scope.audio.pause();
    }
  };

  $scope.skipPrevious = function () {
      if (!$scope.audioFiles)
          return;

      if ($scope.currentIndex > 0) {
          var audioPaused = $scope.audio.paused;
          $scope.currentIndex -= 1;
          $scope.audio.src = $scope.audioFiles[$scope.currentIndex];
          $scope.audio.load();

          if (!audioPaused)
              $scope.audio.play();

          $scope.audioChange($scope.currentIndex);
      }
  };

  $scope.skipNext = function () {
      if (!$scope.audioFiles)
          return;
      if ($scope.currentIndex < $scope.audioFiles.length - 1) {
          var audioPaused = $scope.audio.paused;
          $scope.currentIndex += 1;
          $scope.audio.src = $scope.audioFiles[$scope.currentIndex];
          $scope.audio.load();

          if (!audioPaused)
              $scope.audio.play();

          $scope.audioChange($scope.currentIndex);
      }
  };

  $scope.playSong = function (idx) {
      if (!$scope.audioFiles)
          return;
      if (idx >= 0 && idx < $scope.audioFiles.length ) {
          var audioPaused = $scope.audio.paused;
          $scope.audio.src = $scope.audioFiles[idx];
          $scope.audio.load();
          $scope.currentIndex = idx;
          if (!audioPaused)
              $scope.audio.play();

         $scope.audioChange(idx);
      }
  };

  $scope.audioChange = function(idx){

  };

  $scope.onload = function(){
      var dir="";
      if (dir) {
          dir = path.join("../../..", dir);
      } else {
          dir = "../../../media/music";
      }
      var dirChanged = $scope.audioDir != dir;
      if (dirChanged || !$scope.audioFiles || !$scope.audioFiles.length) {
          media.getAudioFiles(dir).then(function (files) {
              $scope.playList = files;
              $scope.audioDir = dir;
              var audioFiles = files.map(function (file) {
                  return path.join(dir, file);
              });
              $scope.audioFiles = audioFiles;
          });
      } else {
          $scope.playList=files;
      }
  };
});