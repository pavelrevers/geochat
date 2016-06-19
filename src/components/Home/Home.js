import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import Link from '../../containers/Link';
import Button from 'react-native-button';

const BACKGROUND_IMAGE = require('../../static/images/far-away-gray-city.jpg');

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user.token) {
      this.props.changePage({name: 'map'})
    }
  }

  render() {
    return (
      <Image
        source={BACKGROUND_IMAGE}
        style={styles.background}
      >
        <View style={styles.page}>
          <View style={styles.content}>
            <View style={styles.inputsContainer}>
              <View style={styles.label}>
                <Text>{"Назови свое имя, воин!"}</Text>
              </View>
              <TextInput
                onChangeText={this.props.changeUserName}
                style={styles.input}
                value={this.props.user.name}
              />

              <View style={styles.label}>
                <Text>{"Назови свой номер телефона, воин!"}</Text>
              </View>
              <TextInput
                onChangeText={this.props.changeUserPhone}
                style={styles.input}
                value={this.props.user.phone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                onPress={this.props.login}
              >
                Войти
              </Button>
            </View>
          </View>
        </View>
      </Image>
    );
  }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  inputsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    flex: 1
  },
  input: {
    height: 26,
    borderWidth: 1,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 5,
  },
  label: {
    marginTop: 5,
    alignItems: 'flex-start',
    marginRight: 10,
    paddingTop: 2,
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'transparent',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#0f0f0f'
  }
});

export default Home;
