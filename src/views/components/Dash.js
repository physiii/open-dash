import React from 'react';
// import ClickCoordinateReporter from './ClickCoordinateReporter.js';
// import JSMpeg from '../../lib/jsmpeg/jsmpeg.min.js';
// import FfmpegSource from '../../lib/jsmpeg-ffmpeg-source.js';
import './GameBoard.css';

// const getFfmpegOptions = (video_device) => video_device
// 		? [
// 			// '-f', 'alsa',
// 			// '-i', 'hw:0',
// 			'-f', 'v4l2',
// 			'-r', '40',
// 			'-i', video_device,
// 			// '-s', '1024x576',
// 			'-s', '640x360',
// 			'-threads','2',
// 			'-f', 'mpegts',
// 			// '-codec:a', 'mp2',
// 			// '-ar', '44100',
// 			// '-ac', '1',
// 			// '-b:a', '128k',
// 			'-codec:v', 'mpeg1video',
// 			'-b:v', '2000k',
// 			// '-standard', 'PAL',
// 			'-tune', 'zerolatency',
// 			'-strict', '-1',
// 			'pipe:1'
// 		]
// 		// Static mock-up game board stream.
// 		: [
// 			'-f', 'image2',
// 			'-pattern_type', 'none',
// 			'-i', 'src/assets/game-board-mockup.jpg',
// 			'-f', 'mpegts',
// 			'-codec:v', 'mpeg1video',
// 			'-b:v', '2000k',
// 			'-s', '1024x768',
// 			'-strict', '-1',
// 			'pipe:1'
// 		];

export class GameBoard extends React.Component {
	constructor (props) {
		super(props);

		this.canvas = React.createRef();
	}

	componentDidMount () {
		// this.bootstrapPlayer();
	}

	shouldComponentUpdate () {
		return false;
	}

	componentDidUpdate () {
		// this.bootstrapPlayer();
	}

	componentWillUnmount () {
		// this.destroyPlayer();
	}

	render () {
		return (
			<div>
					Hello Dash!
			</div>
		);
	}
}

export default GameBoard;
