var app = angular.module('app');

app.controller('RemoteController', function($scope,$location){
    $scope.back=function(){
        $location.path('dashboard');
    }
});