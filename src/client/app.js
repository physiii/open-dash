'use strict';
var media = require('../server/modules/media.js');
var remote = require('../server/modules/remote.js');
var path = require('path');

var app = angular.module('app', ['ngRoute','ngMaterial','ngMessages']);
app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'main/dashboard/dashboard.html',
        controller: 'DashboardController'
    }).
    when('/apps', {
        templateUrl: 'main/dashboard/apps/apps.html',
        controller: 'AppsController'
    }).
    when('/media', {
        templateUrl: 'main/dashboard/media/media.html',
        controller: 'MediaController'
    }).
    when('/settings', {
        templateUrl: 'main/dashboard/settings/settings.html',
        controller: 'SettingsController'
    }).
    when('/settings/system', {
        templateUrl: 'main/dashboard/settings/system/system.html',
        controller: 'SystemController'
    }).
    when('/settings/update', {
        templateUrl: 'main/dashboard/settings/update/update.html',
        controller: 'UpdateController'
    }).
    when('/settings/bluetooth', {
        templateUrl: 'main/dashboard/settings/bluetooth/bluetooth.html',
        controller: 'BluetoothController'
    }).
    when('/settings/wifi', {
        templateUrl: 'main/dashboard/settings/wifi/wifi.html',
        controller: 'WifiController'
    }).
    when('/remote', {
        templateUrl: 'main/dashboard/remote/remote.html',
        controller: 'RemoteController'
    }).
    when('/media', {
        templateUrl: 'main/dashboard/media/media.html',
        controller: 'MediaController'
    }).
    when('/radio',{
        templateUrl: 'main/dashboard/radio/radio.html',
        controller: 'RadioController'
    }).
    when('/radio/amfm',{
        templateUrl: 'main/dashboard/radio/amfm/amfm.html',
        controller: 'AmfmController'
    }).
    when('/radio/pandora',{
        templateUrl: 'main/dashboard/radio/pandora/pandora.html',
        controller: 'PandoraController'
    }).
    when('/radio/spotify',{
        templateUrl: 'main/dashboard/radio/spotify/spotify.html',
        controller: 'SpotifyController'
    }).
    when('/navigation',{
        templateUrl: 'main/dashboard/navigation/navigation.html',
        controller: 'NavigationController'
    }).
    otherwise({
        redirectTo: '/'
    });
}).run(['$rootScope','$location','$interval','$timeout',function ($rootScope,$location,$interval,$timeout) {
    $interval(function() {
        remote.runScan().then(function (list) {
            $rootScope.remoteAddressInfo = list;
            for(var i=0;i<list.length;i++){
                if(list[i].device === 'Hand Held Products'){
                    remote.connect(list[i].local_ip,null);
                    $location.path('remote');
                }
            }
            $rootScope.$apply();
        });
    },2000);

    $rootScope.$on('$routeChangeSuccess',function () {
        if($location.path() == '/'){
            $rootScope.mainPage = true;
        }else{
            $rootScope.mainPage = false;
        }

    })
    $rootScope.$on('get-audio-play-list', function (dir) {
      if (dir) {
        dir = path.join("../../..", dir);
      } else {
        dir = "../../../media/music";
      }
      media.getAudioFiles(dir).then(function (files) {
        var audioFiles = files.map(function (file) {
          return path.join(dir, file);
        });
        $rootScope.audioFiles = audioFiles;
        $rootScope.currentIndex = 0;
      });
      $rootScope.$broadcast('audio-play-list', $rootScope.audioFiles);
    });
    $rootScope.$on('play-audio', function () {
      $rootScope.playAudio();
    });
    $rootScope.$on('pause-audio', function () {
      $rootScope.playAudio();
    });
    $rootScope.$on('play-pause-audio', function () {
      $rootScope.playAudio();
    });
    $rootScope.$on('audio-skip-previous', function () {
      $rootScope.skipPrevious();
    });
    $rootScope.$on('audio-skip-next', function () {
      $rootScope.skipNext();
    });
    $rootScope.playAudio = function () {
      if (!$rootScope.audioFiles) {
        var dir = "../../../media/music";
        media.getAudioFiles(dir).then(function (files) {
          var audioFiles = files.map(function (file) {
            return path.join(dir, file);
          });
          $rootScope.audioFiles = audioFiles;
          $rootScope.currentIndex = 0;
          $rootScope.$broadcast('audio-play-list', $rootScope.audioFiles);
          playPauseAudio();
        });
        
      } else {
        playPauseAudio();
      }
      function playPauseAudio() {
        var audio = document.getElementById("audioTrack");
        if (!$rootScope.audio) {
          $rootScope.audio = audio;
          if (!audio.src) {
            audio.src = $rootScope.audioFiles[0];
            $rootScope.currentIndex = 0;
          }
          $rootScope.audio.load();
          audio.addEventListener('loadedmetadata', function (metadata) {
            $rootScope.$broadcast('audio-duration', audio.duration);
          });
          audio.addEventListener('play', function (metadata) {
            $rootScope.$broadcast('audio-play');
          });
          audio.addEventListener('pause', function (metadata) {
            $rootScope.$broadcast('audio-pause');
          });
          audio.addEventListener('timeupdate', function (metadata) {
            $rootScope.$broadcast('audio-timeupdate', audio.currentTime);
          });
        }
        if (audio.paused) {
          audio.play();
        }
        else {
          audio.pause();
        }
      }
      
    }
    $rootScope.skipPrevious = function () {
      if (!$rootScope.audioFiles) return;
      if ($rootScope.currentIndex > 0) {
        var audioPaused = $rootScope.audio.paused;
        $rootScope.currentIndex -= 1;
        $rootScope.audio.src = $rootScope.audioFiles[$rootScope.currentIndex];
        $rootScope.audio.load();
        if (!audioPaused) $rootScope.audio.play();
        $rootScope.$broadcast("audio-changed", $rootScope.currentIndex);
      }
    }
    $rootScope.skipNext = function () {
      if (!$rootScope.audioFiles) return;
      if ($rootScope.currentIndex < ($rootScope.audioFiles.length - 1)) {
        var audioPaused = $rootScope.audio.paused;
        $rootScope.currentIndex += 1;
        $rootScope.audio.src = $rootScope.audioFiles[$rootScope.currentIndex];
        $rootScope.audio.load();
        if (!audioPaused) $rootScope.audio.play();
        $rootScope.$broadcast("audio-changed", $rootScope.currentIndex);
      }
    }

}]);
