import { DescriptionList } from 'ant-design-pro';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '@/components';
import { DATETIME_FORMAT, ISSUE_TICKET_URL, ORDER_DETAIL_URL } from '@/configs';
import { text } from '@/i18n';
import { IssueTicket } from '@/restful';
import { formatDate, replaceRoutePath } from '@/utilities';

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
                    <DescriptionList
                        title={'Nội dung: ' + initIssueTicket.description}
                        col={3}
                    >
                        {
                            initIssueTicket.order && (
                                <DescriptionList.Description term="Mã đơn hàng">
                                    <Link to={replaceRoutePath(ORDER_DETAIL_URL, initIssueTicket.order)}>
                                        {initIssueTicket.orderCode}
                                    </Link>
                                </DescriptionList.Description>
                            )
                        }
                        <DescriptionList.Description term="Thời gian tạo">
                            {formatDate(initIssueTicket.openDate, DATETIME_FORMAT)}
                        </DescriptionList.Description>
                        <DescriptionList.Description term="Người tạo">
                            <Link to="/">{initIssueTicket.created_by.fullName}</Link>
                        </DescriptionList.Description>
                        <DescriptionList.Description term="Tình trạng">
                            <IssueTicketStatusLabel status={initIssueTicket.status} />
                        </DescriptionList.Description>
                        {
                            initIssueTicket.closedAt && (
                                <DescriptionList.Description term="Thời gian đóng">
                                    {formatDate(initIssueTicket.closedAt, DATETIME_FORMAT)}
                                </DescriptionList.Description>
                            )
                        }
                        {
                            initIssueTicket.closedBy && (
                                <DescriptionList.Description term="Người đóng">
                                    {initIssueTicket.closedBy.fullName}
                                </DescriptionList.Description>
                            )
                        }
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