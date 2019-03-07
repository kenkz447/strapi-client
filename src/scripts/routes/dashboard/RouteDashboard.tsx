import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageWrapper } from '@/components';
import { LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';

type RouteDashboardProps = AppPageProps;

export class RouteDashboard extends RoutePage<RouteDashboardProps> {
    static readonly routeInfo: RouteInfo = {
        path: LOGIN_URL,
        title: text('Dashboard'),
        exact: true
    };

    render() {
        return (
            <PageWrapper>
                <PageContent>
                    {null}
                </PageContent>
            </PageWrapper>
        );
    }
}