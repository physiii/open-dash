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
    $scope.remoteChild = function () {
        $location.path('/remote/remote_child');
    }
    $scope.manualRun = function(){
console.log("DEPRECATION WARNING");
return; // DEPRECATE THIS
        remote.runScan().then(function (list) {
            $timeout(function() {
              $rootScope.remoteAddressInfo = list;
            }, 500);
        });
    }
});
