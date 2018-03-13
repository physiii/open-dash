var app = angular.module('app');

app.service('PandoraService', function () {

  this.playing = false;
  this.playList = null;
  this.currentIndex = 0;
  this.currentTime = 0;
  this.duration = -1;
  this.timeCallback = null;
  this.pandora = null;
  this.stations = null;
  this.currentStation = null;


  this.audio = document.getElementById("audioTrack");
  this.video = document.getElementById("videoTrack");

  this.isLoggedIn = function () {
    return this.pandora != null;
  }
  this.login = function (username, password) {
    var self = this;
    return new Promise((resolve, reject) => {
      var pandora = new Anesidora(username, password);
      self.pandora = pandora;
      pandora.login( (err) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(true);
      });
    })
  }
  this.getStations = function () {
    var self=this;
    return new Promise((resolve, reject) => {
      if (!self.pandora) {
        return reject("User is not logged in, or Pandora could not be initialized");
      }
      self.pandora.request("user.getStationList", function (err, stationList) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        
        self.stations = stationList.stations;
        if (self.stations && self.stations.length) {
          self.currentStation = self.stations[0];
        } else {
          self.currentStation = null;
        }
        resolve(self.stations);
      });
    });
    
  }
  
  this.setStation = function (station) {
    this.currentStation = station;
  }
  this.getSongs = function (station, moreSongsFlag) {
    var self = this;
    if (station) { this.currentStation = station; }
    else {
      station = this.currentStation;
    }
    return new Promise((resolve, reject) => {
      if (!station) {
        return reject("No stations available");
      }
      self.pandora.request("station.getPlaylist", {
        "stationToken": station.stationToken,
        "additionalAudioUrl": "HTTP_128_MP3"
      }, function (err, playlist) {
        if (err) {
          self.playList = [];
          console.log(err);
          return reject(err);
        }
        
        if (moreSongsFlag && self.playList && self.playList.length) {
          if (playlist.items && playlist.items.length) {
            self.playList = self.playList.concat(playlist.items.filter(s => s.additionalAudioUrl));
          }
        } else {
          self.playList = playlist.items.filter(s => s.additionalAudioUrl);
        }
        resolve(self.playList);
      });
    });
    
   
  }
  this.setTimeCallback = function (cb) {
    this.timeCallback = cb;
  }
  this.metadataListener = function () {
    this.duration = this.audio.duration;
  }
  this.metadataListener = this.metadataListener.bind(this);

  this.durationChangeListener = function () {
    this.duration = this.audio.duration;
  }
  this.durationChangeListener = this.durationChangeListener.bind(this);

  this.timeUpdateListener = function () {
    this.currentTime = this.audio.currentTime;
    if (this.audio.paused || this.audio.ended) {
      this.playing = false;
    }
    if (this.timeCallback) this.timeCallback(this.currentTime);
  }
  this.timeUpdateListener = this.timeUpdateListener.bind(this);

  this.addListeners = function() {
    this.audio.removeEventListener("loadedmetadata", this.metadataListener);
    this.audio.removeEventListener("durationchange", this.durationChangeListener);
    this.audio.removeEventListener("timeupdate", this.timeUpdateListener);
    this.audio.addEventListener("loadedmetadata", this.metadataListener);
    this.audio.addEventListener("durationchange", this.durationChangeListener);
    this.audio.addEventListener("timeupdate", this.timeUpdateListener);
  };

  this.seekToPos = function (t) {
    if (this.audio && this.audio.src && t >= 0 && t <= this.duration) {
      this.audio.currentTime = t;
      this.currentTime = t;
    }
  }
  this.playMedia = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.playList || !self.playList.length) {
        self.getSongs().then(function () {
          self.playPauseAudio();
          resolve(true);
        }).catch(function(err) {
          reject(err);
        });
      } else {
        self.playPauseAudio();
        resolve(true);
      }
    });
  };

  this.playPauseAudio = function () {
    var self = this;
    if (!this.audio || !this.audio.src) {
      if (!this.audio) this.audio = document.getElementById("audioTrack");
      if (!this.audio.src) {
        this.audio.src = this.playList[0].additionalAudioUrl;
        this.currentIndex = 0;
      }
      this.audio.load();
      this.addListeners();
    }
    if (this.audio.paused) {
      if (this.video && this.video.src && !this.video.paused) this.video.pause();

      this.audio.play();
      this.playing = true;
    } else {
      this.audio.pause();
      this.playing = false;
    }
  };

  this.skipPrevious = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.playList)
        return resolve(false);

      if (self.currentIndex > 0) {
        var audioPaused = self.audio.paused;
        self.currentIndex -= 1;
        self.audio.src = self.playList[self.currentIndex].additionalAudioUrl;
        self.audio.load();
        self.addListeners();

        if (!audioPaused)
          self.audio.play();

      }
      return resolve(true);
    });
  };

  this.skipNext = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.playList)
        return resolve(false);

      if (self.currentIndex < self.playList.length - 1) {
        var audioPaused = self.audio.paused;
        self.currentIndex += 1;
        self.audio.src = self.playList[self.currentIndex].additionalAudioUrl;
        self.audio.load();
        self.addListeners();

        if (!audioPaused)
          self.audio.play();

      }
      return resolve(true);
    });
  };

  this.playSong = function (idx) {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.playList || !self.playList.length)
        return resolve(false);
      if (idx >= 0 && idx < self.playList.length) {
        var audioPaused = self.audio.paused;
        self.audio.src = self.playList[idx].additionalAudioUrl;
        self.audio.load();
        self.currentIndex = idx;
        self.addListeners();

        if (!audioPaused) {
          self.audio.play();
          self.playing = true;
        } else {
          self.playing = false;
        }
        return resolve(true);
      }
      resolve(false);
    });
  };


  this.getAudioState = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.playList) {
        return resolve(self.getSongs());
      }
      else {
        self.playing = !self.audio.paused;
        resolve(true);
      }
    });
  };
  this.compareFunction = function (a, b) {
    if (a.score < b.score) return -1;
    else if(a.score > b.score) return 1;
    else return 0;
  }
  this.makePandoraRequest = function (request, data) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.pandora.request(request,
      data, function (err, response) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(response);
        
        if (request == "music.search") {
          var songs = [];
          var artists = [];
          var genreStations = [];
          if (response.artists && response.artists.length) {
            artists = response.artists.map((station) => {
              var value = "";

              station.value = station.pandoraId;
              station.display = "Artist: " + station.artistName;
              return station;
            });
          }
          if (response.genreStations && response.genreStations.length) {
            genreStations = response.genreStations.map((station) => {
              var value = "";

              station.value = station.pandoraId;
              station.display = "Genre: " + station.stationName;
              return station;
            });
          }
          if (response.songs && response.songs.length) {
            songs = response.songs.map((station) => {
              var value = "";

              station.value = station.pandoraId;
              station.display = "Song: " + station.songName;
              return station;

            });
          }
          resolve(genreStations.concat(artists, songs).sort(self.compareFunction));
        } else {
          resolve(response);
        }
      });
    });
  }

});
