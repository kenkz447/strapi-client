import * as React from 'react';
import { Switch } from 'react-router';

import { routeFrom } from '@/app';

import { RouteOrderList } from './order-list';

const routes = routeFrom([
    RouteOrderList
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);