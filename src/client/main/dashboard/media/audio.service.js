var app = angular.module('app');
var media = require('./server/modules/media.js');

app.service('AudioService', function () {
  this.audioFiles = null;
  this.playing = false;
  this.playList = null;
  this.audioDir = null;
  this.currentIndex = 0;
  this.currentTime = 0;
  this.duration = -1;
  this.timeCallback = null;

  this.audio = document.getElementById("audioTrack");

  this.setTimeCallback = function (cb) {
    this.timeCallback = cb;
  }
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
        var dir = "../../../media/music";
        media.getAudioFiles(dir).then(function (files) {
          self.playList = files;
          self.audioDir = dir;
          var audioFiles = files.map(function (file) {
            return path.join(dir, file);
          });
          self.audioFiles = audioFiles;
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
      this.audio.addEventListener("loadedmetadata", function (metadata) {
        self.duration = self.audio.duration;
      });
      this.audio.addEventListener("timeupdate", function (metadata) {
        self.currentTime = self.audio.currentTime;
        if (self.timeCallback) self.timeCallback(self.currentTime);
      });
    }
    if (this.audio.paused) {
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
        resolve(true);
      }
    });
  };
});
