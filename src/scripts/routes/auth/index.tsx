import * as React from 'react';
import { Switch } from 'react-router';

import { routeFrom } from '@/app';

import { RouteConfirm } from './confirm';
import { RouteLogin } from './login';
import { RouteRegister } from './register';

const routes = routeFrom([
    RouteLogin,
    RouteRegister,
    RouteConfirm
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);