import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Switch } from 'react-router';

import { RouteProfileAccount } from './account';

const routes = routeFrom([RouteProfileAccount]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);