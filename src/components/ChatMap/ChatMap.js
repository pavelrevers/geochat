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
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType='satellite'
          region={this.props.region}
          onRegionChangeComplete={this.props.updateRegion}>
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
        <Link to="chat" params={{id: '1'}}>
          <View style={styles.button}/>
        </Link>
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
