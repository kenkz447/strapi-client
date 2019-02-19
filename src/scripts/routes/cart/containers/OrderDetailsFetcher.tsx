import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import { RestfulDataContainer, RestfulRender } from 'react-restful';

import { RootContext } from '@/app';
import { DomainContext } from '@/domain';
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
    static readonly contextType = RootContext;
    readonly context!: WithContextProps<DomainContext>;

    private readonly updateOrderDetailContext = (result: OrderDetail[]) => {
        const { setContext } = this.context;
        setContext({
            initOrderDetails: result
        });
    }

    public render() {
        const { initOrderDetails } = this.props;
        return (
            <RestfulRender
                initData={initOrderDetails}
                initFetch={true}
                resource={orderDetailResources.find}
                onFetchCompleted={this.updateOrderDetailContext}
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
