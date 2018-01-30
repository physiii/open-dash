var app = angular.module('app');

app.controller('PandoraController', function($scope,$location){
    $scope.back=function(){
        $location.path('radio');
    }
});