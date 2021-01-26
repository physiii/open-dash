import React from 'react';
import './GameBoard.css';
import Toggle from './Switch.js';

const TAG = "[Power]";

export class Power extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			sensors: this.props.sensors,
			displayPower: false,
			mainPower: false,
			audioPower: false,
			ignition: false
		};

		this.setState(this.state);
  }

	componentWillReceiveProps(nextProps) {
	 if(this.props != nextProps) {
		 this.setState({
			 sensors: nextProps.sensors
		 });
	 }
 	}

	toggleDisplayPower () {
		this.state.displayPower = !this.state.displayPower;

		let msg = {type:"power", payload: {set_display_power: this.state.displayPower}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleMainPower () {
		this.state.mainPower = !this.state.mainPower;

		let msg = {type:"power", payload: {set_main_power: this.state.mainPower}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleAudioPower () {
		this.state.audioPower = !this.state.audioPower;

		let msg = {type:"power", payload: {set_audio_power: this.state.audioPower}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	render () {
		return (
			<div>
				<h3>Control</h3>

				<h5>Main Power</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.mainPower}
						showLabels={false}
						onChange={this.toggleMainPower.bind(this)}
						disabled={false} />
						<div style={{width:'30px'}}></div>
				</div>

				<h5>Display Power</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.displayPower}
						showLabels={false}
						onChange={this.toggleDisplayPower.bind(this)}
						disabled={false} />
						<div style={{width:'30px'}}></div>
				</div>

				<h5>Audio Power</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.audioPower}
						showLabels={false}
						onChange={this.toggleAudioPower.bind(this)}
						disabled={false} />
						<div style={{width:'30px'}}></div>
				</div>

				<h3>Sensors</h3>

				<div style={{width:'100%'}}>
					Ignition { this.state.sensors.ignition_wire ? 'on' : 'off' }
				</div>
				<div style={{width:'100%'}}>
					Battery Voltage { this.state.sensors.battery_voltage }
				</div>
				<div style={{width:'100%'}}>
					Main Current { this.state.sensors.main_current }
				</div>
				<div style={{width:'100%'}}>
					Steering Wheel Control { this.state.sensors.wheel }
				</div>
			</div>
		);
	}
}

export default Power;
