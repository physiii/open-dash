var app = angular.module('app');

app.controller('WifiController', function($scope,$location){
    $scope.back=function(){
        $location.path('settings');
    }
});