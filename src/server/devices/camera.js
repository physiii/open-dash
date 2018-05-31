const constant = require('../../constants.js'),
	spawn = require('child_process').spawn,
	ffmpeg_process_list = {},
	TAG = '[camera.js]';

module.exports = {
	startStream,
	stopStream
};

function startStream (camera) {
	const ffmpeg_process = spawn('ffmpeg', [
		'-loglevel', 'panic',
		'-f', 'v4l2',
		'-i', camera,
		'-f', 'mpegts',
		'-codec:v', 'mpeg1video',
		'-b:v', '800k',
		'-strict', '-1',
		'http://127.0.0.1:' + constant.VIDEO_STREAM_PORT + '/' + getCameraName(camera)
	]);

	ffmpeg_process_list[camera] = ffmpeg_process;

	ffmpeg_process.on('close', (code) => {
		stopStream(camera);
		console.log(TAG, `Child process exited with code ${code}`);
	});
}

function stopStream (camera) {
	const ffmpeg_process = ffmpeg_process_list[camera];

	if (!ffmpeg_process) {
		return;
	}

	ffmpeg_process.kill();
	delete ffmpeg_process_list[camera];
}

function getCameraName (camera) {
	return camera.split('/')[2];
}
