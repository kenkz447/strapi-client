import { PageHeader } from 'ant-design-pro';
import { Button, Col, Row } from 'antd';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';

import { RootContext } from '@/app';
import { getOrderDetailsTotal } from '@/business/order-detail';
import { CHECKOUT_URL } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { OrderDetail, orderDetailResourceType } from '@/restful';
import { formatCurrency } from '@/utilities';

const breadcrumbList = [{
    title: text('Home'),
    href: '/'
}, {
    title: text('Shopping cart'),
}];

export interface OrderDetailsPageHeaderProps {
    readonly initOrderDetails: OrderDetail[];
}

export class OrderDetailsPageHeader extends React.PureComponent<OrderDetailsPageHeaderProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    private readonly onCheckoutClick = () => {
        const { history } = this.context;
        history.push(CHECKOUT_URL);
    }

    public render() {
        const { initOrderDetails } = this.props;
        return (
            <RestfulDataContainer
                resourceType={orderDetailResourceType}
                initDataSource={initOrderDetails!}
            >
                {(syncOrderDetails) => {
                    return (
                        <PageHeader
                            title={text('Your cart')}
                            breadcrumbList={breadcrumbList}
                            content={<div />}
                            extraContent={this.renderExtra(syncOrderDetails)}
                            action={
                                <Button
                                    type="primary"
                                    icon="solution"
                                    onClick={this.onCheckoutClick}
                                >
                                    {text('Order now!')}
                                </Button>
                            }
                        />
                    );
                }}
            </RestfulDataContainer>
        );
    }

    private readonly renderExtra = (orderDetails: OrderDetail[]) => {
        const total = getOrderDetailsTotal(orderDetails);
        return (
            <div>
                <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>Tạm tính</div>
                <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>
                    {formatCurrency(total)}
                </div>
            </div>
        );
    }
}
