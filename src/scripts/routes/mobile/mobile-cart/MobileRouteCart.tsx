import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';
import styled from 'styled-components';

import { PageWrapper, SlideUp } from '@/components';
import { CART_URL, getMobileUrl } from '@/configs';
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
                    <h1>GIỎ HÀNG</h1>
                    <SlideUp>
                        <OrderDetailsFetcher cartOrderDetails={cartOrderDetails} />
                    </SlideUp>
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