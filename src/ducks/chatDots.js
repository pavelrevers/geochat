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
  console.log(latitude, longitude, latitudeDelta, longitudeDelta)
  let url = `https://api.geochats.insanecoders.ru/api/v1/geo/${[latitude, longitude, latitudeDelta, longitudeDelta].join(',')}`
  if (latitude != 55.751244 || longitude != 37.618423) {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: UPDATE, payload: data});
      })
      .catch((e) => {console.error(e)})
  }

}
