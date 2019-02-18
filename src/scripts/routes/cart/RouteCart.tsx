import { PageHeader } from 'ant-design-pro';
import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import { CART_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { text } from '@/i18n';

import { OrderDetailsPageHeader } from './containers';
import { OrderDetailsFetcher } from './containers/OrderDetailsFetcher';

type RouteCartProps = AppPageProps;

export class RouteCart extends RoutePage<RouteCartProps> {
    static readonly routeInfo: RouteInfo = {
        path: CART_URL,
        title: text('Shopping cart'),
        exact: true
    };

    static readonly withContext = [nameof<DomainContext>(o => o.initOrderDetails)];

    render() {
        const { initOrderDetails } = this.props;

        return (
            <PageWrapper>
                <OrderDetailsPageHeader initOrderDetails={initOrderDetails} />
                <PageContent>
                    <OrderDetailsFetcher initOrderDetails={initOrderDetails} />
                </PageContent>
            </PageWrapper>
        );
    }
}