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

    default: {
      return state;
    }
  }
}

export default user;
