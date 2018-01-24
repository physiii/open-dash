var app = angular.module('app');

app.controller('MediaController', function ($scope, $rootScope, $location) {

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
    var button = document.getElementById("playButton");
    button.innerHTML = "pause";
  });
  $scope.$on("audio-pause", function (currentIndex) {
    var button = document.getElementById("playButton");
    button.innerHTML = "play_arrow";
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