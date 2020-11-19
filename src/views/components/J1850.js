import React from 'react';
import './GameBoard.css';

const TAG = "[J1850]";

export class J1850 extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			j1850Codes: [],
			showOnlyNewCodes: false,
			newCodes: [],
			codeTotal: 0,
			codeTotalRep: 0
		};

		this.props.back.on('j1850', (data) => {
			// console.log(TAG, 'Incoming message', data);
			this.state.codeTotalRep++;
			let index = this.state.j1850Codes.findIndex(code => code.j1850 === data.j1850);
			if (index > -1) {
					this.state.j1850Codes[index].count++;
					this.state.newCodes[index].count++;
			} else {
				data.count = 1;
				this.state.j1850Codes.push(data);
				this.state.newCodes.push(data);
				this.state.codeTotal++;
			}
			this.setState(this.state)
		});

		this.setState(this.state);
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

	showNewCodes () {
		console.log(TAG, "Showing only new codes.");
		this.state.showOnlyNewCodes = true;
		this.state.newCodes = [];
		this.setState(this.state);
	}

	showAllCodes () {
		console.log(TAG, "Showing all codes.");
		this.state.showOnlyNewCodes = false;
		this.setState(this.state);
	}

	sortCodes () {
		console.log(TAG, "Sorting codes.");
		this.state.j1850Codes.sort(this.compare);
		this.state.newCodes.sort(this.compare);
		this.setState(this.state);
	}

	render () {
    const { j1850Codes } = this.state;
		return (
			<div>
			<button
				key="button"
				onClick={ this.showAllCodes.bind(this) }
				styleName='button'>Show All Codes</button>
			<button
				key="button"
				onClick={ this.showNewCodes.bind(this) }
				styleName='button'>Show New Codes</button>
			<button
				key="button"
				onClick={ this.sortCodes.bind(this) }
				styleName='button'>Sort Codes</button>
			Total: { this.state.codeTotal } ({ this.state.codeTotalRep })
			<br />
			<br />

			{!this.state.showOnlyNewCodes ?
				<div>
					{this.state.j1850Codes.map((code) => (
							<div>{code.j1850} ({code.count})</div>
					))}
				</div> :
				<div>
					{this.state.newCodes.map((code) => (
							<div>{code.j1850} ({code.count})</div>
					))}
				</div>
			}
			</div>
		);
	}
}

export default J1850;
