const defaultState = {};

function cards(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_CARDS': {
      const newState = {
        ...state,
      };

      action.cards.forEach((card) => {
        newState[card._id] = card;
      });

      return newState;
    }

    default: {
      return state;
    }
  }
}

export default cards;
