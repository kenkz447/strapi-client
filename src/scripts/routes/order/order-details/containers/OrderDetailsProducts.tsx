import './OrderDetailsProducts.scss';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Card, Col, Row, Table, Typography } from 'antd';
import * as React from 'react';
import { RestfulRender } from 'react-restful';
import { Link } from 'react-router-dom';

import { getOrderDetailsMaterialNorms } from '@/business/order-detail';
import { Img } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { text } from '@/i18n';
import {
    Order,
    OrderDetail,
    orderDetailResources,
    ProductDesign,
    ProductType
} from '@/restful';
import { formatCurrency, replaceRoutePath } from '@/utilities';

import { BankTransferInformation } from './order-details-product';

export interface OrderDetailsProductsProps {
    readonly order: Order;
}

export class OrderDetailsProducts extends React.PureComponent<OrderDetailsProductsProps> {

    private readonly hasBillingInfo =   () => {
        const { order } = this.props;

        return order.billingAddress || order.billingOrganization || order.billingTaxcode;
    }

    public render() {
        const { order } = this.props;
        
        return (
            <RestfulRender
                resource={orderDetailResources.find}
                parameters={{
                    type: 'query',
                    parameter: 'order',
                    value: order.id
                }}
            >
                {(render) => {
                    const orderDetailsMaterialNorms = render.data ? getOrderDetailsMaterialNorms(render.data) : [];

                    return (
                        <Card
                            style={{ marginBottom: 24 }}
                            bordered={false}
                            title={text('Details')}
                        >
                            {
                                order.note
                                    ? (
                                        <DescriptionList
                                            col={1}
                                            title={text('Customer note')}
                                            style={{ marginBottom: 24 }}
                                        >
                                            <DescriptionList.Description term="">
                                                {order.note}
                                            </DescriptionList.Description>
                                        </DescriptionList>
                                    )
                                    : null
                            }
                            <Row gutter={24}>
                                <Col span={10} className="order-detail-payment-infomation">
                                    <DescriptionList
                                        title={text('Payment information')}
                                        style={{ marginBottom: 24 }}
                                        col={1}
                                    >
                                        <DescriptionList.Description term={text('Original price')}>
                                            {formatCurrency(order.totalPrice)}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('Product discount')}>
                                            - {formatCurrency(order.productsDiscount)}
                                        </DescriptionList.Description>
                                        {
                                            order.promotion && (
                                                <DescriptionList.Description
                                                    term={text('Promo code') + ` #${order.promotion.code}`}
                                                >
                                                    - {formatCurrency(order.promotionDiscount)}
                                                </DescriptionList.Description>
                                            )
                                        }
                                        <DescriptionList.Description term={text('Discount by agency policy')}>
                                            - {formatCurrency(order.agencyCommissionValue)}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('Transport fee')}>
                                            {formatCurrency(order.shippingFee)}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('Total amount')}>
                                            <b>{formatCurrency(order.totalOfPayment)}</b>
                                        </DescriptionList.Description>
                                    </DescriptionList>
                                    <BankTransferInformation />
                                </Col>
                                <Col span={8}>
                                    <DescriptionList
                                        title={text('Shipping information')}
                                        style={{ marginBottom: 24 }}
                                        col={1}
                                    >
                                        <DescriptionList.Description term={text('Recipient\'s name')}>
                                            {order.consigneeName || '...'}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('Phone')}>
                                            {order.phone || '...'}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('Email')}>
                                            {order.email || '...'}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('City')}>
                                            {order.shippingToCity.name || '...'}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('County')}>
                                            {order.shippingToCounty.name || '...'}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('Address')}>
                                            {order.shippingAddress || '...'}
                                        </DescriptionList.Description>
                                        <DescriptionList.Description term={text('Address type')}>
                                            {text(order.addressType)}
                                        </DescriptionList.Description>
                                    </DescriptionList>
                                </Col>
                                <Col span={6}>
                                    {
                                        orderDetailsMaterialNorms.length
                                            ? (
                                                <React.Fragment>
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
                                                    <div className="white-space-2" />
                                                </React.Fragment>
                                            )
                                            : null
                                    }
                                    {
                                        this.hasBillingInfo()
                                            ? (
                                                <DescriptionList
                                                    title={text('Billing information')}
                                                    style={{ marginBottom: 24 }}
                                                    col={1}
                                                >
                                                    <DescriptionList.Description term={text('Organization')}>
                                                        {order.billingOrganization || '...'}
                                                    </DescriptionList.Description>
                                                    <DescriptionList.Description term={text('Address')}>
                                                        {order.billingAddress || '...'}
                                                    </DescriptionList.Description>
                                                    <DescriptionList.Description term={text('Tax code')}>
                                                        {order.billingTaxcode || '...'}
                                                    </DescriptionList.Description>
                                                </DescriptionList>
                                            )
                                            : null
                                    }
                                </Col>
                            </Row>
                            <Table
                                loading={render.fetching}
                                dataSource={render.data || []}
                                pagination={false}
                                bordered={true}
                                size="middle"
                                title={() => text('Products')}
                            >
                                <Table.Column
                                    title={text('Image')}
                                    dataIndex="previewImg"
                                    render={(previewImg: OrderDetail['previewImg']) => {
                                        return (
                                            <Img width="150" file={previewImg} />
                                        );
                                    }}
                                />
                                <Table.Column
                                    title={text('Product type')}
                                    dataIndex="product_type"
                                    render={(type: ProductType, orderDetail: OrderDetail) => {

                                        const uRLSearchParams = new URLSearchParams();

                                        if (typeof orderDetail.productDesign === 'object') {
                                            uRLSearchParams.set('productDesign', orderDetail.id!);
                                        }

                                        if (typeof orderDetail.product_type === 'object') {
                                            uRLSearchParams.set('productType', orderDetail.product_type.id);
                                            uRLSearchParams.set(
                                                'productTypeGroup',
                                                orderDetail.product_type.productTypeGroup as string
                                            );
                                        }

                                        const productUrl = replaceRoutePath(PRODUCT_URL, {
                                            modulesCode: orderDetail.productModulesCode
                                        });

                                        const design = orderDetail.productDesign as ProductDesign;
                                        return (
                                            <div>
                                                <p>
                                                    <Typography.Text >
                                                        {text('Type')}: {type.name}
                                                    </Typography.Text>
                                                    <br />
                                                    <Typography.Text type="secondary">
                                                        {text('Design')}: {design.name}
                                                    </Typography.Text>
                                                </p>
                                                <Link to={productUrl + '?' + uRLSearchParams.toString()}>
                                                    {text('View product')}
                                                </Link>
                                            </div>
                                        );
                                    }}
                                />
                                <Table.Column
                                    title={text('Quantity')}
                                    dataIndex={nameof<OrderDetail>(o => o.quantity)}
                                />
                                <Table.Column
                                    title={text('Price')}
                                    dataIndex={nameof<OrderDetail>(o => o.productPrice)}
                                    render={(productPrice) => formatCurrency(productPrice)}
                                />
                                <Table.Column
                                    title={text('Discount per product')}
                                    dataIndex={nameof<OrderDetail>(o => o.totalDiscountPerProduct)}
                                    render={(totalDiscountPerProduct) => formatCurrency(totalDiscountPerProduct)}
                                />
                                <Table.Column
                                    title={text('Total')}
                                    dataIndex={nameof<OrderDetail>(o => o.totalPrice)}
                                    render={(totalPrice) => formatCurrency(totalPrice)}
                                />
                            </Table>
                        </Card>
                    );
                }}
            </RestfulRender>

        );
    }
}
