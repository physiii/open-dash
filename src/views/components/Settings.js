import React from 'react';
import './GameBoard.css';

const TAG = "[Settings]";

export class Settings extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			daughterMessage: "",
			settingsCodes: [],
			settingsCodesCopy: [],
			showOnlyNewCodes: false,
			newCodes: [],
			codeTotal: 0,
			codeTotalRep: 0
		};

		this.props.back.on('settings', (data) => {
			// console.log(TAG, 'Incoming message', data);
			this.state.codeTotalRep++;
			let index = this.state.settingsCodes.findIndex(code => code.settings === data.settings),
				indexNew = this.state.newCodes.findIndex(code => code.settings === data.settings),
				indexCopy = this.state.settingsCodesCopy.findIndex(code => code.settings === data.settings);

			if (index > -1) {
					this.state.settingsCodes[index].count++;
			} else {
				data.count = 1;
				this.state.settingsCodes.push(data);
				this.state.codeTotal++;
			}

			if (indexCopy < 0) {
				if (indexNew > -1) {
						this.state.newCodes[indexNew].count++;
				} else {
					data.count = 1;
					this.state.newCodes.push(data);
				}
			}

			this.setState(this.state)
		});

		this.setState(this.state);
  }

	compare ( a, b ) {
	  if ( a.settings < b.settings ){
	    return -1;
	  }
	  if ( a.settings > b.settings ){
	    return 1;
	  }
	  return 0;
}

	showNewCodes () {
		console.log(TAG, "Showing only new codes.");
		this.state.showOnlyNewCodes = true;
		this.state.newCodes = [];
		this.state.settingsCodesCopy = this.state.settingsCodes;
		this.setState(this.state);
	}

	showAllCodes () {
		console.log(TAG, "Showing all codes.");
		this.state.showOnlyNewCodes = false;
		this.setState(this.state);
	}

	sortCodes () {
		console.log(TAG, "Sorting codes.");
		this.state.settingsCodes.sort(this.compare);
		this.state.newCodes.sort(this.compare);
		this.setState(this.state);
	}

	clearCodes () {
		console.log(TAG, "Clearing codes.");
		this.state.newCodes = [];
		this.state.settingsCodes = [];
		this.state.settingsCodesCopy = [];
		this.setState(this.state);
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
    const { settingsCodes } = this.state;
		return (
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
				<button
					key="button"
					onClick={ this.clearCodes.bind(this) }
					styleName='button'>Clear Codes</button>
				<br />
				Total: { this.state.codeTotal } ({ this.state.codeTotalRep })
				<br />
				<br />

			{!this.state.showOnlyNewCodes ?
				<div>
					{this.state.settingsCodes.map((code) => (
							<div>{code.settings} ({code.count})</div>
					))}
				</div> :
				<div>
					{this.state.newCodes.map((code) => (
							<div>{code.settings} ({code.count})</div>
					))}
				</div>
			}
			</div>
		);
	}
}

export default Settings;
