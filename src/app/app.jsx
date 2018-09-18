import React from 'react';
import { routes } from './routes';
import { HashRouter, Route } from 'react-router-dom';

export const App = () => (
    <HashRouter>
        <div>
            {
                routes.map((route) => <Route path={route.path} component={route.component} />)
            }
        </div>
    </HashRouter>
);