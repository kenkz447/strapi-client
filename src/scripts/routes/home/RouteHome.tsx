import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Redirect } from 'react-router';

import { DASHBOARD_BASE_PATH } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';

type RouteHomeProps = AppPageProps;

export class RouteHome extends RoutePage<RouteHomeProps> {
    static readonly routeInfo: RouteInfo = {
        path: '/',
        title: text('Home'),
        exact: true
    };

    render() {
        return (<Redirect to={DASHBOARD_BASE_PATH} />);
    }
}