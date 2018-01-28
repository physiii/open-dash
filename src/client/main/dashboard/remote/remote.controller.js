var app = angular.module('app');
var remote = require('../server/modules/remote.js');
app.controller('RemoteController', function($scope,$rootScope,$location,$timeout){
    $scope.back=function(){
        $location.path('/');
    }

    $scope.toggleIp = remote.autoConnectEnabled;
 
    $scope.connectRemote = function(ip){
        remote.connect(ip,null);
    }
    $scope.runScan = function(ip){
        remote.connect(ip,null);
    }
    $scope.autoConnectLocalIp = function(details){
       remote.setAutoConnect($scope.toggleIp);
    };
    $scope.manualRun = function(){
        remote.runScan().then(function (list) {
            $rootScope.remoteAddressInfo = list;
            $rootScope.$apply();
        });
    }
});
