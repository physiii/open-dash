var app = angular.module('app');

app.controller('MediaController', function ($scope, $rootScope, $location, $timeout) {

  $scope.playIcon = "play_arrow";
  if ($rootScope.audio && !$rootScope.audio.paused) {
    $scope.playIcon = "pause";
  }
  $scope.back = function () {
    $location.path('dashboard');
  }
  $scope.$on("audio-file-list", function (list) {
    $scope.audioFiles = list;
  });
  $scope.$on("audio-duration", function (duration) {
    $scope.duration = duration;
  });
  $scope.$on("audio-timechanged", function (currentTime) {
    $scope.currentTime = currentTime;
  });
  $scope.$on("audio-changed", function (currentIndex) {
    $scope.currentIndex = currentIndex;
  });
  $scope.$on("audio-play", function (currentIndex) {
    $timeout(function () {
      $scope.playIcon = "pause";
    }, 500);
  });
  $scope.$on("audio-pause", function (currentIndex) {
    $timeout(function () {
      $scope.playIcon = "play_arrow";
    }, 500);
  });
  $scope.playMedia = function () {
    $scope.$emit('play-audio');
    
  }
  $scope.skipPrevious = function () {
    $scope.$emit("audio-skip-previous");
    
  }
  $scope.skipNext = function () {
    $scope.$emit("audio-skip-next");
  }
});