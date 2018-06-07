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

  $scope.showStationDialog = function (ev) {
    
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'main/dashboard/radio/pandora/station.dialog.html',
        parent: document.getElementsByClassName('main-content'),
        targetEvent: ev,
        scope: $scope,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      });
    
  }
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
  function DialogController($scope, $timeout, $mdDialog) {
    var self = this;
    $scope.dialogErrMsg = "";
    $scope.selectedItem = "";

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.close = function () {
      $mdDialog.hide();
    };

    $scope.finish = function () {
      console.log($scope.selectedItem);
      if ($scope.selectedItem) {
        $scope.createStation($scope.selectedItem).then(() => {

          //refresh the station list
          PandoraService.getStations().then((stations) => {
            $timeout(function () {
              $scope.errMsg = "";
              $scope.stations = stations;
              $mdDialog.hide();
            }, 10);
          }).catch((err) => {
            $timeout(function () {
              $scope.dialogErrMsg = err;

            }, 10);
          });
        }).catch((err) => {

        });
      } else {
        $mdDialog.hide();
      }
    };
    // list of stations
    $scope.stationsFromSearch = [];
    $scope.querySearch = querySearch;

    
    /**
     * Search for stations.
     */
    function querySearch(query) {
      return query ? $scope.searchPandora(query) : $scope.stationsFromSearch;
    }

    $scope.createStation = function (station) {
      var data={};
      if(station.pandoraType == 'AR') {
        data.musicType = 'artist';
      } else  {
        data.musicType = 'artist';
      }
      data.musicToken = station.musicToken;
      return new Promise((resolve, reject) => {

        PandoraService.makePandoraRequest("station.createStation",
              data).then(() => {
                $timeout(function () {
                  $scope.dialogErrMsg = "";
                }, 10);
                resolve(true);
              }).catch((err) => {
                $timeout(function () {
                  $scope.dialogErrMsg = err || "";
                  reject(errMsg);
                }, 10);
              });
      });
    }

    
    $scope.searchPandora = function (query) {
      console.log("Search Pandora for " + query);
      return new Promise((resolve, reject) => {
        PandoraService.makePandoraRequest("music.search",
          { "searchText": query }).then((stations) => {
            $timeout(function () {
              $scope.errMsg = "";
              $scope.stationsFromSearch = stations;
            }, 10);
            resolve(stations);
          }).catch((err) => {
            $timeout(function () {
              $scope.errMsg = err || "";
              reject(errMsg);
            }, 10);
          });
      });
    }
  }
});