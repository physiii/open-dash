const Service = require('./service.js'),
	ContactSensorApi = require('./api/contact-sensor-api.js'),
	DaughterCard = require('../daughter-card.js'),
	database = require('../database.js'),
	config = require('../../config.json'),
	O_KEY_CODE = 79,
	C_KEY_CODE = 67,
	TAG = '[ContactSensorService]';

class ContactSensorService extends Service {
	constructor (data, relay_socket, save) {
		super(data, relay_socket, save, ContactSensorApi);

		this._subscribeToDaughter();

		if (config.use_dev) {
			window.addEventListener('keyup', this._handleKeyUp.bind(this), true);
		}
	}

	_subscribeToDaughter () {
		DaughterCard.on('contact', ({contact}) => this._handleContactChange(contact));
	}

	_handleContactChange (contact) {
		const is_open = contact === 1,
			state_string = is_open ? 'open' : 'closed';

		console.log(TAG, 'Received contact ' + state_string + ' from daughter card.');

		this.state.contact = !is_open;
		this.relayEmit(state_string);
		this._events.emit(state_string);
		this._logAccess(is_open);
	}

	_logAccess (is_open) {
		database.storeAccessLog({
			description : is_open ? 'Opened' : 'Closed',
			contact: this.state.contact,
			date : new Date()
		});
	}

	getAccessLogs () {
		return new Promise((resolve, reject) => {
			database.getAccessLogs().then((logs) => {
				resolve(logs.map((log) => ({
					description : log.description,
					contact: log.contact,
					date : log.date.toISOString()
				})));
			}).catch((error) => {
				console.error(TAG, error);
				reject(error);
			});
		});
	}

	_handleKeyUp (event) {
		if (event.keyCode === O_KEY_CODE && event.shiftKey && event.ctrlKey && event.altKey && !event.metaKey) {
			this._handleContactChange(1);
		} else if (event.keyCode === C_KEY_CODE && event.shiftKey && event.ctrlKey && event.altKey && !event.metaKey) {
			this._handleContactChange(0);
		}
	}
}

ContactSensorService.type = 'contact-sensor';
ContactSensorService.settings_definitions = new Map([...Service.settings_definitions])
	.set('name', {
		type: 'string',
		default_value: 'Bill Acceptor Door'
	});

module.exports = ContactSensorService;
