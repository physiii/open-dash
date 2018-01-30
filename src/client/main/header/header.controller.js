
var app = angular.module('app');
app.controller('HeaderController', function($scope,$location){
    $scope.showDashboard=function(){
        $location.path('/');
    }
});