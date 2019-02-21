import { Badge, Table } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AGENCY_DETAIL_URL } from '@/configs';
import { text } from '@/i18n';
import { Agency, User } from '@/restful';
import { replaceRoutePath } from '@/utilities';

const AccountTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface AccountTableProps {
    readonly onDelete: () => void;
    readonly agencys: User[];
    readonly loading: boolean;
}

interface AccountTableState {
}

export class AccountTable extends React.PureComponent<AccountTableProps, AccountTableState> {
    constructor(props: AccountTableProps) {
        super(props);
    }

    public render() {
        const { agencys, loading } = this.props;
        return (
            <AccountTableWrapper>
                <Table
                    dataSource={agencys}
                    loading={loading}
                    pagination={false}
                    rowKey="id"
                >
                    <Table.Column
                        title={text('Name')}
                        dataIndex={nameof<User>(o => o.name)}
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
                        title={text('Operating')}
                        dataIndex={nameof.full<Agency>(o => o.id)}
                        render={(id: string) => {
                            return (
                                <React.Fragment>
                                    <Link to={replaceRoutePath(AGENCY_DETAIL_URL, { id })}>
                                        {text('Details')}
                                    </Link>
                                </React.Fragment>
                            );
                        }}
                    />
                </Table>
            </AccountTableWrapper>
        );
    }
}
