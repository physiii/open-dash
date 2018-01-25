
var app = angular.module('app');

app.controller('DashboardController', function($scope,$location){
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
     $location.path("apps")
    }
    $scope.showRemote = function(){
        $location.path("remote")
    }
    $scope.showMedia = function(){
        $location.path("media")
    }
    $scope.showNavigation = function(){
        $location.path('navigation');
    }
});
