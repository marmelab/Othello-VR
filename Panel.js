import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AppRegistry,
} from 'react-360';

import Game from './Game';

export default class Panel extends Component {
    render() {
        return (
            <View style={styles.panel}>
                <Game />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    panel: {
        // Fill the entire surface
        width: 600,
        height: 600,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

AppRegistry.registerComponent('Panel', () => Panel);