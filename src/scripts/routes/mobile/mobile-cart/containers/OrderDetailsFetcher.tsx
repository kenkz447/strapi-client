import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import { RestfulDataContainer, RestfulRender } from 'react-restful';

import { DomainContext } from '@/domain';
import {
    OrderDetail,
    orderDetailResources,
    orderDetailResourceType
} from '@/restful';

import { OrderDetailList } from './order-details-fetcher';

export interface OrderDetailsFetcherProps {
    readonly cartOrderDetails: OrderDetail[];
}

export class OrderDetailsFetcher extends React.PureComponent<OrderDetailsFetcherProps> {
    static readonly contextType = RootContext;
    readonly context!: WithContextProps<DomainContext>;

    private readonly updateOrderDetailContext = (result: OrderDetail[]) => {
        const { setContext } = this.context;
        setContext({
            cartOrderDetails: result
        });
    }

    public render() {
        const { cartOrderDetails } = this.props;
        return (
            <RestfulRender
                initData={cartOrderDetails}
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
