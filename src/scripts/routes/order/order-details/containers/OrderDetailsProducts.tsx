import { Card, Table } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Img } from '@/components/generic/Img';
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
                title={text('Products')}
            >
                <Table
                    dataSource={orderDetails}
                    pagination={false}
                    bordered={true}
                    size="middle"
                >
                    <Table.Column
                        title={text('Image')}
                        dataIndex={nameof<OrderDetail>(o => o.previewImg)}
                        render={(previewImg: OrderDetail['previewImg'], orderDetail: OrderDetail) => {
                            return (
                                <Img width="150" file={previewImg} />
                            );
                        }}
                    />
                    <Table.Column
                        title={text('Product type')}
                        dataIndex={nameof<OrderDetail>(o => o.product_type)}
                        render={(type, orderDetail) => {
                            return (
                                <div>
                                    <p>{type}</p>
                                    <Link
                                        to={replaceRoutePath(PRODUCT_URL, { modulesCode: orderDetail.productModulesCode })}
                                    >
                                        Xem sản phẩm
                                    </Link>
                                </div>
                            )
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
