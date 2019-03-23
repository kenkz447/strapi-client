import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Switch } from 'react-router';

import { RouteProfileAccount } from './account';
import { RouteProfileAddressBook } from './address-book';
import { RouteProfileAgency } from './agency';
import { RouteChangePassword } from './change-password';

const routes = routeFrom([
    RouteProfileAccount,
    RouteProfileAgency,
    RouteChangePassword,
    RouteProfileAddressBook
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);