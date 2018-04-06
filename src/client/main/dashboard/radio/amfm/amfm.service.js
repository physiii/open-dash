angular.module('app').factory('AmfmService', function () {
	var amfm = {},
		bands = {
			am: {
				label: "AM",
				rangeStart: 540,
				rangeEnd: 1710,
				spread: 10,
				frequencies: [],
				presets: [],
			},
			fm: {
				label: "FM",
				rangeStart: 87.5,
				rangeEnd: 107.9,
				spread: 0.2,
				frequencies: [],
				presets: [],
			}
		};

	_generateFrequencies = function (band) {
		var freqs = [];

		for (var freq = band.rangeStart; freq <= band.rangeEnd; freq = freq + band.spread) {
			freq = Math.round(freq * 10) / 10; // Round frequency to one decimal place.
			freqs.push(freq);
		}

		band.frequencies = freqs;
	};

	amfm.isPlaying = false;

	amfm.setBand = (bandName) => {
		var newBand = bands[bandName];

		if (!bands.hasOwnProperty(bandName)) {
			throw new Error(bandName + ' is not a valid band.');
		}
		if (newBand === amfm.band) return;

		amfm.band = newBand;

		if (!amfm.band.frequency) {
			amfm.setFrequency(amfm.band.rangeStart); // TODO: Use last frequency for the band from db. If no frequency in db, automatically seek for initial frequency.
		}
	};
	amfm.setFrequency = (frequency) => {
		if (amfm.band.frequencies.indexOf(frequency) === -1) {
			throw new Error(frequency + ' is not a valid frequency for ' + amfm.band.label + ' band.');
		}
		if (frequency === amfm.band.frequency) return;

		amfm.band.frequency = frequency;
		// TODO: Store current frequency in db (independently for AM and FM).
	};
	amfm.playPause = (shouldPlay) => {
		if (typeof shouldPlay === 'undefined') {
			shouldPlay = amfm.isPlaying ? false : true;
		}

		amfm.isPlaying = shouldPlay;
	};
	amfm.getPreset = (presetIndex) => {
		return amfm.band.presets[presetIndex];
	};
	amfm.setPreset = (presetIndex, frequency) => {
		if (amfm.band.frequencies.indexOf(frequency) === -1) {
			throw new Error(frequency + ' is not a valid frequency for ' + amfm.band.label + ' band.');
		}

		amfm.band.presets[presetIndex] = frequency;
		// TODO: Store preset in db.
	};
	amfm.seekDown = () => {
		// TODO: Implement real seeking (based on signal strength?)
		var frequencyIndex = amfm.band.frequencies.indexOf(amfm.band.frequency);

		if (frequencyIndex === 0) return;
		amfm.setFrequency(amfm.band.frequencies[frequencyIndex - 1]);
	};
	amfm.seekUp = () => {
		// TODO: Implement real seeking (based on signal strength?)
		var frequencyIndex = amfm.band.frequencies.indexOf(amfm.band.frequency);

		if (frequencyIndex === amfm.band.frequencies.length - 1) return;
		amfm.setFrequency(amfm.band.frequencies[frequencyIndex + 1]);
	};

	_generateFrequencies(bands.am);
	_generateFrequencies(bands.fm);
	amfm.setBand('fm'); // Set the initial band. TODO: Load last band set from db.

	return amfm;
});
