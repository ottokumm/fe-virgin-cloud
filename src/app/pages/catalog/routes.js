import * as ROUTES from '../../constants/routes';

import { CatalogMain } from '.';

export const routes = () => ({
  exact: true,
  path: ROUTES.CATALOG,
  component: CatalogMain,
});

export default routes;
