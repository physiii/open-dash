import React from 'react';
import debounce from 'debounce';
import './Pacman.css';

export class Pacman extends React.Component {
	constructor (props) {
		super(props);

		this.state = {is_playing: false};
		this.iframe = React.createRef();

		this.handleOverlayContainerChange = debounce(this.handleOverlayContainerChange, 100).bind(this);
		this.handleTitleChange = debounce(this.handleTitleChange, 100).bind(this);
	}

	componentDidMount () {
		// Stop the game from logging to the console.
		this.iframe.current.contentWindow.console.log = () => { /* no-op */ };
	}

	shouldComponentUpdate (next_props) {
		this.showNewGameButton(next_props.allowNewGame);

		return false;
	}

	handleIframeLoad () {
		const overlay_container_observer = new MutationObserver(this.handleOverlayContainerChange),
			title_container_observer = new MutationObserver((mutations) => {
				const high_score_form = this.getFrameElementById('highscore-form');

				if (high_score_form) {
					high_score_form.remove();
				}

				this.handleTitleChange(mutations);
			});

		overlay_container_observer.observe(this.getFrameElementById('canvas-overlay-container'), {attributes: true});
		title_container_observer.observe(this.getFrameElementById('title'), {attributes: true, childList: true, characterData: true});

		this.addStylesheet();

		// Override confirm dialog when user clicks new game button.
		this.iframe.current.contentWindow.confirm = (message) => {
			if (!this.state.is_playing) {
				return true;
			}

			if(window.confirm("Starting a new game will use credits. Are you sure?")) {
				this.setState({is_playing: false});

				return true;
			}
		};

		// Unmute game.
		this.clickFrameElement('.controlSound');

		// Change game title.
		this.setOverlayTitle('Pacman');

		// Change "Click" to "Tap".
		this.setOverlayText('Tap to Play');

		// Hide UI elements that shouldn't be used.
		this.showNewGameButton(false);

		// Play/pause when the page is tapped anywhere within the frame.
		this.frameQuerySelector('body').addEventListener('click', (event) => {
			if (!event.path.includes(this.getFrameElementById('canvas-container')) &&
				!event.path.includes(this.getFrameElementById('game-buttons')) &&
				!event.path.includes(this.getFrameElementById('menu-buttons')) &&
				!event.path.includes(this.getFrameElementById('highscore-content')) &&
				!event.path.includes(this.getFrameElementById('instructions-content')) &&
				!event.path.includes(this.getFrameElementById('info-content'))) {
				this.clickFrameElement('#canvas-container');
			}
		});

		// Start the game for demo mode.
		if (this.props.demoMode) {
			this.clickFrameElement('#canvas-container');
		}
	}

	handleOverlayContainerChange (mutations) {
		const is_visible = mutations[0].target.attributes.style.value !== 'display: none;';

		if (!is_visible && !this.state.is_playing) {
			this.setState({is_playing: true});
			this.showNewGameButton(false);

			if (!this.props.demoMode) {
				this.props.onPlay();
			}
		}
	}

	handleTitleChange (mutations) {
		const title_text = mutations[0].target.textContent,
			is_game_over = title_text === 'Game over',
			is_paused = title_text === 'Pause';

		if (is_paused) {
			// Change "Click" to "Tap"
			this.setOverlayText('Tap to Resume');
		} else if (is_game_over && this.state.is_playing) {
			this.showNewGameButton(this.props.allowNewGame);
			this.setState({is_playing: false});

			if (!this.props.demoMode) {
				this.props.onGameOver();
			}
		}
	}

	addStylesheet () {
		const link_element = this.iframe.current.contentDocument.createElement('link');

		link_element.setAttribute('href', 'game-machine-pacman.css');
		link_element.setAttribute('rel', 'stylesheet');
		link_element.setAttribute('type', 'text/css');

		this.frameQuerySelector('head').appendChild(link_element);
	}

	clickFrameElement (selector) {
		const element = this.frameQuerySelector(selector),
			click_event = document.createEvent('Events');

		if (element) {
			click_event.initEvent('click', true, false)
			element.dispatchEvent(click_event);
		}
	}

	getFrameElementById (id) {
		return this.iframe.current.contentDocument.getElementById(id);
	}

	frameQuerySelector (selector) {
		return this.iframe.current.contentDocument.querySelector(selector);
	}

	showNewGameButton (should_show) {
		this.getFrameElementById('newGame').style = should_show ? '' : 'display: none;';
	}

	setOverlayTitle (value) {
		this.getFrameElementById('title').innerHTML = value;
	}

	setOverlayText (value) {
		this.getFrameElementById('text').innerHTML = value;
	}

	render () {
		return (
			<div styleName="container">
				<iframe styleName="iframe" src="../src/lib/pacman-canvas/index.htm" onLoad={this.handleIframeLoad.bind(this)} ref={this.iframe} />
				{this.props.demoMode && <div styleName="overlay" />}
			</div>
		);
	}
}

export default Pacman;
