var app = angular.module('app');
var remote = require('./server/modules/remote.js');
app.controller('RemoteController', function($scope,$rootScope,$location,$timeout){
    $scope.back=function(){
        $location.path('/');
    }

    $scope.toggleIp = remote.autoConnectEnabled;
    $rootScope.autoconnect_enabled =  true;
 
    $scope.connectRemote = function(ip){
        remote.connect(ip,null);
    }
    $scope.runScan = function(ip){
        remote.connect(ip,null);
    }
    $scope.autoConnectLocalIp = function(value){
        remote.setAutoConnect(value);
    };
    $scope.manualRun = function(){
        remote.runScan().then(function (list) {
            $rootScope.remoteAddressInfo = list;
            $rootScope.$apply();
        });
    }
});
