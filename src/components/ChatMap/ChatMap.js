import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MapView from 'react-native-maps';

class ChatMap extends Component {
  constructor(props) {
    super(props);
    props.updateDots({
      longitude: 37.618423,
      latitude: 55.751244,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType='satellite'
          region={{
            longitude: 37.618423,
            latitude: 55.751244,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
          onRegionChangeComplete={this.props.updateDots}>
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
                  console.log(data);
                }}
              />
            ))
          }
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

export default ChatMap;
