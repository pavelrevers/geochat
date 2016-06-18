// Actions
const IN_PROCESS = 'geochat/newChat/IN_PROCESS';

const initionState = {
  inProgress: false
};

// Reducer
export default function reducer(state = initionState, {type, payload}) {
  switch (type) {
    case IN_PROCESS:
      return {
        ...state,
        inProgress: true,
        coordinate: payload.coordinate
      };
    default:
      return state;
  }
}

export const startNewChatCreation = ({coordinate}) => ({
  type: IN_PROCESS,
  payload: {
    coordinate
  }
});
