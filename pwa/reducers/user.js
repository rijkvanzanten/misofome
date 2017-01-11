const defaultState = {
  key: '',
  loggingIn: false
};

const user = function(state = defaultState, action) {
  switch(action.type) {
    case 'REQUEST_KEY':
      return {
        ...state,
        loggingIn: true
      };

    case 'RECEIVE_KEY':
      return {
        ...state,
        loggingIn: false,
        key: action.key
      };

    default:
      return state;
  }
};

export default user;
