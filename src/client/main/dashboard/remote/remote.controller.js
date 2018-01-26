var app = angular.module('app');
var remote = require('../server/modules/remote.js');
app.controller('RemoteController', function($scope,$rootScope,$location){
    $scope.back=function(){
        $location.path('/');
    }

    $scope.connectRemote = function(ip){
        remote.connect(ip,null);
    }
    $scope.autoConnectLocalIp = function(details){
       if(details.toggleIp){
           remote.set_autoconnect_device(details.local_ip);
       }
    };
});
