const EventEmitter = require('events'),
	events = new EventEmitter();

console.log('CAN MOCK');

setTimeout(() => {
	events.emit('shift', {type: 'shift', shiftMode: 'reverse'});
}, 2000);
// setInterval(() => {
// 	console.log('SHIFT REVERSE');
// 	events.emit('shift', {type: 'shift', shiftMode: 'reverse'});
// }, 20000);

// setTimeout(() => {
// 	console.log('HALFWAY');
// 	events.emit('shift', {type: 'shift'});
// 	setInterval(() => {
// 		console.log('SHIFT');
// 		events.emit('shift', {type: 'shift'});
// 	}, 20000);
// }, 10000);

module.exports = {
	on: function () {
		events.on.apply(events, arguments);
	}
};
