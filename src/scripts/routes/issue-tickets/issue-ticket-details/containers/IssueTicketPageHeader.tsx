import { DescriptionList } from 'ant-design-pro';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '@/components';
import { DATETIME_FORMAT, ISSUE_TICKET_URL } from '@/configs';
import { text } from '@/i18n';
import { IssueTicket } from '@/restful';
import { formatDate } from '@/utilities';

import { IssueTichetCloseButton, IssueTicketStatusLabel } from '../../shared';

interface IssueTicketPageHeaderProps {
    readonly initIssueTicket: IssueTicket | null;
}

interface IssueTicketPageHeaderState {
}

export class IssueTicketPageHeader extends React.PureComponent<
    IssueTicketPageHeaderProps,
    IssueTicketPageHeaderState
    > {
    public render() {
        const { initIssueTicket } = this.props;
        if (!initIssueTicket) {
            return null;
        }

        return (
            <PageHeader
                logo={
                    <img
                        // tslint:disable-next-line:max-line-length
                        src="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Settings-5-512.png"
                    />
                }
                title={initIssueTicket.title}
                content={(
                    <DescriptionList title={initIssueTicket.description} col={3}>
                        <DescriptionList.Description term="Thời gian tạo">
                            {formatDate(initIssueTicket.openDate, DATETIME_FORMAT)}
                        </DescriptionList.Description>
                        <DescriptionList.Description term="Người tạo">
                            <Link to="/">{initIssueTicket.created_by.fullName}</Link>
                        </DescriptionList.Description>
                        <DescriptionList.Description term="Tình trạng">
                            <IssueTicketStatusLabel status={initIssueTicket.status} />
                        </DescriptionList.Description>
                    </DescriptionList>
                )}
                action={this.renderHeaderActions()}
                breadcrumbList={[{
                    title: 'Home',
                    href: '/'
                }, {
                    title: text('Support'),
                    href: ISSUE_TICKET_URL
                }, {
                    title: initIssueTicket.code
                }]}

            />
        );
    }

    private readonly renderHeaderActions = () => {
        const { initIssueTicket } = this.props;

        return (
            <div className="button-group">
                <IssueTichetCloseButton issueTicket={initIssueTicket!} />
            </div>
        );
    }
}