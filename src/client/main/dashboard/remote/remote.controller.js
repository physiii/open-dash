var app = angular.module('app');

app.controller('RemoteController', function($scope,$location){
    $scope.back=function(){
        $location.path('/');
    }
    $scope.remoteAddressInfo =[
        {
            local_IP:"10.10.10.10",
            hostname:"hostname1"
        },
        {
            local_IP:"10.10.10.11",
            hostname:"hostname2"
        },
        {
            local_IP:"10.10.10.10",
            hostname:"hostname1"
        },
        {
            local_IP:"10.10.10.11",
            hostname:"hostname2"
        },
        {
            local_IP:"10.10.10.10",
            hostname:"hostname1"
        },


    ]
});