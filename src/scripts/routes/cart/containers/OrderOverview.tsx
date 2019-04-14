import { DescriptionList } from 'ant-design-pro';
import { Card, Typography } from 'antd';
import * as React from 'react';

import { getOrderShippingDate, getOrderTransportFee } from '@/business/order';
import {
    getOrderDetailsDiscount,
    getOrderDetailsQuantity,
    getOrderDetailsSubTotal
} from '@/business/order-detail';
import {
    getOrderDetailsMaterialNorms
} from '@/business/order-detail/getters/getOrderDetailsMaterialNorms';
import { DATE_FORMAT } from '@/configs';
import { text } from '@/i18n';
import { OrderDetail } from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

interface OrderOverviewProps {
    readonly cartOrderDetails: OrderDetail[];
}

export class OrderOverview extends React.PureComponent<OrderOverviewProps> {
    public render() {
        const { cartOrderDetails } = this.props;
        const total = getOrderDetailsSubTotal(cartOrderDetails);
        const discount = getOrderDetailsDiscount(cartOrderDetails);
        const orderDetailsMaterialNorms = getOrderDetailsMaterialNorms(cartOrderDetails);

        return (
            <React.Fragment>
                <DescriptionList title="Tổng quan đơn hàng" size="large" col={1}>
                    <DescriptionList.Description term={text('Estimated delivery time')}>
                        {formatDate(getOrderShippingDate(), DATE_FORMAT)}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Number of products')}>
                        {getOrderDetailsQuantity(cartOrderDetails)}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Total amount')}>
                        {formatCurrency(total)}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Discount')}>
                        -{formatCurrency(discount)}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Sub total')}>
                        <Typography.Text strong={true}>
                            {formatCurrency(total - discount)}
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
            </React.Fragment>
        );
    }
}
