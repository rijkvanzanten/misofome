import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Favorites from './containers/Favorites';
import Cards from './containers/Cards';
import Profile from './containers/Profile';
import Login from './containers/Login';
import Register from './containers/Register';

function requireAuth(store) {
  return (nextState, replaceWith) => {
    const currentState = store.getState();

    if (!currentState.user.token.length) {
      replaceWith({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };
}

const routes = store => (
  <Route path="/" component={App}>
    <IndexRoute component={Favorites} onEnter={requireAuth(store)} />
    <Route path="/kaarten" component={Cards} onEnter={requireAuth(store)} />
    <Route path="/profiel" component={Profile} onEnter={requireAuth(store)} />
    <Route path="/login" component={Login} />
    <Route path="/registreer" component={Register} />
  </Route>
);

export default routes;
