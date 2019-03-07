import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Switch } from 'react-router';

import { RouteOrderDetails } from './order-details';
import { RouteOrderList } from './order-list';

const routes = routeFrom([
    RouteOrderList,
    RouteOrderDetails
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);