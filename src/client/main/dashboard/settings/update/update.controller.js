var app = angular.module('app');
var update=require('../system/update.js')

app.controller('UpdateController', function($scope,$location){
    $scope.back=function(){
        $location.path('settings');
    }
});
