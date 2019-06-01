import './DashboardContent.scss';

import { Card, Tabs } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { DASHBOARD_BASE_PATH } from '@/configs';
import { DomainContext } from '@/domain';

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

    private readonly renderCardContent = () => {
        const { activeTab } = this.props;

        if (activeTab === 'posts') {
            return (<DashboardPostsFetcher />);
        }

        return (
            <DashboardPostsFetcher/>
        );
    }

    public render() {
        const { activeTab } = this.props;

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
                        <Tabs.TabPane tab="Tin tức & Khuyến mãi" key="posts" />
                        {/* <Tabs.TabPane tab="Chính sách đại lý" key="agency-policies" /> */}
                    </Tabs>
                )}
            >
                {this.renderCardContent()}
            </Card>
        );
    }
}
