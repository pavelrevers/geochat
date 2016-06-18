// Actions
const UPDATE = 'geochat/region/UPDATE';

const initialRegion = {
  longitude: 37.618423,
  latitude: 55.751244,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05
};

// Reducer
export default function reducer(state = initialRegion, {type, payload}) {
  switch (type) {
    case UPDATE:
      return payload;
    default:
      return state;
  }
}

export const updateRegion = (region) => (
  {type: UPDATE, payload: region}
);
