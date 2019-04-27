import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { RouteCatalog, RouteMobileCatalogDetails } from './mobile-catalog';
import { RouteMobileCatalogContact } from './mobile-contact';

export const routes = routeFrom([
    RouteCatalog,
    RouteMobileCatalogDetails,
    RouteMobileCatalogContact
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);