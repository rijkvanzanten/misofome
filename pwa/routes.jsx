import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Favorites from './containers/Favorites';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Favorites} />
  </Route>
);

export default routes;
