import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Badge, Switch, Table } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import * as React from 'react';
import styled from 'styled-components';

import { text } from '@/i18n';
import { Agency, User } from '@/restful';

import { AccountExpandedRow } from './accounts-table';

const AccountTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface AccountTableProps {
    readonly onDelete: () => void;
    readonly users: User[];
    readonly loading: boolean;
    readonly reload: () => void;
}

interface AccountTableState {
}

export class AccountTable extends React.PureComponent<AccountTableProps, AccountTableState> {
    constructor(props: AccountTableProps) {
        super(props);
    }

    private readonly reloadTable = () => {
        const { reload } = this.props;
        reload();
    }

    public render() {
        const { users, loading } = this.props;
        return (
            <AccountTableWrapper>
                <Table
                    dataSource={users}
                    loading={loading}
                    pagination={false}
                    rowKey="id"
                    expandedRowRender={(user: User) => {
                        return <AccountExpandedRow user={user} onAccepted={this.reloadTable} />;
                    }}
                >
                    <Table.Column
                        title={text('Name')}
                        dataIndex={nameof<User>(o => o.fullName)}
                    />
                    <Table.Column
                        title={text('Email')}
                        dataIndex={nameof.full<User>(o => o.email)}
                    />
                    <Table.Column
                        title={text('Phone')}
                        dataIndex={nameof.full<User>(o => o.phone)}
                    />
                    <Table.Column
                        title={text('Role')}
                        dataIndex={nameof.full<User>(o => o.role)}
                        render={(role) => {
                            const label = text('Role_' + role.name);

                            let badge: BadgeProps['status'];
                            switch (role.name) {
                                case 'Administrator':
                                    badge = 'warning';
                                    break;
                                case 'Authenticated':
                                    badge = 'success';
                                    break;
                                default:
                                    badge = 'processing';
                                    break;
                            }
                            return (
                                <span>
                                    <Badge status={badge} /> {label}
                                </span>
                            );
                        }}
                    />
                    <Table.Column
                        title={text('Activating')}
                        dataIndex={nameof.full<Agency>(o => o.id)}
                        render={(id: string, user: User) => {
                            if (user.role.name === 'Registered') {
                                return null;
                            }

                            return <Switch size="small" checked={!user.blocked}/>;
                        }}
                    />
                </Table>
            </AccountTableWrapper>
        );
    }
}
