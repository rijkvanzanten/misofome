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

export const registerUser = user => dispatch => {
  dispatch(fetchUser());

  request
    .post('/api/user/')
    .send(user)
    .end((err, res) => {
      if(res.ok) {
        const { user, token } = res.body;
        return dispatch(receiveUser(user, token));
      }
    });
};

function addFavorite(card) {
  return {
    type: 'ADD_FAVORITE',
    card,
  };
}

export const addToFavorite = (user, card) => dispatch => {
  const { token, info: { favorites } } = user;

  dispatch(addFavorite(card));

  const favoriteIDs = favorites.map(card => card._id);
  favoriteIDs.push(card._id);

  request
    .put('/api/user/')
    .set('x-access-token', token)
    .send({ favorites: favoriteIDs })
    .end(err => {
      if(err) throw err;
    });
};
