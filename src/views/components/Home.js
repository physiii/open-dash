import React from 'react';
import './GameBoard.css';

const TAG = "[Home]";

export class Home extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			daughterMessage: "",
			HVACCodes: [],
			HVACCodesCopy: [],
			showOnlyNewCodes: false,
			newCodes: [],
			codeTotal: 0,
			codeTotalRep: 0
		};

		this.props.back.on('home', (data) => {
			console.log(TAG, 'Incoming message', data);

			this.setState(this.state)
		});
		this.setState(this.state);
  }

	render () {
    const { state } = this.state;
		return (
			<div>
				Home VIEW
			</div>
		);
	}
}

export default Home;
