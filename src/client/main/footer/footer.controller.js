var app = angular.module('app');
var speakers = require('../server/devices/speakers');

app.controller('FooterController', function($scope,$location){
    $scope.showVolumeSlider = false;
    $scope.showVolume=function(val){
        $scope.showVolumeSlider = !val;
    }
    $scope.raiseVolume =function(){
        speakers.raiseVolume();
    }
});
