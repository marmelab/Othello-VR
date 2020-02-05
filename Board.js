import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-360';

import Disk from './Disk';
import { isLegalCellChange, getFlippedCellsFromCellChange } from './reversi/board/Board';

import {
    TYPE_WHITE,
    TYPE_EMPTY,
    hasSamePosition,
    create as createCell,
} from './reversi/cell/Cell';

export default class Board extends Component {
    state = {
        flipping: [],
    };

    cellToCellChange = cell => ({
        ...cell,
        type: this.props.currentCellType,
    });

    handleClick = cell => () => {
        const { board } = this.props;

        const cellChange = this.cellToCellChange(cell);
        if (!isLegalCellChange(cellChange, board)) {
            return;
        }

        const flippedCells = getFlippedCellsFromCellChange(cellChange, board);
        this.setState({
            flipping: [...this.state.flipping, ...flippedCells],
        });

        this.props.onCellChange(cellChange);
    };

    handleEndFlip = cell => () => {
        const { flipping } = this.state;

        this.setState({
            flipping: flipping.filter(f => !hasSamePosition(cell)(f)),
        });
    };

    renderCellDisk = cell => {
        const { flipping } = this.state;

        return (
            <Disk
                key={`${cell.x}${cell.y}`}
                translate={[50 * cell.x, 50 * cell.y, 0]}
                rotate={cell.type === TYPE_WHITE ? 120 : 240}
                empty={cell.type === TYPE_EMPTY}
                onClick={this.handleClick(cell)}
            />
        );
    };

    render() {
        const { board } = this.props;

        return (
            <View style={styles.board}>
                {board.cells
                    .reduce(
                        (agg, row, y) => [...agg, ...row.map((type, x) => createCell(x, y, type))],
                        [],
                    )
                    .map(this.renderCellDisk)}
            </View>
        );
    }
}

Board.propTypes = {
    onCellChange: PropTypes.func.isRequired,
    currentCellType: PropTypes.number.isRequired,
    board: PropTypes.shape({
        cells: PropTypes.array,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
};

const styles = StyleSheet.create({
    board: {
        transform: [
            { translateX: -150 },
            { translateY: -150 },
        ]
    }
});