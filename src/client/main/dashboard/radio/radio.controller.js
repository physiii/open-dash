var app = angular.module('app');

app.controller('RadioController', function($scope,$location,$mdDialog){
    $scope.customFullscreen = false;
    $scope.back=function(){
        $location.path('/');
    }
    $scope.goToRadio = function(){
        $location.path('radio/amfm');
    }
    $scope.goToSpotify = function(){
        $location.path('radio/spotify');
    }
    $scope.goToPandora = function(ev){
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'login.tmpl.html',
            parent: document.getElementsByClassName('main-content'),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen
        });
    }

    function DialogController($scope, $mdDialog) {

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.close = function() {
            $mdDialog.hide();
        };
    }

});