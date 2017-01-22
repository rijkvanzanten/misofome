import request from 'superagent';

// Login
// -----------------------------------------------------------------------------
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

// Register new user
// -----------------------------------------------------------------------------
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

// Modify favorites
// -----------------------------------------------------------------------------
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

function removeFavorite(card) {
  return {
    type: 'REMOVE_FAVORITE',
    card,
  };
}

export const removeFromFavorite = (user, card) => dispatch => {
  const { token, info: { favorites } } = user;

  dispatch(removeFavorite(card));

  const favoriteIDs = favorites.map(card => card._id).filter(id => id !== card._id);

  request
    .put('/api/user/')
    .set('x-access-token', token)
    .send({ favorites: favoriteIDs })
    .end(err => {
      if(err) throw err;
    });
};

// Update user
// -----------------------------------------------------------------------------
function updateUser(user) {
  return {
    type: 'UPDATE_USER',
    user
  };
}

export const updateUserInfo = (token, newData) => dispatch => {
  request
    .put('/api/user/')
    .set('x-access-token', token)
    .send(newData)
    .end((err, res) => {
      if(err) throw err;
      dispatch(updateUser(res.body.user));
    });
};

// Update tests
// -----------------------------------------------------------------------------
function addStress(result) {
  return {
    type: 'ADD_STRESS',
    result
  };
}

function addAmisos(result) {
  return {
    type: 'ADD_AMISOS',
    result
  };
}

export const addStressResult = result => (dispatch, getState) => {
  dispatch(addStress(result));

  const state = getState();
  const { token } = state.user;
  const { stressTestResults } = state.user.info;

  stressTestResults.push(result);

  request
    .put('/api/user/')
    .set('x-access-token', token)
    .send({ stressTestResults })
    .end(err => {
      if(err) throw err;
    });
};

export const addAmisosResult = result => (dispatch, getState) => {
  dispatch(addAmisos(result));

  const state = getState();
  const { token } = state.user;
  const { amisosResults } = state.user.info;

  amisosResults.push(result);

  request
    .put('/api/user/')
    .set('x-access-token', token)
    .send({ amisosResults })
    .end(err => {
      if(err) throw err;
    });
};
