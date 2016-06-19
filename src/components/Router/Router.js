import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import MapView from 'react-native-maps';
import ChatMap from '../../containers/ChatMap';
import Chat from '../../containers/Chat';
import Home from '../../containers/Home';
import Link from '../../containers/Link';

class Router extends Component {
  render() {
    var page;
    switch (this.props.router.name) {
      case 'map':
        page = <ChatMap/>
        break;
      case 'chat':
        page = <Chat chatId={this.props.router.params.id} />
        break;
      case 'home':
        page = <Home/>
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
