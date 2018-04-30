const fs = require("fs");
const path = require("path");

function callbackToPromise(continuation){
	return new Promise(
		function(res, rej){
			return continuation(
				function(error, value){
					if(error) return rej(error);
					else return res(path);
				}
			);
		}
	);
}

function promiseReadFile(path){
	return callbackToPromise(
		function(callback){
			return fs.readFile(path, callback);
		}
	);
}
function promiseWriteFile(path, data){
	return callbackToPromise(
		function(callback){
			return fs.writeFile(path, data, callback);
		}
	).then(
		function(){
			return data;
		}
	);
}
function patchOnto(defaults, patch){
	var result = Object.create(defaults);
	Object.keys(patch).forEach(
		function(k){
			result[k] = patch[k];
		}
	);
	return result;
}
function promiseRealpath(path){
	return callbackToPromise(
		function(callback){
			return fs.realpath(path, callback);
		}
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
	return promiseConfigPath.then(
		configPathBack
	).then(
		JSON.parse.bind(JSON)
	).then(
		patchOnto.bind(null, defaults)
	).then(
		callback.bind(null, null),
		callback
	);
}

module.exports = {
	readConfig: readConfig,
	_util: {
		callbackToPromise: callbackToPromise
	}
};
