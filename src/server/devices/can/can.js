const EventEmitter = require('events'),
	daughter = require('../daughter.js'),
	canEvents = require('./can-events.json'),
	// TODO: These definitions are vehicle-specific. Move this into database?
	canDefinitions = [
		// Shift Position
		{
			name: 'shift/unknown',
			can_id: '0x06314018',
			can_message_index: 0,
			can_message_value: 'C0',
			should_value_match: true
		},
		{
			name: 'shift/reverse',
			can_id: '0x06314018',
			can_message_index: 0,
			can_message_value: 'C0',
			should_value_match: false
		},
		// Key Position
		{
			name: 'key/off',
			can_id: '0x06214000',
			can_message_index: 4,
			can_message_value: '1',
			should_value_match: true
		},
		{
			name: 'key/on',
			can_id: '0x06214000',
			can_message_index: 4,
			can_message_value: '4',
			should_value_match: true
		},
		{
			name: 'key/start',
			can_id: '0x06214000',
			can_message_index: 4,
			can_message_value: 'C',
			should_value_match: true
		},
		// Door Position
		{
			name: 'door/1/open',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: 'C',
			should_value_match: true
		},
		{
			name: 'door/1/open',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '4',
			should_value_match: true
		},
		{
			name: 'door/1/closed',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '0',
			should_value_match: true
		},
		{
			name: 'door/1/closed',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '8',
			should_value_match: true
		},
		{
			name: 'door/2/open',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: 'C',
			should_value_match: true
		},
		{
			name: 'door/2/open',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '8',
			should_value_match: true
		},
		{
			name: 'door/2/closed',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '0',
			should_value_match: true
		},
		{
			name: 'door/2/closed',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '4',
			should_value_match: true
		},
		// Steering Wheel Controls
		{
			name: 'steering-wheel/controls/volume-up',
			can_id: '0x06284000',
			can_message_index: 0,
			can_message_value: '80',
			should_value_match: true,
			end: true
		},
		{
			name: 'steering-wheel/controls/volume-down',
			can_id: '0x06284000',
			can_message_index: 0,
			can_message_value: '40',
			should_value_match: true,
			end: true
		},
		{
			name: 'steering-wheel/controls/volume-mute',
			can_id: '0x06284000',
			can_message_index: 0,
			can_message_value: '20',
			should_value_match: true,
			end: true
		},
		{
			name: 'steering-wheel/controls/seek-up',
			can_id: '0x06284000',
			can_message_index: 0,
			can_message_value: '10',
			should_value_match: true,
			end: true
		},
		{
			name: 'steering-wheel/controls/seek-down',
			can_id: '0x06284000',
			can_message_index: 0,
			can_message_value: '08',
			should_value_match: true,
			end: true
		}
	],
	canCache = {},
	inProgressList = {},
	TAG = '[Can]';

class Can {
	constructor () {
		this._events = new EventEmitter();

		this._initializeCache();
		this._listenForCanMessages();
	}

	on () {
		this._events.on.apply(this._events, arguments);
	}

	_initializeCache () {
		canEvents.forEach((can_event) => {
			if (!can_event.initial) {
				return;
			}

			if (can_event.end) {
				console.error(TAG, 'CAN event "' + can_event.event + '" is marked as initial state, but events with an end property can\'t be initial state.');
				return;
			}

			const cache_key = can_event.cache_key || can_event.event;

			canCache[cache_key] = JSON.stringify(can_event);
		});
	}

	_listenForCanMessages () {
		daughter.on('CAN', (canMessage) => {
			this._getEventsForMessage(canMessage).forEach((canEvent) => {
				console.log('CAN EVENT ' + canEvent.event + ' - message_id: ' + canMessage.message_id + ', message: ' + this._getConcatenatedMessage(canMessage));
				this._events.emit(canEvent.event, canEvent.data);
			});
		});
	}

	_getEventsForMessage (canMessage) {
		return canDefinitions.map((canDefinition) => {
			const canEvent = canEvents.get(canDefinition.name),
				messageId = canMessage.message_id.toLowerCase(),
				definitionId = canDefinition.can_id.toLowerCase(),
				cacheKey = canEvent.cache_key || canEvent.event;

			let eventToEmit;

			// Skip this definition if the IDs don't match.
			if (messageId !== definitionId) {
				return false;
			}

			// Check to see if this is the end of an event already in progress.
			if (inProgressList[canDefinition.name] && this._doesMessageMatchDefinitionEnd(canMessage, canDefinition)) {
				// Add this end event to the list of events to emit.
				eventToEmit = {
					event: canEvent.event + '-end',
					data: {
						...canEvent.data,
						event_end: true
					}
				};

				// Delete this from the list of in-progress events.
				delete inProgressList[canDefinition.name];
			} else if (this._doesMessageMatchDefinition(canMessage, canDefinition)) { // Check to see if the message value matches this definition.
				// Add this event to the list of events to emit.
				eventToEmit = {
					...canEvent,
					data: {...canEvent.data}
				};

				// If the definition specifies that this is an event in
				// progress (i.e. we expect to see an end condition in a later
				// message), indicate that this is the start of an in-progress
				// event and add this to the list of in-progress events.
				if (canDefinition.end) {
					inProgressList[canDefinition.name] = true;
					eventToEmit.data.event_start = true;
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
		const messageValue = this._getConcatenatedMessage(canMessage).substr(canDefinition.can_message_index, canDefinition.can_message_value.length).toLowerCase(),
			definitionValue = canDefinition.can_message_value.toLowerCase();

		return (canDefinition.should_value_match && messageValue === definitionValue) || (!canDefinition.should_value_match && messageValue !== definitionValue);
	}

	_doesMessageMatchDefinitionEnd (canMessage, canDefinition) {
		if (!canDefinition.end) {
			return false;
		}

		const messageValue = this._getConcatenatedMessage(canMessage).substr(
				canDefinition.end.can_message_index || canDefinition.can_message_index, // If it's provided, use a different index for the end value.
				canDefinition.can_message_value.length
			).toLowerCase(),
			definitionValue = (canDefinition.end === true ? canDefinition.can_message_value : canDefinition.end.can_message_value).toLowerCase(),
			should_value_match = canDefinition.end === true ? !canDefinition.should_value_match : (canDefinition.end.should_value_match || canDefinition.should_value_match); // If it's provided, use different matching logic for the end value.

		return (should_value_match && messageValue === definitionValue) || (!should_value_match && messageValue !== definitionValue);
	}

	_getConcatenatedMessage (canMessage) {
		return canMessage.message.h32.replace('0x', '') + canMessage.message.l32.replace('0x', '');
	}
}

module.exports = new Can();
