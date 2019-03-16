import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { RouteAccounts } from './accounts';
import { RouteCart } from './cart';
import { RouteCheckout } from './checkout';
import { RouteDashboard } from './dashboard';
import { RouteIssueTickets } from './issue-tickets';
import { RouteProduct } from './product';

export const routes = routeFrom([
    RouteDashboard,
    RouteProduct,
    RouteCart,
    RouteCheckout,
    RouteAccounts,
    RouteIssueTickets
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);