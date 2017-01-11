const defaultState = [];

const cards = function(state = defaultState, action) {
  switch(action.type) {
    case 'RECEIVE_CARDS':
      return [
        ...state,
        ...action.cards
      ];

    default:
      return state;
  }
};

export default cards;
