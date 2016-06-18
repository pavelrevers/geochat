import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ChatMap from '../../containers/ChatMap';

class App extends Component {
  render() {
    return (
      <ChatMap/>
    );
  }
}

export default App;
