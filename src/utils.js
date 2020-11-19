const exec = require('child_process').exec,
	spawn = require('child_process').spawn,
	rimraf = require('rimraf'),
	TAG = '[utils.js]';

// Accepts search strings as arguments and looks for processes that match those
// search strings.
function checkIfProcessIsRunning () {
	return new Promise((resolve, reject) => {
		let command = 'ps aux | grep -v \'grep\'';

		Array.from(arguments).forEach((search_term) => {
			command += ' | grep ' + search_term;
		});

		exec(command, (error, stdout, stderr) => {
			// If there's an error, the command found no processes.
			// \S* matches process owner, \s* matches whitespace before pid, [0-9]* matches pid
			const process_id = error ? false : /^\S*\s*([0-9]*)/g.exec(stdout)[1];

			resolve(process_id);
		});
	});
}

function onChange (object, onChange) {
	const handler = {
		get (target, property, receiver) {
			let value = target[property];

			const tag = Object.prototype.toString.call(value),
				shouldBindProperty = (property !== 'constructor') && (
					tag === '[object Function]' ||
					tag === '[object AsyncFunction]' ||
					tag === '[object GeneratorFunction]'
				);

			if (shouldBindProperty) {
				value = value.bind(target);
			}

			try {
				return new Proxy(value, handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty (target, property, descriptor) {
			const result = Reflect.defineProperty(target, property, descriptor);
			onChange();
			return result;
		},
		deleteProperty (target, property) {
			const result = Reflect.deleteProperty(target, property);
			onChange();
			return result;
		}
	};

	return new Proxy(object, handler);
}

function update () {
	const path = __dirname.replace('/gateway',''),
		git = spawn('git', ['-C', path, 'pull']);

	console.log('Update: pull from ', path);

	git.stdout.on('data', (data) => console.log(`Update: ${data}`));
	git.stderr.on('data', (data) => console.log(`Update: error: ${data}`));

	exec('pm2 restart gateway', (error, stdout, stderr) => {
		if (error) {
			console.error(`Update: restart gateway error: ${error}`);
			return;
		}

		console.log(stdout);
		console.log(stderr);
	});
}

function isEmpty (value) {
	if (typeof value === 'number') {
		if (Object.is(value, NaN)) {
			return true;
		}

		return false;
	}

	if (typeof value === 'boolean') {
		return false;
	}

	if (typeof value === 'undefined' || value === null) {
		return true;
	}

	// Arrays and strings.
	if (typeof value.length !== 'undefined' && value.length === 0) {
		return true;
	}
};

function zeroPad (value, width) {
	value = value.toString();

	return value.length >= width
		? value
		: new Array(width - value.length + 1).join(0) + value;
}

const validators = {
	'string': () => (value, label) => typeof value === 'string' ? null : label + ' must be a string.',
	'boolean': () => (value, label) => typeof value === 'boolean' ? null : label + ' must be boolean.',
	'decimal': () => (value, label) => Number.isFinite(value) ? null : label + ' must be a number.',
	'integer': () => (value, label) => Number.isInteger(value) ? null : label + ' must be a whole number.',
	'percentage': (scale = 1) => (value, label) => typeof value === 'number' && value >= 0 && value <= scale ? null : label + ' must be a number between 0 and ' + scale + '.',
	'one-of': (options = []) => (value, label) => {
		return options.some((option) => option === value)
			? null
			: label + ' must be one of these: ' + options.map((option) => option + ' (' + typeof option + ')').join(', ') + '.';
	},
	'is_required': (is_required) => (value, label) => !is_required || !isEmpty(value) ? null : label + ' is required.',
	'min': (min) => (value, label) => value >= min ? null : label + ' must be at least ' + min + '.',
	'max': (max) => (value, label) => value <= max ? null : label + ' must be no more than ' + max + '.',
	'min_length': (min_length) => (value, label) => value.length >= min_length ? null : label + ' must be at least ' + min_length + ' characters long.',
	'max_length': (max_length) => (value, label) => value.length <= max_length ? null : label + ' must be no more than ' + max_length + ' characters long.'
};

module.exports = {
	checkIfProcessIsRunning,
	onChange,
	update,
	isEmpty,
	zeroPad,
	validators
};
