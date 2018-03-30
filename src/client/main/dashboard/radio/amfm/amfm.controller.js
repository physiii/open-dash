var app = angular.module('app');

app.controller('AmfmController', function ($scope, $location, $timeout) {
	var presetsCount = 4,
		presetDelay = 2000, // ms
		isDragging = false,
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
		generateFrequencies = (band) => {
			var freqs = [];

			for (var freq = band.rangeStart; freq <= band.rangeEnd; freq = freq + band.spread) {
				freq = Math.round(freq * 10) / 10; // Round frequency to one decimal place.
				freqs.push(freq);
			}

			band.frequencies = freqs;
		},
		generateDialSteps = (band) => {
			var steps = [],
				getFrequencyGroupLabel = (frequency) => {
					var label;

					if (band === bands.am) {
						label = Math.floor(frequency / 100) * 100;
					} else if (band === bands.fm) {
						label = Math.floor(frequency)
					}

					if (label < band.rangeStart) {
						label = null;
					}

					return label;
				},
				previousLabel;

			band.frequencies.forEach((frequency) => {
				var label = getFrequencyGroupLabel(frequency),
					isSameAsPreviousLabel = label === previousLabel;

				previousLabel = label;

				steps.push({
					label: isSameAsPreviousLabel ? null : label, // Only use each label one time.
					frequency: frequency
				});
			});

			band.dialSteps = steps;
		},
		presetTimer,
		mouseXStart,
		scrollLeftStart;

	$scope.dialStepWidth = 10; // pixels

	$scope.setBand = (bandName) => {
		var newBand = bands[bandName];

		if (newBand === $scope.currentBand) return;

		$scope.currentBand = newBand;
		$scope.setFrequency($scope.currentBand.rangeStart); // TODO: Use last frequency for new band from db. If no frequency in db, automatically seek for initial frequency.
	};
	$scope.setFrequency = (frequency) => {
		var frequencyIndex = $scope.currentBand.frequencies.indexOf(frequency);

		if (frequency === $scope.currentFrequency) return;

		$scope.currentFrequency = frequency;
		// TODO: Store current frequency in db (independently for AM and FM).

		// Set the dial scroll position corresponding to the new frequency.
		if (!isDragging) {
			angular.element('#radio-dial')[0].scrollLeft = frequencyIndex * $scope.dialStepWidth;
		}
	};
	$scope.presetClick = (presetIndex) => {
		var preset = $scope.currentBand.presets[presetIndex];

		if (!preset) return;

		$scope.setFrequency(preset);
	};
	$scope.presetMouseDown = (presetIndex) => {
		presetTimer = $timeout(() => $scope.storePreset(presetIndex), presetDelay);
	};
	$scope.presetMouseUp = (presetIndex) => {
		$timeout.cancel(presetTimer);
	};
	$scope.storePreset = (presetIndex) => {
		$scope.currentBand.presets[presetIndex] = $scope.currentFrequency;
		// TODO: Store preset in db.
	};
	$scope.seekDown = () => {
		// TODO: Implement real seeking (based on signal strength?)
		var freqIndex = $scope.currentBand.frequencies.indexOf($scope.currentFrequency);

		if (freqIndex === 0) return;
		$scope.setFrequency($scope.currentBand.frequencies[freqIndex - 1]);
	};
	$scope.seekUp = () => {
		// TODO: Implement real seeking (based on signal strength?)
		var freqIndex = $scope.currentBand.frequencies.indexOf($scope.currentFrequency);

		if (freqIndex === $scope.currentBand.frequencies.length - 1) return;
		$scope.setFrequency($scope.currentBand.frequencies[freqIndex + 1]);
	};
	$scope.dialDragStart = (event) => {
		isDragging = true;

		// Clear the drag ghost.
		event.originalEvent.dataTransfer.setDragImage(document.createElement('span'), 0, 0);

		// Store some initial values to keep track of how far the dial is dragged.
		mouseXStart = event.originalEvent.clientX;
		scrollLeftStart = event.originalEvent.target.scrollLeft;
	};
	$scope.dialDrag = (event) => {
		var scrollLeft = scrollLeftStart + mouseXStart - event.originalEvent.clientX,
			nearestDialStepScrollLeft = Math.round(scrollLeft / $scope.dialStepWidth) * $scope.dialStepWidth, // Scroll position corresponding to the closest dial step.
			selectedFrequencyIndex;

		// When user stops dragging, snap the dial to the nearest frequency.
		if (event.type === 'dragend') {
			isDragging = false;
			scrollLeft = nearestDialStepScrollLeft;
		}

		// Set the dial scroll position.
		event.originalEvent.target.scrollLeft = scrollLeft;

		// Find the index of the frequency that corresponds to the scrolled position.
		selectedFrequencyIndex = nearestDialStepScrollLeft / $scope.dialStepWidth;
		selectedFrequencyIndex = Math.max(0, selectedFrequencyIndex); // Ensure the index is not less than 0.
		selectedFrequencyIndex = Math.min($scope.currentBand.frequencies.length - 1, selectedFrequencyIndex); // Ensure the index is not greater than the available frequencies.

		// Update the current frequency.
		$scope.setFrequency($scope.currentBand.frequencies[selectedFrequencyIndex]);
	};

	generateFrequencies(bands.am);
	generateFrequencies(bands.fm);
	generateDialSteps(bands.am);
	generateDialSteps(bands.fm);

	$scope.setBand('fm'); // Set the initial band.
});
