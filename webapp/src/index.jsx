/* global window, document */
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';

import rootReducer from './reducers';

// material-ui uses react-tap-event-plugin to listen for touch / tap / clickevents
injectTapEventPlugin();


// setup redux store enhancers
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(thunk));

// create store with reducers and enhancers
const store = createStore(rootReducer, enhancers);

// accept hot-reloading reducers
if (module.hot) {
  module.hot.accept('./reducers/index', () => {
    const nextReducer = require('./reducers/index'); // eslint-disable-line global-require
    store.replaceReducer(nextReducer);
  });
}

// render app to DOM
render(
  <Provider store={store}>
    <Router
      onUpdate={() => window.scrollTo(0, 0)}
      history={browserHistory}
      routes={routes(store)}
    />
  </Provider>,
  document.getElementById('root')
);
