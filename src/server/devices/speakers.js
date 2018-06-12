// ------------------------------  OPEN-DASH ----------------------------------- //
// -----------------  https://github.com/physiii/open-dash/devices  -------------------- //
// ---------------------------------- speakers.js --------------------------------------- //

//module for system (master) volume controls
const driver = require('./speakers-driver-alsa.js'),
	spawn = require('child_process').spawn,
	can = require('./can/can.js'),
	VOLUME_INCREMENT = 5, // 0-100
	VOLUME_HOLD_DELAY = 300,
	// The first number is the number of milliseconds it should take to go from 0 to 100.
	VOLUME_HOLD_INTERVAL_DELAY = 1000 / (100 / VOLUME_INCREMENT);

let volume_hold_timer, volume_hold_interval;

module.exports = {
	getVolume,
	setVolume,
	raiseVolume,
	lowerVolume,
	getMuted,
	setMuted,
	toggleMuted,
	muteXdoTool,
	play,
	next
}

// Handle volume CAN events.
can.on('volume-up', () => {
	setMuted(false);
	raiseVolume();
	startVolumeHold(raiseVolume);
});
can.on('volume-down', () => {
	setMuted(false);
	lowerVolume();
	startVolumeHold(lowerVolume);
});
can.on('volume-up-end', stopVolumeHold);
can.on('volume-down-end', stopVolumeHold);
can.on('volume-mute', () => {
	toggleMuted();
});

function startVolumeHold (volumeFunction) {
	// After a delay to prevent double volume changes on single button presses,
	// start raising/lowering the volume repeatedly.
	volume_hold_timer = setTimeout(() => {
		volume_hold_interval = setInterval(volumeFunction, VOLUME_HOLD_INTERVAL_DELAY);
	}, VOLUME_HOLD_DELAY);
}

function stopVolumeHold () {
	clearTimeout(volume_hold_timer);
	clearInterval(volume_hold_interval);
}

function getVolume () {
	return new Promise((resolve, reject) => {
		driver.getVolume((error, volume) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(volume);
		});
	});
}

//volume range is 0-100

function setVolume (volume) {
	return new Promise((resolve, reject) => {
		driver.setVolume(volume, (error) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(volume);
		});
	});
}

function raiseVolume (increment=VOLUME_INCREMENT) {
	return new Promise((resolve, reject) => {
		 getVolume().then((volume) => {
			driver.setVolume(volume + increment, (error) => {
					if (error) {
						reject(error);
						return;
					}

					resolve(volume);
			});
		 });
	});
}

function lowerVolume (increment=VOLUME_INCREMENT) {
	return new Promise((resolve, reject) => {
		getVolume().then((volume) => {
			driver.setVolume(volume - increment, (error) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(volume);
			});
		});
	});
}

function getMuted () {
	return new Promise((resolve, reject) => {
		driver.getMuted((error, is_muted) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(is_muted);
		});
	});
}

function setMuted (should_mute) {
	return new Promise((resolve, reject) => {
		driver.setMuted(should_mute, (error) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(should_mute);
		});
	});
}

function toggleMuted () {
	return new Promise((resolve, reject) => {
		getMuted().then((is_muted) => {
			driver.setMuted(!is_muted, (error) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(!is_muted);
			});
		});
	});
}

function muteXdoTool () {
	return new Promise((resolve, reject) => {
		spawn('xdotool', ['key', 'XF86AudioMute']);
		resolve(true);
	});
};

// TODO: functions play, pause, resume, next should be in media player
function play () {
	return new Promise((resolve, reject) => {
		spawn('xdotool', ['key', 'XF86AudioPlay']);
		resolve(true);
	});
};

function next () {
	return new Promise((resolve, reject) => {
		spawn('xdotool', ['key', 'XF86AudioNext']);
		resolve(true);
	});
};
