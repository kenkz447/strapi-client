import { Button } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { ISSUE_TICKET_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { IssueTicketCreateFormButton } from '@/forms/issue-ticket';
import { text } from '@/i18n';

import { IssueTicketsFetcher } from './containers';

type RouteIssueTicketsProps = AppPageProps;

export class RouteIssueTickets extends RoutePage<RouteIssueTicketsProps> {
    static readonly routeInfo: RouteInfo = {
        path: ISSUE_TICKET_URL,
        title: text('Hỗ trợ'),
        exact: true
    };

    public render() {
        return (
            <PageWrapper>
                <PageHeader
                    title={this.title}
                    content="Các vấn đề về đơn hàng, bảo hành sản phẩm, chất lượng dịch vụ..."
                    action={this.renderHeaderActions()}
                    breadcrumbList={[{
                        title: 'Home',
                        href: '/'
                    }, {
                        title: text('Support')
                    }]}
                />
                <PageContent>
                    <IssueTicketsFetcher />
                </PageContent>
            </PageWrapper>
        );
    }

    private readonly renderHeaderActions = () => {
        return (
            <div className="button-group">
                {}
            </div>
        );
    }
}