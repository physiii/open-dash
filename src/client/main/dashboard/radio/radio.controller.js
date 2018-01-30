var app = angular.module('app');

app.controller('RadioController', function($scope,$location){
    $scope.back=function(){
        $location.path('/');
    }
    $scope.goToRadio = function(){
        $location.path('radio/amfm');
    }
    $scope.goToSpotify = function(){
        $location.path('radio/spotify');
    }
    $scope.goToPandora = function(){
        $location.path('radio/pandora');
    }

});