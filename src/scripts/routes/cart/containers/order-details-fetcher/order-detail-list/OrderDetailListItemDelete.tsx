import { Button, InputNumber } from 'antd';
import * as React from 'react';

import { BusinessController } from '@/business';
import { deleteOrderDetail, upsertOrderDetail } from '@/business/order-detail';
import { text } from '@/i18n';
import { OrderDetail } from '@/restful';

interface OrderDetailListItemDeleteProps {
    readonly orderDetail: OrderDetail;
}

export class OrderDetailListItemDelete extends React.PureComponent<OrderDetailListItemDeleteProps> {
    public render() {
        const { orderDetail } = this.props;
        return (
            <BusinessController
                action={deleteOrderDetail}
                delay={500}
            >
                {({ doBusiness, loading }) => (
                    <Button
                        type="danger"
                        icon="delete"
                        ghost={true}
                        loading={loading}
                        onClick={() => doBusiness(orderDetail)}
                    >
                        {text('Delete')}
                    </Button>
                )}
            </BusinessController>
        );
    }
}
