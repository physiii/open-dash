const uuid = require('uuid/v4'),
	Database = require('./database.js'),
	config = require('../config.json'),
	io = require('socket.io-client'),
	GuiApi = require('./gui-api.js'),
	Gui = require('./views/gui.js').default,
	relayUrl = (config.use_ssl ? 'https' : 'http') + '://' + config.relay_server + ':' + config.relay_port,
	noOp = () => {},
	TAG = '[Dash]',
	RELAY_RECONNECT_DELAY = 10000;

class Dash {
	constructor (data = {}) {
		this.save = this.save.bind(this);
		this.connectToBackend = this.connectToBackend.bind(this);
		this.handleServiceChange = this.handleServiceChange.bind(this);

		this.save();

		this.connectToBackend();
		this.initGui();
	}

	initGui () {
		this.gui_api = new GuiApi(this.generateGuiState(), {
			// play: this.game_machine.onPlay,
			// playDone: this.game_machine.onPlayDone,
			// gameBoardClick: this.game_machine.emulateGameBoardTap
		});
		this.gui_api.back = this.relay_socket;
		this.gui = new Gui(this.gui_api);

		// this.game_machine.on('settings-changed', this.handleServiceChange);
		// this.bill_acceptor.on('settings-changed', this.handleServiceChange);
		// this.contact_sensor.on('settings-changed', this.handleServiceChange);
		// this.game_machine.on('state-changed', this.handleServiceChange);
		// this.bill_acceptor.on('state-changed', this.handleServiceChange);
		// this.contact_sensor.on('state-changed', this.handleServiceChange);
	}

	handleServiceChange () {
		this.save();
		this.updateGuiState();
	}

	updateGuiState () {
		this.gui_api.setState(this.generateGuiState());
	}

	generateGuiState () {
		return {
			// active_game: this.game_machine.settings.active_game,
			// arcade_game: this.game_machine.settings.arcade_game,
			// credit: this.game_machine.state.arcade_credit,
			// price: this.game_machine.settings.price,
			// credit_ratio: this.game_machine.settings.credit_ratio
		};
	}

	saveSetting (property, value) {
		return new Promise((resolve, reject) => {
			const original_settings = this.settings;

			if (property === 'name') {
				this.settings.name = value;
			} else {
				resolve();
				return;
			}

			this.save().then(resolve).catch(() => {
				this.settings = original_settings;

				reject('There was an error storing the new settings.');
			});
		});
	}

	saveSettings (new_settings = this.settings) {
		return new Promise((resolve, reject) => {
			const original_settings = this.settings;

			this.settings = {
				name: new_settings.name
			};

			this.save().then(resolve).catch(() => {
				this.settings = original_settings;

				reject('There was an error storing the new settings.');
			});
		});
	}

	connectToBackend () {
		const socket = io('http://127.0.0.1:3030');
		socket.on('connect', function(){
			console.log("Client connected to server!");
		});
		socket.on('event', function(data){});
		socket.on('disconnect', function(){});
	}

	connectToBackend () {
		if (this.relay_socket) {
			this.relay_socket.disconnect();
			this.relay_socket.removeAllListeners();
		}

		this.relay_socket = this.createDeviceSocket();
	}

	save () {
		return new Promise((resolve, reject) => {
			Database.storeDevice(this).then(resolve).catch(reject);
		});
	}

	createDeviceSocket () {
		console.log(TAG, "Connecting to ", relayUrl);
		const socket = io(relayUrl);

		socket.on('connect', () => console.log(TAG, 'Device connected to relay.'));
		socket.on('disconnect', (reason) => console.log(TAG, 'Device was disconnected from relay. (' + reason + ')'));
		socket.on('reconnect_failed', () => console.log(TAG, 'Device failed to reconnect to relay.'));
		socket.on('connect_error', (error) => console.error(TAG, 'Error connecting device to relay:', error.type, error.description));
		socket.on('msgWelcome', (data) => console.error(TAG, 'Incoming message', data));

		return socket;
	}
}

Dash.settings_definitions = new Map()
	.set('name', {
		type: 'string',
		default_value: 'Game Machine'
	});

module.exports = Dash;
