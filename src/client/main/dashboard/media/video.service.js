var app = angular.module('app');
var media = require('./server/modules/media.js');

app.service('VideoService', function () {
  this.videoFiles = null;
  this.playing = false;
  this.playList = null;
  this.videoDir = null;
  this.currentIndex = 0;
  this.currentTime = 0;
  this.duration = -1;
  this.timeCallback = null;

  this.video = document.getElementById("videoTrack");
  this.videoCanvas = document.getElementById("videoCanvas");
  this.videoContext = this.videoCanvas.getContext('2d');

  this.setTimeCallback = function (cb) {
    this.timeCallback = cb;
  }
  this.metadataListener = function () {
    this.duration = this.video.duration;
  }
  this.metadataListener = this.metadataListener.bind(this);

  this.durationChangeListener = function () {
    this.duration = this.video.duration;
  }
  this.durationChangeListener = this.durationChangeListener.bind(this);

  this.timeUpdateListener = function () {
    this.currentTime = this.video.currentTime;
    if (this.timeCallback) this.timeCallback(this.currentTime);
  }
  this.timeUpdateListener = this.timeUpdateListener.bind(this);
  this.playListener = function () {
    this.timerCallback();
  };
  this.playListener = this.playListener.bind(this);
  this.timerCallback = function () {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.videoContext.drawImage(this.video, 0, 0, this.width, this.height);
    let self = this;
    setTimeout(function() {
      self.timerCallback();
    }, 0);
  }
  this.addListeners = function () {
    this.width = this.videoCanvas.clientWidth;
    this.height = this.videoCanvas.clientHeight;
    this.video.removeEventListener("loadedmetadata", this.metadataListener);
    this.video.removeEventListener("durationchange", this.durationChangeListener);
    this.video.removeEventListener("timeupdate", this.timeUpdateListener);
    this.video.addEventListener("loadedmetadata", this.metadataListener);
    this.video.addEventListener("durationchange", this.durationChangeListener);
    this.video.addEventListener("timeupdate", this.timeUpdateListener);
    this.video.addEventListener("play", this.playListener);
  };

  this.seekToPos = function (t) {
    if (this.video && this.video.src && t >= 0 && t <= this.duration) {
      this.video.currentTime = t;
      this.currentTime = t;
    }
  }
  this.playMedia = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.videoFiles) {
self.changeVideoDir().then(function (files) {
          self.playPauseVideo();
          resolve(true);
        }).catch(function(err) {
          reject(err);
        });
      } else {
        self.playPauseVideo();
        resolve(true);
      }
    });
  };

  this.playPauseVideo = function () {
    var self = this;
    if (!this.video || !this.video.src) {
      if (!this.video) this.video = document.getElementById("videoTrack");
      if (!this.video.src) {
        this.video.src = this.videoFiles[0];
        this.currentIndex = 0;
      }
      this.video.load();
      this.addListeners();
    }
    if (this.video.paused) {
      this.video.play();
      this.playing = true;
    } else {
      this.video.pause();
      this.playing = false;
    }
  };

  this.skipPrevious = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.videoFiles)
        return resolve(false);

      if (self.currentIndex > 0) {
        var videoPaused = self.video.paused;
        self.currentIndex -= 1;
        self.video.src = self.videoFiles[self.currentIndex];
        self.video.load();
        self.addListeners();

        if (!videoPaused)
          self.video.play();

      }
      return resolve(true);
    });
  };

  this.skipNext = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.videoFiles)
        return resolve(false);

      if (self.currentIndex < self.videoFiles.length - 1) {
        var videoPaused = self.video.paused;
        self.currentIndex += 1;
        self.video.src = self.videoFiles[self.currentIndex];
        self.video.load();
        self.addListeners();

        if (!videoPaused)
          self.video.play();

      }
      return resolve(true);
    });
  };

  this.playVideo = function (idx) {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.videoFiles)
        return resolve(false);
      if (idx >= 0 && idx < self.videoFiles.length) {
        var videoPaused = self.video.paused;
        self.video.src = self.videoFiles[idx];
        self.video.load();
        self.currentIndex = idx;
        self.addListeners();

        if (!videoPaused) {
          self.video.play();
          self.playing = true;
        } else {
          self.playing = false;
        }
        return resolve(true);
      }
      resolve(false);
    });
  };

  this.changeVideoDir = function (dir) {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (dir) {
        dir = path.join("../../..", dir);
      } else {
        dir = "../../../media/video";
      }
      var dirChanged = self.videoDir != dir;
      if (dirChanged || !self.videoFiles || !self.videoFiles.length) {
        media.getVideoFiles(dir).then(function (files) {
          self.playList = files;
          self.videoDir = dir;
          var videoFiles = files.map(function (file) {
            return path.join(dir, file);
          });
          self.videoFiles = videoFiles;
          if (videoFiles && videoFiles.length) {
            self.video.src = self.videoFiles[0];
            self.video.load();
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
  this.getVideoState = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (!self.videoFiles) {
        return resolve(self.changeVideoDir());
      }
      else {
        resolve(true);
      }
    });
  };
});
