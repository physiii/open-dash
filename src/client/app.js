'use strict';

(() => {
	const configuration = require('./server/configuration.js'),
		constant = require('./constants.js'),
		media = require('./server/modules/media.js'),
		remote = require('./server/modules/remote.js'),
		wifi = require('./server/devices/wifi.js'),
		camera = require('./server/devices/camera.js'),
		mddCapture = require('./server/mdd-capture.js'),
		can = require('./server/devices/can.js'),
		path = require('path'),
		http = require('http'),
		EventEmitter = require('events');

	configuration.readConfig((error, config) => {
		$.getScript('http://localhost:' + constant.SOCKET_PORT + '/socket.io/socket.io.js', () => {
			const socketProcessIO = io('http://localhost:' + constant.SOCKET_PORT),
				app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngDrag']);

			// Register constants with app DI.
			Object.keys(constant).forEach((key) => {
				app.constant(key, constant[key]);
			});

			app.config(($routeProvider, $mdThemingProvider) => {
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
						})
						.dark();
				})
				.value('config', config)
				.value('socketProcessIO', socketProcessIO)
				.value('can', can)
				.value('camera', camera)
				.run(['$rootScope', '$location', ($rootScope, $location) => {
					// Launch wireless access point for MDD.
					wifi.ap_connect();

					// Listen for screenshots from MDD.
					mddCapture.app.listen(constant.MDD_CAPTURE_PORT); // port is hard-coded on MDD

					$rootScope.$watch('remoteDeviceConnected', (isConnected) => {
						if (isConnected) {
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
				.run(['$rootScope', '$location', ($rootScope, $location) => {
					$rootScope.$on('$routeChangeSuccess', () => {
						$rootScope.dashBoardHeader = false;
						var headerNames = {
							'/remote': 'Remote',
							'/navigation': 'Navigation',
							'/media': 'Media',
							'/settings': 'Settings',
							'/radio': 'Radio',
							'/radio/amfm': 'FM Radio',
							'/radio/Pandora': 'Pandora',
							'/radio/Pandora/playlist': 'Pandora',
							'/settings/bluetooth': 'Bluetooth Connections',
							'/settings/wifi': 'Wifi Connections',
							'/settings/system': 'System Settings',
							'/can': 'Can',
							'/camera': 'Camera',
							'/remote/remote_child': 'Remote Child'
						};

						if ($location.path() in headerNames) {
							$rootScope.headerName = headerNames[$location.path()];
						} else {
							$rootScope.dashBoardHeader = true;
							$rootScope.headerName ='';
						}
						$rootScope.mainPage = $location.path() == '/';
					});
				}]);

			// Load AngularJS dependencies, then bootstrap AngularJS.
			$.when(
				$.getScript('main/header/header.controller.js'),
				$.getScript('main/footer/footer.controller.js'),
				$.getScript('main/backup-camera/backup-camera.controller.js'),
				$.getScript('main/directives/camera-stream.directive.js'),
				$.getScript('main/dashboard/dashboard.controller.js'),
				$.getScript('main/dashboard/apps/apps.controller.js'),
				$.getScript('main/dashboard/apps/appview/appview.controller.js'),
				$.getScript('main/dashboard/remote/remote.controller.js'),
				$.getScript('main/dashboard/remote/remote_child/remote_child.controller.js'),
				$.getScript('main/dashboard/media/audio.service.js'),
				$.getScript('main/dashboard/media/video.service.js'),
				$.getScript('main/dashboard/media/media.controller.js'),
				$.getScript('main/dashboard/media/audio.controller.js'),
				$.getScript('main/dashboard/media/video.controller.js'),
				$.getScript('main/dashboard/navigation/navigation.controller.js'),
				$.getScript('main/dashboard/settings/settings.controller.js'),
				$.getScript('main/dashboard/settings/system/system.controller.js'),
				$.getScript('main/dashboard/settings/bluetooth/bluetooth.controller.js'),
				$.getScript('main/dashboard/settings/wifi/wifi.controller.js'),
				$.getScript('main/dashboard/radio/radio.controller.js'),
				$.getScript('main/dashboard/radio/amfm/amfm.controller.js'),
				$.getScript('main/dashboard/radio/amfm/amfm.service.js'),
				$.getScript('main/dashboard/radio/pandora/pandora.controller.js'),
				$.getScript('main/dashboard/radio/pandora/playlist.controller.js'),
				$.getScript('main/dashboard/radio/pandora/pandora.service.js'),
				$.getScript('main/dashboard/can/can.controller.js'),
				$.getScript('main/dashboard/camera/camera.controller.js')
				).then(() => {
					angular.element(() => {
						angular.bootstrap(document, ['app']);
					});
				});
		});
	});
})();

