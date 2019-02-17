import { InputNumber } from 'antd';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertOrderDetail } from '@/business/order-detail';
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
                action={upsertOrderDetail}
                delay={500}
            >
                {({ doBusiness }) => (
                    <InputNumber
                        value={this.state.quantity}
                        onChange={(nextValue) => {
                            if (!nextValue || Number.isNaN(+nextValue!)) {
                                return;
                            }

                            if (nextValue <= 1) {
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
