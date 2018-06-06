var app = angular.module('app');

app.controller('PlaylistController', function ($scope, $rootScope, $location, $timeout, $mdDialog, PandoraService) {
    $scope.playIcon = "play_arrow";
    $scope.songs = $rootScope.playlist;
    $scope.back = function () {
        $location.path('radio');
    }
    $scope.currentTime = 0;
    $scope.currentTimeCallback = function () {
        $timeout(function () {
            $scope.currentTime = PandoraService.currentTime;
            $scope.currentTimeFormatted = $scope.formatTime($scope.currentTime);
            $scope.playing = PandoraService.playing;
            if ($scope.playing) {
                $scope.playIcon = "pause";
            } else {
                $scope.playIcon = "play_arrow";
            }
        }, 0);
    };
    $scope.seekToPos = function () {
        PandoraService.seekToPos($scope.currentTime);
    };
    PandoraService.setTimeCallback($scope.currentTimeCallback);
    $scope.formatTime = function (t) {
        if (t <= 0) return "00:00";
        var hours = Math.floor(t / 3600);
        var min = Math.floor((t - hours * 3600) / 60);
        var sec = Math.floor(t - hours * 3600 - min * 60);
        var hoursStr = "";
        var minStr = "";
        var secStr = "";
        if (!hours) hoursStr = "";
        else hoursStr = hours;
        if (hours && !min) minStr = "00";
        else if (min < 10) minStr = "0" + min;
        else minStr = min;
        if ((hours || min) && !sec) secStr = "00";
        else if (sec < 10) secStr = "0" + sec;
        else secStr = sec;
        if (hoursStr) return `${hoursStr}:${minStr}:${secStr}`;
        else return `${minStr}:${secStr}`;
    }

    $scope.getAudioState = function () {
        PandoraService.getAudioState().then(function () {
            $timeout(function () {
                $scope.duration = PandoraService.duration;
                $scope.playList = PandoraService.playList;
                $scope.currentIndex = PandoraService.currentIndex;
                $scope.currentTime = PandoraService.currentTime || 0;

                $scope.songs = $scope.playList.map(function (song, idx) {
                    song.selected = (idx === $scope.currentIndex);
                    return song;
                });
                $scope.durationFormatted = $scope.formatTime($scope.duration);

                $scope.playing = PandoraService.playing;
                if ($scope.playing) {
                    $scope.playIcon = "pause";
                } else {
                    $scope.playIcon = "play_arrow";
                }
            }, 100);
        });
    }

    $scope.getMoreSongs = function () {
      PandoraService.getSongs(null, true).then(function (songs) {
        $timeout(function () {
          $scope.getAudioState();
        }, 10);
      });
    };

    $scope.playMedia = function () {
        PandoraService.playMedia().then(function () {
            $scope.getAudioState();
        });
    };

    $scope.skipPrevious = function () {
        PandoraService.skipPrevious().then(function () {
            $scope.getAudioState();
        });
    };

    $scope.skipNext = function () {
        PandoraService.skipNext().then(function () {
            $scope.getAudioState();
        });
    };

    $scope.playSong = function (idx) {
        PandoraService.playSong(idx).then(function () {
            $scope.getAudioState();
        });
    };

});