import React from 'react';
import debounce from 'debounce';
import './Hearts.css';

export class Hearts extends React.Component {
	constructor (props) {
		super(props);

		this.state = {is_playing: false};
		this.iframe = React.createRef();

		this.handleGameRegionChange = debounce(this.handleGameRegionChange, 100).bind(this);
		this.handleGameMessageChange = this.handleGameMessageChange.bind(this);
		this.handleEndMessageChange = this.handleEndMessageChange.bind(this);
	}

	componentDidMount () {
		// Stop the game from logging to the console.
		this.iframe.current.contentWindow.console.log = () => { /* no-op */ };
	}

	shouldComponentUpdate (next_props, next_state) {
		this.showNewGameButton(next_state.is_playing ? next_props.allowNewGame : false);

		if (!next_state.is_playing) {
			this.showPlayButton(next_props.allowNewGame);
		}

		return false;
	}

	handleIframeLoad () {
		this.addStylesheet();

		this.game_region_observer = new MutationObserver(this.handleGameRegionChange);

		this.game_region_observer.observe(this.getFrameElementById('game-region'), {childList: true});

		// Override confirm dialog when user clicks new game button.
		this.iframe.current.contentWindow.confirm = () => {
			if (!this.state.is_playing) {
				return true;
			}

			if(window.confirm("Starting a new game will use credits. Are you sure?")) {
				this.setState({is_playing: false});

				return true;
			}
		};

		// Hide UI elements that shouldn't be used.
		this.showNewGameButton(this.props.allowNewGame);
		this.hideFrameElement('#settings-but');
	}

	handleGameRegionChange (mutations) {
		const playerNameElements = this.frameQuerySelectorAll('.player-name');

		if (!playerNameElements.length) {
			return;
		}

		playerNameElements.forEach((element) => element.style = 'display: none');

		this.triggerGameLayoutUpdate();
		this.game_region_observer.disconnect();

		// Set up observers for start/end of game.
		const game_message_observer = new MutationObserver(this.handleGameMessageChange),
			end_message_observer = new MutationObserver(this.handleEndMessageChange);

		game_message_observer.observe(this.getFrameElementById('game-message'), {attributes: true});
		end_message_observer.observe(this.getFrameElementById('end-message'), {attributes: true});
	}

	handleGameMessageChange (mutations) {
		const game_message_element = mutations[0].target,
			game_message_is_visible = game_message_element.attributes.style.value === 'display: block;';

		// Set up game for demo mode.
		if (this.props.demoMode && game_message_is_visible) {
			this.hideFrameElement('#game-message');
		}

		// Start of game.
		if (!this.props.demoMode && game_message_is_visible && !this.state.is_playing) {
			this.showPlayButton(true);
			this.setState({is_playing: true});
			this.props.onPlay();
		}
	}

	handleEndMessageChange (mutations) {
		const end_message_element = mutations[0].target,
			end_message_is_visible = end_message_element.attributes.class.value === 'show';

		// End of game.
		if (end_message_is_visible && this.state.is_playing) {
			this.showPlayButton(this.props.allowNewGame);
			this.setState({is_playing: false});

			if (!this.props.demoMode) {
				this.props.onGameOver();
			}
		}
	}

	addStylesheet () {
		const link_element = this.iframe.current.contentDocument.createElement('link');

		link_element.setAttribute('href', 'game-machine-hearts.css');
		link_element.setAttribute('rel', 'stylesheet');
		link_element.setAttribute('type', 'text/css');

		this.frameQuerySelector('head').appendChild(link_element);
	}

	getFrameElementById (id) {
		return this.iframe.current.contentDocument.getElementById(id);
	}

	frameQuerySelector (selector) {
		return this.iframe.current.contentDocument.querySelector(selector);
	}

	frameQuerySelectorAll (selector) {
		return this.iframe.current.contentDocument.querySelectorAll(selector);
	}

	hideFrameElement (selector) {
		const element = this.frameQuerySelector(selector);

		if (element) {
			element.style = 'display: none;';
		}
	}

	showNewGameButton (shouldShow) {
		this.frameQuerySelector('.newgame-but').style = shouldShow ? '' : 'display: none;';
	}

	showPlayButton (shouldShow) {
		const play_button_element = this.getFrameElementById('play-button');

		if (play_button_element) {
			play_button_element.style = shouldShow ? '' : 'display: none;';
		}
	}

	triggerGameLayoutUpdate () {
		const resize_event = document.createEvent('Events');

		resize_event.initEvent('resize', true, false)

		this.iframe.current.contentWindow.dispatchEvent(resize_event);
	}

	render () {
		return (
			<div styleName="container">
				<iframe styleName="iframe" src="../src/lib/html5-hearts-master/index.html" onLoad={this.handleIframeLoad.bind(this)} ref={this.iframe} />
				{this.props.demoMode && <div styleName="overlay" />}
			</div>
		);
	}
}

export default Hearts;
