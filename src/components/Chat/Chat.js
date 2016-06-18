'use strict';

import React from 'React';
import { Component } from 'react';
import GiftedMessenger from 'react-native-gifted-messenger';
import Communications from 'react-native-communications';
import _ from 'lodash';

import {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  Navigator,
} from 'react-native';

class Chat extends Component {

	constructor(props) {
    super(props);
  }

  componentDidMount() {
		this.props.loadEarlierMessages({
			chatId: this.props.chatId,
			startId: null
		})
  }

  handleSend(message = {}) {
    message.id = Math.round(Math.random() * 10000);
    message.text += this.props.chatId;

		this.props.postMessage({
			chatId: this.props.chatId,
			message: message
		});
  }

  onLoadEarlierMessages() {
    this.props.loadEarlierMessages({
			chatId: this.props.chatId,
			startId: _.first(this.props.messages).id
		})
  }

  render() {

		// TODO: can we move it from render?
		const STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
		const NAVBAR_HEIGHT = Navigator.NavigationBar.Styles.General.NavBarHeight;
		const MAX_HEIGHT = Dimensions.get('window').height - NAVBAR_HEIGHT - STATUS_BAR_HEIGHT;

    return (
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
        loadEarlierMessagesButton={true}
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
