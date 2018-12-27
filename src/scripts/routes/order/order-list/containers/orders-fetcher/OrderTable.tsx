import { Badge, Table } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getOrderStatusLabel } from '@/business/order';
import { DATE_FORMAT, ORDER_DETAIL_URL } from '@/configs';
import { text } from '@/i18n';
import { Order } from '@/restful';
import { formatDate, replaceRoutePath } from '@/utilities';

const OrderTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface OrderTableProps {
    readonly onDelete: () => void;
    readonly orders: Order[];
    readonly loading: boolean;
}

interface OrderTableState {
}

export class OrderTable extends React.PureComponent<OrderTableProps, OrderTableState> {
    constructor(props: OrderTableProps) {
        super(props);
    }

    public render() {
        const { orders, loading } = this.props;
        return (
            <OrderTableWrapper>
                <Table
                    dataSource={orders}
                    loading={loading}
                    pagination={false}
                    rowKey="id"
                >
                    <Table.Column
                        title={text('Code')}
                        dataIndex={nameof<Order>(o => o.code)}
                    />
                    <Table.Column
                        title={text('Agency')}
                        dataIndex={nameof.full<Order>(o => o.agencyOrderer.name)}
                    />
                    <Table.Column
                        title={text('Status')}
                        dataIndex={nameof.full<Order>(o => o.status)}
                        render={(status: Order['status']) => {
                            const statusLabel = getOrderStatusLabel({ status });
                            if (status === 'new') {
                                return <Badge status="processing" text={statusLabel as string} />;
                            }

                            return <Badge status="default" text={statusLabel as string} />;
                        }}
                    />
                    <Table.Column
                        title={text('Order date')}
                        dataIndex={nameof.full<Order>(o => o.createdAt)}
                        render={(date) => formatDate(date, DATE_FORMAT)}
                    />
                    <Table.Column
                        title={text('Operating')}
                        dataIndex={nameof.full<Order>(o => o.id)}
                        render={(id: string) => {
                            return (
                                <React.Fragment>
                                    <Link to={replaceRoutePath(ORDER_DETAIL_URL, { id })}>
                                        Xem chi tiết
                                    </Link>
                                </React.Fragment>
                            );
                        }}
                    />
                </Table>
            </OrderTableWrapper>
        );
    }
}
