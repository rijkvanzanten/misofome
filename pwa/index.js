import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Router, RouterContext, browserHistory, match } from 'react-router';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider  } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const enhancers = composeEnhancers(applyMiddleware(thunk));

if(module.hot) {
  module.hot.accept('./reducers/index', () => {
    const nextReducer = require('./reducers/index');
    store.replaceReducer(nextReducer);
  });
}

const store = createStore(
  rootReducer,
  enhancers
);

import routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import template from '../template-html.js';

if(typeof document !== 'undefined') {
  const outlet = document.getElementById('root');
  render(
    <Provider store={store}>
      <Router
        onUpdate={() => window.scrollTo(0, 0)}
        history={browserHistory}
        routes={routes} />
    </Provider>,
    outlet);
}

export default (locals, callback) => {
  match({ routes, location: locals.path }, (error, redirectLocation, renderProps) => {
    callback(null, template(renderToString(<RouterContext {...renderProps} />), locals.assets.main));
  });
};
