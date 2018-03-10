var app = angular.module('app');

app.controller('PandoraController', function ($scope, $rootScope, $location, $timeout, $mdDialog, PandoraService) {
  $scope.playIcon = "play_arrow";

  $scope.back = function () {
    $location.path('radio');
  }

  PandoraService.getStations().then((stations) => {
    $timeout(function () {
      $scope.errMsg = "";
      $scope.stations = stations;

    }, 10);
  }).catch((err) => {
    $timeout(function () {
      $scope.errMsg = err;

    }, 10);
  });


  $scope.showSongs = function (station) {
    console.log(station);
    PandoraService.getSongs(station).then((playList) => {
      $timeout(function () {
        $scope.errMsg = "";
        $scope.songs = playList;
        $rootScope.playlist = playList ;
        $location.path("/radio/pandora/playlist");
      }, 10);
    }).catch((err) => {
      $timeout(function () {
        $scope.errMsg = err;
      })

    });
  }
});