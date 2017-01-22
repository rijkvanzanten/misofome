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

function loginFailed(err) {
  return {
    type: 'LOGIN_FAILED',
    err
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
        return dispatch(receiveUser(user, token));
      }

      switch(res.status) {
        case 400:
          return dispatch(loginFailed('data_missing'));
        case 401:
          return dispatch(loginFailed('user_not_found'));
        case 422:
          return dispatch(loginFailed('wrong_password'));
      }
    });
};
