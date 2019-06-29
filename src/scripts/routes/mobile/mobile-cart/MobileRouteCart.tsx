import { Col, Icon, Row } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PageContent, PageWrapper } from '@/components';
import { CART_URL, getMobileUrl, PRODUCT_PATH } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { orderDetailResourceType } from '@/restful';
import { OrderOverview } from '@/routes/cart/containers';

import { MobileCartOrderNowButton, OrderDetailsFetcher } from './containers';

const MobileRouteCartWrapper = styled.div`
    padding: 24px;
    background: inherit;
`;

type MobileRouteCartProps = AppPageProps;

export class MobileRouteCart extends RoutePage<MobileRouteCartProps> {
    static readonly routeInfo: RouteInfo = {
        path: getMobileUrl(CART_URL),
        title: text('Shopping cart'),
        exact: true
    };

    static readonly withContext = [nameof<DomainContext>(o => o.cartOrderDetails)];

    render() {
        const { cartOrderDetails } = this.props;

        return (
            <PageWrapper>
                <MobileRouteCartWrapper>
                    <OrderDetailsFetcher cartOrderDetails={cartOrderDetails} />
                    <div className="white-space-2" />
                    <RestfulDataContainer
                        resourceType={orderDetailResourceType}
                        initDataSource={cartOrderDetails}
                    >
                        {(syncData) => <OrderOverview cartOrderDetails={syncData} />}
                    </RestfulDataContainer>
                    <div className="white-space-2" />
                    <MobileCartOrderNowButton cartOrderDetails={cartOrderDetails} />
                </MobileRouteCartWrapper>
            </PageWrapper>
        );
    }
}