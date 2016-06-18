import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import MapView from 'react-native-maps';
import ChatMap from '../../containers/ChatMap';

class Router extends Component {
  render() {
    var page;
    switch (this.props.router.name) {
      case 'map':
        page = <ChatMap/>
        break;
      case 'chat':
        page = (<View>
          <Text>Chat</Text>
        </View>)
        break;
      default:
    }
    return page
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default Router;
