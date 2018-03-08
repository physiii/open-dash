var app = angular.module('app');

app.controller('PandoraController', function ($scope, $rootScope, $location, $timeout, $mdDialog, PandoraService) {
  $scope.playIcon = "play_arrow";

  $scope.back = function () {
    $location.path('radio');
  }

  $rootScope.pandora.request("user.getStationList", function (err, stationList) {
    if (err) {
      console.log(err);

    }
   
    $timeout(function () {
      if (err) {
        $scope.errMsg = err;
      } else {
        $scope.stations = stationList.stations;
      }
    }, 10);
  });

  $scope.showSongs = function (station) {
    console.log(station);
    $rootScope.pandora.request("station.getPlaylist", {
      "stationToken": station.stationToken,
      "additionalAudioUrl": "HTTP_128_MP3"
    }, function(err, playlist) {
      if (err) {
        console.log(err);

      }
      
      $timeout(function () {
        if (err) {
          $scope.errMsg = err;
        } else {
          $scope.songs = playlist.items;
        }
      }, 10);
    });
  }




});