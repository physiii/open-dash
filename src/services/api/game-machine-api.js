const ServiceApi = require('./service-api.js');

class GameMachineApi extends ServiceApi {
	listen () {
		ServiceApi.prototype.listen.call(this);

		this.on('command', (data, callback) => {});
		this.on('credit/add', (data, callback) => {
			this.service.addCredit(data.dollar_value).then(() => {
				callback();
			}).catch((error) => {
				callback(error);
			});
		});
	}
}

module.exports = GameMachineApi;
