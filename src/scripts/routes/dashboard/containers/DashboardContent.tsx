import './DashboardContent.scss';

import { Card, Tabs } from 'antd';
import { AccessControl, RootContext } from 'qoobee';
import * as React from 'react';

import { DASHBOARD_BASE_PATH } from '@/configs';
import { DomainContext } from '@/domain';
import { functionAllowed } from '@/domain/policies';

import {
    DashboardAgencyLevelsFetcher,
    DashboardPostsFetcher
} from './dashboard-content';

export interface DashboardContentProps {
    readonly activeTab: 'posts' | 'agency-policies';
}

export class DashboardContent extends React.PureComponent<DashboardContentProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly onTabClick = (tabKey: DashboardContentProps['activeTab']) => {
        const { history } = this.context;

        history.replace(`${DASHBOARD_BASE_PATH}/${tabKey}`);
    }

    public render() {
        const { activeTab } = this.props;

        const tabs = [{
            tab: 'Tin tức & Khuyến mãi',
            key: 'posts'
        }];

        const isAcencyPoliciesOverviewAllowed = functionAllowed(this.context, 'FUNC_AGENCY_POLICIES_OVERVIEW');

        if (isAcencyPoliciesOverviewAllowed) {
            tabs.push({
                tab: 'Chính sách đại lý',
                key: 'agency-policies'
            });
        }

        return (
            <Card
                className="dashboard-content"
                bordered={false}
                title={(
                    <Tabs
                        size="large"
                        activeKey={activeTab}
                        defaultActiveKey="posts"
                        onTabClick={this.onTabClick}
                    >
                        {tabs.map(o => <Tabs.TabPane key={o.key} tab={o.tab} />)}
                    </Tabs>
                )}
            >
                {
                    activeTab === 'posts'
                        ? <DashboardPostsFetcher />
                        : <DashboardAgencyLevelsFetcher />
                }
            </Card>
        );
    }
}
