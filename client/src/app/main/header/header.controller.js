var app = angular.module('app');

app.controller('HeaderController', function($scope,$location){
    $scope.back=function(){
        $location.path('/');
    }
});