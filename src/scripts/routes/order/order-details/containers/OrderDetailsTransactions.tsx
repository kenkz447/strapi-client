import { Button, Card, Table } from 'antd';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';

import { BusinessController } from '@/business';
import { deleteOrderTransaction } from '@/business/order-transaction';
import { DATE_FORMAT } from '@/configs';
import { OrderTransactionFormButton } from '@/forms/order/order-transaction';
import { text } from '@/i18n';
import {
    Order,
    OrderTransaction,
    orderTransactionResourceType
} from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

export interface OrderDetailsTransactionsProps {
    readonly order: Order;
}

export class OrderDetailsTransactions extends React.PureComponent<OrderDetailsTransactionsProps> {
    public render() {
        const { order } = this.props;
        const { orderTransactions } = order;
        return (
            <RestfulDataContainer
                resourceType={orderTransactionResourceType}
                initDataSource={orderTransactions}
            >
                {(data) => (
                    <Card
                        style={{ marginBottom: 24 }}
                        bordered={false}
                        title={text('Transaction history')}
                        extra={(
                            <OrderTransactionFormButton
                                initialValues={{
                                    order: order.id as string
                                }}
                                type="default"
                                icon="plus"
                            />
                        )}
                    >
                        <Table
                            dataSource={data}
                            pagination={false}
                            bordered={true}
                            size="middle"
                        >
                            <Table.Column
                                title={text('Transaction code')}
                                dataIndex={nameof<OrderTransaction>(o => o.code)}
                            />
                            <Table.Column
                                title={text('Type')}
                                dataIndex={nameof<OrderTransaction>(o => o.type)}
                            />
                            <Table.Column
                                title={text('Time')}
                                dataIndex={nameof<OrderTransaction>(o => o.date)}
                                render={(date) => formatDate(date, DATE_FORMAT)}
                            />
                            <Table.Column
                                title={text('Money')}
                                dataIndex={nameof<OrderTransaction>(o => o.money)}
                                render={(money) => formatCurrency(money)}
                            />
                            <Table.Column
                                title={text('Note')}
                                dataIndex={nameof<OrderTransaction>(o => o.note)}
                                render={(note) => {
                                    if (!note) {
                                        return '...';
                                    }
                                    return note;
                                }}
                            />
                            <Table.Column
                                title={text('Operating')}
                                dataIndex={nameof<OrderTransaction>(o => o.id)}
                                render={(id, transaction) => {
                                    return (
                                        <React.Fragment>
                                            <BusinessController
                                                action={deleteOrderTransaction}
                                                needsConfirm={true}
                                                params={transaction}
                                            >
                                                {({ doBusiness }) => (
                                                    <Button
                                                        type="danger"
                                                        icon="delete"
                                                        onClick={() => doBusiness()}
                                                    />
                                                )}
                                            </BusinessController>
                                        </React.Fragment>
                                    );
                                }}
                            />
                        </Table>
                    </Card>
                )}
            </RestfulDataContainer>
        );
    }
}
