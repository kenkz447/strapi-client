import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Card, Table } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Img } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { text } from '@/i18n';
import { Order, OrderDetail } from '@/restful';
import { formatCurrency, replaceRoutePath } from '@/utilities';

export interface OrderDetailsProductsProps {
    readonly order: Order;
}

export class OrderDetailsProducts extends React.PureComponent<OrderDetailsProductsProps> {
    public render() {
        const { order } = this.props;
        const { orderDetails } = order;
        return (
            <Card
                style={{ marginBottom: 24 }}
                bordered={false}
                title={text('Details')}
            >
                <DescriptionList title={text('Contact information')} style={{ marginBottom: 24 }}>
                    <DescriptionList.Description term={text('Person')}>
                        {order.contactTo || '...'}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Phone')}>
                        {order.contactToPhone || '...'}
                    </DescriptionList.Description>
                </DescriptionList>

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
                <Table
                    dataSource={orderDetails}
                    pagination={false}
                    bordered={true}
                    size="middle"
                    title={() => text('Products')}
                >
                    <Table.Column
                        title={text('Image')}
                        dataIndex="previewImg"
                        render={(previewImg: OrderDetail['previewImg'], orderDetail: OrderDetail) => {
                            return (
                                <Img width="150" file={previewImg} />
                            );
                        }}
                    />
                    <Table.Column
                        title={text('Product type')}
                        dataIndex="product_type"
                        render={(type, orderDetail: OrderDetail) => {

                            const uRLSearchParams = new URLSearchParams();

                            uRLSearchParams.set('productDesign', orderDetail.design as string);
                            uRLSearchParams.set('productType', orderDetail.product_type as string);
                            uRLSearchParams.set('productTypeGroup', orderDetail.product_type as string);

                            const productUrl = replaceRoutePath(PRODUCT_URL, {
                                modulesCode: orderDetail.productModulesCode
                            });

                            return (
                                <div>
                                    <p>{type}</p>
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
                        title={text('Total price')}
                        dataIndex={nameof<OrderDetail>(o => o.totalPrice)}
                        render={(totalPrice) => formatCurrency(totalPrice)}
                    />
                </Table>
            </Card>
        );
    }
}
