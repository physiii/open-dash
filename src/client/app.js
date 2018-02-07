'use strict';
var media = require('./server/modules/media.js');
var remote = require('./server/modules/remote.js');
var path = require('path');

var app = angular.module('app', ['ngRoute','ngMaterial','ngMessages']);
app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'main/dashboard/dashboard.html',
        controller: 'DashboardController'
    }).
    when('/apps', {
        templateUrl: 'main/dashboard/apps/apps.html',
        controller: 'AppsController'
    }).
    when('/media', {
        templateUrl: 'main/dashboard/media/media.html',
        controller: 'MediaController'
    }).
    when('/settings', {
        templateUrl: 'main/dashboard/settings/settings.html',
        controller: 'SettingsController'
    }).
    when('/settings/system', {
        templateUrl: 'main/dashboard/settings/system/system.html',
        controller: 'SystemController'
    }).
    when('/settings/update', {
        templateUrl: 'main/dashboard/settings/update/update.html',
        controller: 'UpdateController'
    }).
    when('/settings/bluetooth', {
        templateUrl: 'main/dashboard/settings/bluetooth/bluetooth.html',
        controller: 'BluetoothController'
    }).
    when('/settings/wifi', {
        templateUrl: 'main/dashboard/settings/wifi/wifi.html',
        controller: 'WifiController'
    }).
    when('/remote', {
        templateUrl: 'main/dashboard/remote/remote.html',
        controller: 'RemoteController'
    }).
    when('/media', {
        templateUrl: 'main/dashboard/media/media.html',
        controller: 'MediaController'
    }).
    when('/radio',{
        templateUrl: 'main/dashboard/radio/radio.html',
        controller: 'RadioController'
    }).
    when('/radio/amfm',{
        templateUrl: 'main/dashboard/radio/amfm/amfm.html',
        controller: 'AmfmController'
    }).
    when('/radio/pandora',{
        templateUrl: 'main/dashboard/radio/pandora/pandora.html',
        controller: 'PandoraController'
    }).
    when('/radio/spotify',{
        templateUrl: 'main/dashboard/radio/spotify/spotify.html',
        controller: 'SpotifyController'
    }).
    when('/navigation',{
        templateUrl: 'main/dashboard/navigation/navigation.html',
        controller: 'NavigationController'
    }).
    otherwise({
        redirectTo: '/'
    });
})
    .run([ '$rootScope', '$location', '$interval', '$timeout',
        function ($rootScope, $location, $interval, $timeout) {
            socketProcessIO.on("device-list", function(list) {
               $timeout(function() {
                  $rootScope.remoteAddressInfo = list;
               }, 100);
            });
            $interval(function () {
                $rootScope.autoconnect_enabled = true;
                remote.runScan().then(function (list) {
                    $rootScope.remoteAddressInfo = list;
                    for (var i = 0; i < list.length; i++) {
                        if ( list[i].device === "Hand Held Products") {
                            if (!$rootScope.autoconnect_enabled)
                                return console.log("autoconnect is disabled");
                            remote.connectIfNotConnected(list[i].local_ip, null);
                            $location.path("remote");
                        }
                    }
                });
                remote.getMDD().then(function (response) {
                    if(response){

                    }else {
                        $location.path('/');
                    }
                });
            },2000);
            $rootScope.$on('$routeChangeSuccess',function () {
                $rootScope.dashBoardHeader = false;
                if($location.path() == '/remote'){
                    $rootScope.headerName ='Remote Connections';
                }else if($location.path() == '/navigation'){
                    $rootScope.headerName ='Navigation';
                }else if($location.path() == '/media'){
                    $rootScope.headerName = 'Media';
                }else if($location.path() == '/settings'){
                    $rootScope.headerName ='Settings';
                }else if($location.path() == '/radio'){
                    $rootScope.headerName ='Radio';
                }else if($location.path() == '/settings/bluetooth'){
                    $rootScope.headerName ='Bluetooth Connections';
                }else if($location.path() == '/settings/wifi'){
                    $rootScope.headerName ='Wifi Connections';
                }else if($location.path() == '/settings/system'){
                    $rootScope.headerName ='System Settings';
                }else if($location.path() == '/settings/update'){
                    $rootScope.headerName ='Software Upgrades';
                }else{
                    $rootScope.dashBoardHeader = true;
                    $rootScope.headerName ='';
                }
                if($location.path() == '/'){
                    $rootScope.mainPage = true;
                }else{
                    $rootScope.mainPage = false;
                }
            });
        }
    ]);
