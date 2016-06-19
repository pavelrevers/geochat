import { changePage } from './router.js';

// Actions
const IN_PROCESS = 'geochat/newChat/IN_PROCESS';
const SET_COORDINATE = 'geochat/newChat/SET_COORDS';
const SUBMIT = 'geochat/newChat/SUBMIT';
const DONE = 'geochat/newChat/DONE';
const CANCEL = 'geochat/newChat/CANCEL';
const ERROR = 'geochat/newChat/ERROR';

const initionState = {
  inProgress: false
};

// Reducer
export default function reducer(state = initionState, {type, payload}) {
  switch (type) {
    case IN_PROCESS:
      return {
        ...state,
        inProgress: true
      };
      break;
    case CANCEL:
    case ERROR:
    case DONE:
      return {
        inProgress: false
      };
      break;
    case SET_COORDINATE:
      return {
        ...state,
        coordinate: payload.coordinate
      };
      break;
    default:
      return state;
  }
}

export const startNewChatCreation = () => ({
  type: IN_PROCESS
});

export const setNewChatCoordinate = (coordinate) => ({
  type: SET_COORDINATE,
  payload: coordinate
});

export const cancelNewChatCreation = () => ({
  type: CANCEL
});

export const submitNewChat = () => (dispatch, getState) => {
  let url = 'https://api.geochats.insanecoders.ru/api/v1/geo';
  const coordinate = getState().newChat.coordinate;

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...coordinate
    })
  })
    .then(response => {
      var chatId = response.headers.get('Location').split('/')[4];
      console.log(response.headers.get('Location'))

      dispatch({
        type: DONE
      });

      dispatch(changePage({
        name: 'chat',
        params: {
          id: chatId
        }
      }));
    })
    .catch(() => (dispatch({
      type: ERROR
    })));
};
