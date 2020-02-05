import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import Board from './Board';
import { getCurrentPlayer, tryPlayerSwitch, playCellChange, getWinner,  create as createGame } from './reversi/game/Game';
import { create as createPlayer } from './reversi/player/Player';
import { TYPE_BLACK, TYPE_WHITE } from './reversi/cell/Cell';

class Game extends Component {
    state = {
        game: createGame([createPlayer('John', TYPE_BLACK), createPlayer('Charly', TYPE_WHITE)]),
    };

    handleCellChange = cellChange => {
        const { game } = this.state;

        try {
            const newGame = playCellChange(cellChange, game);

            if (!newGame.isFinished) {
                this.setState({ game: tryPlayerSwitch(newGame) });
            } else {
                Alert.alert(`Well done ${getWinner(newGame).name}! You Win! :)`);
            }
        } catch (e) {
            console.log({ e });
        }
    };

    render() {
        const { game } = this.state;

        return (
            <Board
                board={game.board}
                currentCellType={getCurrentPlayer(game).cellType}
                onCellChange={this.handleCellChange}
            />
        );
    }
}

export default Game;