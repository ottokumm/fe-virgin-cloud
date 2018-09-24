
import login from './pages/login/routes';
import catalog from './pages/catalog/routes';

export const routes = () => ([
  login(),
  catalog(),
]);

export default routes;
