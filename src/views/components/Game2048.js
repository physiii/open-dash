import React from 'react';
import debounce from 'debounce';
import './Game2048.css';

const DEMO_MODE_KEY_INTERVAL = 1500;

export class Hearts extends React.Component {
	constructor (props) {
		super(props);

		this.state = {is_playing: false};
		this.iframe = React.createRef();

		this.handleGameMessageChange = debounce(this.handleGameMessageChange, 100).bind(this);
		this.handleUpClick = this.handleUpClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);
		this.handleDownClick = this.handleDownClick.bind(this);
		this.handleLeftClick = this.handleLeftClick.bind(this);
	}

	componentDidMount () {
		// Stop the game from logging to the console.
		this.iframe.current.contentWindow.console.log = () => { /* no-op */ };
	}

	shouldComponentUpdate (next_props, next_state) {
		this.showNewGameButton(next_props.allowNewGame);

		return false;
	}

	componentWillUnmount () {
		clearInterval(this.demo_interval);
	}

	handleIframeLoad () {
		this.addStylesheet();

		// Reset the saved game state.
		if (this.resetGameState()) {
			this.iframe.current.contentWindow.location.reload();
			return;
		}

		this.addNewGameConfirmation();

		// Start of game.
		if (this.props.demoMode) {
			this.setUpDemoMode();
		} else if (!this.state.is_playing) {
			this.handleGameStarted();
		}

		// Hide UI elements that shouldn't be used.
		this.showNewGameButton(this.props.allowNewGame);
		this.hideFrameElement('.lower');

		// Set up observer for end of game.
		const end_message_observer = new MutationObserver(this.handleGameMessageChange);

		end_message_observer.observe(this.frameQuerySelector('.game-message'), {attributes: true, childList: true, characterData: true});
	}

	handleGameStarted () {
		this.setState({is_playing: true});
		this.props.onPlay();
	}

	handleGameMessageChange (mutations) {
		const game_message_element = this.frameQuerySelector('.game-message'),
			is_game_over = game_message_element.attributes.class.value !== 'game-message';

		// End of game.
		if (is_game_over && this.state.is_playing) {
			this.setState({is_playing: false});

			if (!this.props.demoMode) {
				this.props.onGameOver();
			}
		}
	}

	handleUpClick () {
		this.sendFrameKeyDownEvent(38);
	}

	handleRightClick () {
		this.sendFrameKeyDownEvent(39);
	}

	handleDownClick () {
		this.sendFrameKeyDownEvent(40);
	}

	handleLeftClick () {
		this.sendFrameKeyDownEvent(37);
	}

	setUpDemoMode () {
		const demo_keys = [37, 38, 39, 40];

		this.demo_interval = setInterval(() => this.sendFrameKeyDownEvent(demo_keys[Math.floor(Math.random() * demo_keys.length)]), DEMO_MODE_KEY_INTERVAL);
	}

	sendFrameKeyDownEvent (key_code) {
		const keyboard_event = document.createEvent('Event');

		keyboard_event.initEvent('keydown', true, true);
		keyboard_event.keyCode = key_code;
		keyboard_event.which = key_code;

		this.iframe.current.contentDocument.dispatchEvent(keyboard_event);
	}

	addStylesheet () {
		const link_element = this.iframe.current.contentDocument.createElement('link');

		link_element.setAttribute('href', 'style/game-machine-2048.css');
		link_element.setAttribute('rel', 'stylesheet');
		link_element.setAttribute('type', 'text/css');

		this.frameQuerySelector('head').appendChild(link_element);
	}

	resetGameState () {
		const local_storage_manager_2048 = new this.iframe.current.contentWindow.LocalStorageManager();

		if (!this.has_reset_game_state) {
			local_storage_manager_2048.clearGameState();
			local_storage_manager_2048.setBestScore(0);

			this.has_reset_game_state = true;

			return true;
		}
	}

	addNewGameConfirmation () {
		const new_game_button = this.frameQuerySelector('.restart-button');

		this.new_game_button_clone = new_game_button.cloneNode(true);

		this.hideFrameElement('.restart-button');
		this.frameQuerySelector('.above-game').appendChild(this.new_game_button_clone);

		// Add confirmation dialog for starting a new game.
		this.new_game_button_clone.addEventListener('click', (event) => {
			if (!this.state.is_playing || this.iframe.current.contentWindow.confirm('Starting a new game will use credits. Are you sure?')) {
				this.clickFrameElement(new_game_button);
				this.handleGameStarted();
			}
		});
	}

	clickFrameElement (selector_or_element) {
		const element = selector_or_element instanceof this.iframe.current.contentWindow.HTMLElement ? selector_or_element : this.frameQuerySelector(selector_or_element),
			click_event = document.createEvent('Events');

		if (element instanceof this.iframe.current.contentWindow.HTMLElement) {
			click_event.initEvent('click', true, false)
			element.dispatchEvent(click_event);
		}
	}

	frameQuerySelector (selector) {
		return this.iframe.current.contentDocument.querySelector(selector);
	}

	hideFrameElement (selector) {
		const element = this.frameQuerySelector(selector);

		if (element) {
			element.style = 'display: none;';
		}
	}

	showNewGameButton (shouldShow) {
		this.new_game_button_clone.style = shouldShow ? '' : 'display: none;';
	}

	render () {
		return (
			<div styleName="container">
				<iframe styleName="iframe" src="../src/lib/2048-master/index.html" onLoad={this.handleIframeLoad.bind(this)} ref={this.iframe} />
				<div styleName="controls">
					<button styleName="upButton" onClick={this.handleUpClick}>↑</button>
					<button styleName="rightButton" onClick={this.handleRightClick}>→</button>
					<button styleName="downButton" onClick={this.handleDownClick}>↓</button>
					<button styleName="leftButton" onClick={this.handleLeftClick}>←</button>
				</div>
				{this.props.demoMode && <div styleName="overlay" />}
			</div>
		);
	}
}

export default Hearts;
