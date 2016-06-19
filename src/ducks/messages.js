// Actions
// const LOAD = 'geochat/chats/LOAD';
const ADD_MESSAGES_TO_START = 'geochat/chats/ADD_MESSAGES_TO_START';
const ADD_MESSAGE = 'geochat/chats/ADD_MESSAGE';
const CLEAR_MESSAGES = 'geochat/chats/CLEAR_MESSAGES';
const UPDATE_MESSAGE = 'geochat/chats/UPDATE_MESSAGE';
const UPDATE_MESSAGE_FAILED = 'geochat/chats/UPDATE_MESSAGE_FAILED';
const DEFAULT_MESSAGES_AMOUNT_LIMIT = 50;
const API_CHATS_URL = 'https://api.geochats.insanecoders.ru/api/v1/chat';

const MESSAGE_STATUSES = {
  SENDING: 'Sending...',
  SENT: 'Sent.',
  SENDING_FAILED: 'Sending failed'
}

let initialMessages = [];

let remapId = (msg) => {
  var newMsg = {...msg}
  newMsg.uniqueId = msg.id;
  return newMsg;
}
let addSentStatus = (msg) => ({ status: MESSAGE_STATUSES.SENT, ...msg })
let addSendingStatus = (msg) => ({ status: MESSAGE_STATUSES.SENDING, ...msg })
let addFailedStatus = (msg) => ({ status: MESSAGE_STATUSES.SENDING_FAILED, ...msg })

export default function reducer(state = initialMessages, {type, payload}) {
  switch (type) {
    case ADD_MESSAGES_TO_START:
      let messagesToAdd = [...payload].map(remapId).map(addSentStatus);

      return [...messagesToAdd, ...state];

    case ADD_MESSAGE:
      let messageToAdd = addSendingStatus(remapId(payload));

      return [...state, messageToAdd];

    case UPDATE_MESSAGE:
      var messages = [...state];
      var oldMessage = payload.oldMessage;
      var messageToUpdate = addSentStatus(remapId(payload.validatedMessage));
      var messageIndex = messages.findIndex(m => m.id === oldMessage.id);

      messages[messageIndex] = messageToUpdate;

      return messages;

    case UPDATE_MESSAGE_FAILED:
      var messages = [...state];
      var oldMessage = payload.oldMessage;
      var messageToUpdate = addFailedStatus(remapId(payload.oldMessage));
      var messageIndex = messages.findIndex(m => m.id === oldMessage.id);

      messages[messageIndex] = messageToUpdate;

      return messages;

    case CLEAR_MESSAGES:
      return [];

    default:
      return state;
  }
}

export const clearMessages = () => ({type: CLEAR_MESSAGES})

export const loadEarlierMessages = ({chatId, startId, limit = DEFAULT_MESSAGES_AMOUNT_LIMIT}) => (dispatch) => {
	let url = `${API_CHATS_URL}/${chatId}/messages?startid=${startId}&limit=${limit}`;

  fetch(url)
    .then(earlierMessages => {
      dispatch({type: ADD_MESSAGES_TO_START, payload: earlierMessages});
    })
    .catch(console.error.bind(console));
}

export const postMessage = ({chatId, message}) => (dispatch) => {

  dispatch({type: ADD_MESSAGE, payload: message});

  console.log(message)

  let url = `${API_CHATS_URL}/${chatId}/message`;

  fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: message.text,
        name: message.name
      })
    })
    .then(response => response.json())
    .then(validatedMessage => {
      dispatch({type: UPDATE_MESSAGE, payload: {
        oldMessage: message,
        validatedMessage: validatedMessage
      }});
    })
    .catch(e => {
      dispatch({type: UPDATE_MESSAGE_FAILED, payload: {
        oldMessage: message
      }});
    })
}
