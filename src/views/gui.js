import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import config from '../../config.json';
import 'normalize-css';
// import './styles/main.css';

const TAG = "[Gui]";

export default class Gui {
	constructor (api) {
		// this.back = back;
		this.api = api;

		this.container = document.getElementById('dash');

		this.api.on('change', this.render.bind(this));

		this.render();

	}

	render () {
		ReactDOM.render(
			<App
				{...this.api.state}
				api={this.api.methods}
				back={this.api.back}
				gameBoardVideoDevice={config.game_board_video_device}
				gameBoardResolutionX={config.game_board_resolution_x}
				gameBoardResolutionY={config.game_board_resolution_y} />,
			this.container
		);
	}
}
