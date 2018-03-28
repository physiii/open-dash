
var app = angular.module('app');

app.controller('DashboardController', function($scope,$rootScope,$location){

    $scope.showNavigation = function() {
      console.log(os.platform());
    };
    $scope.showMedia = function() {
     $location.path("media");
    };
    $scope.showSettings = function(){
     $location.path("settings");
    }
    $scope.showApps = function(){
     $location.path("apps");
    }
    $scope.showRemote = function(){
        if ($scope.remoteDeviceConnected) {
            $location.path("remote");
        }
    }
    $scope.showMedia = function(){
        $location.path("media");
    }
    $scope.showNavigation = function(){
        $location.path('navigation');
    }
    $scope.showRadio = function(){
        $location.path('radio');
    }
    $scope.goToBluetooth = function(){
        $location.path('settings/bluetooth');
    }
    $scope.goToCan = function(){
        $location.path('can');
    }
    $scope.goToCamera = function(){
        $location.path('camera');
    }
});
