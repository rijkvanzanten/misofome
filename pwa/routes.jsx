import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Favorites from './containers/Favorites';
import Cards from './containers/Cards';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Favorites} />
    <Route path="/kaarten" component={Cards} />
  </Route>
);

export default routes;
