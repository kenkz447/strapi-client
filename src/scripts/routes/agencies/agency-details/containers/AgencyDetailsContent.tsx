import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Card } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '@/components';
import { ACCOUNT_URL, AGENCIES_URL, DATE_FORMAT } from '@/configs';
import { text } from '@/i18n';
import { Agency } from '@/restful';
import { formatDate } from '@/utilities';

import { AgencyOrdersFetcher } from './agency-details-content';

const { Description } = DescriptionList;

interface AgencyDetailsContentProps {
    readonly agency: Agency;
}

export class AgencyDetailsContent extends React.PureComponent<AgencyDetailsContentProps> {
    public render() {
        const { agency } = this.props;
        const { linkedUser: user } = agency;
        return (
            <div>
                <Card>
                    <DescriptionList title="Thông tin kinh doanh" col={1}>
                        <DescriptionList.Description term={text('Business areas')}>
                            {user.registration_businessAreas || '...'}
                        </DescriptionList.Description>
                        <DescriptionList.Description term={text('Company name')}>
                            {user.registration_companyName || '...'}
                        </DescriptionList.Description>
                        <DescriptionList.Description term={text('Company address')}>
                            {user.registration_companyAddress || '...'}
                        </DescriptionList.Description>
                    </DescriptionList>
                </Card>
                <div className="white-space-2" />
                <Card title="Danh sách đơn hàng">
                    <AgencyOrdersFetcher agency={agency} />
                </Card>
            </div>
        );
    }
}
