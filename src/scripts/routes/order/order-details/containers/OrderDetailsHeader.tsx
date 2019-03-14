import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import {
    Button,
    Col,
    Dropdown,
    Icon,
    Menu,
    Popover,
    Row,
    Typography
} from 'antd';
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
import { OrderDeliveryDateFormButton } from '@/forms/order/order-delivery-date';
import { OrderStatusFormButton } from '@/forms/order/order-status';
import { text } from '@/i18n';
import { Order } from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

const { Description } = DescriptionList;
const tabList = [{
    key: 'details',
    tab: text('Details'),
}, {
    key: 'photos',
    tab: text('Photos'),
}];

export interface OrderDetailsHeaderProps {
    readonly pageTitle: string;
    readonly order: Order;
    readonly onTabChange: (tab: string) => void;
}

export class OrderDetailsHeader extends React.PureComponent<OrderDetailsHeaderProps> {
    private readonly renderHeaderActions = () => {
        const { order } = this.props;
        return (
            <React.Fragment>
                <AccessControl policy={policies.functionAllowed} key="FUNC_UPDATE_ORDER">
                    {() => {
                        return (
                            <Dropdown
                                placement="bottomRight"
                                overlay={(
                                    <Menu>
                                        <Menu.Item>
                                            <OrderStatusFormButton
                                                initialValues={order}
                                            />
                                        </Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Item>
                                            <OrderDeliveryDateFormButton
                                                initialValues={order}
                                            />
                                        </Menu.Item>
                                    </Menu>
                                )}
                            >
                                <Button>
                                    {text('Cập nhật')} <Icon type="down" />
                                </Button>
                            </Dropdown>
                        );
                    }}
                </AccessControl>
            </React.Fragment>
        );
    }

    private readonly renderDescription = () => {
        const { order } = this.props;
        const paidAmount = getOrderTransactionMoney(order);

        return (
            <DescriptionList title="Thông tin đơn hàng" size="small" col={2}>
                <Description term="Ngày đặt">{formatDate(order.createdAt, DATE_FORMAT)}</Description>
                <Description term="Số lượng">{order.orderDetails.length} {text('product')}</Description>
                <Description term="Tổng giá trị sản phẩm">{formatCurrency(order.totalPrice)}</Description>
                <Description term="Giảm giá sản phẩm">{formatCurrency(order.totalDiscount)}</Description>
                <Description term="Phí vận chuyển">{formatCurrency(order.shippingFee)}</Description>
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
                <Description term="Yêu cầu đặt cọc">
                    {
                        paidAmount >= order.depositRequired
                            ? (
                                <Typography.Text strong={true}>
                                    {formatCurrency(order.depositRequired)} <Icon type="check" />
                                </Typography.Text>
                            )
                            : (
                                <Typography.Text mark={true} strong={true}>
                                    {formatCurrency(order.depositRequired)}
                                </Typography.Text>
                            )
                    }
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
        const { pageTitle, onTabChange } = this.props;
        return (
            <PageHeader
                title={pageTitle}
                content={this.renderDescription()}
                action={this.renderHeaderActions()}
                extraContent={this.renderExtra()}
                tabList={tabList}
                logo={<img src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                onTabChange={onTabChange}
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
