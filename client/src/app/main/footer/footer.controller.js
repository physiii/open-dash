var app = angular.module('app');

app.controller('FooterController', function($scope,$location){
    $scope.showVolumeSlider = false;
    $scope.showVolume=function(val){
        $scope.showVolumeSlider = !val;
    }
    $scope.raiseVolume =function(){
        raiseVolume();
    }
});