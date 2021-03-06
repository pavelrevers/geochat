'use strict';

import React from 'React';
import { Component } from 'react';
import GiftedMessenger from 'react-native-gifted-messenger';
import Communications from 'react-native-communications';
import NavigationBar from 'react-native-navbar';
import { first } from 'lodash';

import {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  Navigator,
  View
} from 'react-native';

let extendMessagesWithPositions = (messages, userName) => {
  return messages.map(msg => {
    let position = (msg.name === userName) ? 'right' : 'left';

    return {...msg, position};
  });
}

class Chat extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadEarlierMessages({
      chatId: this.props.id
    })
  }

  handleSend(message = {}) {
    message.id = Math.round(Math.random() * 10000);
    message.name = this.props.userName;

    this.props.postMessage({
      chatId: this.props.id,
      message: message
    });
  }

  onLoadEarlierMessages() {
    this.props.loadEarlierMessages({
      chatId: this.props.id,
      startId: first(this.props.messages).id
    })
  }

  handleNavbarLeftButtonTap() {
    this.props.changePage({name: 'map'})
    this.props.clearMessages();
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

    let titleConfig = { title: 'Starbucks NY' };

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
          messages={extendMessagesWithPositions(this.props.messages, this.props.userName)}
          handleSend={this.handleSend.bind(this)}
          maxHeight={MAX_HEIGHT}

          // TODO: do not show, when all messages are loaded
          loadEarlierMessagesButton={false}
          onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

          senderName={this.props.name}
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
