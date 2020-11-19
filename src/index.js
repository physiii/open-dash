const fs = require('fs'),
	Database = require('./database.js'),
	Dash = require('./dash.js'),
	TAG = '[src/index.js]';

// ----------------------------------------------------- //
// import config or create new config.json with defaults //
// ----------------------------------------------------- //
let config = {
	relay_server: 'localhost',
	relay_port: 5000,
	use_dev: true,
	use_ssl: true,
	manufacturer: '',
	acceptor_dir: '/home/game/GameMachine/src/bill-acceptor/bill-acceptor.py',
	bill_acceptor_port: '/dev/game_bill_acceptor',
	daughter_port: '/dev/game_daughter',
	game_board_touchscreen_port: '/dev/game_touchscreen',
	game_board_video_device: '/dev/game_video',
	game_board_resolution_x: 1024,
	game_board_resolution_y: 768
};

try {
	config = require('../config.json');
} catch (e) {
	fs.writeFile(__dirname + '/config.json', JSON.stringify(config, null, '  '), (error) => {
		if (error) {
			throw error;
		}

		console.log(TAG, 'created config.json');
	});
}

new Dash();
