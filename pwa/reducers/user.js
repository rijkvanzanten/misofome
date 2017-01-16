const defaultState = {
  token: '',
  loggingIn: false,
  id: '',
  username: '',
  favorites: [],
};

function user(state = defaultState, action) {
  switch (action.type) {
    case 'REQUEST_KEY':
      return {
        ...state,
        loggingIn: true,
      };

    case 'RECEIVE_KEY':
      return {
        ...state,
        loggingIn: false,
        token: action.token,
        ...action.user,
      };

    default:
      return state;
  }
}

export default user;
