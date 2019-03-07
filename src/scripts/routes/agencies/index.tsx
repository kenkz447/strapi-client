import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Switch } from 'react-router';

import { RouteAgencies } from './agency-list';

const routes = routeFrom([
    RouteAgencies
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);