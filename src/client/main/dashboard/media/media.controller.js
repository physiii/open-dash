var app = angular.module('app');
var media = require('./server/modules/media.js');

app.controller('MediaController', function ($scope, $rootScope, $location, $timeout, AudioService) {
  $scope.audio = document.getElementById("audioTrack");
  $scope.playIcon = "play_arrow";
  $scope.songs=[];
    $scope.back = function () {
    $location.path('dashboard');
  };

  $scope.getAudioState = function (initial,index) {
    AudioService.getAudioState().then(function () {
      $timeout(function () {
        $scope.duration = AudioService.duration;
        $scope.playList = AudioService.playList;
        $scope.songs=[];
        for(var i=0;i<$scope.playList.length;i++){
          $scope.songs.push({song: $scope.playList[i],selected:false});
        }
        $scope.audioDir = AudioService.audioDir;
        $scope.playing = AudioService.playing;
        if(!initial)
          $scope.currentIndex = AudioService.currentIndex;
        for(var i=0;i<$scope.songs.length;i++){
            if(index === i){
                $scope.songs[i].selected=true;
            }else{
                $scope.songs[i].selected= false;
            }
        }
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
      $scope.getAudioState(false,idx);
    });
  };

  $scope.onload = function () {
    $scope.getAudioState(true);
  };
});