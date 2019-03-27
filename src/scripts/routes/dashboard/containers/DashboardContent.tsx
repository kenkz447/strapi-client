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

const DashboardContentHeadline = styled.h4`
    text-decoration: none;
    font-size: 20px;
    color: #333740;
    letter-spacing: 0;
    transition: color .2s ease;
    border-bottom: 3px solid #f0b41e;
    display: inline-block;
`;

interface DashboardContentProps {
}

export class DashboardContent extends React.PureComponent<DashboardContentProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    public render() {

        return (
            <Card
                className="mh-100 dashboard-content"
                bordered={false}
                title={(
                    <Tabs size="large">
                        <Tabs.TabPane tab="Tin tức & Khuyến mãi" key="1"/>
                        <Tabs.TabPane tab="Chính sách đại lý" key="2" />
                    </Tabs>
                )}
            >
                <DashboardPostsFetcher />
            </Card>
        );
    }
}
