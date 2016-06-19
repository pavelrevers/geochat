// Actions
// const LOAD = 'geochat/chats/LOAD';
const ADD_MESSAGES_TO_START = 'geochat/chats/ADD_MESSAGES_TO_START';
const ADD_MESSAGE = 'geochat/chats/ADD_MESSAGE';
const UPDATE_MESSAGE = 'geochat/chats/UPDATE_MESSAGE';
const DEFAULT_MESSAGES_AMOUNT_LIMIT = 50;
const API_CHATS_URL = 'https://api.geochats.insanecoders.ru/api/v1/chat';

const MESSAGE_STATUSES = {
  SENDING: 'Паша доставляет...',
  SENT: 'Паша доставил.',
  SENDING_FAILED: 'Паша не доставил, потому что забухал'
}

const FIRST_MESSAGES = [
  {
    text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. https://github.com/facebook/react-native',
    name: 'React-Bot',
    image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
    position: 'left',
    date: new Date(2016, 0, 1, 20, 0),
    id: Math.round(Math.random() * 10000),
    status: MESSAGE_STATUSES.SENT
  }, {
    text: 'This is a touchable phone number 0606060606 parsed by taskrabbit/react-native-parsed-text',
    name: 'Awesome Developer',
    image: null,
    position: 'right',
    date: new Date(2016, 0, 2, 12, 0),
    id: Math.round(Math.random() * 10000),
    status: MESSAGE_STATUSES.SENT
  }
]

let initialMessages = [];

let remapId = (msg) => ({ uniqueId: msg.id, ...msg })
let addSentStatus = (msg) => ({ status: MESSAGE_STATUSES.SENT, ...msg })
let addSendingStatus = (msg) => ({ status: MESSAGE_STATUSES.SENDING, ...msg })

// Reducer
export default function reducer(state = initialMessages, {type, payload}) {
  switch (type) {
    case ADD_MESSAGES_TO_START:
      let messagesToAdd = [...payload].map(remapId).map(addSentStatus);

      return [...messagesToAdd, ...state];
    case ADD_MESSAGE:
      let messageToAdd = addSendingStatus(remapId(payload));

      return [...state, messageToAdd]
    case UPDATE_MESSAGE:
      let messages = [...state];
      let oldMessage = payload.oldMessage;
      let messageToUpdate = addSentStatus(remapId(payload.validatedMessage));
      let messageIndex = messages.findIndex(m => m.id === oldMessage.id);

      messages[messageIndex] = messageToUpdate;

      return messages;
    default:
      return state;
  }
}

export const loadEarlierMessages = ({chatId, startId, limit = DEFAULT_MESSAGES_AMOUNT_LIMIT}) => (dispatch) => {
	let url = `${API_CHATS_URL}/${chatId}/messages?startid=${startId}&limit=${limit}`;

  // if (!startId) {
  //   setTimeout(() => {
  //     dispatch({type: ADD_MESSAGES_TO_START, payload: FIRST_MESSAGES});
  //   }, 500);
  // }

  fetch(url)
    .then(earlierMessages => {
      dispatch({type: ADD_MESSAGES_TO_START, payload: earlierMessages});
    })
    .catch(console.error.bind(console));
}

export const postMessage = ({chatId, message}) => (dispatch) => {

  dispatch({type: ADD_MESSAGE, payload: message});

  let url = `${API_CHATS_URL}/${chatId}`;

  setTimeout(() => {
    let validatedMessage = {...message};

    validatedMessage.id = 'new_id_from_server' + Math.random();

    dispatch({type: UPDATE_MESSAGE, payload: {
      // We need oldMessage to find it later in the messages store
      oldMessage: message,
      validatedMessage: validatedMessage
    }});
  }, 300);

  // fetch(url, { method: 'POST' })
  //   .then(response => response.json())
  //   .then(validatedMessage => {
  //     dispatch({type: UPDATE_MESSAGE, payload: validatedMessage});
  //   })
  //   // TODO: process failing
}
