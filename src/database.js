const MongoClient = require('mongodb').MongoClient,
	TAG = '[Database]';

class Database {
	connect (callback) {
		return new Promise((resolve, reject) => {
			MongoClient.connect('mongodb://127.0.0.1:27017/gamemachine', (error, db) => {
				if (error) {
					console.error(TAG, 'Unable to connect to the mongoDB server. Error:', error);
					reject('Unable to connect to game machine database.');
					return;
				}
				callback(db, resolve, reject);
			});
		});
	}

	getDeviceID () {
		return this.getDevices().then((devices) => devices && devices[0] && devices[0].id);
	}

	getSettings () {
		return this.connect((db, resolve, reject) => {
			db.collection('settings').find().toArray((error, result) => {
				db.close();

				if (error) {
					console.error(TAG, 'getSettings', error);
					reject('Database error');
					return;
				}

				resolve(settings && settings[0]);
			});
		});
	}

	storeSettings (data) {
		return this.connect((db, resolve, reject) => {
			db.collection('settings').update({}, {$set: data}, {upsert: true}, (error, item) => {
				db.close();

				if (error) {
					console.error(TAG, 'storeSettings', error);
					reject('Database error');
					return;
				}

				resolve();
			});
		});
	}

	storeDevice (device) {
		return this.connect((db, resolve, reject) => {
			db.collection('devices').update({id: device.id}, {$set: device.dbSerialize()}, {upsert: true}, (error, record) => {
				db.close();

				if (error) {
					console.error(TAG, 'storeDevice', error);
					reject('Database error');
					return;
				}
				resolve(record);
			});
		});
	}

	getDevices () {
		return this.connect((db, resolve, reject) => {
			db.collection('devices').find().toArray((error, result) => {
				db.close();

				if (error) {
					console.error(TAG, 'getDevices', error);
					reject('Database error');
					return;
				}

				resolve(result);
			});
		});
	}

	storeBillLog (data) {
		return this.connect((db, resolve, reject) => {
			db.collection('bill_log').insertOne(data, (error, record) => {
				db.close();

				if (error) {
					console.error(TAG, 'storeBillLog', error);
					reject('Database error');
					return;
				}

				resolve(record);
			});
		});
	}

	getBillLogs () {
		return this.connect((db, resolve, reject) => {
			db.collection('bill_log').find().toArray((error, result) => {
				db.close();

				if (error) {
					console.error(TAG, 'getBillLog', error);
					reject('Database Error');
					return;
				}

				resolve(result);
			});
		});
	}

	storeAccessLog (data) {
		return this.connect((db, resolve, reject) => {
			db.collection('access_log').insertOne(data, (error, record) => {
				db.close();

				if (error) {
					console.error(TAG, 'storeAccessLog', error);
					reject('Database error');
					return;
				}

				resolve(record);
			});
		});
	}

	getAccessLogs () {
		return this.connect((db, resolve, reject) => {
			db.collection('access_log').find().toArray((error, result) => {
				db.close();

				if (error) {
					console.error(TAG, 'getBAccessLog', error);
					reject('Database Error');
					return;
				}

				resolve(result);
			});
		});
	}
}

module.exports = new Database();
