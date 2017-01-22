const defaultState = {
  token: '',
  loggingIn: false,
  err: false,
  info: {}
};

function user(state = defaultState, action) {
  switch(action.type) {
    case 'FETCH_USER': {
      return {
        ...state,
        loggingIn: true,
        err: false,
      };
    }

    case 'RECEIVE_USER': {
      const { info, token } = action;
      return {
        ...state,
        loggingIn: false,
        err: false,
        token,
        info,
      };
    }

    case 'LOGIN_FAILED': {
      return {
        ...state,
        loggingIn: false,
        err: action.err,
      }
    }

    case 'ADD_FAVORITE': {
      return {
        ...state,
        info: {
          ...state.info,
          favorites: [...state.info.favorites, action.card]
        }
      }
    }

    case 'REMOVE_FAVORITE': {
      return {
        ...state,
        info: {
          ...state.info,
          favorites: state.info.favorites.filter(card => card._id !== action.card._id)
        }
      }
    }

    case 'UPDATE_USER': {
      return {
        ...state,
        info: action.user
      }
    }

    default: {
      return state;
    }
  }
}

export default user;
