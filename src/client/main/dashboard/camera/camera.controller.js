var app = angular.module('app');
var camera = require('./server/devices/camera.js');

app.controller('CameraController', function ($scope, $rootScope, $location, $timeout) {

  var canvas = document.getElementById('video-canvas');
  camera.start_ffmpeg();
  var url = 'ws://127.0.0.1:8082/';
  var player = new JSMpeg.Player(url, {canvas: canvas});
  $scope.$on('$destroy', function () {
    console.log("Exit Camera Page");
    camera.stop_ffmpeg();
  });
});
