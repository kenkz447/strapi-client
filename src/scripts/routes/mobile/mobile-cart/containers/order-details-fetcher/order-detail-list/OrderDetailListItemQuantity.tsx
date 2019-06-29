import { InputNumber } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';

import { BusinessController } from '@/business';
import {
    updateOrderDetailQuantity,
    upsertOrderDetail
} from '@/business/order-detail';
import { DomainContext } from '@/domain';
import { OrderDetail } from '@/restful';

interface OrderDetailListItemQuantityProps {
    readonly orderDetail: OrderDetail;
}

interface OrderDetailListItemQuantityState {
    readonly quantity: number;
}

export class OrderDetailListItemQuantity extends React.PureComponent<
    OrderDetailListItemQuantityProps,
    OrderDetailListItemQuantityState> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    constructor(props: OrderDetailListItemQuantityProps) {
        super(props);
        this.state = {
            quantity: props.orderDetail.quantity
        };
    }

    public render() {
        const { orderDetail } = this.props;
        return (
            <BusinessController
                action={updateOrderDetailQuantity}
                onSuccess={(updatedOrderDetail: OrderDetail) => {
                    const { cartOrderDetails, setContext } = this.context;
                    const nextCartOrderDetails = cartOrderDetails.map(o => {
                        if (o.id !== updatedOrderDetail.id) {
                            return o;
                        }

                        return updatedOrderDetail;
                    });

                    setContext({
                        cartOrderDetails: nextCartOrderDetails
                    });
                }}
                delay={500}
            >
                {({ doBusiness }) => (
                    <InputNumber
                        value={this.state.quantity}
                        onChange={(nextValue) => {
                            if (!nextValue || Number.isNaN(+nextValue!)) {
                                return;
                            }

                            if (nextValue < 1) {
                                return;
                            }

                            this.setState({
                                quantity: nextValue
                            });

                            doBusiness({
                                ...orderDetail,
                                quantity: nextValue
                            });
                        }}
                    />
                )}
            </BusinessController>
        );
    }
}
