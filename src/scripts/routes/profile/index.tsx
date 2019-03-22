import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Switch } from 'react-router';

import { RouteProfileAccount } from './account';
import { RouteProfileAgency } from './agency';
import { RouteChangePassword } from './change-password';

const routes = routeFrom([
    RouteProfileAccount,
    RouteProfileAgency,
    RouteChangePassword
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);