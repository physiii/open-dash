const EventEmitter = require('events'),
	daughter = require('./daughter.js'),
	canEvents = {
		'shift/unknown': {
			event: 'shift'
		},
		'shift/reverse': {
			event: 'shift',
			shift_mode: 'reverse'
		},
		'key/off': {
			event: 'key',
			key_position: 0
		},
		'key/on': {
			event: 'key',
			key_position: 1
		},
		'key/start': {
			event: 'key',
			key_position: 2
		},
		'door/front/left/open': {
			event: 'door/front/left',
			is_door_open: true
		},
		'door/front/left/closed': {
			event: 'door/front/left',
			is_door_open: false
		},
		'door/front/right/open': {
			event: 'door/front/right',
			is_door_open: true
		},
		'door/front/right/closed': {
			event: 'door/front/right',
			is_door_open: false
		},
		'steering-wheel/controls/volume-up': {
			event: 'volume-up'
		},
		'steering-wheel/controls/volume-down': {
			event: 'volume-down'
		},
		'steering-wheel/controls/volume-mute': {
			event: 'volume-mute'
		},
		'steering-wheel/controls/seek-up': {
			event: 'seek-up'
		},
		'steering-wheel/controls/seek-down': {
			event: 'seek-down'
		}
	},
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
			name: 'door/front/left/open',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: 'C',
			should_value_match: true
		},
		{
			name: 'door/front/left/open',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '4',
			should_value_match: true
		},
		{
			name: 'door/front/left/closed',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '0',
			should_value_match: true
		},
		{
			name: 'door/front/left/closed',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '8',
			should_value_match: true
		},
		{
			name: 'door/front/right/open',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: 'C',
			should_value_match: true
		},
		{
			name: 'door/front/right/open',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '8',
			should_value_match: true
		},
		{
			name: 'door/front/right/closed',
			can_id: '0x06214000',
			can_message_index: 3,
			can_message_value: '0',
			should_value_match: true
		},
		{
			name: 'door/front/right/closed',
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
				console.log('CAN EVENT ' + canEvent.event + ' - message_id: ' + canMessage.message_id + ', message: ' + this._getConcatenatedMessage(canMessage));
				this._events.emit(canEvent.event, canEvent);
			});
		});
	}

	_getEventsForMessage (canMessage) {
		return canDefinitions.map((canDefinition) => {
			const canEvent = canEvents[canDefinition.name],
				messageId = canMessage.message_id.toLowerCase(),
				definitionId = canDefinition.can_id.toLowerCase(),
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
					event_end: true
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
					eventToEmit.event_start = true;
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
