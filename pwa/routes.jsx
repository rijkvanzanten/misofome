import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Cards from './containers/Cards';
import Progress from './containers/Progress';
import Profile from './containers/Profile';
import Favorites from './containers/Favorites';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Favorites} />
    <Route path="/kaarten" component={Cards} />
    <Route path="/voortgang" component={Progress} />
    <Route path="/profiel" component={Profile} />
  </Route>
);

export default routes;
