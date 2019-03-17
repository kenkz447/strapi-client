import { DescriptionList } from 'ant-design-pro';
import { Col, Row } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';
import { Link } from 'react-router-dom';

import {
    PageContent,
    PageHeader,
    PageLoading,
    PageWrapper,
    SlideUp
} from '@/components';
import {
    DATE_FORMAT,
    DATETIME_FORMAT,
    ISSUE_TICKET_DETAIL_URL,
    ISSUE_TICKET_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { IssueTicketCreateFormButton } from '@/forms/issue-ticket';
import { text } from '@/i18n';
import {
    IssueTicket,
    issueTicketResources,
    issueTicketResourceType,
    request
} from '@/restful';
import { formatDate } from '@/utilities';

import { IssueTichetCloseButton, IssueTicketStatusLabel } from '../shared';
import {
    IssueTicketAttachments,
    IssueTicketPageHeader,
    IssueTicketReplies
} from './containers';

type IssueTicketDetailsProps = AppPageProps<IssueTicket>;

interface IssueTicketDetailsState {
    readonly initIssueTicket: IssueTicket | null;
}

export class IssueTicketDetails extends RoutePage<
    IssueTicketDetailsProps,
    IssueTicketDetailsState
    > {
    static readonly routeInfo: RouteInfo = {
        path: ISSUE_TICKET_DETAIL_URL,
        title: text('Hỗ trợ'),
        exact: true
    };

    constructor(props: IssueTicketDetailsProps) {
        super(props);

        this.state = {
            initIssueTicket: null
        };

        this.fetchResources();
    }

    readonly fetchResources = async () => {
        const { match } = this.props;
        const [initIssueTicket] = await Promise.all([
            request(issueTicketResources.findOne, {
                type: 'path',
                parameter: 'id',
                value: match.params.id!
            }),
        ]);

        this.setState({
            initIssueTicket: initIssueTicket
        });
    }

    public render() {
        const { initIssueTicket } = this.state;
        if (!initIssueTicket) {
            return <PageLoading />;
        }

        return (
            <PageWrapper>
                <RestfulDataContainer
                    initDataSource={[initIssueTicket]}
                    resourceType={issueTicketResourceType}
                >
                    {([syncIssueTicket]) => {
                        return (
                            <React.Fragment>
                                <IssueTicketPageHeader initIssueTicket={syncIssueTicket} />
                                <PageContent>
                                    <Row
                                        type="flex"
                                        gutter={24}
                                    >
                                        <Col span={16} className="h-100">
                                            <IssueTicketReplies
                                                issueTicket={syncIssueTicket}
                                            />
                                        </Col>
                                        <Col span={8} className="h-100">
                                            <IssueTicketAttachments
                                                issueTicket={syncIssueTicket}
                                            />
                                        </Col>
                                    </Row>
                                </PageContent>
                            </React.Fragment>
                        );
                    }}
                </RestfulDataContainer>
            </PageWrapper>
        );
    }
}