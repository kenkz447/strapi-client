import * as React from 'react';
import { Switch } from 'react-router';

import { routeFrom } from '@/app';

import { RouteConfirm } from './confirm';
import { RouteForgottenPassword } from './forgetten-password';
import { RouteLogin } from './login';
import { RouteRegister } from './register';
import { RouteResetPassword } from './reset-password';

const routes = routeFrom([
    RouteLogin,
    RouteRegister,
    RouteConfirm,
    RouteForgottenPassword,
    RouteResetPassword
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);