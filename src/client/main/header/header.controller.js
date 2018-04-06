
var app = angular.module('app');
app.controller('HeaderController', function($scope,$location){
    $scope.showDashboard=function(){
        $location.path('/');
    }
    $scope.back = function () {
        if($location.path() == '/remote'){
            $location.path('/');
        }else if($location.path() == '/navigation'){
            $location.path('/');
        }else if($location.path() == '/media'){
            $location.path('/');
        }else if($location.path() == '/settings'){
            $location.path('/');
        }else if($location.path() == '/radio'){
            $location.path('/');
        }else if($location.path() == '/radio/amfm'){
            $location.path('/radio');
        }else if($location.path() == '/radio/pandora'){
            $location.path('/radio');
        }else if($location.path() == '/radio/pandora/playlist'){
            $location.path('/radio/pandora');
        }else if($location.path() == '/settings/bluetooth'){
            $location.path('/');
        }else if($location.path() == '/settings/wifi'){
            $location.path('/settings');
        }else if($location.path() == '/settings/system'){
            $location.path('/settings');
        }else if($location.path() == '/settings/update'){
            $location.path('/settings');
        }else if($location.path() == '/remote/remote_child'){
            $location.path('/remote');
        }else{
            $location.path('/');
        }

    };
});