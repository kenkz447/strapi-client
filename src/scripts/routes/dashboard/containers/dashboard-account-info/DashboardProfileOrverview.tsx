import { Icon, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { Loading } from '@/components';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { request } from '@/restful';
import {
    StatisticsProfileOverviewResponse,
    statisticsResources
} from '@/restful/resources/statistics';
import { formatCurrency } from '@/utilities';

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

interface DashboardProfileOverviewState {
    readonly data: StatisticsProfileOverviewResponse | null;
}

export class DashboardProfileOverview extends React.PureComponent<
    DashboardProfileOverviewProps,
    DashboardProfileOverviewState
    > {

    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    constructor(props: DashboardProfileOverviewProps) {
        super(props);
        this.state = {
            data: null
        };
    }

    private readonly fetchResources = async () => {
        const data = await request(statisticsResources.profileOverview);
        this.setState({
            data
        });
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
        const { data } = this.state;
        if (!currentAgency) {
            return null;
        }

        if (!data) {
            return <Loading />;
        }

        return (
            <div>
                <DashboardAccountProgressWrapper>
                    <div className="account-progress-info"  >
                        <p>
                            <Icon type="shop" theme="twoTone" twoToneColor="#87d068" />
                            {currentAgency.level.name}
                            <br />
                            <Typography.Text type="secondary">
                                Giảm {currentAgency.level.discountPercent}% mỗi đơn hàng
                        </Typography.Text>
                        </p>
                        <p>
                            <Icon type="dollar" theme="twoTone" twoToneColor="#87d068" />
                            {text('Total paid')}: {formatCurrency(data.totalTransactionMoney)}
                        </p>
                        <p>
                            <Icon type="gift" theme="twoTone" twoToneColor="#87d068" />
                            {text('Promotion')}: {formatCurrency(data.totalDiscount)}
                        </p>
                    </div>
                </DashboardAccountProgressWrapper>
                <div className="white-space-2" />
                <DashboardAccountProgressWrapper>
                    <div className="account-progress-info"  >
                        <p>
                            <Icon type="folder" theme="twoTone" twoToneColor="orange" />
                            {text('Order')}: {data.orderCount}
                        </p>
                        <p>
                            <Icon type="appstore" theme="twoTone" twoToneColor="orange" />
                            {text('Products')}: {data.totalProduct}
                        </p>

                    </div>
                </DashboardAccountProgressWrapper>
            </div>
        );
    }
}
