var app = angular.module('app');

app.controller('AmfmController', function ($scope, $location, $timeout) {
	var presetsCount = 5,
		presetDelay = 2000, // ms
		bands = {
			am: {
				label: "AM",
				rangeStart: 540,
				rangeEnd: 1710,
				spread: 10,
				frequencies: [],
				presets: Array(presetsCount),
			},
			fm: {
				label: "FM",
				rangeStart: 87.5,
				rangeEnd: 107.9,
				spread: 0.2,
				frequencies: [],
				presets: Array(presetsCount),
			}
		},
		generateFrequencies = function (band) {
			freqs = [];

			for (var freq = band.rangeStart; freq <= band.rangeEnd; freq = freq + band.spread) {
				freq = Math.round(freq * 10) / 10; // Round frequency to one decimal place.
				freqs.push(freq);
			}

			return freqs;
		},
		presetTimer;

	$scope.setBand = (bandName) => {
		$scope.currentBand = bands[bandName];
		$scope.setFrequency($scope.currentBand.rangeStart); // TODO: Use last frequency for new band from db. If no frequency in db, automatically seek for initial frequency.
	};
	$scope.setFrequency = (frequency) => {
		$scope.currentFrequency = frequency;
		// TODO: Store current frequency in db (independently for AM and FM).
	};
	$scope.presetClick = (presetIndex) => {
		var preset = $scope.currentBand.presets[presetIndex];

		if (!preset) return;

		$scope.setFrequency(preset);
	};
	$scope.presetMouseDown = (presetIndex) => {
		presetTimer = $timeout(() => $scope.presetStore(presetIndex), presetDelay);
	};
	$scope.presetMouseUp = (presetIndex) => {
		$timeout.cancel(presetTimer);
	};
	$scope.presetStore = (presetIndex) => {
		if (typeof presetIndex === 'undefined') {
			presetIndex = $scope.currentBand.presets.length;
		}

		$scope.currentBand.presets[presetIndex] = $scope.currentFrequency;
	};
	$scope.seekDown = () => {
		var freqIndex = $scope.currentBand.frequencies.indexOf($scope.currentFrequency);

		if (freqIndex === 0) return;
		$scope.setFrequency($scope.currentBand.frequencies[freqIndex-1]);
	};
	$scope.seekUp = () => {
		var freqIndex = $scope.currentBand.frequencies.indexOf($scope.currentFrequency);

		if (freqIndex === $scope.currentBand.frequencies.length - 1) return;
		$scope.setFrequency($scope.currentBand.frequencies[freqIndex+1]);
	};

	bands.am.frequencies = generateFrequencies(bands.am);
	bands.fm.frequencies = generateFrequencies(bands.fm);

	$scope.setBand('fm'); // Set the initial band.
});
