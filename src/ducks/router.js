// Actions
const CHANGE_PAGE = 'geochat/router/CHANGE_PAGE';

const initialRoute = {
  name: 'chat',
  params: { id: 'deadbeef1' }
};

// Reducer
export default function reducer(state = initialRoute, {type, payload}) {
  switch (type) {
    case CHANGE_PAGE:
      return payload;
    default:
      return state;
  }
}

export const changePage = (page) => (
  {type: CHANGE_PAGE, payload: page}
);
