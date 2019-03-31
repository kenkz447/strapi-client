import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Button, Col, Dropdown, Icon, Menu, Row, Typography } from 'antd';
import { AccessControl, RootContext } from 'qoobee';
import * as React from 'react';

import { BusinessController } from '@/business';
import {
    getOrderStatusLabel,
    getOrderTransactionMoney,
    lockOrder
} from '@/business/order';
import { PageHeader } from '@/components';
import {
    DATE_FORMAT,
    ISSUE_TICKET_DETAIL_URL,
    ORDER_LIST_URL
} from '@/configs';
import { policies, WithHistory } from '@/domain';
import { confirm } from '@/effects';
import { IssueTicketCreateFormButton } from '@/forms/issue-ticket';
import { OrderDeliveryDateFormButton } from '@/forms/order/order-delivery-date';
import { OrderStatusFormButton } from '@/forms/order/order-status';
import { text } from '@/i18n';
import { Order } from '@/restful';
import { formatCurrency, formatDate, replaceRoutePath } from '@/utilities';

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
    static readonly contextType = RootContext;
    readonly context!: WithHistory;

    private readonly renderHeaderActions = () => {
        const { order } = this.props;
        const { history } = this.context;

        const { issueTickets } = order;

        const complainIssueTicket = issueTickets && issueTickets.find(o => o.type === 'order_complain');
        const cancelIssueTicket = issueTickets && issueTickets.find(o => o.type === 'order_cancel');

        return (
            <React.Fragment>
                <AccessControl policy={policies.functionAllowed} funcKey="FUNC_UPDATE_ORDER">
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
                                        {
                                            cancelIssueTicket && (
                                                <Menu.Item>
                                                    <BusinessController
                                                        action={lockOrder}
                                                        params={order}
                                                    >
                                                        {({ doBusiness }) => {
                                                            return (
                                                                <div onClick={() => doBusiness()}>
                                                                    <Typography.Text
                                                                        type="danger"
                                                                    >
                                                                        {text('Lock this order!')}
                                                                    </Typography.Text>
                                                                </div>
                                                            );
                                                        }}
                                                    </BusinessController>

                                                </Menu.Item>
                                            )
                                        }
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
                <AccessControl
                    policy={policies.functionAllowed}
                    funcKey="FUNC_ORDER_COMPLAIN"
                >
                    {() => {
                        if (complainIssueTicket) {
                            return (
                                <Button
                                    icon="link"
                                    onClick={() => {
                                        history.push(
                                            replaceRoutePath(ISSUE_TICKET_DETAIL_URL, complainIssueTicket)
                                        );
                                    }}
                                >
                                    {text('Khiếu nại hàng hóa')}
                                </Button>
                            );
                        }

                        return (
                            <IssueTicketCreateFormButton
                                label={text('Khiếu nại hàng hóa')}
                                initialValues={{
                                    title: 'Khiếu nại về hàng hóa',
                                    order: order,
                                    orderCode: order.code,
                                    type: 'order_complain'
                                }}
                                onSuccess={async (result) => {
                                    const isToIssueTicketDetails = await confirm(
                                        'Yêu cầu của bạn đã được gởi',
                                        // tslint:disable-next-line:max-line-length
                                        'Để chúng tôi có thể hỗ trợ bạn được tốt nhất, vui lòng đến trang hỗ trợ để cung cấp thêm thông tin và hình ảnh về vấn đề đang gặp phải!'
                                    );

                                    if (!isToIssueTicketDetails) {
                                        return;
                                    }

                                    history.push(
                                        replaceRoutePath(ISSUE_TICKET_DETAIL_URL, result)
                                    );
                                }}
                            >
                                {text('Khiếu nại hàng hóa')}
                            </IssueTicketCreateFormButton>
                        );
                    }}
                </AccessControl>
                <AccessControl
                    policy={policies.functionAllowed}
                    funcKey="FUNC_ORDER_CANCEL"
                >
                    {() => {
                        if (cancelIssueTicket) {
                            return (
                                <Button
                                    type="danger"
                                    ghost={true}
                                    icon="link"
                                    onClick={() => {
                                        history.push(
                                            replaceRoutePath(ISSUE_TICKET_DETAIL_URL, cancelIssueTicket)
                                        );
                                    }}
                                >
                                    {text('Yêu cầu hủy đơn')}
                                </Button>
                            );
                        }

                        return (
                            <IssueTicketCreateFormButton
                                type="danger"
                                ghost={true}
                                label={text('Yêu cầu hủy đơn')}
                                initialValues={{
                                    title: 'Yêu cầu hủy đơn',
                                    order: order,
                                    orderCode: order.code,
                                    type: 'order_cancel'
                                }}
                                onSuccess={async (result) => {
                                    const isToIssueTicketDetails = await confirm(
                                        'Yêu cầu của bạn đã được gởi',
                                        // tslint:disable-next-line:max-line-length
                                        'Để chúng tôi có thể hỗ trợ bạn được tốt nhất, vui lòng đến trang hỗ trợ để cung cấp thêm thông tin và hình ảnh về vấn đề đang gặp phải!'
                                    );

                                    if (!isToIssueTicketDetails) {
                                        return;
                                    }

                                    history.push(
                                        replaceRoutePath(ISSUE_TICKET_DETAIL_URL, result)
                                    );
                                }}
                            >
                                {text('Yêu cầu hủy đơn')}
                            </IssueTicketCreateFormButton>
                        );
                    }}
                </AccessControl>
            </React.Fragment>
        );
    }

    private readonly renderDescription = () => {
        const { order } = this.props;
        const paidAmount = getOrderTransactionMoney(order);

        const deposited = paidAmount >= order.depositRequired;

        return (
            <DescriptionList title="Thông tin đơn hàng" size="small" col={2}>
                <Description term="Ngày đặt">{formatDate(order.createdAt, DATE_FORMAT)}</Description>
                <Description term="Số lượng">{order.totalProduct} {text('product')}</Description>
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
                {
                    deposited
                        ? (
                            <Description term={text('Deposited')}>
                                <Typography.Text>
                                    {formatCurrency(order.depositRequired)}
                                </Typography.Text>
                            </Description>
                        )
                        : (
                            <Description term={text('Deposit required')}>
                                <Typography.Text mark={true} strong={true}>
                                    {formatCurrency(order.depositRequired)}
                                </Typography.Text>
                            </Description>
                        )
                }
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
                    title: text('Dashboard'),
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
