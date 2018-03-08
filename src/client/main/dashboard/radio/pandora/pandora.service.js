var app = angular.module('app');

app.service('PandoraService', function () {
  this.audioFiles = null;
  this.playing = false;
  this.playList = null;
  this.currentIndex = 0;
  this.currentTime = 0;
  this.duration = -1;
  this.timeCallback = null;
  this.pandora = null;
  this.station = null;

  this.audio = document.getElementById("audioTrack");
  this.video = document.getElementById("videoTrack");

  this.setPandora = function (pandora) {
    this.pandora = pandora;
  }
  this.setStation = function (station) {
    this.station = station;
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
      if (!self.audioFiles) {
        self.changeAudioDir().then(function () {
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
        this.audio.src = this.audioFiles[0];
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
      if (!self.audioFiles)
        return resolve(false);

      if (self.currentIndex > 0) {
        var audioPaused = self.audio.paused;
        self.currentIndex -= 1;
        self.audio.src = self.audioFiles[self.currentIndex];
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
      if (!self.audioFiles)
        return resolve(false);

      if (self.currentIndex < self.audioFiles.length - 1) {
        var audioPaused = self.audio.paused;
        self.currentIndex += 1;
        self.audio.src = self.audioFiles[self.currentIndex];
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
      if (!self.audioFiles)
        return resolve(false);
      if (idx >= 0 && idx < self.audioFiles.length) {
        var audioPaused = self.audio.paused;
        self.audio.src = self.audioFiles[idx];
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

  this.changeAudioDir = function (dir) {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (dir) {
        dir = path.join("../../..", dir);
      } else {
        dir = "../../../media/music";
      }
      var dirChanged = self.audioDir != dir;
      if (dirChanged || !self.audioFiles || !self.audioFiles.length) {
        media.getAudioFiles(dir).then(function (files) {
          self.playList = files;
          self.audioDir = dir;
          var audioFiles = files.map(function (file) {
            return path.join(dir, file);
          });
          self.audioFiles = audioFiles;
          if (audioFiles && audioFiles.length) {
            self.audio.src = self.audioFiles[0];
            self.audio.load();
            self.currentIndex = 0;
            self.addListeners();
          }
          resolve(true);
        }).catch(function (err) {
          console.log(err);
          reject(err);
        });
      } else {
        self.playList = files;
        resolve(true);
      }
    });
  };
  this.getAudioState = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.audioFiles) {
        return resolve(self.changeAudioDir());
      }
      else {
        self.playing = !self.audio.paused;
        resolve(true);
      }
    });
  };
});
