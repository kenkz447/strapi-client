import { PageHeader } from 'ant-design-pro';
import { Col, Row } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';

import { PageContent, PageWrapper } from '@/components';
import { CART_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { orderDetailResourceType } from '@/restful';

import { OrderDetailsPageHeader, OrderOverview } from './containers';
import { OrderDetailsFetcher } from './containers/OrderDetailsFetcher';

type RouteCartProps = AppPageProps;

export class RouteCart extends RoutePage<RouteCartProps> {
    static readonly routeInfo: RouteInfo = {
        path: CART_URL,
        title: text('Shopping cart'),
        exact: true
    };

    static readonly withContext = [nameof<DomainContext>(o => o.cartOrderDetails)];

    render() {
        const { cartOrderDetails } = this.props;

        return (
            <PageWrapper>
                <OrderDetailsPageHeader cartOrderDetails={cartOrderDetails} />
                <PageContent>
                    <Row gutter={24}>
                        <Col span={17}>
                            <OrderDetailsFetcher cartOrderDetails={cartOrderDetails} />
                        </Col>
                        <Col span={7}>
                            <RestfulDataContainer
                                resourceType={orderDetailResourceType}
                                initDataSource={cartOrderDetails}
                            >
                                {(syncData) => <OrderOverview cartOrderDetails={syncData} />}
                            </RestfulDataContainer>
                        </Col>
                    </Row>
                </PageContent>
            </PageWrapper>
        );
    }
}