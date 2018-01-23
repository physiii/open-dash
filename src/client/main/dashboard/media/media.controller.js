var app = angular.module('app');

app.controller('MediaController', function($scope,$location){
    $scope.back=function(){
        $location.path('/');
    }
});