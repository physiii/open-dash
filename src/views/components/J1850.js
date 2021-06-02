import React from 'react';
import './HVAC.css';

const TAG = "[J1850]";

export class J1850 extends React.Component {
	constructor (props) {
		super(props);

		this.state = this.props.j1850State;

		this.setState(this.state);
  }

	render () {
    const { j1850Codes } = this.state;
		return (
			<div>
				<div style={{width:'100%', display:'flex', flexFlow: 'row nowrap'}}>
					<button
						key="button"
						onClick={ () => this.props.showAllCodes()  }
						styleName='blowerButtonLeft'>Show All Codes</button>
					<button
						key="button"
						onClick={ () => this.props.showNewCodes()  }
						styleName='blowerButton'>Show New Codes</button>
					<button
						key="button"
						onClick={ () => this.props.sortCodes()  }
						styleName='blowerButton'>Sort Codes</button>
					<button
						key="button"
						onClick={ () => this.props.clearCodes()  }
						styleName='blowerButtonRight'>Clear Codes</button>
				</div>
				<br />
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
