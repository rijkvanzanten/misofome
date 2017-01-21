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

    case 'ADD_CARD': {
      return {
        ...state,
        [action.card._id]: action.card,
      };
    }

    default: {
      return state;
    }
  }
}

export default cards;
