import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Switch } from 'react-router';

import { RouteAgencyDetails } from './agency-details';
import { RouteAgencies } from './agency-list';

const routes = routeFrom([
    RouteAgencies,
    RouteAgencyDetails
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);