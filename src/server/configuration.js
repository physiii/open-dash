const fs = require("fs");
const path = require("path");


function K (x) {
	return function constant () {
		return x;
	};
}

function callbackToPromise (continuation) {
	return new Promise((resolve, reject) => {
		return continuation((error, value) => {
			if (error) {
				return reject(error);
			}

			return resolve(value);
		});
	});
}

function promiseReadFile (path, options) {
	return callbackToPromise(
		fs.readFile.bind(fs, path, options)
	);
}

function promiseWriteFile (file, data, options) {
	return callbackToPromise(
		fs.writeFile.bind(fs, file, data, options)
	).then(
		K(data)
	);
}

function promiseToCallback (promise, callback) {
	return Promise.resolve(promise).then(
		function (value) {
			return callback(null, value);
		},
		function (error) {
			return callback(error);
		}
	);
}

function promiseRealpath (path, options) {
	return callbackToPromise(
		fs.realpath.bind(fs, path, options)
	);
}

function getConfigPathAsync () {
	return promiseRealpath(module.filename)
		// Get the directory this module is in.
		.then(path.dirname.bind(path))
		// Get the real path of the config file relative to this directory.
		.then((directory) => path.join(directory, '../../config.json'));
}

function readConfig (callback, defaults, onCreate) {
	function writeDefaultConfigFile (configPath) {
		return promiseWriteFile(configPath, JSON.stringify(defaults, null, '	')).then((value) => {
			return Promise.resolve(
				onCreate
					? onCreate(configPath, value)
					: value
			).then(
				K(value)
			);
		});
	}
	function makeErrorHandler (configurationPath) {
		return function (error) {
			return writeDefaultConfigFile(configurationPath);
		}
	}

	function configPathBack (configPath) {
		return promiseReadFile(configPath).catch(makeErrorHandler(configPath));
	}

	return promiseToCallback(
		getConfigPathAsync()
			.then(configPathBack)
			.then(JSON.parse.bind(JSON))
			.then((config) => ({...defaults, ...config})),
		callback
	);
}

module.exports = {
	readConfig: readConfig,
	_util: {
		callbackToPromise: callbackToPromise
	}
};
