import { Button, Card, Icon, Table, Tooltip, Typography } from 'antd';
import { AccessControl } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';

import { BusinessController } from '@/business';
import {
    confirmOrderTransaction,
    deleteOrderTransaction
} from '@/business/order-transaction';
import { getUploadedFileSrc } from '@/business/uploaded-file';
import { DATE_FORMAT } from '@/configs';
import { policies } from '@/domain';
import { OrderTransactionFormButton } from '@/forms/order/order-transaction';
import {
    OrderTransactionRejectFormButton
} from '@/forms/order/order-transaction-reject';
import { text } from '@/i18n';
import {
    Order,
    OrderTransaction,
    orderTransactionResourceType,
    UploadedFile
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
                            <AccessControl
                                policy={policies.functionAllowed}
                                funcKey="FUNC_ORDER_TRANSACTION_CREATE"
                            >
                                <OrderTransactionFormButton
                                    initialValues={{
                                        order: order.id as string,
                                        date: (new Date()).toISOString()
                                    }}
                                    type="default"
                                    icon="plus"
                                />
                            </AccessControl>
                        )}
                    >
                        <Table
                            dataSource={data}
                            pagination={false}
                            bordered={true}
                            size="middle"
                        >
                            <Table.Column
                                title={text('Code')}
                                dataIndex={nameof<OrderTransaction>(o => o.code)}
                                render={(code: string, orderTransaction: OrderTransaction) => {
                                    if (orderTransaction.rejected) {
                                        return (
                                            <span>
                                                <Icon
                                                    style={{ fontSize: 18 }}
                                                    type="close-circle"
                                                    theme="twoTone"
                                                    twoToneColor="red"
                                                />
                                                &nbsp;
                                                {code}
                                            </span>
                                        );
                                    }

                                    if (orderTransaction.confirmed) {
                                        return (
                                            <span style={{ color: '#52c41a' }}>
                                                <Icon
                                                    style={{ fontSize: 18 }}
                                                    type="check-circle"
                                                    theme="twoTone"
                                                    twoToneColor="#52c41a"
                                                />
                                                &nbsp;
                                                {code}
                                            </span>
                                        );
                                    }

                                    return (
                                        <span>
                                            <Tooltip title={text('This transaction is being reviewed')}>
                                                <Icon
                                                    style={{ fontSize: 18 }}
                                                    type="question-circle"
                                                    theme="twoTone"
                                                />
                                            </Tooltip>
                                            &nbsp;
                                            {code}
                                        </span>

                                    );
                                }}
                            />
                            <Table.Column
                                title={text('Type')}
                                dataIndex={nameof<OrderTransaction>(o => o.type)}
                                render={(type) => <span className="text-capitalize-first-letter">{text(type)}</span>}
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
                                title={text('Attachment')}
                                dataIndex={nameof<OrderTransaction>(o => o.attachment)}
                                render={(attachment: UploadedFile) => {
                                    if (!attachment) {
                                        return <span>{text('No attachment')}</span>;
                                    }

                                    return (
                                        <a
                                            target="_blank"
                                            href={getUploadedFileSrc({ uploadedFile: attachment })}
                                        >
                                            Xem
                                        </a>
                                    );
                                }}
                            />
                            <Table.Column
                                title={text('Note')}
                                dataIndex={nameof<OrderTransaction>(o => o.note)}
                                render={(note, transaction: OrderTransaction) => {
                                    if (transaction.rejectReason) {
                                        return (
                                            <React.Fragment>
                                                {
                                                    note && (
                                                        <p>{note}</p>
                                                    )
                                                }
                                                <Typography.Text type="danger">
                                                    *{transaction.rejectReason}
                                                </Typography.Text>
                                            </React.Fragment>

                                        );
                                    }

                                    if (!note) {
                                        return '...';
                                    }

                                    return note;
                                }}
                            />
                            <Table.Column
                                title=""
                                dataIndex={nameof<OrderTransaction>(o => o.id)}
                                render={(id: string, transaction: OrderTransaction) => {
                                    if (transaction.confirmed || transaction.rejected) {
                                        return <Icon type="ellipsis" />;
                                    }

                                    return (
                                        <React.Fragment>
                                            {
                                                <AccessControl
                                                    policy={policies.functionAllowed}
                                                    funcKey="FUNC_ORDER_TRANSACTION_CONFIRM"
                                                >
                                                    {() => {
                                                        return (
                                                            <React.Fragment>
                                                                <Tooltip
                                                                    title={text('Reject this transaction')}
                                                                >
                                                                    <OrderTransactionRejectFormButton
                                                                        type="danger"
                                                                        icon="close"
                                                                        ghost={true}
                                                                        initialValues={transaction}
                                                                    />
                                                                </Tooltip>
                                                                <BusinessController
                                                                    action={confirmOrderTransaction}
                                                                    needsConfirm={true}
                                                                    params={transaction}
                                                                >
                                                                    {({ doBusiness }) => (
                                                                        <Tooltip
                                                                            title={text('Confirm this transaction')}
                                                                        >
                                                                            <Button
                                                                                type="primary"
                                                                                icon="check"
                                                                                ghost={true}
                                                                                onClick={() => doBusiness()}
                                                                            />
                                                                        </Tooltip>
                                                                    )}
                                                                </BusinessController>
                                                            </React.Fragment>
                                                        );
                                                    }}
                                                </AccessControl>
                                            }
                                            <AccessControl policy={policies.isOwner} values={transaction}>
                                                {() => {
                                                    return (
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
                                                                    disabled={transaction.confirmed}
                                                                />
                                                            )}
                                                        </BusinessController>
                                                    );
                                                }}
                                            </AccessControl>
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
