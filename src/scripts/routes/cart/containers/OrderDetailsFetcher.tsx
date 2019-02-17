import * as React from 'react';
import { RestfulDataContainer, RestfulRender } from 'react-restful';

import {
    OrderDetail,
    orderDetailResources,
    orderDetailResourceType
} from '@/restful';

import { OrderDetailList } from './order-details-fetcher';

export interface OrderDetailsFetcherProps {
    readonly initOrderDetails: OrderDetail[];
}

export class OrderDetailsFetcher extends React.PureComponent<OrderDetailsFetcherProps> {
    public render() {
        const { initOrderDetails } = this.props;
        return (
            <RestfulRender
                initData={initOrderDetails}
                resource={orderDetailResources.find}
            >
                {({ data }) => {
                    return (
                        <RestfulDataContainer
                            resourceType={orderDetailResourceType}
                            initDataSource={data!}
                        >
                            {(syncOrderDetails) => {
                                return <OrderDetailList orderDetails={syncOrderDetails} />;
                            }}
                        </RestfulDataContainer>
                    );
                }}
            </RestfulRender>
        );
    }
}
