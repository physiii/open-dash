const Service = require('./service.js'),
	GameMachineApi = require('./api/game-machine-api.js'),
	DaughterCard = require('../daughter-card.js'),
	MicrotouchEmulator = require('../microtouch-emulator.js'),
	config = require('../../config.json'),
	utils = require('../utils.js'),
	FOB_BUTTON_TO_ACTIVE_GAME = {
		'A': 'arcade',
		'B': 'game-board'
	},
	SPIN_REELS_BUTTON_X = 790,
	SPIN_REELS_BUTTON_Y = 710,
	BET_BUTTON_X = 590,
	BET_BUTTON_Y = 710,
	A_KEY_CODE = 65,
	B_KEY_CODE = 66,
	PLUS_KEY_CODE = 187,
	MINUS_KEY_CODE = 189,
	TAG = '[GameMachineService]';

class GameMachineService extends Service {
	constructor (data = {state: {}}, relay_socket, save) {
		data.state.arcade_credit = data.state.arcade_credit || 0;
		data.state.arcade_being_played = false;

		super(data, relay_socket, save, GameMachineApi);

		this.onPlay = this.onPlay.bind(this);
		this.onPlayDone = this.onPlayDone.bind(this);
		this.emulateGameBoardTap = this.emulateGameBoardTap.bind(this);

		this.touchscreen_emulator = new MicrotouchEmulator(config.game_board_resolution_x, config.game_board_resolution_y);

		this._subscribeToDaughter();

		if (config.use_dev) {
			window.addEventListener('keyup', this._handleKeyUp.bind(this), true);
		}
	}

	_subscribeToDaughter () {
		DaughterCard.on('fob', this._handleFobButton.bind(this));
		DaughterCard.on('spin-reels-pressed', this._handleSpinReelsHardwareButton.bind(this));
		DaughterCard.on('bet-pressed', this._handleBetHardwareButton.bind(this));
	}

	_handleFobButton (data) {
		console.log(TAG, 'FOB button ' + data.button);

		this.saveSetting('active_game', FOB_BUTTON_TO_ACTIVE_GAME[data.button]);
	}

	_handleSpinReelsHardwareButton () {
		console.log(TAG, 'Spin reels hardware button pressed');

		this.emulateGameBoardTap(SPIN_REELS_BUTTON_X, SPIN_REELS_BUTTON_Y);
	}

	_handleBetHardwareButton () {
		console.log(TAG, 'Bet hardware button pressed');

		this.emulateGameBoardTap(BET_BUTTON_X, BET_BUTTON_Y);
	}

	onBillAccepted (denomination) {
		this.addCredit(denomination);
	}

	addCredit (dollar_value) {
		return new Promise ((resolve, reject) => {
			if (this.settings.active_game === 'game-board') {
				DaughterCard.send('bill', dollar_value).then(resolve).catch(() => reject('There was an error adding credit to the game board.'));
			} else if (this.settings.active_game === 'arcade') {
				this.addArcadeCredit(dollar_value * (this.settings.credit_ratio || 0));
				resolve();
			}
		});
	}

	addArcadeCredit (amount) {
		this.state.arcade_credit += amount;
	}

	useArcadeCredit (amount) {
		this.state.arcade_credit = Math.max(this.state.arcade_credit - amount, 0);
	}

	onPlay () {
		this.state.arcade_being_played = true;
		this.useArcadeCredit(this.settings.price);
	}

	onPlayDone () {
		this.state.arcade_being_played = false;
	}

	emulateGameBoardTap (x, y) {
		this.touchscreen_emulator.tap(x, y);
	}

	_handleKeyUp (event) {
		if (event.keyCode === PLUS_KEY_CODE && event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
			this.addArcadeCredit(this.settings.price);
		} else if (event.keyCode === MINUS_KEY_CODE && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
			this.useArcadeCredit(this.state.arcade_credit);
		} else if (event.keyCode === A_KEY_CODE && event.shiftKey && event.ctrlKey && event.altKey && !event.metaKey) {
			this._handleFobButton({button: 'A'});
		} else if (event.keyCode === B_KEY_CODE && event.shiftKey && event.ctrlKey && event.altKey && !event.metaKey) {
			this._handleFobButton({button: 'B'});
		}
	}
}

GameMachineService.type = 'game-machine';
GameMachineService.settings_definitions = new Map([...Service.settings_definitions])
	.set('name', {
		type: 'string',
		default_value: 'Games'
	})
	.set('active_game', {
		type: 'one-of',
		label: 'Game mode',
		value_options: [
			{
				value: 'game-board',
				label: 'Game Board'
			},
			{
				value: 'arcade',
				label: 'Arcade Game'
			}
		],
		default_value: 'arcade',
		validation: {is_required: true}
	})
	.set('arcade_game', {
		type: 'one-of',
		label: 'Arcade game',
		value_options: [
			{
				value: 'pacman',
				label: 'Pacman'
			},
			{
				value: 'hearts',
				label: 'Hearts'
			},
			{
				value: '2048',
				label: '2048'
			}
		],
		default_value: 'pacman',
		validation: {is_required: true}
	})
	.set('credit_ratio', {
		type: 'integer',
		label: 'Credits per dollar',
		default_value: 2,
		validation: {
			is_required: true,
			min: 0
		}
	})
	.set('price', {
		type: 'integer',
		label: 'Credit cost per play',
		default_value: 1,
		validation: {
			is_required: true,
			min: 0
		}
	});

module.exports = GameMachineService;
