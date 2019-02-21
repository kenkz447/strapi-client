import * as React from 'react';
import { Route, Switch } from 'react-router';

import { routeFrom } from '@/app';
import { NotFoundPage } from '@/components';

import { RouteAccounts } from './accounts';
import { RouteCart } from './cart';
import { RouteCheckout } from './checkout';
import { RouteDashboard } from './dashboard';
import { RouteProduct } from './product';

export const routes = routeFrom([
    RouteDashboard,
    RouteProduct,
    RouteCart,
    RouteCheckout,
    RouteAccounts
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);