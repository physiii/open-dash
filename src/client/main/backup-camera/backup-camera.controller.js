angular.module('app').controller('BackupCameraController', ['$scope', 'config', 'can', function ($scope, config, can) {
	$scope.camera = config.rear_camera;

	can.on('shift', (event) => {
		if (event.shiftMode === 'reverse') {
			$scope.$apply(() => $scope.showCamera = true);
		} else {
			$scope.$apply(() => $scope.showCamera = false);
		}
	});
}]);
