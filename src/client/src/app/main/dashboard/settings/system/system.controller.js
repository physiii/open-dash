var app = angular.module('app');

app.controller('SystemController', function($scope,$location){
    $scope.back=function(){
        $location.path('settings');
    }
});