import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { RouteCatalog, RouteMobileCatalogDetails } from './mobile-catalog';
import { RouteMobileContact } from './mobile-contact';
import { RouteMobilePostDetail, RouteMobilePostList } from './mobile-post';
import { RouteMobileProduct } from './mobile-product';

export const routes = routeFrom([
    RouteMobilePostList,
    RouteMobilePostDetail,
    RouteCatalog,
    RouteMobileCatalogDetails,
    RouteMobileContact,
    RouteMobileProduct
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);