import { Card, Icon, List, Tooltip, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { getOrderDiscount } from '@/business/order';
import { COLOR_PRIMARY_700 } from '@/configs';
import { DomainContext } from '@/domain';
import {
    OrderDetailDiscountTooltip
} from '@/forms/order-detail/order-detail-create/order-detail-create-form-control/shared';
import { text } from '@/i18n';
import { OrderDetail } from '@/restful';
import { formatCurrency } from '@/utilities';

import {
    OrderDetailListItemDelete,
    OrderDetailListItemQuantity
} from './order-detail-list';

const OrderDetailListWrapper = styled.div`
    .order-detail {
        &-meta {
            line-height: 32px;
        }
        &-meta-name {
            display: inline-block;
            width: 80px;
        }
        &-meta-value {
            &.new-price {
                font-weight: bold;
                color: ${COLOR_PRIMARY_700}
            }
        }
        &-total {
            width: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    .ant-list-item, .ant-list-item-meta {
        justify-content: center;
        display: flex;
        align-items: center;
    }
`;

export interface OrderDetailListProps {
    readonly orderDetails: OrderDetail[];
}

export class OrderDetailList extends React.PureComponent<OrderDetailListProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    public render() {
        const { orderDetails } = this.props;
        return (
            <OrderDetailListWrapper>
                <Card bordered={false}>
                    <List
                        size="large"
                        itemLayout="vertical"
                        dataSource={orderDetails}
                        renderItem={this.renderOrderDetail}
                    />
                </Card>
            </OrderDetailListWrapper>
        );
    }

    private readonly renderOrderDetail = (orderDetail: OrderDetail) => {
        const { currentAgency } = this.context;
        if (typeof orderDetail.product_type === 'string') {
            return null;
        }

        const productTitle = orderDetail.product_type!.name;
        const isPromotion = !!orderDetail.storedPromoCode;

        const discount = getOrderDiscount({
            orderDetails: [orderDetail],
            agencyOrderer: currentAgency
        });

        const totalPrice = (orderDetail.subTotalPrice - discount.total);

        return (
            <List.Item
                key={orderDetail.id}
                actions={[

                ]}
                extra={<img width="200" className="order-detail-preview-img" src={orderDetail.previewImg} />}
            >
                <List.Item.Meta
                    title={(
                        <div className="display-flex">
                            <div className="flex-grow-1">
                                <Typography.Text strong={true}>
                                    {productTitle}
                                </Typography.Text>
                            </div>

                            <OrderDetailListItemDelete key="del" orderDetail={orderDetail} />
                        </div>

                    )}
                    description={(
                        <div>
                            {
                                isPromotion && (
                                    <Typography.Paragraph
                                        type="secondary"
                                    >
                                        Sản phẩm ưu đãi
                                    </Typography.Paragraph>
                                )
                            }
                            <div className="order-detail-meta">
                                <span className="order-detail-meta-name">
                                    Giá gốc:
                                </span>
                                <span className="order-detail-meta-value">
                                    &nbsp;{formatCurrency(orderDetail.productPrice)}
                                </span>
                            </div>
                            <div className="order-detail-meta">
                                <span className="order-detail-meta-name">
                                    Giảm giá:
                                </span>
                                <span className="order-detail-meta-value">
                                    -{formatCurrency(discount.total / orderDetail.quantity)}
                                    &nbsp;
                                    <OrderDetailDiscountTooltip
                                        discountByAgencyPolicy={discount.agency.discount / orderDetail.quantity}
                                        discountByQuantity={discount.products / orderDetail.quantity}
                                    />
                                </span>
                            </div>
                            <div className="order-detail-meta">
                                <span className="order-detail-meta-name">
                                    {isPromotion ? 'Giá ưu đãi' : 'Giá mới'}:
                                </span>
                                <span className="order-detail-meta-value new-price">
                                    &nbsp;{formatCurrency(totalPrice / orderDetail.quantity)}
                                </span>
                            </div>
                            <div className="order-detail-meta">
                                <span className="order-detail-meta-name">Số lượng:</span>
                                <span className="order-detail-meta-value">
                                    {
                                        isPromotion
                                            ? (
                                                <Typography.Text>
                                                    {orderDetail.quantity + ' ' + text('products')}
                                                </Typography.Text>
                                            )
                                            : <OrderDetailListItemQuantity orderDetail={orderDetail} />
                                    }
                                </span>
                            </div>
                            <div className="order-detail-meta">
                                <span className="order-detail-meta-name">Tổng:</span>
                                <span className="order-detail-meta-value">
                                    <Typography.Text strong={true}>{formatCurrency(totalPrice)}</Typography.Text>
                                </span>
                            </div>
                        </div>
                    )}
                />
            </List.Item>
        );
    }
}
