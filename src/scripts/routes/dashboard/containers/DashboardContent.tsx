import './DashboardContent.scss';

import { Card, Tabs, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import { text } from '@/i18n';

import {
    DashboardPostsFetcher
} from './dashboard-content/DashboardPostsFetcher';

interface DashboardContentProps {
}

export class DashboardContent extends React.PureComponent<DashboardContentProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    public render() {

        return (
            <Card
                className="dashboard-content"
                bordered={false}
                title={(
                    <Tabs size="large">
                        <Tabs.TabPane tab="Tin tức & Khuyến mãi" key="1"/>
                        <Tabs.TabPane tab="Chính sách đại lý" key="2" disabled={true} />
                    </Tabs>
                )}
            >
                <DashboardPostsFetcher />
            </Card>
        );
    }
}
