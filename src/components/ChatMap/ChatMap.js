import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import Link from '../../containers/Link';

class ChatMap extends Component {
  constructor(props) {
    super(props);
    props.updateDots(props.region)
    props.getUserRegion()
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType='satellite'
          region={this.props.region}
          onRegionChangeComplete={this.props.updateRegion}
          onPress={(e) => this.props.startNewChatCreation({coordinate: e.nativeEvent.coordinate})}>
          {
            this.props.chatDots.map(({id, longitude, latitude, title}) => (
              <MapView.Marker
                key={id}
                coordinate={{
                  longitude,
                  latitude
                }}
                title={title}
                onSelect={(data) => {
                  this.props.changePage({name: 'chat', params: {id}})
                }}
              />
            ))
          }
          {
            this.props.newChatInProgress && (
              <MapView.Marker
                key='newChatId'
                coordinate={this.props.newChatCoordinate}
              />
            )
          }
        </MapView>
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
    bottom: 0,
    right: 0,
    borderWidth: 1,
    width: 40,
    height: 40,
    borderColor: '#444',
  }
});

export default ChatMap;
