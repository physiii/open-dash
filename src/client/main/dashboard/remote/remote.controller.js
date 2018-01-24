var app = angular.module('app');
var remote = require('../server/modules/remote.js');
app.controller('RemoteController', function($scope,$location){
    $scope.back=function(){
        $location.path('/');
    }
    $scope.remoteAddressInfo =[
        {
            local_IP:"10.10.10.10",
            hostname:"hostname1",
            networkName : 'NetworkId1',
            networkId:'00:00:00:00'

        },
        {
            local_IP:"10.10.10.11",
            hostname:"hostname2",
            networkName : 'NetworkId1',
            networkId:'00:00:00:00'
        },
        {
            local_IP:"10.10.10.10",
            hostname:"hostname1",
            networkName : 'NetworkId1',
            networkId:'00:00:00:00'
        },
        {
            local_IP:"10.10.10.11",
            hostname:"hostname2",
            networkName : 'NetworkId1',
            networkId:'00:00:00:00'
        }
    ]
    $scope.connectRemote = function(ip){
        remote.connect(ip,null);
    }
});
