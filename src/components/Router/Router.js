import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator
} from 'react-native';
import MapView from 'react-native-maps';
import ChatMap from '../../containers/ChatMap';
import Link from '../../containers/Link';

class Router extends Component {
  render() {
    var page;
    switch (this.props.router.name) {
      case 'map':
        page = <ChatMap/>
        break;
      case 'chat':
        page = (<View style={styles.container}>
          <Link to='map'>
            <Text>Chat {this.props.router.params.id}</Text>
          </Link>
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
