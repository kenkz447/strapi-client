import * as React from 'react';
import { Switch } from 'react-router';

import { routeFrom } from '@/app';

import { RouteAgencies } from './agency-list';

const routes = routeFrom([
    RouteAgencies
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);