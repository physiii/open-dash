var app = angular.module('app');

app.controller('BluetoothController', function($scope,$location){
    $scope.back=function(){
        $location.path('settings');
    }
});