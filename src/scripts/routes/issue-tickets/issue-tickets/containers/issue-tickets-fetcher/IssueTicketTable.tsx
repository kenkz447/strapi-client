import { Table } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DATE_FORMAT, ISSUE_TICKET_DETAIL_URL } from '@/configs';
import { text } from '@/i18n';
import { IssueTicket } from '@/restful';
import {
    IssueTichetCloseButton,
    IssueTicketStatusLabel
} from '@/routes/issue-tickets/shared';
import { formatDate, replaceRoutePath } from '@/utilities';

const IssueTicketTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface IssueTicketTableProps {
    readonly onDelete: () => void;
    readonly issueTickets: IssueTicket[];
    readonly loading: boolean;
}

interface IssueTicketTableState {
}

export class IssueTicketTable extends React.PureComponent<IssueTicketTableProps, IssueTicketTableState> {
    constructor(props: IssueTicketTableProps) {
        super(props);
    }

    public render() {
        const { issueTickets } = this.props;
        return (
            <IssueTicketTableWrapper>
                <Table
                    dataSource={issueTickets}
                    loading={this.props.loading}
                    pagination={false}
                    rowKey="id"
                >
                    <Table.Column
                        title={text('Code')}
                        dataIndex={nameof<IssueTicket>(o => o.code)}
                        render={(code: string, issueTicket: IssueTicket) => {
                            return (
                                <React.Fragment>
                                    <Link
                                        to={replaceRoutePath(ISSUE_TICKET_DETAIL_URL, { id: issueTicket.id })}
                                    >
                                        {code}
                                    </Link>
                                </React.Fragment>
                            );
                        }}
                    />
                    <Table.Column
                        title={text('Title')}
                        dataIndex={nameof<IssueTicket>(o => o.title)}
                    />
                    <Table.Column
                        title={text('Mã đơn hàng')}
                        dataIndex={nameof<IssueTicket>(o => o.orderCode)}
                    />
                    <Table.Column
                        title={text('Open date')}
                        dataIndex={nameof<IssueTicket>(o => o.openDate)}
                        render={(date) => formatDate(date, DATE_FORMAT)}
                    />
                    <Table.Column
                        title={text('Status')}
                        dataIndex={nameof<IssueTicket>(o => o.status)}
                        render={(status: IssueTicket['status']) => {
                            return (<IssueTicketStatusLabel status={status} />);
                        }}
                    />
                    <Table.Column
                        title=""
                        dataIndex={nameof.full<IssueTicket>(o => o.id)}
                        render={(id: string, issueTicket: IssueTicket) => {
                            return <IssueTichetCloseButton issueTicket={issueTicket} />;
                        }}
                    />
                </Table>
            </IssueTicketTableWrapper>
        );
    }
}
