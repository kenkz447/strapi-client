import { Card, Steps } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { Order } from '@/restful';

const OrderDetailsStatusWrapper = styled.div`
    margin: 0 0 30px 0;

    .ant-steps-item {
        .ant-steps-item-description {
            display: none;
        }
    }

    .ant-steps-item-process {
        .ant-steps-item-description {
            display: block;
        }
    }
`;

interface OrderDetailsStatusProps {
    readonly order: Order;
}

export class OrderDetailsStatus extends React.Component<OrderDetailsStatusProps> {
    readonly getStatusIndex = (order: Order) => {
        switch (order.status) {
            case 'new':
                return 0;
            case 'confirmed':
            case 'produce':
                return 1;
            case 'payment':
                return 2;
            case 'shipping':
                return 3;
            case 'done':
            default:
                return 4;
        }
    }

    render() {
        const { order } = this.props;

        const orderStatusIndex = this.getStatusIndex(order);
        return (
            <OrderDetailsStatusWrapper>
                <Card title="Trạng thái đơn hàng">
                    <Steps current={orderStatusIndex}>
                        <Steps.Step
                            title="Mới"
                            description="Vui lòng đặt cọc đủ số tiền để xác nhận đơn hàng"
                        />
                        <Steps.Step
                            title="Đã xác nhận"
                            description="Đơn hàng đang trong quá trình sản xuất"
                        />
                        <Steps.Step
                            title="Đã sản xuất"
                            description="Vui lòng thanh toán số tiền còn lại để chuyển hàng"
                        />
                        <Steps.Step
                            title="Đang vận chuyển"
                            description="Hàng của bạn đang trên đường đến"
                        />
                        <Steps.Step title="Hoàn thành" />
                    </Steps>
                </Card>
            </OrderDetailsStatusWrapper>
        );
    }
} 