const speakers = require('./server/devices/speakers.js');

angular.module('app').controller('FooterController', function ($scope, $location, $timeout) {
	function setMutedState (is_muted) {
		$scope.$apply(() => {
			$scope.mute_icon = is_muted ? 'volume_up' : 'volume_off';
		});
	}

	speakers.getMuted().then(setMutedState);

	$scope.showRemote = function () {
		$location.path('remote');
	}

	$scope.mute = () => {
		speakers.toggleMuted().then(setMutedState);
	}

	$scope.raiseVolume = () => {
		speakers.setMuted(false).then(setMutedState);
		speakers.raiseVolume();
	};

	$scope.lowerVolume = () => {
		speakers.setMuted(false).then(setMutedState);
		speakers.lowerVolume();
	};
});
