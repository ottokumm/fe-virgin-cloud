import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { store } from './store';
import { routes } from './routes';

export const App = () => (
  <Provider store={store}>
    <HashRouter>
      <div>{routes.map(route => <Route path={route.path} component={route.component} />)}</div>
    </HashRouter>
  </Provider>
);
