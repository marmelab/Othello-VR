import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-360';
import Panel from './Panel'; // Register

export default class Othello_VR extends React.Component {
  render() {
    return (
      <View />
    );
  }
};


AppRegistry.registerComponent('Othello_VR', () => Othello_VR);
