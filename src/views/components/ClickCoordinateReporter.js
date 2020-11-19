import React from 'react';
import './ClickCoordinateReporter.css';

export class ClickCoordinateReporter extends React.Component {
	constructor (props) {
		super(props);

		this.element = React.createRef();

		this.handleClick = this.handleClick.bind(this);
	}

	getScaleRatio (width, height) {
		return {
			x: this.props.scaleX ? this.props.scaleX / width : 1,
			y: this.props.scaleY ? this.props.scaleY / height : 1
		};
	}

	getRelativeClickCoordinates (event) {
		const scale_ratio = this.getScaleRatio(this.element.current.offsetWidth, this.element.current.offsetHeight);

		let total_offset_x = 0,
			total_offset_y = 0,
			current_element = this.element.current;

		while (current_element = current_element.offsetParent) {
			total_offset_x += current_element.offsetLeft - current_element.scrollLeft;
			total_offset_y += current_element.offsetTop - current_element.scrollTop;
		}

		return {
			x: Math.round((event.pageX - total_offset_x) * scale_ratio.x),
			y: Math.round((event.pageY - total_offset_y) * scale_ratio.y)
		};
	}

	handleClick (event) {
		const coordinates = this.getRelativeClickCoordinates(event);

		console.log('Click at ' + coordinates.x + 'x' + coordinates.y);

		if (typeof this.props.onClick === 'function') {
			this.props.onClick(coordinates);
		}
	}

	render () {
		return <div styleName="clickArea" onClick={this.handleClick} ref={this.element} />
	}
}

export default ClickCoordinateReporter;
