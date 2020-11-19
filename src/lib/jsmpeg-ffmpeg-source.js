const utils = require('../utils.js'),
	spawn = require('child_process').spawn,
	CHECK_FFMPEG_DELAY = 5000,
	TAG = '[FfmpegSource]';

class FfmpegSource {
	constructor (video_device, options) {
		this.video_device = video_device;
		this.getFfmpegOptions = options.getFfmpegOptions;
		this.destination = null;

		this.streaming = true;
		this.completed = false;
		this.established = false;
		this.progress = 0;
	}

	connect (destination) {
		this.destination = destination;
	}

	start () {
		this._startFfmpeg();

		// Every so often, check to make sure FFmpeg is still running.
		clearInterval(this.ffmpeg_interval);
		this.ffmpeg_interval = setInterval(() => {
			utils.checkIfProcessIsRunning('ffmpeg', this.video_device).then((is_loopback_running) => {
				if (!is_loopback_running) {
					console.log(TAG, 'FFmpeg not running. Restarting.');

					this._startFfmpeg();
				}
			});
		}, CHECK_FFMPEG_DELAY);
	}

	_startFfmpeg () {
		this.stream = spawn('ffmpeg', this.getFfmpegOptions(this.video_device));

		this.stream.stderr.on('data', (data) => {
			const output = data.toString();

			if (!output.includes('frame=')) {
				console.log(TAG, output);
			}
		});
		this.stream.stdout.on('data', (data) => {
			this.established = true;

			if (this.destination) {
				this.destination.write(data);
			}
		});

		this.stream.on('error', (error) => console.error(TAG, 'Failed to start FFmpeg.', error));
		this.stream.on('exit', (code, signal) => console.log(TAG, 'FFmpeg exited.', code, signal));
	}

	resume () {
		// no-op
	}

	destroy () {
		if (this.stream && this.stream.kill) {
			this.stream.kill();
		}

		clearInterval(this.ffmpeg_interval);
	}
}

module.exports = FfmpegSource;
