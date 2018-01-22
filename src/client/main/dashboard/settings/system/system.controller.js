var app = angular.module('app');
var system = require('../system/system.js')

app.controller('SystemController', function($scope,$location){
    $scope.back=function(){
        $location.path('settings');
    }
});
