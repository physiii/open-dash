
var app = angular.module('app');
app.controller(
	'HeaderController',
	function($scope,$location){
    $scope.showDashboard=function(){
        $location.path('/');
    }
		$scope.back = function () {
			var parents = {
				"/remote": "/"
				, "/navigation": "/"
				, "/media": "/"
				, "/settings": "/"
				, "/radio": "/"
				, "/radio/amfm": "/radio"
				, "/radio/pandora": "/radio"
				, "/radio/pandora/playlist": "/radio/pandora"
				, "/settings/bluetooth": "/"
				, "/settings/wifi": "/settings"
				, "/settings/system": "/settings"
				, "/settings/system/device-info/": "/settings/system/"
				, "/settings/update": "/settings"
				, "/remote/remote_child": "/remote"
			};
			var p = $location.path();
			var dest = "/";
			if(p in parents)
				dest = parents[p];
			$location.path(dest);
		};
	}
);
