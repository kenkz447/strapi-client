import { Button, Divider } from 'antd';
import * as React from 'react';

import { RouteInfo } from '@/app';
import {
    PageContent,
    PageHeader,
    PageLoading,
    PageWrapper,
    SlideUp
} from '@/components';
import { ORDER_LIST_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { agencyResources, request } from '@/restful';
import { orderResources } from '@/restful';

import { OrdersFetcher } from './containers';

type RouteProps = AppPageProps;

export class RouteOrderList extends RoutePage<RouteProps> {
    static readonly withContext: Array<keyof DomainContext> = [];

    static readonly routeInfo: RouteInfo = {
        path: ORDER_LIST_URL,
        title: () => text('Order list'),
        exact: true
    };

    readonly state = {
        allowLoad: false,
        initOrders: []
    };

    constructor(props: RouteProps) {
        super(props);
        this.fetchResources();
    }

    readonly fetchResources = async () => {
        const [initOrders] = await Promise.all([
            request(orderResources.find, OrdersFetcher.getDefaultRequestParams()),
            request(agencyResources.find)
        ]);

        this.setState({
            allowLoad: true,
            initOrders: initOrders
        });
    }

    readonly renderHeaderActions = () => {
        return (
            <div>
                {null}
            </div>
        );
    }

    render() {
        const { allowLoad, initOrders } = this.state;
        if (!allowLoad) {
            return <PageLoading />;
        }

        return (
            <PageWrapper>
                <PageHeader
                    title={this.title}
                    action={this.renderHeaderActions()}
                    breadcrumbList={[{
                        title: 'Home',
                        href: '/'
                    }, {
                        title: text('Orders')
                    }]}
                />
                <PageContent>
                    <SlideUp className="w-100 d-flex">
                        <OrdersFetcher initData={initOrders} />
                    </SlideUp>
                </PageContent>
            </PageWrapper>
        );
    }
}