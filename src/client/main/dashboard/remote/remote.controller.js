var app = angular.module('app');
var remote = require('./server/modules/remote.js');
var mddCapture = require("./server/mdd-capture.js");

app.controller(
  'RemoteController',
  function ($scope, $rootScope, $location, $timeout) {
    $scope.back = function () {
      $location.path('/');
    }

    var prevState = false,
      lastScreenshotTime = null,
      screenshotTimeout = 1000 * 15,
      screenshotTimer;

    $scope.screenshotSrc = null;
    $scope.isLoading = true;

    mddCapture.state.jpegs.on("jpg", function (image) {
      function checkState () {
        var delta = new Date() - lastScreenshotTime;
        var isOn = delta < screenshotTimeout;

        if (isOn == prevState) return;

        // Update loading state of view.
        $scope.$apply(() => $scope.isLoading = !isOn);

        prevState = isOn;
      }

      lastScreenshotTime = new Date();

      // Encode image to base64 URI and assign it to src attribute of img. 
      $scope.$apply(() => {
        $scope.screenshotSrc = "data:image/jpeg;base64," + image.toString("base64");
      });

      window.clearTimeout(screenshotTimer);
      screenshotTimer = window.setTimeout(checkState, screenshotTimeout);
      checkState();
    });

    $scope.toggleIp = remote.autoConnectEnabled;
    $rootScope.autoconnect_enabled = true;

    $scope.connectRemote = function (ip) {
        remote.connect(ip,null);
    }
    $scope.runScan = function (ip) {
        remote.connect(ip,null);
    }
    $scope.autoConnectLocalIp = function (value) {
        remote.setAutoConnect(value);
    };
    $scope.remoteChild = function () {
        $location.path('/remote/remote_child');
    }
    $scope.manualRun = function () {
      console.log("DEPRECATION WARNING");
      return; // DEPRECATE THIS
      remote.runScan().then(function (list) {
        $timeout(function() {
          $rootScope.remoteAddressInfo = list;
        }, 500);
      });
    }
  }
);
