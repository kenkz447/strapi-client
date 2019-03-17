import { Avatar, Card, Comment, List, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';

import { BusinessController } from '@/business';
import { createIssueTicketReply } from '@/business/issue-ticket-reply';
import { DATETIME_FORMAT } from '@/configs';
import { WithCurrentUser } from '@/domain';
import { IssueTicketReplyCreateFormControl } from '@/forms/issue-ticket-reply';
import {
    IssueTicket,
    IssueTicketReply,
    issueTicketReplyResourceType
} from '@/restful';
import { formatDate } from '@/utilities';

interface IssueTicketRepliesProps {
    readonly issueTicket: IssueTicket;
}

export class IssueTicketReplies extends React.PureComponent<IssueTicketRepliesProps> {

    static readonly contextType = RootContext;
    readonly context!: WithCurrentUser;

    readonly customerAvatar = (
        <Avatar
            src="https://i.pinimg.com/236x/af/25/49/af25490494d3338afef00869c59fdd37.jpg"
            alt="Han Solo"
        />
    );

    readonly supportAvatar = (
        <Avatar
            src="https://i.pinimg.com/236x/45/d9/8a/45d98aa922bef6b5213b488dc36a8764.jpg"
            alt="Han Solo"
        />
    );

    public render() {
        const { issueTicket } = this.props;
        const { currentUser } = this.context;

        const { issueTicketReplies } = issueTicket;

        const isSupport = currentUser.role.type === 'root';

        return (
            <Card className="h-100">
                <div>
                    <RestfulDataContainer
                        initDataSource={issueTicketReplies || []}
                        resourceType={issueTicketReplyResourceType}
                    >
                        {(syncRelies) => {
                            if (!syncRelies.length) {
                                return null;
                            }

                            return (
                                <List
                                    dataSource={syncRelies}
                                    header={`${syncRelies.length} ${syncRelies.length > 1 ? 'replies' : 'reply'}`}
                                    itemLayout="horizontal"
                                    renderItem={(props: IssueTicketReply) => {
                                        const isCurrentAuthor = typeof props.created_by === 'string'
                                            ? currentUser._id === props.created_by
                                            : currentUser._id === props.created_by._id;

                                        return (
                                            <Comment
                                                avatar={isCurrentAuthor ? this.customerAvatar : this.supportAvatar}
                                                content={<p dangerouslySetInnerHTML={{ __html: props.content }} />}
                                                author={
                                                    isCurrentAuthor ?
                                                        (
                                                            <Typography.Text type="warning">
                                                                {props.authorName}
                                                            </Typography.Text>
                                                        )
                                                        : (
                                                            props.authorName
                                                        )
                                                }
                                                datetime={formatDate(props.createdAt, DATETIME_FORMAT)}
                                            />
                                        );
                                    }}
                                />
                            );
                        }}
                    </RestfulDataContainer>
                    {
                        issueTicket.status !== 'close' && (
                            <Comment
                                avatar={isSupport ? this.supportAvatar : this.customerAvatar}
                                content={(
                                    <BusinessController
                                        action={createIssueTicketReply}
                                    >
                                        {({ doBusiness }) => (
                                            <IssueTicketReplyCreateFormControl
                                                submit={(value) => doBusiness(value)}
                                                initialValues={{
                                                    issueTicket: issueTicket
                                                }}
                                            />
                                        )}
                                    </BusinessController>
                                )}
                            />
                        )
                    }
                </div>
            </Card>
        );
    }
}
