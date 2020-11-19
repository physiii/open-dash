import React from 'react';
import {hot} from 'react-hot-loader';
import ArcadeGames from './ArcadeGames.js';
import GameBoard from './GameBoard.js';
import Dash from './Dash.js';
import J1850 from './J1850.js';
import './App.css';

const GAME_OVER_SCREEN_DELAY = 15000,
	TAG = "[App]";

export class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {is_playing: false};
	}

	componentWillUnmount () {
		clearTimeout(this.timeout);
	}

	handlePlay () {
		console.log('PLAY');

		clearTimeout(this.timeout);

		this.setState({is_playing: true});
		this.props.api.play();
	}

	render () {
		const has_enough_credits = this.props.credit >= this.props.price;

		return (
			<div styleName="container">
					<J1850
						back={this.props.back}
						/>
			</div>
		);
	}
}

export default hot(module)(App);
