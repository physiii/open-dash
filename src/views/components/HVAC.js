import React from 'react';
import './GameBoard.css';
import Toggle from './Switch.js';

const TAG = "[HVAC]";

export class HVAC extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			sensors: this.props.sensors,
			controllers: {
				blowerMotor: 0,
				mode: {A: false, B: false},
				leftAirTemp: {A: false, B: false},
				rightAirTemp: {A: false, B: false},
				recirculation: {A: false, B: false},
				rearDefog: false,
				airTempBlower: false,
			}
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

	setBlowerMotor (level) {
		this.state.controllers.blowerMotor = level;

		let msg = {type:"hvac", payload: {set_blower_motor: level}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleMode (mode) {
		if (mode === 'A') this.state.controllers.mode.A = !this.state.controllers.mode.A;
		if (mode === 'B') this.state.controllers.mode.B = !this.state.controllers.mode.B;

		let msg = {type:"hvac", payload: {set_mode: this.state.controllers.mode}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleLeftAirTemp (mode) {
		if (mode === 'A') this.state.controllers.leftAirTemp.A = !this.state.controllers.leftAirTemp.A;
		if (mode === 'B') this.state.controllers.leftAirTemp.B = !this.state.controllers.leftAirTemp.B;

		let msg = {type:"hvac", payload: {set_left_air_temp: this.state.controllers.leftAirTemp}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleRightAirTemp (mode) {
		if (mode === 'A') this.state.controllers.rightAirTemp.A = !this.state.controllers.rightAirTemp.A;
		if (mode === 'B') this.state.controllers.rightAirTemp.B = !this.state.controllers.rightAirTemp.B;

		let msg = {type:"hvac", payload: {set_right_air_temp: this.state.controllers.rightAirTemp}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleRecirculation (mode) {
		if (mode === 'A') this.state.controllers.recirculation.A = !this.state.controllers.recirculation.A;
		if (mode === 'B') this.state.controllers.recirculation.B = !this.state.controllers.recirculation.B;

		let msg = {type:"hvac", payload: {set_recirculation: this.state.controllers.recirculation}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleRearDefog () {
		this.state.controllers.rearDefog = !this.state.controllers.rearDefog;

		let msg = {type:"hvac", payload: {set_rear_defog: this.state.controllers.rearDefog}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleAirTempBlower () {
		this.state.controllers.airTempBlower = !this.state.controllers.airTempBlower;

		let msg = {type:"hvac", payload: {set_air_temp_blower: this.state.controllers.airTempBlower}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	render () {
    const { state } = this.state;
		return (
			<div>
				<h3>Control</h3>

				<h5>Blower</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
				<button
					key="button"
					onClick={ this.setBlowerMotor.bind(this, 0) }
					styleName='button'>off</button>
				<button
					key="button"
					onClick={ this.setBlowerMotor.bind(this, 1) }
					styleName='button'>one</button>
				<button
					key="button"
					onClick={ this.setBlowerMotor.bind(this, 2) }
					styleName='button'>two</button>
				<button
					key="button"
					onClick={ this.setBlowerMotor.bind(this, 3) }
					styleName='button'>three</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 4) }
						styleName='button'>four</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 5) }
						styleName='button'>five</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 6) }
						styleName='button'>six</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 7) }
						styleName='button'>seven</button>

				</div>

				<h5>Mode</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.controllers.mode.A}
						showLabels={false}
						onChange={this.toggleMode.bind(this, 'A')}
						disabled={false} />
						<div style={{width:'30px'}}></div>
					<Toggle
						isOn={this.state.controllers.mode.B}
						showLabels={false}
						onChange={this.toggleMode.bind(this, 'B')}
						disabled={false} />
				</div>

				<h5>Left Air Temperature</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.controllers.leftAirTemp.A}
						showLabels={false}
						onChange={this.toggleLeftAirTemp.bind(this, 'A')}
						disabled={false} />
						<div style={{width:'30px'}}></div>
					<Toggle
						isOn={this.state.controllers.leftAirTemp.B}
						showLabels={false}
						onChange={this.toggleLeftAirTemp.bind(this, 'B')}
						disabled={false} />
				</div>

				<h5>Right Air Temperature</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.controllers.rightAirTemp.A}
						showLabels={false}
						onChange={this.toggleRightAirTemp.bind(this, 'A')}
						disabled={false} />
						<div style={{width:'30px'}}></div>
					<Toggle
						isOn={this.state.controllers.rightAirTemp.B}
						showLabels={false}
						onChange={this.toggleRightAirTemp.bind(this, 'B')}
						disabled={false} />
				</div>

				<h5>Recirculation</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.controllers.recirculation.A}
						showLabels={false}
						onChange={this.toggleRecirculation.bind(this, 'A')}
						disabled={false} />
						<div style={{width:'30px'}}></div>
					<Toggle
						isOn={this.state.controllers.recirculation.B}
						showLabels={false}
						onChange={this.toggleRecirculation.bind(this, 'B')}
						disabled={false} />
				</div>

				<h5>Rear Defog</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.controllers.rearDefog}
						showLabels={false}
						onChange={this.toggleRearDefog.bind(this)}
						disabled={false} />
						<div style={{width:'30px'}}></div>
				</div>

				<h5>Air Temp Blower</h5>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<Toggle
						isOn={this.state.controllers.airTempBlower}
						showLabels={false}
						onChange={this.toggleAirTempBlower.bind(this)}
						disabled={false} />
						<div style={{width:'30px'}}></div>
				</div>

				<h3>Air Temperatures</h3>
				{ this.state.sensors.air_temp ?
					<div>
						<div style={{width:'100%'}}>
							Ambient: { this.state.sensors.air_temp.ambient }
						</div>
						<div style={{width:'100%'}}>
							Inside: { this.state.sensors.air_temp.inside }
						</div>
						<div style={{width:'100%'}}>
							Upper Left { this.state.sensors.air_temp.upper.left }
						</div>
						<div style={{width:'100%'}}>
							Lower Left { this.state.sensors.air_temp.lower.left }
						</div>
						<div style={{width:'100%'}}>
							Upper Right { this.state.sensors.air_temp.upper.right }
						</div>
						<div style={{width:'100%'}}>
							Lower Right { this.state.sensors.air_temp.lower.right }
						</div>
					</div> : ''
				}
				<h3>Light Level</h3>
				{ this.state.sensors.light_level ?
					<div>
						<div style={{width:'100%'}}>
							Ambient: { this.state.sensors.light_level.ambient }
						</div>
						<div style={{width:'100%'}}>
							Driver: { this.state.sensors.light_level.driver }
						</div>
						<div style={{width:'100%'}}>
							Passenger: { this.state.sensors.light_level.passenger }
						</div>
					</div> : ''
				}
			</div>
		);
	}
}

export default HVAC;
