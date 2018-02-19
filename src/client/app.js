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
    when('/media/audio', {
        templateUrl: 'main/dashboard/media/audio.html',
        controller: 'AudioController'
    }).
    when('/media/video', {
        templateUrl: 'main/dashboard/media/video.html',
        controller: 'VideoController'
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
    when('/remote/remote_child', {
        templateUrl: 'main/dashboard/remote/remote_child/remote_child.html',
        controller: 'RemoteChildController'
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
    when('/can',{
        templateUrl: 'main/dashboard/can/can.html',
        controller: 'CanController'
    }).
    when('/camera',{
        templateUrl: 'main/dashboard/camera/camera.html',
        controller: 'CameraController'
    }).
    otherwise({
        redirectTo: '/'
    });
})
    .run([ '$rootScope', '$location', '$interval', '$timeout',
        function ($rootScope, $location, $interval, $timeout) {
            $interval(function () {
                $rootScope.autoconnect_enabled = true;
                remote.findIP().then(function(ip){return remote.runScan(ip)}).then(function (list) {
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
                       remote.mdd_WindowSet(response);
                    }else {
                        $location.path('/');
                    }
                });
            },2000);
            $rootScope.$on('$routeChangeSuccess',function () {
                $rootScope.dashBoardHeader = false;
                if($location.path() == '/remote'){
                    $rootScope.headerName ='Remote';
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
                }else if($location.path() == '/can'){
                        $rootScope.headerName ='Can';
                }else if($location.path() == '/camera'){
                    $rootScope.headerName ='Camera';
                }else if($location.path() == '/remote/remote_child'){
                    $rootScope.headerName ='Remote Child';
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
