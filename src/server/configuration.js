const fs = require("fs");
const path = require("path");

function K(x){
	return function(){
		return x;
	};
}
function callbackToPromise(continuation){
	return new Promise(
		function(resolve, reject){
			return continuation(
				function(error, value){
					if(error) return reject(error);
					else return resolve(path);
				}
			);
		}
	);
}

function promiseReadFile(path, options){
	return callbackToPromise(
		fs.readFile.bind(
			fs,
			path,
			options
		)
	);
}
function promiseWriteFile(path, data, options){
	return callbackToPromise(
		fs.writeFile.bind(
			fs,
			path,
			data,
			options
		)
	).then(
		K(data)
	);
}
function promiseToCallback(promise, callback){
	return Promise.resolve(promise).then(
		function(value){
			return callback(null, value);
		},
		function(error){
			return callback(error);
		}
	);
}
function patchOnto(base, patch){
	var result = Object.create(base);
	Object.keys(patch).forEach(
		function(k){
			result[k] = patch[k];
		}
	);
	return result;
}
function promiseRealpath(path, options){
	return callbackToPromise(
		fs.realpath.bind(
			fs,
			path,
			options
		)
	);
}
function getConfigPathAsync(){
	return promiseRealpath(module.filename).then(
		path.dirname.bind(path)
	).then(
		function(directory){
			return path.join(
				directory,
				"../../config.json"
			);
		}
	).then(promiseRealpath);
}
function readConfig(callback, defaults, onCreate){
	var promiseConfigPath = getConfigPathAsync();
	function writeDefaultConfigFile(configPath){
		return promiseWriteFile(
			configPath,
			JSON.stringify(defaults, null, 2)
		).then(
			function(value){
				if(onCreate) onCreate(configPath, value);
				return value;
			}
		);
	}
	function getErrorHandlerToWriteDefaultConfigurationFile(
		configurationPath
	){
		return function errorHandlerToWriteDefaultConfigurationFile(
			error
		){
			return writeDefaultConfigFile(configurationPath);
		}
	}
	function configPathBack(configPath){
		var promiseConfigSource = promiseReadFile(configPath);
		return promiseConfigSource.catch(
			getErrorHandlerToWriteDefaultConfigurationFile(
				configPath
			)
		);
	}
	return promiseToCallback(
		promiseConfigPath.then(
		configPathBack
	).then(
		JSON.parse.bind(JSON)
	).then(
		patchOnto.bind(null, defaults)
	),
	    callback
	);
}

module.exports = {
	readConfig: readConfig,
	_util: {
		callbackToPromise: callbackToPromise
	}
};
