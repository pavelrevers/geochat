// 'use strict';
//
// import React from 'react';
// import ReactNative from 'react-native';
// import ChatContainer from './ChatContainer';
//
// var { Component } = React;
// var { AppRegistry } = ReactNative;
//
//
// var OLD_MESSAGES = [
//   {
//     text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. https://github.com/facebook/react-native',
//     name: 'React-Bot',
//     image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
//     position: 'left',
//     date: new Date(2016, 0, 1, 20, 0),
//     uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
//   }, {
//     text: 'This is a touchable phone number 0606060606 parsed by taskrabbit/react-native-parsed-text',
//     name: 'Awesome Developer',
//     image: null,
//     position: 'right',
//     date: new Date(2016, 0, 2, 12, 0),
//     uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
//   }
// ]
//
// const StoreData = {
//   messages: [
//     {
//       text: 'Are you building a chat app?',
//       name: 'React-Bot',
//       image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
//       position: 'left',
//       date: new Date(2016, 3, 14, 13, 0),
//       uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
//       status: 'Статус-фигатус'
//     },
//     {
//       text: "Yes, and I use Gifted Messenger!",
//       name: 'Awesome Developer',
//       image: null,
//       position: 'right',
//       date: new Date(2016, 3, 14, 13, 1),
//       uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
//       status: 'Seen'
//     },
//   ],
//
//   chatViewState: {
//     isLoadingEarlierMessages: false,
//     typingMessage: "Паша печатает сообщение"
//   }
// }
//
// class AppWrap extends Component {
//   render() {
//     <View>
//       <ChatContainer props={StoreData} />
//     </View>
//   }
// }
//
// AppRegistry.registerComponent('geochat', () => AppWrap);

// Actions
// const LOAD = 'geochat/chats/LOAD';
const ADD_MESSAGES_TO_START = 'geochat/chats/ADD_MESSAGES_TO_START';
const DEFAULT_MESSAGES_AMOUNT_LIMIT = 50;
const API_URL = 'https://api.geochats.insanecoders.ru/v1/chats';
const MESSAGE_TYPE_SENDING = 'Sending';

const messages = [];

// Reducer
export default function reducer(state = messages, action = {}) {
  switch (action.type) {
    case ADD_MESSAGES_TO_START:
      let messages = [...action.payload].map(remapId);;

      return [...messages, ...state];
    case ADD_MESSAGE:
      let message = remapId(action.payload);

      return [...state, message]
    case UPDATE_MESSAGE:
      let messages = [...state];
      let message = remapId(action.payload);
      let index = messages.findIndex(m => m.id === message.id);

      messages[index] = message;

      return messages;
    default:
      return state;
  }
}

export const loadErlierMessages = ({chatId, startId, limit = DEFAULT_MESSAGES_AMOUNT_LIMIT}) => (dispatch) => {
	let url = `${API_URL}/${chatId}/messages?startid=${startId}&limit=${limit}`;

  fetch(url)
    .then(response => response.json())
    .then(earlierMessages => {
      dispatch({type: ADD_MESSAGES_TO_START, payload: earlierMessages});
    })
}

export const postMessage = (message) => (dispatch) => {

  dispatch({type: ADD_MESSAGE, payload: message});

  let url = `${API_URL}/${chatId}/messages?startid=${startId}&limit=${limit}`;

  fetch(url, { method: 'POST' })
    .then(response => response.json())
    .then(validatedMessage => {
      dispatch({type: UPDATE_MESSAGE, payload: validatedMessage});
    })
    // TODO: process failing
}

function remapId(message) {
  return { ...message, uniqueId: message.id };
}
