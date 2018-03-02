'use strict';
var media = require('./server/modules/media.js');
var remote = require('./server/modules/remote.js');
var path = require('path');
var http = require("http");

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
            function findMdd_old(){
                function storeRemoteAddressInformation(
                    remoteAddressInformation
                ){
                    $rootScope.remoteAddressInfo = remoteAddressInformation;
                }
                function autoconnect(handHeldProductList){
                    var done = false;
                    function visitDevice(device){
                        if(done) return;
                        if(!$rootScope.autoconnect_enabled)
                            return done = true;
                        remote.connectIfNotConnected(device.local_ip, null);
                        $location.path("remote");
                    }
                    handHeldProductsList.map(visitDevice);
                    if(done) return console.log("autoconnect is disabled");
                }
                function showMddOrHome(xWindowIdentifier){
                    if(xWindowIdentifier)
                       remote.mdd_WindowSet(xWindowIdentifier);
                    else
                        $location.path('/');
                }
                $rootScope.autoconnect_enabled = true;
                var ipPromise = remote.findIP();
                var mddPromise = remote.getMDD();
                var deviceListPromise = ipPromise.then(
                    remote.runScan.bind(remote)
                );
                var handHeldProductsListPromise = deviceListPromise.then(
                    function(deviceList){
                        return deviceList.filter(
                            function isHandHeldProducts(device){
                                return "Hand Held Products" === device.device;
                            }
                        );
                    }
                );
                deviceListPromise.then(storeRemoteAddressInformation);
                handHeldProductsListPromise.then(autoconnect);
                mddPromise.then(showMddOrHome);
            }
	    function findMdd(){
		http.get(
		    "http://127.0.0.1:8086/mdd/clientLives/",
		    function(res){
			var chunks = [];
			res.on("data", chunks.push.bind(chunks));
			res.on(
			    "end",
			    function(){
				var live = JSON.parse(chunks.join(""));
				if(live)
				    $location.path("/remote");
				else
				    if("/remote" == $location.path())
					$location.path("/");
			    }
			);
		    }
		);
	    }
            $interval(findMdd, 500);
            $rootScope.$on('$routeChangeSuccess',function () {
                $rootScope.dashBoardHeader = false;
                var headerNames = {
                    "/remote": "Remote",
                    "/navigation": "Navigation",
                    "/media": "Media",
                    "/settings": "Settings",
                    "/radio": "Radio",
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
