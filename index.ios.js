/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';

class geochat extends Component {
  constructor(props) {
    super(props);
    const region = {
      longitude: 37.618423,
      latitude: 55.751244,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
    this.state = {region};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <MapView
          style={styles.map}
          mapType='satellite'
          region={this.state.region}>
          <MapView.Marker
            coordinate={{
              longitude: 37.618423,
              latitude: 55.751244
            }}
            title='Title'
            onSelect={(data) => {
              console.log(data);
            }}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

AppRegistry.registerComponent('geochat', () => geochat);
