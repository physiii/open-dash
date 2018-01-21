var app = angular.module('app');

app.controller('UpdateController', function($scope,$location){
    $scope.back=function(){
        $location.path('settings');
    }
});