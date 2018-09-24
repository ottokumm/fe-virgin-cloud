import * as ROUTES from '../../constants/routes';

import { Login } from '.';

export const routes = () => ({
  exact: true,
  path: ROUTES.LOGIN,
  component: Login,
});

export default routes;
