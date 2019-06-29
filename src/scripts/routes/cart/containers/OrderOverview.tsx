import { DescriptionList } from 'ant-design-pro';
import { Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { getOrderDiscount, getOrderShippingDate } from '@/business/order';
import {
    getOrderDetailsMaterialNorms,
    getOrderDetailsQuantity,
    getOrderDetailsSubTotal
} from '@/business/order-detail';
import { DATE_FORMAT } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { OrderDetail } from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

const OrderOverviewWrapper = styled.div`
    .antd-pro-description-list {
        &-term {
            display: inline-block!important;
            width: 65%;
            margin-right: 0!important;
            vertical-align: top;
        }
        &-detail {
            display: inline-block!important;
            width: 35%!important;
        }
    }
`;

interface OrderOverviewProps {
    readonly cartOrderDetails: OrderDetail[];
}

export class OrderOverview extends React.PureComponent<OrderOverviewProps> {

    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    public render() {
        const { currentAgency } = this.context;
        const { cartOrderDetails } = this.props;

        const total = getOrderDetailsSubTotal(cartOrderDetails);
        const discount = getOrderDiscount({
            orderDetails: cartOrderDetails,
            agencyOrderer: currentAgency
        });

        const orderDetailsMaterialNorms = getOrderDetailsMaterialNorms(cartOrderDetails);

        return (
            <OrderOverviewWrapper>
                <DescriptionList title="Tổng quan đơn hàng" size="large" col={1}>
                    <DescriptionList.Description term={text('Estimated delivery time')}>
                        &nbsp;{formatDate(getOrderShippingDate(), DATE_FORMAT)}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Number of products')}>
                        &nbsp;{getOrderDetailsQuantity(cartOrderDetails)}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Total amount')}>
                        &nbsp;{formatCurrency(total)}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Discount by agency policy')}>
                        -{formatCurrency(discount.agency.discount)} ({discount.agency.percent}%)
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Discount by quantity')}>
                        -{formatCurrency(discount.products)}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Sub total')}>
                        <Typography.Text strong={true}>
                            &nbsp;{formatCurrency(total - discount.total)}
                        </Typography.Text>
                    </DescriptionList.Description>
                </DescriptionList>
                {
                    orderDetailsMaterialNorms.length
                        ? (
                            <React.Fragment>
                                <div className="white-space-2" />
                                <DescriptionList title="Vật liệu cần cung cấp" size="large" col={1}>
                                    {
                                        orderDetailsMaterialNorms.map(o => {
                                            return (
                                                <DescriptionList.Description
                                                    key={o._materialId}
                                                    term={o._materialName}
                                                >
                                                    {o._totalNorms}m
                                                </DescriptionList.Description>
                                            );
                                        })
                                    }
                                </DescriptionList>
                            </React.Fragment>
                        )
                        : null
                }
            </OrderOverviewWrapper>
        );
    }
}
