import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import Link from '../../containers/Link';
import Button from 'react-native-button';

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
      <View style={styles.page}>
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
        <View>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={this.props.login}
        >
          Войти!
        </Button>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    flex: 1
  },
  input: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 5,
  },
  label: {
    alignItems: 'flex-start',
    marginRight: 10,
    paddingTop: 2,
  }
});

export default Home;
