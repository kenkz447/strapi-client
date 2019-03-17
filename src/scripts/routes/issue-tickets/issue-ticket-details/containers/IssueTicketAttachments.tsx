import { Card, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { WithCurrentUser } from '@/domain';
import { text } from '@/i18n';
import { IssueTicket } from '@/restful';

import {
    IssueTicketAttachmentsUpload,
    IssueTicketAttachmentsViewer
} from './issue-ticket-attachment';

export interface IssueTicketAttachmentsProps {
    readonly issueTicket: IssueTicket;
}

export class IssueTicketAttachments extends React.PureComponent<IssueTicketAttachmentsProps> {

    static readonly contextType = RootContext;

    readonly context!: WithCurrentUser;

    public render() {
        const { currentUser } = this.context;
        const { issueTicket } = this.props;

        const { attachments: photos } = issueTicket;

        const isAdmin = currentUser.role.type === 'root';
        const hasAtachments = photos && photos.length;
        const isClosed = issueTicket.status === 'close';

        const uploadDisabled = isClosed || isAdmin;

        if (uploadDisabled && !hasAtachments) {
            return (
                <div>
                    <Typography.Text>
                        {text('Yêu cầu này ko có hình ảnh đính kèm')}
                    </Typography.Text>
                </div>
            );
        }

        return (
            <div className="w-100 h-100">
                <div className="ant-list-header">
                    {text('Hình ảnh đính kèm')}:
                </div>
                {
                    uploadDisabled
                        ? (
                            <IssueTicketAttachmentsViewer issueTicket={issueTicket} />
                        )
                        : (
                            <IssueTicketAttachmentsUpload
                                issueTicket={issueTicket}
                            />
                        )
                }
            </div>
        );
    }
}