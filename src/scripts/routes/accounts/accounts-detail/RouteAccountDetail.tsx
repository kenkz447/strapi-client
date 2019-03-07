import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import { LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';

type RouteAccountDetailProps = AppPageProps;

export class RouteAccountDetail extends RoutePage<RouteAccountDetailProps> {
    static readonly routeInfo: RouteInfo = {
        path: LOGIN_URL,
        title: text('Account'),
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