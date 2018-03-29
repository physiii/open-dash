var app = angular.module('app');
var gui = require('nw.gui');
var win = gui.Window.get();
app.controller('SettingsController', function($scope,$location){
    $scope.back=function(){
        $location.path('/');
    }
    $scope.goToApps = function () {
        $location.path("apps");
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
    $scope.minimize = function(){
        win.minimize();
    }
});