var app = angular.module('app');
var remote = require('../server/modules/remote.js');
app.controller('RemoteController', function($scope,$rootScope,$location){
    $scope.back=function(){
        $location.path('/');
    }

    console.log($rootScope.remoteAddressInfo);
    $scope.connectRemote = function(ip){
        remote.connect(ip,null);
    }
});
