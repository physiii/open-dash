angular.module('app').controller('CameraController', ['$scope', 'config', function ($scope, config) {
	$scope.camera = config.rear_camera;
}]);
