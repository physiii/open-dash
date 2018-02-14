var app = angular.module('app');

app.controller('AmfmController', function($scope,$location){
    $scope.back=function(){
        $location.path('radio');
    }
});