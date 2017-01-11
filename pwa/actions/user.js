import request from 'superagent';

function requestKey() {
  return {
    type: 'REQUEST_KEY'
  };
}

function receiveKey(success, token) {
  return {
    type: 'RECEIVE_KEY',
    success, 
    token,
  };
}

function authenticateUser(username, password) {
  return (dispatch) => {
    dispatch(requestKey());
    
    request
      .post('/api/1/auth')
      .send({ username, password })
      .end((err, res) => {
        if(err) throw err;

        if(res.body.success) {
          dispatch(receiveKey(true, res.body.token));
        } else {
          dispatch(receiveKey(false, ''));
        }
      }); 
  };
}

export default authenticateUser;
