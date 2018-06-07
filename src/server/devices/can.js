const EventEmitter = require('events'),
	daughter = require('./daughter.js'),
	canEvents = {
		'shift/unknown': {
			event: 'shift'
		},
		'shift/reverse': {
			event: 'shift',
			shiftMode: 'reverse'
		},
		'steering-wheel/controls/volume-up': {
			event: 'volume-up'
		},
		'steering-wheel/controls/volume-down': {
			event: 'volume-down'
		}
	},
	// TODO: These definitions are vehicle-specific. Move this into database?
	canDefinitions = [
		{
			name: 'shift/unknown',
			canId: '0x06314018',
			canMessageIndex: 0,
			canMessageValue: 'C0',
			shouldValueMatch: true
		},
		{
			name: 'shift/reverse',
			canId: '0x06314018',
			canMessageIndex: 0,
			canMessageValue: 'C0',
			shouldValueMatch: false
		},
		{
			name: 'steering-wheel/controls/volume-up',
			canId: '0x06284000',
			canMessageIndex: 0,
			canMessageValue: '80',
			shouldValueMatch: true,
			end: {
				canMessageValue: '00'
			}
		},
		{
			name: 'steering-wheel/controls/volume-down',
			canId: '0x06284000',
			canMessageIndex: 0,
			canMessageValue: '40',
			shouldValueMatch: true,
			end: {
				canMessageValue: '00'
			}
		}
	],
	canCache = {},
	inProgressList = {};

// TODO: Populate cache at initialization?

class Can {
	constructor () {
		this._events = new EventEmitter();

		this._listenForCanMessages();
	}

	on () {
		this._events.on.apply(this._events, arguments);
	}

	_listenForCanMessages () {
		daughter.on('CAN', (canMessage) => {
			this._getEventsForMessage(canMessage).forEach((canEvent) => {
				this._events.emit(canEvent.event, canEvent);
			});
		});
	}

	_getEventsForMessage (canMessage) {
		return canDefinitions.map((canDefinition) => {
			const canEvent = canEvents[canDefinition.name],
				messageId = canMessage.message_id.toLowerCase(),
				definitionId = canDefinition.canId.toLowerCase(),
				cacheKey = canEvent.event;

			let eventToEmit;

			// Skip this definition if the IDs don't match.
			if (messageId !== definitionId) {
				return false;
			}

			// Check to see if this is the end of an event already in progress.
			if (inProgressList[canDefinition.name] && this._doesMessageMatchDefinitionEnd(canMessage, canDefinition)) {
				// Add this end event to the list of events to emit.
				eventToEmit = {
					...canEvent,
					event: canEvent.event + '-end',
					eventEnd: true
				};

				// Delete this from the list of in-progress events.
				delete inProgressList[canDefinition.name];
			} else if (this._doesMessageMatchDefinition(canMessage, canDefinition)) { // Check to see if the message value matches this definition.
				// Add this event to the list of events to emit.
				eventToEmit = {
					...canEvent
				};

				// If the definition specifies that this is an event in
				// progress (i.e. we expect to see an end condition in a later
				// message), indicate that this is the start of an in-progress
				// event and add this to the list of in-progress events.
				if (canDefinition.end) {
					inProgressList[canDefinition.name] = true;
					eventToEmit.eventStart = true;
				}
			}

			if (eventToEmit) {
				const eventToEmitJson = JSON.stringify(eventToEmit);

				// Check the cache to make sure the value actually changed.
				if (canCache[cacheKey] === eventToEmitJson) {
					return false;
				}

				// Cache the event so we can see if future CAN messages result in a change.
				canCache[cacheKey] = eventToEmitJson;

				return eventToEmit;
			}

			return false;
		}).filter((item) => item); // Remove empty indexes (from definitions that didn't match).
	}

	_doesMessageMatchDefinition (canMessage, canDefinition) {
		const messageValue = canMessage.message.replace('0x', '').substr(canDefinition.canMessageIndex, canDefinition.canMessageValue.length).toLowerCase(),
			definitionValue = canDefinition.canMessageValue.toLowerCase();

		return (canDefinition.shouldValueMatch && messageValue === definitionValue) || (!canDefinition.shouldValueMatch && messageValue !== definitionValue);
	}

	_doesMessageMatchDefinitionEnd (canMessage, canDefinition) {
		if (!canDefinition.end) {
			return false;
		}

		const messageValue = canMessage.message.replace('0x', '').substr(
				canDefinition.end.canMessageIndex || canDefinition.canMessageIndex, // If it's provided, use a different index for the end value.
				canDefinition.canMessageValue.length
			).toLowerCase(),
			definitionValue = canDefinition.end.canMessageValue.toLowerCase(),
			shouldValueMatch = canDefinition.end.shouldValueMatch || canDefinition.shouldValueMatch; // If it's provided, use different matching logic for the end value.

		return (shouldValueMatch && messageValue === definitionValue) || (!shouldValueMatch && messageValue !== definitionValue);
	}
}

module.exports = new Can();
