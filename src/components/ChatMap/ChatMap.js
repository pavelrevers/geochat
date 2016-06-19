import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  StatusBar
} from 'react-native';
import MapView from 'react-native-maps';
import Link from '../../containers/Link';
import Icon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

class ChatMap extends Component {
  constructor(props) {
    super(props);
    props.updateDots(props.region)
    props.getUserRegion()
  }

  componentWillMount() {
    // https://github.com/facebook/react-native/issues/1403 prevents this to work for initial load
    Promise.all([
      Icon.getImageSource('chat', 30, '#3498db'),
      Icon.getImageSource('chat', 30, '#e74c3c')
    ])
      .then(([chatIcon, newChatIcon]) => {
        this.setState({ chatIcon, newChatIcon });
      });
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
        barStyle="default"/>
        <MapView
          style={styles.map}
          mapType='standard'
          region={this.props.region}
          onRegionChangeComplete={this.props.updateRegion}
          onPress={this.props.newChatInProgress ? (e) => this.props.setNewChatCoordinate({coordinate: e.nativeEvent.coordinate}) : () => null}>
          {
            !this.props.newChatInProgress && this.props.chatDots.map(({id, longitude, latitude, title}) => (
              <MapView.Marker
                key={id}
                coordinate={{
                  longitude,
                  latitude
                }}
                image={this.state.chatIcon}
                title={title}
                onSelect={(data) => {
                  this.props.changePage({name: 'chat', params: {id}})
                }}
              />
            ))
          }
          {
            this.props.newChatInProgress && this.props.newChatCoordinate && (
              <MapView.Marker
                key='newChatId'
                image={this.state.newChatIcon}
                coordinate={this.props.newChatCoordinate}
              />
            )
          }
        </MapView>
        {
          !this.props.newChatInProgress && (
            <TouchableHighlight style={styles.button} activeOpacity={10} underlayColor="aliceblue" onPress={this.props.startNewChatCreation}>
              <IoniconsIcon name="ios-add-circle" size={72} color="#2ecc71" />
            </TouchableHighlight>
          )
        }
        {
          this.props.newChatInProgress && this.props.newChatCoordinate && (
            <TouchableHighlight style={styles.button} activeOpacity={10} underlayColor="aliceblue" onPress={this.props.submitNewChat}>
              <IoniconsIcon name="ios-checkmark-circle" size={72} color="#2ecc71" />
            </TouchableHighlight>
          )
        }
        {
          this.props.newChatInProgress && !this.props.newChatCoordinate && (
            <TouchableHighlight style={styles.button} activeOpacity={10} underlayColor="aliceblue" onPress={this.props.submitNewChat}>
              <IoniconsIcon name="ios-close-circle" size={72} color="#e74c3c" />
            </TouchableHighlight>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#000000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 72,
    height: 72,
  }
});

export default ChatMap;
