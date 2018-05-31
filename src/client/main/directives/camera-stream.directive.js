angular.module('app').directive('odCameraStream', ['camera', 'VIDEO_WEBSOCKET_PORT', (camera, VIDEO_WEBSOCKET_PORT) => {
	return {
		restrict: 'E',
		scope: {
			camera: '=camera' // Get the value of the camera attribute on the element.
		},
		link: (scope, element, attributes) => {
			const canvas = angular.element(element.children()[0].children[0]),
				player = new JSMpeg.Player('ws://127.0.0.1:' + VIDEO_WEBSOCKET_PORT, {canvas: canvas[0]});

			camera.startStream(scope.camera);
			scope.$on('$destroy', () => {
				camera.stopStream(scope.camera);
			});
		},
		templateUrl: 'main/directives/camera-stream.html'
	};
}]);
