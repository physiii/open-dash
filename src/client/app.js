'use strict';
var media = require('./server/modules/media.js');
var remote = require('./server/modules/remote.js');
var wifi = require('./server/devices/wifi.js');
var mddCapture = require("./server/mdd-capture.js");
var path = require('path');
var http = require("http");
const EventEmitter = require("events");

var app = angular.module('app', ['ngRoute','ngMaterial','ngMessages']);
app.config(function ($routeProvider, $mdThemingProvider) {
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
    when('/radio/pandora/playlist',{
        templateUrl: 'main/dashboard/radio/pandora/playlist.html',
        controller: 'PlaylistController'
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

    // AngularJS Material Config
    var dashBlue = $mdThemingProvider.extendPalette('blue', {
        '500': '#005f9e',
        'contrastDefaultColor': 'dark'
    });

    var dashCyan = $mdThemingProvider.extendPalette('cyan', {
        'A200': '#63feff',
        'contrastDefaultColor': 'dark'
    });

    $mdThemingProvider.definePalette('dashBlue', dashBlue);
    $mdThemingProvider.definePalette('dashCyan', dashCyan);

    $mdThemingProvider.theme('default')
        .primaryPalette('dashBlue', {
            'default': '500'
        })
        .accentPalette('dashCyan', {
            'default': 'A200'
        });
})
    .run(['$rootScope', '$location', ($rootScope, $location) => {
        // Launch wireless access point for MDD.
        wifi.ap_connect();

        // Listen for screenshots from MDD.
        mddCapture.app.listen(8086); // port is hard-coded on MDD

        $rootScope.$watch('remoteDeviceConnected', (isConected) => {
            if (isConected) {
                $location.path('/remote');
            } else if ($location.path().split('/')[1] === 'remote') {
                $location.path('/');
            }
        }, true);

        wifi.events.on('connected', () => {
            $rootScope.$apply(() => $rootScope.remoteDeviceConnected = true);
        });
        wifi.events.on('disconnected', () => {
            $rootScope.$apply(() => $rootScope.remoteDeviceConnected = false);
        });
    }])
    .run(['$rootScope', '$location',
        function ($rootScope, $location) {
            $rootScope.$on('$routeChangeSuccess', function () {
                $rootScope.dashBoardHeader = false;
                var headerNames = {
                    "/remote": "Remote",
                    "/navigation": "Navigation",
                    "/media": "Media",
                    "/settings": "Settings",
                    "/radio": "Radio",
                    "/radio/Pandora": "Pandora",
                    "/radio/Pandora/playlist": "Pandora",
                    "/settings/bluetooth": "Bluetooth Connections",
                    "/settings/wifi": "Wifi Connections",
                    "/settings/system": "System Settings",
                    "/can": "Can",
                    "/camera": "Camera",
                    "/remote/remote_child": "Remote Child"
                };

                if ($location.path() in headerNames) {
                    $rootScope.headerName = headerNames[$location.path()];
                } else {
                    $rootScope.dashBoardHeader = true;
                    $rootScope.headerName ='';
                }
                $rootScope.mainPage = $location.path() == '/';
            });
        }
    ]);
