import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Switch } from 'react-router';

import { RoutEmailConfirmation } from './email-confirmation';
import { RouteForgottenPassword } from './forgetten-password';
import { RouteAuthInvitaion } from './invitation';
import { RouteLogin } from './login';
import { RouteProvideConnectCallback } from './provider-connect-callback';
import { RouteRegister } from './register';
import { RouteResetPassword } from './reset-password';

const routes = routeFrom([
    RouteLogin,
    RouteRegister,
    RouteForgottenPassword,
    RouteResetPassword,
    RouteAuthInvitaion,
    RoutEmailConfirmation,
    RouteProvideConnectCallback
]);

export default () => (
    <Switch>
        {routes}
    </Switch>
);