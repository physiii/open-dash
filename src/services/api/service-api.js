const noOp = () => {};

class ServiceApi {
	constructor (socket, service) {
		this.socket = socket;
		this.service = service;
		this.event_prefix = service.id + '::' + service.type + '::';

		this.emit = this.emit.bind(this);
		this.sendState = this.sendState.bind(this);

		// When the service's state changes, send the new state to relay.
		service.on('state-changed', this.sendState);
		service.on('settings-changed', this.sendSettings);

		this.listen();
	}

	listen () {
		this.on('setting', (data, callback) => {
			this.service.saveSetting(data.property, data.value).then(() => callback()).catch((error) => {
				console.error('Settings error', error);
				callback(error);
			});
		});
		this.on('settings', (data, callback) => {
			this.service.saveSettings(data.settings).then(() => callback()).catch((error) => {
				console.error('Settings error', error);
				callback(error);
			});
		});
	}

	on (event, localCallback) {
		this.socket.on(this.event_prefix + event, (data, remoteCallback) => {
			// Ensure callback is always a function so we don't have to check that it is anywhere else.
			const callback = typeof remoteCallback === 'function' ? remoteCallback : noOp;

			localCallback.call(this, data, callback);
		});
	}

	emit (event, data, callback) {
		this.socket.emit(this.event_prefix + event, data, callback);
	}

	sendState (data) {
		this.emit('state', {state: data.state});
	}

	sendSettings (data) {
		this.emit('settings', {settings: data.settings});
	}
}

module.exports = ServiceApi;
