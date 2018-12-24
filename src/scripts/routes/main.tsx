import * as React from 'react';
import { Route, Switch } from 'react-router';

import { routeFrom } from '@/app';
import { NotFoundPage } from '@/components';

import { RouteDashboard } from './dashboard';

export const routes = routeFrom([
    RouteDashboard
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);