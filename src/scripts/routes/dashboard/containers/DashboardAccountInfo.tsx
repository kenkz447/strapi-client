import { Pie } from 'ant-design-pro/lib/Charts';
import { Card, Icon, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import { text } from '@/i18n';

import { DashboardProfileOverview } from './dashboard-account-info';

const DashboardAccountInfoHeadline = styled.h4`
    text-decoration: none;
    font-size: 20px;
    color: #333740;
    letter-spacing: 0;
    transition: color .2s ease;
    border-bottom: 3px solid #f0b41e;
    display: inline-block;
`;

interface DashboardAccountInfoProps {
}

export class DashboardAccountInfo extends React.PureComponent<DashboardAccountInfoProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    public render() {
        const { currentUser } = this.context;

        return (
            <Card className="mh-100" bordered={false}>
                <div>
                    <div>
                        <DashboardAccountInfoHeadline>
                            {text('Welcome')} {currentUser.username}!
                        </DashboardAccountInfoHeadline>
                        <p className="text-justify">
                            {/* tslint:disable-next-line:max-line-length */}
                            We hope you are making progress on your project... We are giving our best to improve the product based on your feedback.
                        </p>
                        <div className="white-space-2" />
                        <DashboardProfileOverview />
                    </div>
                </div>
            </Card>
        );
    }
}
