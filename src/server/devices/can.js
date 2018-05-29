const EventEmitter = require('events'),
	daughter = require('./daughter.js'),
	canCache = {},
	canEvents = {
		'shift/unknown': {
			event: 'shift'
		},
		'shift/reverse': {
			event: 'shift',
			shiftMode: 'reverse'
		}
	},
	// TODO: These definitions are vehicle-specific. Move this into database?
	canDefinitions = [
		{
			name: 'shift/unknown',
			canId: '6314018',
			canMessageIndex: 0,
			canMessageValue: 'C0',
			shouldValueMatch: true
		},
		{
			name: 'shift/reverse',
			canId: '6314018',
			canMessageIndex: 0,
			canMessageValue: 'C0',
			shouldValueMatch: false
		}
	];

// TODO: Populate cache at initialization.

class Can {
	constructor () {
		this._events = new EventEmitter();

		this._listenForCanMessages();
	}

	on () {
		this._events.on.apply(this._events, arguments);
	}

	_listenForCanMessages () {
		daughter.on('CAN', (message) => {
			this._getEventsForMessage(message).forEach((event) => {
				this._events.emit(event.event, event);
			});
		});
	}

	_getEventsForMessage (message) {
		const changedCanValues = canDefinitions.filter((definition) => {
			const canEvent = canEvents[definition.name],
				messageId = message.id.toLowerCase(),
				definitionId = definition.canId.toLowerCase(),
				messageValue = message.message.substr(definition.canMessageIndex, definition.canMessageValue.length).toLowerCase(),
				definitionValue = definition.canMessageValue.toLowerCase();

			// Skip this definition if the IDs don't match.
			if (messageId !== definitionId) {
				return false;
			}

			// Check to see if the value matches for this definition.
			if ((definition.shouldValueMatch && messageValue === definitionValue) || 
				(!definition.shouldValueMatch && messageValue !== definitionValue)) {
				// Check the cache to make sure the value actually changed.
				if (canCache[canEvent.event] === canEvent) {
					return false;
				}

				// Cache the new value so we can see if it changes in future CAN messages.
				canCache[canEvent.event] = canEvent;

				// Add this definition to the list of changes.
				return true;
			}

			return false;
		});

		// Return the list of CAN events that correspond to the changed values.
		return changedCanValues.map((definition) => canEvents[definition.name]);
	}
}

module.exports = new Can();
