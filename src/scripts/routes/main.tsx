import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { RouteAccounts } from './accounts';
import { RouteCart } from './cart';
import { RouteCatalog } from './catalog';
import { RouteCheckout } from './checkout';
import { RouteDashboard } from './dashboard';
import { RouteHome } from './home';
import { RouteInvitations } from './invitations';
import { IssueTicketDetails, RouteIssueTickets } from './issue-tickets';
import { RouteMaterialLibrary } from './material-library';
import { RouteProduct } from './product';

export const routes = routeFrom([
    RouteHome,
    RouteDashboard,
    RouteProduct,
    RouteCart,
    RouteCheckout,
    RouteAccounts,
    RouteIssueTickets,
    IssueTicketDetails,
    RouteInvitations,
    RouteMaterialLibrary,
    RouteCatalog
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);