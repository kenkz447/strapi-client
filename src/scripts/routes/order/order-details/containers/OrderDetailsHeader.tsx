import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Col, Row } from 'antd';
import { AccessControl } from 'qoobee';
import * as React from 'react';

import {
    getOrderStatusLabel,
    getOrderTransactionMoney
} from '@/business/order';
import { PageHeader } from '@/components';
import { DATE_FORMAT, ORDER_LIST_URL } from '@/configs';
import { policies } from '@/domain';
import { OrderFormButton } from '@/forms/order/order';
import { text } from '@/i18n';
import { Order } from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

const { Description } = DescriptionList;

export interface OrderDetailsHeaderProps {
    readonly pageTitle: string;
    readonly order: Order;
}

export class OrderDetailsHeader extends React.PureComponent<OrderDetailsHeaderProps> {
    private readonly renderHeaderActions = () => {
        const { order } = this.props;
        return (
            <React.Fragment>
                <AccessControl policy={policies.functionAllowed} key="FUNC_UPDATE_ORDER">
                    {(canAccess) => {
                        return (
                            <OrderFormButton
                                initialValues={order}
                                icon="edit"
                                type="primary"
                            />
                        );
                    }}
                </AccessControl>
            </React.Fragment>
        );
    }

    private readonly renderDescription = () => {
        const { order } = this.props;
        return (
            <DescriptionList title={order.note} size="small" col={2}>
                <Description term="Ngày đặt">{formatDate(order.createdAt, DATE_FORMAT)}</Description>
                <Description term="Số lượng">{order.orderDetails.length} {text('product')}</Description>
                <Description term="Tổng giá trị sản phẩm">{formatCurrency(order.totalPrice)}</Description>
                <Description term="Giảm giá sản phẩm">{formatCurrency(order.totalDiscount)}</Description>
                <Description term="Phí vận chuyển">{formatCurrency(order.shippingFee)}</Description>
                <Description term="Yêu cầu đặt cọc">{formatCurrency(order.depositRequired)}</Description>
                <Description term="Dự kiến giao hàng">{formatDate(order.shippingDate, DATE_FORMAT)}</Description>
                <Description term="Điện thoại">{order.phone}</Description>
                <Description term="Email">{order.email}</Description>
                <Description term="Tỉnh thành">
                    {order.shippingToCity.name}/{order.shippingToCounty.name}
                </Description>
                <Description term="Địa chỉ nhận hàng">{order.shippingAddress}</Description>
                <Description term="Tình trạng">
                    {getOrderStatusLabel(order)}
                </Description>
            </DescriptionList>
        );
    }

    private readonly renderExtra = () => {
        const { order } = this.props;
        const transactionMoney = getOrderTransactionMoney(order);

        return (
            <Row>
                <Col sm={24} md={12}>
                    <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>Đã thanh toán</div>
                    <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>
                        {formatCurrency(transactionMoney)}
                    </div>
                </Col>
                <Col sm={24} md={12}>
                    <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>Cần thanh toán</div>
                    <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>
                        {formatCurrency(order.totalOfPayment)}
                    </div>
                </Col>
            </Row>
        );
    }

    public render() {
        const { pageTitle } = this.props;
        return (
            <PageHeader
                title={pageTitle}
                content={this.renderDescription()}
                action={this.renderHeaderActions()}
                extraContent={this.renderExtra()}

                logo={<img src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                breadcrumbList={[{
                    title: 'Home',
                    href: '/'
                }, {
                    title: text('Order list'),
                    href: ORDER_LIST_URL
                }, {
                    title: text('Order details'),
                }]}
            />
        );
    }
}
