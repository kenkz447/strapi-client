import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';

import { PageContent, PageLoading, PageWrapper, SlideUp } from '@/components';
import { ORDER_DETAIL_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { Order, orderResourceType, request } from '@/restful';
import { orderResources } from '@/restful';

import order from '../';
import {
    OrderDetailsHeader,
    OrderDetailsPhotos,
    OrderDetailsProducts,
    OrderDetailsTransactions
} from './containers';

type RouteProps = AppPageProps<{ readonly id: number }>;

interface RouteOrderDetailsState {
    readonly allowLoad: boolean;
    readonly initOrder: Order | null;
    readonly currentTab: string;
}

export class RouteOrderDetails extends RoutePage<RouteProps, RouteOrderDetailsState> {
    static readonly withContext: Array<keyof DomainContext> = [];

    static readonly routeInfo: RouteInfo<RouteProps, RouteOrderDetailsState> = {
        path: ORDER_DETAIL_URL,
        title: (props, state) => {
            if (!state || !state.initOrder) {
                return text('Order detail');
            }

            const { initOrder } = state;

            return text('Order code') + ': ' + initOrder.code;
        },
        exact: true
    };

    readonly state = {
        allowLoad: false,
        initOrder: null,
        currentTab: 'details'
    };

    constructor(props: RouteProps) {
        super(props);
        this.fetchResources();
    }

    readonly fetchResources = async () => {
        const { match } = this.props;
        const [initOrder] = await Promise.all([
            request(orderResources.findOne, {
                type: 'path',
                parameter: 'id',
                value: match.params.id
            }),
        ]);

        this.setState({
            allowLoad: true,
            initOrder: initOrder
        });
    }

    render() {
        const { allowLoad, initOrder } = this.state;
        if (!allowLoad) {
            return <PageLoading />;
        }

        const { currentTab } = this.state;

        return (
            <RestfulDataContainer
                resourceType={orderResourceType}
                initDataSource={[initOrder!]}
                shouldAppendNewRecord={false}
            >
                {([syncOrder]) => (
                    <PageWrapper>
                        <OrderDetailsHeader
                            pageTitle={this.title}
                            order={syncOrder}
                            onTabChange={(tab) => this.setState({ currentTab: tab })}
                        />
                        <PageContent>
                            <SlideUp key="currentTab" className="w-100 d-flex">
                                {
                                    currentTab === 'details'
                                        ? (
                                            <div className="w-100">
                                                <OrderDetailsProducts order={syncOrder} />
                                                <OrderDetailsTransactions order={syncOrder} />
                                            </div>
                                        )
                                        : null
                                }
                                {
                                    currentTab === 'photos'
                                        ? (
                                            <div className="w-100">
                                                <OrderDetailsPhotos order={syncOrder} />
                                            </div>
                                        )
                                        : null
                                }
                            </SlideUp>
                        </PageContent>
                    </PageWrapper>
                )}
            </RestfulDataContainer>
        );
    }
}