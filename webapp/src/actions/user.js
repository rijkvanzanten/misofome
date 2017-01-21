import request from 'superagent';

function fetchUser() {
  return {
    type: 'FETCH_USER',
  };
}

function receiveUser(info, token) {
  return {
    type: 'RECEIVE_USER',
    info, token,
  };
}

function loginFailed() {
  return {
    type: 'LOGIN_FAILED',
  };
}

export const authenticateUser = user => dispatch => {
  dispatch(fetchUser());

  request
    .post('/api/user/login')
    .send(user)
    .end((err, res) => {
      if(res.ok) {
        const { user, token } = res.body;
        dispatch(receiveUser(user, token));
      } else {
        dispatch(loginFailed());
      }
    });
};
