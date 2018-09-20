import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { routes } from './routes';

export const App = () => (
  <HashRouter>
    <div>{routes.map(route => <Route path={route.path} component={route.component} />)}</div>
  </HashRouter>
);
