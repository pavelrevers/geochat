import { changePage } from './router.js';

// Actions
const USER_LOGIN = 'geochat/user/USER_LOGIN';
const USER_LOGIN_ERROR = 'geochat/user/USER_LOGIN_ERROR';
const USER_NAME_CHANGE = 'geochat/user/USER_NAME_CHANGE';
const USER_PHONE_CHANGE = 'geochat/user/USER_PHONE_CHANGE';
const API_USER_URL = 'https://api.geochats.insanecoders.ru/v1/user';

const initialUser = {};

// Reducer
export default function reducer(state = initialUser, {type, payload}) {
  switch (type) {
    case USER_LOGIN:
      return {...state, token: payload};
    case USER_NAME_CHANGE:
      return {...state, name: payload}
    case USER_PHONE_CHANGE:
      return {...state, phone: payload}
    case USER_LOGIN_ERROR:
      return state;
    default:
      return state;
  }
}

export const changeUserName = (name) => (
  { type: USER_NAME_CHANGE, payload: name}
)

export const changeUserPhone = (phone) => (
  { type: USER_PHONE_CHANGE, payload: phone}
)

export const login = () => (dispatch, getState) => {

  let url = `${API_USER_URL}`;
  let {name, phone} = getState().user;
  let data = JSON.stringify({ name, phone });

  setTimeout(() => {
    let fakeResponse = { token: 'SUPER_TOKEN_' + Math.random() };

    dispatch({
      type: USER_LOGIN,
      payload: { token: fakeResponse.token }
    });
    
    dispatch(changePage({ name: 'map' }))
  }, 300);

  // fetch(url, { method: 'POST', body: data })
  //   .then(response => {
  //     // sorrryy
  //     if (response.status < 400) {
  //       dispatch({
  //         type: USER_LOGIN,
  //         payload: { token: response.token }
  //       });
  //       dispatch(changePage({ name: 'map' }))
  //     } else {
  //       dispatch({
  //         type: USER_LOGIN_ERROR,
  //         payload: response.message
  //       });
  //     }
  //   })
  //   .catch((e) => console.error(e))
}
