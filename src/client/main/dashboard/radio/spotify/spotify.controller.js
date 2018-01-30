var app = angular.module('app');

app.controller('SpotifyController', function($scope,$location){
    $scope.back=function(){
        $location.path('radio');
    }
});