angular.module('app').controller('BackupCameraController', ['$scope', 'config', 'can', function ($scope, config, can) {
	$scope.camera = config.rear_camera;

	can.on('shift', (data) => {
		if (data.shift_mode === 'reverse') {
			$scope.$apply(() => $scope.showCamera = true);
		} else {
			$scope.$apply(() => $scope.showCamera = false);
		}
	});
}]);
