import React from 'react';
import './HVAC.css';
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

		let msg = {eventType:"hvac", payload: {set_blower_motor: level}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleMode (mode) {
		if (mode === 'A') this.state.controllers.mode.A = !this.state.controllers.mode.A;
		if (mode === 'B') this.state.controllers.mode.B = !this.state.controllers.mode.B;

		let msg = {eventType:"hvac", payload: {set_mode: this.state.controllers.mode}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleLeftAirTemp (mode) {
		if (mode === 'A') this.state.controllers.leftAirTemp.A = !this.state.controllers.leftAirTemp.A;
		if (mode === 'B') this.state.controllers.leftAirTemp.B = !this.state.controllers.leftAirTemp.B;

		let msg = {eventType:"hvac", payload: {set_left_air_temp: this.state.controllers.leftAirTemp}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleRightAirTemp (mode) {
		if (mode === 'A') this.state.controllers.rightAirTemp.A = !this.state.controllers.rightAirTemp.A;
		if (mode === 'B') this.state.controllers.rightAirTemp.B = !this.state.controllers.rightAirTemp.B;

		let msg = {eventType:"hvac", payload: {set_right_air_temp: this.state.controllers.rightAirTemp}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleRecirculation (mode) {
		if (mode === 'A') this.state.controllers.recirculation.A = !this.state.controllers.recirculation.A;
		if (mode === 'B') this.state.controllers.recirculation.B = !this.state.controllers.recirculation.B;

		let msg = {eventType:"hvac", payload: {set_recirculation: this.state.controllers.recirculation}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleRearDefog () {
		this.state.controllers.rearDefog = !this.state.controllers.rearDefog;

		let msg = {eventType:"hvac", payload: {set_rear_defog: this.state.controllers.rearDefog}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	toggleAirTempBlower () {
		this.state.controllers.airTempBlower = !this.state.controllers.airTempBlower;

		let msg = {eventType:"hvac", payload: {set_air_temp_blower: this.state.controllers.airTempBlower}}
		this.props.back.emit('daughter', JSON.stringify(msg));
		this.setState(this.state);
	}

	render () {
    const { state } = this.state;
		return (
			<div>
				<div styleName='titleText'>Inside: 72 | Outside: 72</div>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 0) }
						styleName='blowerButtonLeft'>off</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 7) }
						styleName='blowerButton'>one</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 6) }
						styleName='blowerButton'>two</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 5) }
						styleName='blowerButton'>three</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 4) }
						styleName='blowerButton'>four</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 3) }
						styleName='blowerButton'>five</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 2) }
						styleName='blowerButton'>six</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 1) }
						styleName='blowerButtonRight'>seven</button>
				</div>

				<div style={{margin: '30px 0px 0px 0px', width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 0) }
						styleName='blowerButtonLeft'>lower</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 7) }
						styleName='blowerButton'>upper</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 7) }
						styleName='blowerButton'>lower+upper</button>
					<button
						key="button"
						onClick={ this.setBlowerMotor.bind(this, 6) }
						styleName='blowerButtonRight'>defrost</button>
				</div>



				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>


					<div styleName='titleTextSub'>70 / 72
						<div style={{width:'100%', display:'flex'}}>
							<button
								key="button"
								onClick={ this.setBlowerMotor.bind(this, 0) }
								styleName='blowerButtonLeft'>cold</button>
							<button
								key="button"
								onClick={ this.setBlowerMotor.bind(this, 7) }
								styleName='blowerButton'>off</button>
							<button
								key="button"
								onClick={ this.setBlowerMotor.bind(this, 6) }
								styleName='blowerButtonRight'>hot</button>
						</div>
					</div>


					<div styleName='titleTextSub'>70 / 72
						<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
							<button
								key="button"
								onClick={ this.setBlowerMotor.bind(this, 0) }
								styleName='blowerButtonLeft'>cold</button>
							<button
								key="button"
								onClick={ this.setBlowerMotor.bind(this, 7) }
								styleName='blowerButton'>off</button>
							<button
								key="button"
								onClick={ this.setBlowerMotor.bind(this, 6) }
								styleName='blowerButtonRight'>hot</button>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default HVAC;
