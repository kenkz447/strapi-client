import 'ant-design-pro/lib/DescriptionList/style/css';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Card } from 'antd';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';
import { Link } from 'react-router-dom';

import { PageHeader } from '@/components';
import { ACCOUNT_URL, AGENCIES_URL, DATE_FORMAT } from '@/configs';
import {
    BusinessInfomationFormButton
} from '@/forms/profile/business-infomation';
import { text } from '@/i18n';
import { Agency, userResourceType } from '@/restful';
import { formatDate } from '@/utilities';

import {
    AgencyBussinessInfomation,
    AgencyOrdersFetcher
} from './agency-details-content';

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
                    <RestfulDataContainer
                        resourceType={userResourceType}
                        initDataSource={[user]}
                        shouldAppendNewRecord={false}
                    >
                        {([suncUser]) => <AgencyBussinessInfomation user={suncUser} />}
                    </RestfulDataContainer>
                </Card>
                <div className="white-space-2" />
                <Card title="Danh sách đơn hàng">
                    <AgencyOrdersFetcher agency={agency} />
                </Card>
            </div>
        );
    }
}
