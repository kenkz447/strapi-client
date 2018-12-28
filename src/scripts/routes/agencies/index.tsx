import * as React from 'react';
import { Switch } from 'react-router';

import { routeFrom } from '@/app';

import { RouteAgencyList } from './agency-list';

const routes = routeFrom([
    RouteAgencyList
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);