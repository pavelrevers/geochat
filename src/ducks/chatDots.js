// Actions
const LOAD = 'geochat/chatDots/LOAD';

const chatsDots = [
  {
    id: '1',
    longitude: 37.618423,
    latitude: 55.751244,
    title: 'One'
  },
  {
    id: '2',
    longitude: 37.619423,
    latitude: 55.751244,
    title: 'Two'
  }
]

// Reducer
export default function reducer(state = chatsDots, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}
