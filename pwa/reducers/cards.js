const defaultState = [];

function cards(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_CARDS':
      return [
        ...state,
        ...action.cards,
      ];

    default:
      return state;
  }
}

export default cards;
