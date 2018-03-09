var app = angular.module('app');
var Anesidora = require("anesidora");

app.controller('RadioController', function ($scope, $rootScope, $timeout, $location, $mdDialog, PandoraService) {
  $scope.customFullscreen = false;
  $scope.back = function () {
    $location.path('/');
  }
  $scope.goToRadio = function () {
    $location.path('radio/amfm');
  }
  $scope.goToSpotify = function () {
    $location.path('radio/spotify');
  }
  $scope.goToPandora = function (ev) {
    if (PandoraService.isLoggedIn()) {
      $location.path('radio/pandora');
    } else {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'login.tmpl.html',
        parent: document.getElementsByClassName('main-content'),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      });
    }
  }

  function DialogController($scope, $mdDialog) {

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.close = function () {
      $mdDialog.hide();
    };

    $scope.login = function () {
      console.log("login to Pandora as "+$scope.userName);
      PandoraService.login($scope.userName, $scope.password).then(() => {
        $timeout(function () {
          $scope.errMsg = "";
          $location.path('radio/pandora');
        }, 10);
      }).catch((err) => {
        $scope.errMsg = err || "";
      });
      
    }
  }

});