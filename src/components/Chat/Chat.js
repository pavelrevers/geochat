'use strict';

import React from 'React';
import { Component } from 'react';
import GiftedMessenger from 'react-native-gifted-messenger';
import Communications from 'react-native-communications';
import NavigationBar from 'react-native-navbar';
import _ from 'lodash';

import {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  Navigator,
  View
} from 'react-native';

class Chat extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadEarlierMessages({
      chatId: this.props.id,
      startId: null
    })
  }

  handleSend(message = {}) {
    message.id = Math.round(Math.random() * 10000);

    this.props.postMessage({
      chatId: this.props.id,
      message: message
    });
  }

  onLoadEarlierMessages() {
    this.props.loadEarlierMessages({
      chatId: this.props.id,
      startId: _.first(this.props.messages).id
    })
  }

  handleNavbarLeftButtonTap() {
    this.props.changePage({name: 'map'})
  }

  render() {

    // TODO: can we move it from render?
    const STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
    // const NAVBAR_HEIGHT = Navigator.NavigationBar.Styles.General.NavBarHeight;
    const NAVBAR_HEIGHT = 44;
    const MAX_HEIGHT = Dimensions.get('window').height - NAVBAR_HEIGHT - STATUS_BAR_HEIGHT;

    let leftButtonConfig = {
      title: 'Назаад!',
      handler: this.handleNavbarLeftButtonTap.bind(this)
    };

    let titleConfig = { title: this.props.id };

    return (
      <View>
        <NavigationBar title={titleConfig} leftButton={leftButtonConfig} />

        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}

          styles={{
            bubbleRight: {
              marginLeft: 70,
              backgroundColor: '#007aff',
            }
          }}

          autoFocus={false}
          messages={this.props.messages}
          handleSend={this.handleSend.bind(this)}
          maxHeight={MAX_HEIGHT}

          // TODO: do not show, when all messages are loaded
          loadEarlierMessagesButton={false}
          onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

          senderName='Awesome Developer'
          senderImage={null}
          displayNames={true}

          parseText={true} // enable handlePhonePress, handleUrlPress and handleEmailPress
          handleUrlPress={this.handleUrlPress}
          handleEmailPress={this.handleEmailPress}

          // TODO!
          isLoadingEarlierMessages={false}
        />
      </View>
    );
  }

  handleUrlPress(url) {
    Linking.openURL(url);
  }

  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }
}

export default Chat;
