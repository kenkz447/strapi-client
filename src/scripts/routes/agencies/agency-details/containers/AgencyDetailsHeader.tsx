import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '@/components';
import { ACCOUNT_URL, AGENCIES_URL, DATE_FORMAT } from '@/configs';
import { text } from '@/i18n';
import { Agency } from '@/restful';
import { formatDate } from '@/utilities';

const { Description } = DescriptionList;

interface AgencyDetailsHeaderProps {
    readonly agency: Agency;
}

export class AgencyDetailsHeader extends React.PureComponent<AgencyDetailsHeaderProps> {
    public render() {
        const { agency } = this.props;
        const { linkedUser } = agency;
        return (
            <PageHeader
                title={agency.name}
                content={(
                    <DescriptionList title={agency.level.name} size="small" col={2}>
                        <Description term={text('Người liên hệ')}>
                            {linkedUser ? linkedUser.fullName || '...' : 'UNKNOW'}
                        </Description>
                        <Description term={text('Tài khoản liên hệ')}>
                            {
                                linkedUser
                                    ? (
                                        <Link to={ACCOUNT_URL + `?email=${agency.linkedUser.email}`}>
                                            Xem tài khoản
                                        </Link>
                                    )
                                    : 'UNKNOW'
                            }
                        </Description>
                        <Description term="Email">
                            {agency.email}
                        </Description>
                        <Description term={text('Phone')}>
                            {agency.phone}
                        </Description>
                        <Description term={text('Type')}>
                            {agency.agencyType ? agency.agencyType.name : '...'}
                        </Description>
                        <Description term={text('Created at')}>
                            {formatDate(agency.createdAt, DATE_FORMAT)}
                        </Description>
                    </DescriptionList>
                )}
                breadcrumbList={[{
                    title: text('Dashboard'),
                    href: '/'
                }, {
                    title: text('Danh sách đại lý'),
                    href: AGENCIES_URL
                }, {
                    title: text('Agency details'),
                }]}
            />
        );
    }
}
