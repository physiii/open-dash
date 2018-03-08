var app = angular.module('app');
var Anesidora = require("anesidora");

app.controller('RadioController', function ($scope, $rootScope, $timeout, $location, $mdDialog) {
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
    if ($rootScope.pandora) {
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
      var pandora = new Anesidora($scope.userName, $scope.password);
      pandora.login(function (err) {
        if (err) {
          console.log(err);
          
        }
        $timeout(function () {
          $scope.errMsg = err || "";
          if (!err) {
            $rootScope.pandora = pandora;
            $location.path('radio/pandora');
          } else {
            $rootScope.pandora = null;
          }
        }, 10);
      });
    }
  }

});