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
  $scope.$on('$destroy', function () {
    socketProcessIO.removeListener('get-pandora-account');
    socketProcessIO.removeListener('save-pandora-account');
  });
  $scope.goToPandora = function (ev) {
    if (PandoraService.isLoggedIn()) {
      $location.path('radio/pandora');
    } else {
      socketProcessIO.emit("get-pandora-account", {});
      socketProcessIO.on("get-pandora-account", function (data) {
        if (data && data.username) {
          console.log("Use existing Pandora account info for "+data.username);
        
          $timeout(function () {
            $scope.userName = data.username;
            $scope.password = data.password;
          }, 10);
        }
      });
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'login.tmpl.html',
        parent: document.getElementsByClassName('main-content'),
        scope: $scope,
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
    socketProcessIO.on("save-pandora-account", function (data) {
      if (data && data.success) {
        console.log("Saved Pandora account info ");
      }
    });
    $scope.login = function () {
      console.log("login to Pandora as "+$scope.userName);
      PandoraService.login($scope.userName, $scope.password).then(() => {
        socketProcessIO.emit("save-pandora-account", {username: $scope.userName, password: $scope.password});

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