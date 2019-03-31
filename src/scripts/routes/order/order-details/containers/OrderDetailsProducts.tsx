import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Card, Table, Typography } from 'antd';
import * as React from 'react';
import { RestfulRender } from 'react-restful';
import { Link } from 'react-router-dom';

import { Img } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { text } from '@/i18n';
import {
    Order,
    OrderDetail,
    orderDetailResources,
    ProductType
} from '@/restful';
import { formatCurrency, replaceRoutePath } from '@/utilities';

export interface OrderDetailsProductsProps {
    readonly order: Order;
}

export class OrderDetailsProducts extends React.PureComponent<OrderDetailsProductsProps> {

    public render() {
        const { order } = this.props;
        return (
            <Card
                style={{ marginBottom: 24 }}
                bordered={false}
                title={text('Details')}
            >
                {
                    order.note
                        ? (
                            <DescriptionList col={1} title={text('Customer note')} style={{ marginBottom: 24 }}>
                                <DescriptionList.Description term="">
                                    {order.note}
                                </DescriptionList.Description>
                            </DescriptionList>
                        )
                        : null
                }
                <DescriptionList title={text('Billing information')} style={{ marginBottom: 24 }}>
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
                <RestfulRender
                    resource={orderDetailResources.find}
                    parameters={{
                        type: 'query',
                        parameter: 'order',
                        value: order.id
                    }}
                >
                    {(render) => {
                        return (
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
                                            uRLSearchParams.set('productDesign', orderDetail.id);
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

                                        return (
                                            <div>
                                                <p>
                                                    <Typography.Text >
                                                        Loại: {type.name}
                                                    </Typography.Text>
                                                    <br />
                                                    <Typography.Text type="secondary">
                                                        Thiết kế: {orderDetail.productDesign['name']}
                                                    </Typography.Text>
                                                </p>
                                                <Link to={productUrl + '?' + uRLSearchParams.toString()}>
                                                    Xem sản phẩm
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
                        );
                    }}
                </RestfulRender>
            </Card>

        );
    }
}
