import React from 'react';
import {hot} from 'react-hot-loader';
import ArcadeGames from './ArcadeGames.js';
import GameBoard from './GameBoard.js';
import Dash from './Dash.js';
import J1850 from './J1850.js';
import HVAC from './HVAC.js';
import Power from './Power.js';
import Home from './Home.js';
import './App.css';

const GAME_OVER_SCREEN_DELAY = 15000,
	TAG = "[App]";

export class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			hvacSensors: {},
			powerSensors: {},
			showHome: true,
			showHVAC: false,
			showJ1850: false
		};

		this.props.back.on('hvac', (data) => {
			console.log(TAG, 'Incoming hvac message', data);

			this.state.hvacSensors = data;
			this.setState(this.state)
		});

		this.props.back.on('power', (data) => {
			console.log(TAG, 'Incoming power message', data);

			this.state.powerSensors = data;
			this.setState(this.state)
		});
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

  showHome() {
		this.state.showPower = false;
		this.state.showHome = true;
		this.state.showJ1850 = false;
		this.state.showHVAC = false;

		this.setState(this.state);
		console.log(TAG, "Show Home.");
  }

	showHVAC() {
		this.state.showPower = false;
		this.state.showHome = false;
		this.state.showJ1850 = false;
		this.state.showHVAC = true;

		this.setState(this.state);
		console.log(TAG, "Show HVAC.");
  }

	showPower() {
		this.state.showHome = false;
		this.state.showJ1850 = false;
		this.state.showHVAC = false;
		this.state.showPower = true;

		this.setState(this.state);
		console.log(TAG, "Show Power.");
  }

	showJ1850() {
		this.state.showPower = false;
		this.state.showHome = false;
		this.state.showJ1850 = true;
		this.state.showHVAC = false;

		this.setState(this.state);
		console.log(TAG, "Show J1850.");
  }

  handleChange(event) {
		this.setState({daughterMessage: event.target.value});
	}

  handleSubmit(event) {
		this.props.back.emit('daughter', this.state.daughterMessage);
    console.log('A name was submitted: ' + this.state.daughterMessage);
    event.preventDefault();
  }

	render () {
		return (
			<div styleName="container">

				{this.state.showHome ?
					<div>
						<div>
							<input
								type='text'
								style={{width:'85%', height:'30px'}}
								value={this.state.daughterMessage}
								onChange={this.handleChange.bind(this)} />
							<button
								key="button"
								style={{width:'10%', height:'35px'}}
								onClick={this.handleSubmit.bind(this)}
								styleName='button'>send</button>
						</div>
						<button
							key="button"
							onClick={ this.showPower.bind(this) }
							styleName='button'>Power</button>
						<button
							key="button"
							onClick={ this.showHVAC.bind(this) }
							styleName='button'>HVAC</button>
						<button
							key="button"
							onClick={ this.showJ1850.bind(this) }
							styleName='button'>J1850</button>
					</div> : ''
				}

				{!this.state.showHome ?
					<div>
						<button
							key="button"
							onClick={ this.showHome.bind(this) }
							style={{width:'100%'}}>Home</button>
						{this.state.showHVAC ? <HVAC		back={this.props.back} sensors={this.state.hvacSensors} /> : ''}
						{this.state.showPower ? <Power 	back={this.props.back} sensors={this.state.powerSensors} /> : ''}
						{this.state.showJ1850 ? <J1850	back={this.props.back} /> : ''}
					</div> : ''
				}


			</div>
		);
	}
}

export default hot(module)(App);
