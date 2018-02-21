var app = angular.module('app');

app.controller('MediaController', function($scope,$location){
    $scope.back=function(){
        $location.path('/');
    }
    $scope.goToMusic = function(){
        $location.path('media/audio');
    }
    $scope.goToVideo = function(){
        $location.path('media/video');
    }
});