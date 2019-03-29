import { Icon, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { request } from '@/restful';
import { statisticsResources } from '@/restful/resources/statistics';

const DashboardAccountProgressWrapper = styled.div`
    display: flex;
    .account-progress-chart {
        width: 130px;
    }
    .account-progress-info {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .ant-typography-secondary {
        margin-left: 26px;
    }
    .anticon {
        font-size: 18px;
        margin-right: 7px;
    }
`;

interface DashboardProfileOverviewProps {
}

export class DashboardProfileOverview extends React.PureComponent<DashboardProfileOverviewProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly fetchResources = async () => {
        await request(statisticsResources.profileOverview);
    }

    public componentDidMount() {
        const { currentAgency } = this.context;

        if (!currentAgency) {
            return;
        }

        this.fetchResources();
    }

    public render() {
        const { currentAgency } = this.context;

        if (!currentAgency) {
            return null;
        }

        return (
            <div>
                <DashboardAccountProgressWrapper>
                    <div className="account-progress-info"  >
                        <p>
                            <Icon type="shop" theme="twoTone" twoToneColor="orange" />
                            {currentAgency.level.name}
                            <br />
                            <Typography.Text type="secondary">
                                Giảm {currentAgency.level.discountPercent}% trên tổng đơn hàng
                        </Typography.Text>
                        </p>
                        <p>
                            <Icon type="dollar" theme="twoTone" twoToneColor="orange" />
                            {text('Your point')}: 68,000,000
                    </p>
                        <p>
                            <Icon type="rocket" theme="twoTone" twoToneColor="orange" />
                            {text('Point to next level')}: 150,000,000
                    </p>
                    </div>
                </DashboardAccountProgressWrapper>
                <div className="white-space-2" />
                <DashboardAccountProgressWrapper>
                    <div className="account-progress-info"  >
                        <p>
                            <Icon type="folder" theme="twoTone" twoToneColor="#87d068" />
                            {text('Order')}: 9
                    </p>
                        <p>
                            <Icon type="appstore" theme="twoTone" twoToneColor="#87d068" />
                            {text('Products')}: 68
                    </p>
                        <p>
                            <Icon type="gift" theme="twoTone" twoToneColor="#87d068" />
                            {text('Promotion')}: 23,000,000
                    </p>
                    </div>
                </DashboardAccountProgressWrapper>
            </div>
        );
    }
}
