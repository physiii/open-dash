const ServiceApi = require('./service-api.js');

class BillAcceptorApi extends ServiceApi {
	listen () {
		ServiceApi.prototype.listen.call(this);

		this.on('log/get', (data, callback) => {
			this.service.getBillLogs().then((log) => {
				callback(null, {log});
			}).catch((error) => {
				callback(error);
			});
		});
	}
}

module.exports = BillAcceptorApi;
