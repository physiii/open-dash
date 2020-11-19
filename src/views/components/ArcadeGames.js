import React from 'react';
import Pacman from './Pacman.js';
import Hearts from './Hearts.js';
import Game2048 from './Game2048.js';
import './ArcadeGames.css';

const game_components = {
	'pacman': Pacman,
	'hearts': Hearts,
	'2048': Game2048
};

export const ArcadeGames = (props) => {
	const GameComponent = game_components[props.game];

	return (
		<div styleName="container">
			<div styleName="toolbar">
				<span styleName="credits">{props.credit}</span>
				<span styleName="creditsLabel">Credits</span>
			</div>
			<div styleName="main">
				<div styleName="game">
					<GameComponent
						allowNewGame={props.allowNewGame}
						demoMode={props.demoMode}
						onPlay={props.onPlay}
						onGameOver={props.onGameOver}
						key={props.demoMode} />
				</div>
				{props.showCreditsOverlay &&
					<div styleName="creditsOverlay">
						<h1 styleName="creditsHeading">Add Credits to Play</h1>
						<ul styleName="creditInfo">
							<li styleName="creditInfoItem">{props.creditRatio} {props.creditRatio === 1 ? 'credit' : 'credits'} / $1</li>
							<li styleName="creditInfoItem">{props.price} {props.price === 1 ? 'credit' : 'credits'} / play</li>
						</ul>
					</div>
				}
			</div>
		</div>
	);
};

ArcadeGames.defaultProps = {
	game: 'pacman',
	demoMode: false
};

export default ArcadeGames;
