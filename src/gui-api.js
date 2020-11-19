const EventEmitter = require('events');

class GuiApi extends EventEmitter {
	constructor (state = {}, methods) {
		super();

		this.state = state;
		this.methods = methods;
	}

	setState (state) {
		this.state = state;
		this.onChange();
	}

	onChange () {
		this.emit('change', this.state);
	}
}

module.exports = GuiApi;
