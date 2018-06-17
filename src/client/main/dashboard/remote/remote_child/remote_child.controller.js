var app = angular.module('app');
app.controller('RemoteChildController', function($scope,$rootScope,$location,$timeout){
    $scope.mousePointerCheck = function(event){
        $scope.xPosition=event.offsetX;
        $scope.yPosition=event.offsetY;
    }
});
