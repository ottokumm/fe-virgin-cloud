import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import { Root } from './containers/root';

import { store } from './store';
import { routes } from './routes';

export const App = () => (
  <Provider store={store}>
    <Router>
      <Root>
        {routes().map(route => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
      </Root>
    </Router>
  </Provider>
);
