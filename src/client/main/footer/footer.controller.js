var app = angular.module('app');
var speakers = require('../server/devices/speakers.js');
app.controller('FooterController', function($scope,$location){
    $scope.showDashboard=function(){
        $location.path('/');
    }
    $scope.showRemote=function(){
        $location.path('remote');
    }
    $scope.raiseVolume =function(){
        speakers.raiseVolume();
    }
    $scope.lowerVolume=function () {
        speakers.lowerVolume();

    }
});