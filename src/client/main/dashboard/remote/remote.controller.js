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
    $scope.autoConnectLocalIp = function(value){
	$rootScope.autoconnect_enabled = !value;
	$scope.autoconnect_enabled = !value;
        remote.setAutoConnect(!value);
	console.log("set autoconnect_enabled to",!value);
       /*if(details.toggleIp){
           remote.set_autoconnect_device(details.local_ip);
       }*/
    };
    $scope.manualRun = function(){
        remote.runScan().then(function (list) {
            $rootScope.remoteAddressInfo = list;
            $rootScope.$apply();
        });
    }
});
