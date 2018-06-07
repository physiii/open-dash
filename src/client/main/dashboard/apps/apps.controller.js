var app = angular.module('app');

app.controller('AppsController', function($scope,$location){
    $scope.back=function(){
        $location.path('dashboard');
    }
});