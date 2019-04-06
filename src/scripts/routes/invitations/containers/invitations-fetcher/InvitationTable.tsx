import 'ant-design-pro/lib/DescriptionList/style/css';

import { DescriptionList } from 'ant-design-pro';
import { Button, Icon, Table, Tag } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ACCOUNT_URL, AUTH_INVITATION_URL, DATETIME_FORMAT } from '@/configs';
import { text } from '@/i18n';
import { Invitation, User } from '@/restful';
import { formatDate, replaceRoutePath } from '@/utilities';

const InvitationTableWrapper = styled.div`
    margin: 0 0 24px 0;
`;

export interface InvitationTableProps {
    readonly onDelete: () => void;
    readonly invitations: Invitation[];
    readonly loading: boolean;
    readonly reload: () => void;
}

interface InvitationTableState {
}

export class InvitationTable extends React.PureComponent<InvitationTableProps, InvitationTableState> {
    constructor(props: InvitationTableProps) {
        super(props);
    }

    private readonly isInvitationExpried = (invitation: Invitation) => {
        const expirationDate = new Date(invitation.expirationDate);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const isExpired = expirationDate < now;
        return isExpired;
    }

    private readonly expandedRowRender = (invitation: Invitation) => {
        return (
            <div>
                <DescriptionList title={'Tên đại lý: ' + invitation.receiverAgencyName} col={1}>
                    <DescriptionList.Description term={text('phone')}>
                        {invitation.receiverPhone || '...'}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('City')}>
                        {invitation.receiverCity ? invitation.receiverCity.name : '...'}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('County')}>
                        {invitation.receiverCounty ? invitation.receiverCounty.name : '...'}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Address')}>
                        {invitation.receiverAddress && '...'}
                    </DescriptionList.Description>
                    <DescriptionList.Description term={text('Note')}>
                        {invitation.note && '...'}
                    </DescriptionList.Description>
                </DescriptionList>
            </div>
        );
    }

    public render() {
        const { invitations: users, loading } = this.props;
        return (
            <InvitationTableWrapper>
                <Table
                    dataSource={users}
                    loading={loading}
                    pagination={false}
                    rowKey="id"
                    expandedRowRender={this.expandedRowRender}
                >
                    <Table.Column
                        title={text('Receiver')}
                        dataIndex={nameof.full<Invitation>(o => o.receiverFullName)}
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
                        render={(joinedDate, invitation: Invitation) => {
                            if (!!joinedDate) {
                                return <Tag color="green">Đã đăng ký</Tag>;
                            }

                            const isExpried = this.isInvitationExpried(invitation);
                            if (isExpried) {
                                return <Tag color="red">Đã hết hạn</Tag>;
                            }

                            return <Tag color="blue">Đang đợi...</Tag>;
                        }}
                    />
                    <Table.Column
                        title={text('Account')}
                        dataIndex={nameof<Invitation>(o => o.joinedUser)}
                        // tslint:disable-next-line:variable-name
                        render={(joinedUser: User) => {
                            if (!joinedUser) {
                                return '...';
                            }

                            return <Link to={ACCOUNT_URL + '?email=' + joinedUser.email}>Xem</Link>;
                        }}
                    />
                    <Table.Column
                        title={text('Invitation link')}
                        dataIndex={nameof<Invitation>(o => o.code)}
                        render={(code) => <a>{location.origin}{replaceRoutePath(AUTH_INVITATION_URL, { code })}</a>}
                    />
                    <Table.Column
                        title={text('Created at')}
                        dataIndex={nameof<Invitation>(o => o.createdAt)}
                        render={(createdAt) => formatDate(createdAt, DATETIME_FORMAT)}
                    />
                </Table>
            </InvitationTableWrapper>
        );
    }
}
