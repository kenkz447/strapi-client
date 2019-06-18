import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Redirect } from 'react-router';

import { DASHBOARD_BASE_PATH } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { roles } from '@/domain/roles-permission';
import { text } from '@/i18n';

type RouteHomeProps = AppPageProps;

export class RouteHome extends RoutePage<RouteHomeProps> {
    static readonly withContext = [nameof<DomainContext>(o => o.currentUser)];

    static readonly routeInfo: RouteInfo = {
        path: '/',
        title: text('Dashboard'),
        exact: true
    };

    render() {
        const { currentUser } = this.props;
        
        if (!currentUser) {
            const publicRole = roles.find(o => o.key === 'Public')!;

            return <Redirect to={publicRole.defaultUrl!} />;
        }
        return (<Redirect to={DASHBOARD_BASE_PATH} />);
    }
}