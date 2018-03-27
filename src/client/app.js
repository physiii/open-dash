'use strict';
var media = require('./server/modules/media.js');
var remote = require('./server/modules/remote.js');
var path = require('path');
var http = require("http");
var capture = require("./server/mdd-capture.js");
const EventEmitter = require("events");

capture.app.listen(8086); // port is hard-coded on MDD

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
})
    .run([ '$rootScope', '$location', '$interval', '$timeout',
        function ($rootScope, $location, $interval, $timeout) {
	    var jpg = {
		jpgLastUpdate: null,
		prevState: false,
		jpgTimeout: 1000 * 15,
		jpgHole: function(callback){
			capture.state.jpegs.on("jpg", callback);
		},
		navigate: null,
		changes: new EventEmitter()
	    };
	    jpg.changes.on(
		"on",
		function(){
		    console.log("screens are arriving");
		    jpg.navigate = "/remote";
		}
	    );
	    jpg.changes.on(
		"off",
		function(){
		    console.log("screens are not arriving");
		    jpg.navigate = "/";
		}
	    );
	    $rootScope.screenSharingContext = jpg;
	    capture.state.jpegs.on(
		"jpg",
		function(){
			function checkState(){
				var delta = new Date() - jpg.jpgLastUpdate;
				var on = delta < jpg.jpgTimeout;
				if(on == jpg.prevState) return;
				jpg.changes.emit("o" + (on ? "n" : "ff"));
				jpg.prevState = on;
			}
			jpg.jpgLastUpdate = new Date();
			setTimeout(checkState, jpg.jpgTimeout - 1);
			setTimeout(checkState, jpg.jpgTimeout + 1);
			checkState();
		}
	    );
	    $interval(
		function(){
		    if(!jpg.navigate) return;
		    var path = jpg.navigate;
		    jpg.navigate = null;
		    if("/" != path)
			return $location.path(path);
		    if("/remote" == $location.path())
			return $location.path(path);
		},
		100
	    );
            $rootScope.$on('$routeChangeSuccess',function () {
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
                if($location.path() in headerNames)
                    $rootScope.headerName = headerNames[$location.path()];
                else{
                    $rootScope.dashBoardHeader = true;
                    $rootScope.headerName ='';
                }
                $rootScope.mainPage = $location.path() == '/';
            });
        }
    ]);
