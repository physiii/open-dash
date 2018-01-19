var app = angular.module('app');

app.controller('SettingsController', function($scope,$location){
    $scope.back=function(){
        $location.path('dashboard');
    }
    $scope.goToSystemSettings = function(){
        $location.path('settings/system');
    }
    $scope.goToUpdateSettings = function(){
        $location.path('settings/update');
    }
    $scope.goToBluetooth = function(){
        $location.path('settings/bluetooth');
    }
    $scope.goToWifi = function(){
        $location.path('settings/wifi');
    }
});