import { Col, Row } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { PageWrapper, SlideUp } from '@/components';
import { DASHBOARD_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { getUrlSearchParam } from '@/utilities';

import {
    DashboardAccountInfo,
    DashboardContent,
    DashboardContentProps,
    DashboardPost
} from './containers';

export const RouteDashboardWrapper = styled.div`
    min-height: 100%;
    height: 1px;
    display: flex;
    overflow: auto;
    > :first-child {
        min-width: 390px;
        width: 390px;
        margin-right: 24px;
        position: sticky;
        top: 0;
    }
    > :last-child {
        flex-grow: 1;
        width: 100%;
    }
`;

type RouteDashboardProps = AppPageProps<{ readonly activeTab: DashboardContentProps['activeTab'] }>;

export class RouteDashboard extends RoutePage<RouteDashboardProps> {
    static readonly routeInfo: RouteInfo = {
        path: DASHBOARD_URL,
        title: text('Dashboard'),
        exact: true
    };

    render() {
        const { match } = this.props;

        const activeTab = match.params.activeTab || 'posts';
        const currentPost = getUrlSearchParam('post');

        return (
            <PageWrapper>
                <RouteDashboardWrapper>
                    <DashboardAccountInfo />
                    {
                        currentPost ?
                            (
                                <SlideUp className="mh-100">
                                    <DashboardPost postSlug={currentPost} />
                                </SlideUp>
                            ) : (
                                <DashboardContent activeTab={activeTab} />
                            )
                    }
                </RouteDashboardWrapper>
            </PageWrapper>
        );
    }
}