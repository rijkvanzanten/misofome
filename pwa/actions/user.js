import request from 'superagent';

function requestKey() {
  return {
    type: 'REQUEST_KEY',
  };
}

export function receiveKey(success, token, user) {
  return {
    type: 'RECEIVE_KEY',
    success,
    token,
    user,
  };
}

function receiveUpdatedUser(user) {
  return {
    type: 'UPDATE_USER',
    user,
  };
}

function authenticateUser(username, password, cb) {
  return (dispatch) => {
    dispatch(requestKey());

    request
        .post('/api/1/auth')
        .send({ username, password })
        .end((err, res) => {
          if (err) throw err;

          if (res.body.success) {
            dispatch(receiveKey(true, res.body.token, res.body.user));
            cb(true);
          } else {
            dispatch(receiveKey(false, '', ''));
          }
        });
  };
}

export function updateUser(key, user) {
  return (dispatch) => {
    request
      .put('/api/1/auth/update')
      .set('x-access-token', key)
      .send(user)
      .end((err, res) => {
        if (err) throw err;

        if (res.body.success) {
          dispatch(receiveUpdatedUser(res.body.user));
        } else {
          console.error(res.body);
        }
      });
  };
}

export function registerUser(user, cb) {
  return (dispatch) => {
    request
      .post('/api/1/auth/register')
      .send(user)
      .end((err, res) => {
        if (err) throw err;

        if (res.body.success) {
          dispatch(receiveKey(true, res.body.token, res.body.user));
          cb(true);
        }
      });
  };
}

export default authenticateUser;
