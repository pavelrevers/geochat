// Actions
const LOAD = 'geochat/chatDots/LOAD';
const UPDATE = 'geochat/chatDots/UPDATE';

const chatsDots = [];

// Reducer
export default function reducer(state = chatsDots, action = {}) {
  switch (action.type) {
    case UPDATE:
      return action.payload;
    default:
      return state;
  }
}

export const updateDots = ({latitude, longitude, latitudeDelta, longitudeDelta}) => (dispatch) => {
  let url = `https://api.geochats.insanecoders.ru/v1/geo/${[latitude, longitude, latitudeDelta, longitudeDelta].join(',')}/chats`

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({type: UPDATE, payload: data});
    })
}
