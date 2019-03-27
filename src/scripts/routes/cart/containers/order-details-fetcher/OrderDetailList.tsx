import { Card, List } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY_700 } from '@/configs';
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
            justify-content: center;
            align-items: center;
            color: ${COLOR_PRIMARY_700};
            font-size: 16px;
            font-weight: bold;
        }
    }
`;

export interface OrderDetailListProps {
    readonly orderDetails: OrderDetail[];
}

export class OrderDetailList extends React.PureComponent<OrderDetailListProps> {
    public render() {
        const { orderDetails } = this.props;
        return (
            <OrderDetailListWrapper>
                <Card>
                    <List
                        size="large"
                        dataSource={orderDetails}
                        renderItem={this.renderOrderDetail}
                    />
                </Card>
            </OrderDetailListWrapper>
        );
    }

    private readonly renderOrderDetail = (orderDetail: OrderDetail) => {
        if (typeof orderDetail.product_type === 'string') {
            return null;
        }

        const productTitle = orderDetail.product_type!.name;
        return (
            <List.Item
                key={orderDetail.id}
                actions={[<OrderDetailListItemDelete key="del" orderDetail={orderDetail} />]}
            >
                <List.Item.Meta
                    avatar={<img width="200" className="order-detail-preview-img" src={orderDetail.previewImg} />}
                    title={productTitle}
                    description={(
                        <div>
                            <div className="order-detail-meta">
                                <span className="order-detail-meta-name">Giá cũ:</span>
                                <span className="order-detail-meta-value">
                                    {formatCurrency(orderDetail.subTotalPrice)}
                                </span>
                            </div>
                            <div className="order-detail-meta">
                                <span className="order-detail-meta-name">Giá mới:</span>
                                <span className="order-detail-meta-value new-price">
                                    {formatCurrency(orderDetail.subTotalPrice - orderDetail.totalDiscountPerProduct)}
                                </span>
                            </div>
                            <div className="order-detail-meta">
                                <span className="order-detail-meta-name">Số lượng:</span>
                                <span className="order-detail-meta-value new-price">
                                    <OrderDetailListItemQuantity orderDetail={orderDetail} />
                                </span>
                            </div>
                        </div>
                    )}
                />
                <div className="order-detail-total">
                    {formatCurrency(orderDetail.quantity * orderDetail.subTotalPrice)}
                </div>
            </List.Item>
        );
    }
}
