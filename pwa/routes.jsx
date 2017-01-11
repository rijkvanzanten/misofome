import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Favorites from './containers/Favorites';
import Cards from './containers/Cards';
import Profile from './containers/Profile';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Favorites} />
    <Route path="/kaarten" component={Cards} />
    <Route path="/profiel" component={Profile} />
  </Route>
);

export default routes;
