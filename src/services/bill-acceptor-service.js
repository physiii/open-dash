const Service = require('./service.js'),
	BillAcceptorApi = require('./api/bill-acceptor-api.js'),
	DaughterCard = require('../daughter-card.js'),
	database = require('../database.js'),
	config = require('../../config.json'),
	spawn = require('child_process').spawn,
	BILL_CODES = {
		'1' : 1,
		'3' : 5,
		'4' : 10,
		'5' : 20,
		'6' : 50,
		'7' : 100
	},
	BILL_CODE_KEY_CODES = {
		'1' : 49,
		'3' : 51,
		'4' : 52,
		'5' : 53,
		'6' : 54,
		'7' : 55
	},
	ZERO_KEY_CODE = 48,
	TAG = '[BillAcceptorService]';

class BillAcceptorService extends Service {
	constructor (data = {state: {}}, relay_socket, save) {
		data.state.hopper_total = data.state.hopper_total || 0;

		super(data, relay_socket, save, BillAcceptorApi);

		this._handleHopperEmptied = this._handleHopperEmptied.bind(this);

		this._startBillRead();
		this._subscribeToDaughter();

		if (config.use_dev) {
			// window.addEventListener('keyup', this._handleKeyUp.bind(this), true);
		}
	}

	_startBillRead () {
		const bill_read_process = spawn('python', [config.acceptor_dir, config.bill_acceptor_port]);

		bill_read_process.stdout.on('data', (data) => {
			if (!data) {
				return;
			}

			const bill = data.toString().match(/Credit# ([1-7])/)[1];

			if (bill) {
				this._handleBillAccepted(BILL_CODES[bill]);
			}
		});

		bill_read_process.stderr.on('data', (data) => console.log(TAG, 'Bill Error:', data.toString()));
	}

	_subscribeToDaughter () {
		DaughterCard.on('hopper-emptied', this._handleHopperEmptied);
	}

	_handleBillAccepted (denomination) {
		const description = ' Bill Accepted - $' + denomination;

		console.log(TAG, description);

		this.state.hopper_total += denomination;

		this._events.emit('accepted', {denomination});
		this.relayEmit('accepted', {denomination});

		database.storeBillLog({
			description,
			event: 'accepted',
			denomination,
			date: new Date()
		});
	}

	_handleHopperEmptied () {
		console.log(TAG, 'Hopper Emptied');

		database.storeBillLog({
			description: 'Hopper Emptied - $' + this.state.hopper_total,
			event: 'hopper-emptied',
			total: this.state.hopper_total,
			date: new Date()
		});

		this.state.hopper_total = 0;
		this.state.hopper_last_emptied = new Date();

		this._events.emit('hopper-emptied');
		this.relayEmit('hopper-emptied');
	}

	getBillLogs () {
		return new Promise((resolve, reject) => {
			database.getBillLogs().then((bill_logs) => {
				resolve(bill_logs.map((log) => ({
					description: log.description,
					denomination: log.denomination,
					date: log.date.toISOString()
				})));
			}).catch((error) => {
				console.error(TAG, error);
				reject(error);
			});
		});
	}

	_handleKeyUp (event) {
		Object.keys(BILL_CODES).forEach((bill_code) => {
			if (event.keyCode === BILL_CODE_KEY_CODES[bill_code] && event.shiftKey && event.ctrlKey && event.altKey && !event.metaKey) {
				console.error("Key Code Entered for Bill Acceptor");
				this._handleBillAccepted(BILL_CODES[bill_code]);
			}
		});

		if (event.keyCode === ZERO_KEY_CODE && event.shiftKey && event.ctrlKey && event.altKey && !event.metaKey) {
			this._handleHopperEmptied();
		}
	}

	relaySerialize () {
		const serialized = Service.prototype.relaySerialize.call(this);

		return {
			...serialized,
			state: {
				...serialized.state,
				hopper_last_emptied: serialized.state.hopper_last_emptied && serialized.state.hopper_last_emptied.toISOString()
			}
		};
	}
}

BillAcceptorService.type = 'bill-acceptor';
BillAcceptorService.settings_definitions = new Map([...Service.settings_definitions])
	.set('name', {
		type: 'string',
		default_value: 'Bill Acceptor'
	});

module.exports = BillAcceptorService;
