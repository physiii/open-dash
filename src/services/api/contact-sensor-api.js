const ServiceApi = require('./service-api.js');

class ContactSensorApi extends ServiceApi {
	listen () {
		ServiceApi.prototype.listen.call(this);

		this.on('log/get', (data, callback) => {
			this.service.getAccessLogs().then((log) => {
				callback(null, {log});
			}).catch((error) => {
				callback(error);
			});
		});
	}
}

module.exports = ContactSensorApi;
