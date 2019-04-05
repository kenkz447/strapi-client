import 'ant-design-pro/lib/DescriptionList/style/css';

import { Button, Icon, Table } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { AUTH_INVITATION_URL, DATETIME_FORMAT } from '@/configs';
import { text } from '@/i18n';
import { Invitation, User } from '@/restful';
import { formatDate, replaceRoutePath } from '@/utilities';

const InvitationTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface InvitationTableProps {
    readonly onDelete: () => void;
    readonly users: User[];
    readonly loading: boolean;
    readonly reload: () => void;
}

interface InvitationTableState {
}

export class InvitationTable extends React.PureComponent<InvitationTableProps, InvitationTableState> {
    constructor(props: InvitationTableProps) {
        super(props);
    }


    public render() {
        const { users, loading } = this.props;
        return (
            <InvitationTableWrapper>
                <Table
                    dataSource={users}
                    loading={loading}
                    pagination={false}
                    rowKey="id"
                >
                    <Table.Column
                        title={text('Invitation link')}
                        dataIndex={nameof<Invitation>(o => o.code)}
                        render={(code) => <a>{location.origin}{replaceRoutePath(AUTH_INVITATION_URL, { code })}</a>}
                    />
                    <Table.Column
                        title={text('Receiver')}
                        dataIndex={nameof.full<Invitation>(o => o.receiverFullName)}
                    />
                    <Table.Column
                        title={text('Agency name')}
                        dataIndex={nameof.full<Invitation>(o => o.receiverAgencyName)}
                    />
                    <Table.Column
                        title={text('Created at')}
                        dataIndex={nameof<Invitation>(o => o.createdAt)}
                        render={(createdAt) => formatDate(createdAt, DATETIME_FORMAT)}
                    />
                    <Table.Column
                        title={text('Created by')}
                        dataIndex={nameof<Invitation>(o => o.created_by)}
                        // tslint:disable-next-line:variable-name
                        render={(created_by) => created_by && created_by.fullName}
                    />
                    <Table.Column
                        title={text('Status')}
                        dataIndex={nameof<Invitation>(o => o.joinedDate)}
                        // tslint:disable-next-line:variable-name
                        render={() => <Icon type="question" />}
                    />
                    <Table.Column
                        title={text('Status')}
                        dataIndex={nameof<Invitation>(o => o.id)}
                        // tslint:disable-next-line:variable-name
                        render={() => (
                            <Button type="danger" icon="delete" />
                        )}
                    />
                </Table>
            </InvitationTableWrapper>
        );
    }
}
