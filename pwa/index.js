import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Router, RouterContext, browserHistory, match } from 'react-router';

import routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import template from '../template-html.js';

if(typeof document !== 'undefined') {
  const outlet = document.getElementById('root');
  render(
    <Router
      onUpdate={() => window.scrollTo(0, 0)}
      history={browserHistory}
      routes={routes} />,
    outlet);
}

export default (locals, callback) => {
  match({ routes, location: locals.path }, (error, redirectLocation, renderProps) => {
    callback(null, template(renderToString(<RouterContext {...renderProps} />), locals.assets.main));
  });
};
