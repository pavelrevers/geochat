import { updateDots } from './chatDots.js';

// Actions
const UPDATE = 'geochat/region/UPDATE';
const UPDATE_COORDINATE = 'geochat/region/UPDATE';

const initialRegion = {
  longitude: 37.618423,
  latitude: 55.751244,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

// Reducer
export default function reducer(state = initialRegion, {type, payload}) {
  switch (type) {
    case UPDATE:
      return {
        ...state,
        ...payload
      };
    case UPDATE_COORDINATE:
      return {
        ...state,
        latitude: payload.latitude,
        longitude: payload.longitude
      };
    default:
      return state;
  }
}

export const updateRegion = (region) => (dispatch) => {
  dispatch({type: UPDATE, payload: region});

  dispatch(updateDots(region))
};

export const updateCoordinate = (coordinate) => ({type: UPDATE_COORDINATE, payload: coordinate});

export const getUserRegion = () => (dispatch, getState) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var coordinate = position.coords;
      dispatch(updateDots({
        ...coordinate,
        latitudeDelta: getState().region.latitudeDelta,
        longitudeDelta: getState().region.longitudeDelta
      }))
      dispatch(updateCoordinate(coordinate));
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
}
