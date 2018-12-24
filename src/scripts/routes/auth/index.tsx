import * as React from 'react';

import { routeFrom } from '@/app';

import { RouteLogin } from './login';

export default () => (
    <React.Fragment>
        {routeFrom([RouteLogin])}
    </React.Fragment>
);