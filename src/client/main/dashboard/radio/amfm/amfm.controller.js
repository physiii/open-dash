var app = angular.module('app');

app.controller('AmfmController', function ($scope, $location, $timeout, AmfmService) {
	var presetsCount = 4,
		presetDelay = 2000, // ms
		isDragging = false,
		generateDialSteps = (band) => {
			var steps = [],
				getFrequencyGroupLabel = (frequency) => {
					var label;

					if (band.label === 'AM') {
						label = Math.floor(frequency / 100) * 100;
					} else if (band.label === 'FM') {
						label = Math.floor(frequency);
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

			return steps;
		},
		snapDialScrollToFrequency = (frequency) => {
			var frequencyIndex = AmfmService.band.frequencies.indexOf(frequency);

			angular.element('#radio-dial')[0].scrollLeft = frequencyIndex * $scope.dialStepWidth;
		},
		presetTimer,
		mouseXStart,
		scrollLeftStart;

	$scope.amfm = AmfmService;
	$scope.presetsScaffold = new Array(presetsCount);
	$scope.dialStepWidth = 10; // pixels. TODO: It would be better to just detect the rendered width in DOM.

	$scope.setBand = (bandName) => {
		AmfmService.setBand(bandName);
	};
	$scope.setFrequency = (frequency) => {
		AmfmService.setFrequency(frequency);
	};
	$scope.playPause = (shouldPlay) => {
		AmfmService.playPause(shouldPlay);
	};
	$scope.presetClick = (presetIndex) => {
		var preset = AmfmService.getPreset(presetIndex);

		if (!preset) return;

		$scope.setFrequency(preset);
	};
	$scope.presetMouseDown = (presetIndex) => {
		presetTimer = $timeout(() => $scope.setPreset(presetIndex), presetDelay);
	};
	$scope.presetMouseUp = (presetIndex) => {
		$timeout.cancel(presetTimer);
	};
	$scope.setPreset = (presetIndex) => {
		AmfmService.setPreset(presetIndex, AmfmService.band.frequency);
	};
	$scope.seekDown = () => {
		AmfmService.seekDown();
	};
	$scope.seekUp = () => {
		AmfmService.seekUp();
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
			selectedFrequencyIndex;

		if (event.type === 'dragend') {
			isDragging = false;
		}

		// Set the dial scroll position.
		event.originalEvent.target.scrollLeft = scrollLeft;

		// Find the index of the frequency that corresponds to the scrolled position.
		selectedFrequencyIndex = Math.round(scrollLeft / $scope.dialStepWidth)
		selectedFrequencyIndex = Math.max(0, selectedFrequencyIndex); // Ensure the index is not less than 0.
		selectedFrequencyIndex = Math.min(AmfmService.band.frequencies.length - 1, selectedFrequencyIndex); // Ensure the index is not greater than the available frequencies.

		// Update the current frequency.
		$scope.setFrequency(AmfmService.band.frequencies[selectedFrequencyIndex]);
	};

	// Watch for changes to the band.
	$scope.$watch(() => { return AmfmService.band; }, () => {
		$scope.dialSteps = generateDialSteps(AmfmService.band);
		snapDialScrollToFrequency(AmfmService.band.frequency);
	});

	// Watch for changes to the frequency.
	$scope.$watch(() => { return AmfmService.band.frequency; }, () => {
		if (!isDragging) {
			AmfmService.playPause(true);

			// Set the dial scroll position corresponding to the new frequency.
			// Using timeout to delay to next cycle so this works reliably when switching to this view.
			$timeout(() => {
				snapDialScrollToFrequency(AmfmService.band.frequency);
			}, 0);
		}
	});
});
