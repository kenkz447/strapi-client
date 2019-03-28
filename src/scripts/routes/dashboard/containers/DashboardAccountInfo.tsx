import { Pie } from 'ant-design-pro/lib/Charts';
import { Card, Icon, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import { text } from '@/i18n';

const DashboardAccountInfoHeadline = styled.h4`
    text-decoration: none;
    font-size: 20px;
    color: #333740;
    letter-spacing: 0;
    transition: color .2s ease;
    border-bottom: 3px solid #f0b41e;
    display: inline-block;
`;

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

interface DashboardAccountInfoProps {
}

export class DashboardAccountInfo extends React.PureComponent<DashboardAccountInfoProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    public render() {
        const { currentUser, currentAgency } = this.context;

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
                        {
                            currentAgency && (
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
                            )
                        }
                    </div>
                </div>
            </Card>
        );
    }
}
