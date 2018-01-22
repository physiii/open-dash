var app = angular.module('app');
<<<<<<< HEAD
var speakers = require('../server/devices/speakers.js');
=======
var speakers = require('../server/devices/speakers');
>>>>>>> 20448e2f441aba24119c5dce62d00bfa77d647e0

app.controller('FooterController', function($scope,$location){
    $scope.showVolumeSlider = false;
    $scope.showVolume=function(val){
        $scope.showVolumeSlider = !val;
    }
    $scope.raiseVolume =function(){
        speakers.raiseVolume();
    }
});
