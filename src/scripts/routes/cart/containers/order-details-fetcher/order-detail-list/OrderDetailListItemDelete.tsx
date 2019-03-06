import { Button, InputNumber } from 'antd';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';

import { RootContext } from '@/app';
import { BusinessController } from '@/business';
import { deleteOrderDetail, upsertOrderDetail } from '@/business/order-detail';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { OrderDetail } from '@/restful';

interface OrderDetailListItemDeleteProps {
    readonly orderDetail: OrderDetail;
}

export class OrderDetailListItemDelete extends React.PureComponent<OrderDetailListItemDeleteProps> {
    static readonly contextType = RootContext;
    readonly context!: WithContextProps<DomainContext>;

    public render() {
        const { orderDetail } = this.props;
        return (
            <BusinessController
                action={deleteOrderDetail}
                delay={500}
                onSuccess={() => {
                    const { initOrderDetails, setContext } = this.context;
                    setContext({
                        initOrderDetails: initOrderDetails.filter(o => o.id !== orderDetail.id)
                    });
                }}
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
