const fs = require("fs");
const path = require("path");

function promiseRealpath(path){
	return new Promise(
		function(res, rej){
			return fs.realpath(
				path,
				function(error, path){
					if(error) return rej(error);
					else return res(path);
				}
			);
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
function promiseReadFile(path){
	return new Promise(
		function(res, rej){
			return fs.readFile(
				path,
				function(error, data){
					if(error) return rej(error);
					else return res(data);
				}
			);
		}
	);
}
function promiseWriteFile(path, data){
	return new Promise(
		function(res, rej){
			return fs.writeFile(
				path,
				data,
				function(error){
					if(error) return rej(error);
					else return res(data);
				}
			);
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
    readConfig: readConfig
};
