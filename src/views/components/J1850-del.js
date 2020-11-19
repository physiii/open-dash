import React from 'react';
import './GameBoard.css';

const TAG = "[J1850]";

export class J1850 extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			j1850Codes: [{ j1850: 'FFFFFFFF', bits: 48 }]
		};

		this.props.back.on('j1850', (data) => {
			console.log(TAG, 'Incoming message', data);
			this.state.j1850Codes.push(data);
			this.setState(this.state)
		});

		this.setState(this.state);
  }

	render () {
    const { j1850Codes } = this.state;
		return (
			<div>


				{this.state.j1850Codes.map((code) => (
						<div>{code.j1850}</div>
				))}

					Hello J1850!
					<br />

			</div>
		);
	}
}

export default J1850;
