const defaultState = {
  moreCardsAvailable: true,
  page: 1,
  filter: {},
  items: []
};

function cards(state = defaultState, action) {
  switch (action.type) {
    case 'REQUEST_CARDS': {
      return {
        ...state,
        page: action.page,
        filter: action.filter
      }
    }

    case 'RECEIVE_CARDS': {
      return {
        ...state,
        items: [...state.items, ...action.cards],
        moreCardsAvailable: action.moreCardsAvailable
      }
    }

    case 'CLEAR_CARDS': {
      return {
        ...state,
        items: []
      }
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
