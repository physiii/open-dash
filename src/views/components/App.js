import React from 'react';
import {hot} from 'react-hot-loader';
import ArcadeGames from './ArcadeGames.js';
import GameBoard from './GameBoard.js';
import Dash from './Dash.js';
import J1850 from './J1850.js';
import Settings from './Settings.js';
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
			showSettings: false,
			showJ1850: false,
			j1850State: {
				daughterMessage: "",
				j1850Codes: [],
				j1850CodesCopy: [],
				showOnlyNewCodes: false,
				newCodes: [],
				codeTotal: 0,
				codeTotalRep: 0
			}
		};

		this.showAllCodes = this.showAllCodes.bind(this);
		this.showNewCodes = this.showNewCodes.bind(this);
		this.sortCodes = this.sortCodes.bind(this);
		this.clearCodes = this.clearCodes.bind(this);


		this.props.back.on('hvac', (data) => {
			console.log(TAG, 'Incoming hvac message', data);

			// this.state.hvacSensors = data;
			// this.setState(this.state)
		});

		this.props.back.on('power', (data) => {
			console.log(TAG, 'Incoming power message', data);

			// this.state.powerSensors = data;
			// this.setState(this.state)
		});

		this.props.back.on('j1850', (data) => {
			console.log(TAG, 'Incoming message', data);
			this.state.j1850State.codeTotalRep++;
			let index = this.state.j1850State.j1850Codes.findIndex(code => code.j1850 === data.j1850),
				indexNew = this.state.j1850State.newCodes.findIndex(code => code.j1850 === data.j1850),
				indexCopy = this.state.j1850State.j1850CodesCopy.findIndex(code => code.j1850 === data.j1850);

			if (index > -1) {
					this.state.j1850State.j1850Codes[index].count++;
			} else {
				data.count = 1;
				this.state.j1850State.j1850Codes.push(data);
				this.state.j1850State.codeTotal++;
			}

			if (indexCopy < 0) {
				if (indexNew > -1) {
						this.state.j1850State.newCodes[indexNew].count++;
				} else {
					data.count = 1;
					this.state.j1850State.newCodes.push(data);
				}
			}

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
		this.state.showSettings = false;
		this.state.showHVAC = false;

		this.setState(this.state);
		console.log(TAG, "Show Home.");
  }

	showHVAC() {
		this.state.showPower = false;
		this.state.showHome = false;
		this.state.showSettings = false;
		this.state.showHVAC = true;

		this.setState(this.state);
		console.log(TAG, "Show HVAC.");
  }

	showPower() {
		this.state.showHome = false;
		this.state.showSettings = false;
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
		this.state.showSettings = false;

		this.setState(this.state);
		console.log(TAG, "Show J1850.");
  }

	showSettings() {
		this.state.showPower = false;
		this.state.showHome = false;
		this.state.showJ1850 = false;
		this.state.showHVAC = false;
		this.state.showSettings = true;

		this.setState(this.state);
		console.log(TAG, "Show Settings.");
	}

	showNewCodes () {
		console.log(TAG, "Showing only new codes.");
		this.state.j1850State.showOnlyNewCodes = true;
		this.state.j1850State.newCodes = [];
		this.state.j1850State.j1850CodesCopy = this.state.j1850State.j1850Codes;
		this.setState(this.state.j1850State);
	}

	showAllCodes () {
		console.log(TAG, "Showing all codes.");
		this.state.j1850State.showOnlyNewCodes = false;
		this.setState(this.state.j1850State);
	}

	clearCodes () {
		console.log(TAG, "Clearing codes.");
		this.state.j1850State.newCodes = [];
		this.state.j1850State.j1850Codes = [];
		this.state.j1850State.j1850CodesCopy = [];
		this.setState(this.state.j1850State);
	}

	compare ( a, b ) {
		if ( a.j1850 < b.j1850 ){
			return -1;
		}
		if ( a.j1850 > b.j1850 ){
			return 1;
		}
		return 0;
	}

	sortCodes () {
		console.log(TAG, "Sorting codes.");
		this.state.j1850State.j1850Codes.sort(this.compare);
		this.state.j1850State.newCodes.sort(this.compare);
		this.setState(this.state.j1850State);
	}

	render () {
		return (
			<div styleName="container">

				{this.state.showHome ?
					<div>
						<button
							key="button"
							onClick={ this.showPower.bind(this) }
							styleName='mainButton'>Power</button>
						<button
							key="button"
							onClick={ this.showHVAC.bind(this) }
							styleName='mainButton'>HVAC</button>
						<button
							key="button"
							onClick={ this.showJ1850.bind(this) }
							styleName='mainButton'>J1850</button>
						<button
							key="button"
							onClick={ this.showSettings.bind(this) }
							styleName='mainButton'>Settings</button>
					</div> : ''
				}

				{!this.state.showHome ?
					<div>
						<button
							key="button"
							onClick={ this.showHome.bind(this) }
							styleName="headerBar">Home</button>
						{this.state.showHVAC ?  <HVAC back={this.props.back} sensors={this.state.hvacSensors} /> : ''}
						{this.state.showPower ? <Power back={this.props.back} sensors={this.state.powerSensors} /> : ''}
						{this.state.showJ1850 ?
							<J1850
								back={this.props.back}
								j1850State={this.state.j1850State}
								showNewCodes={this.showNewCodes}
								showAllCodes={this.showAllCodes}
								clearCodes={this.clearCodes}
								sortCodes={this.sortCodes}
							/> : ''}
						{this.state.showSettings ? <Settings	back={this.props.back} sensors={this.state.hvacSensors}/> : ''}
					</div> : ''
				}


			</div>
		);
	}
}

export default hot(module)(App);
