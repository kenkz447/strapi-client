import { Col, Row } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { PageContent, PageWrapper, SlideUp } from '@/components';
import { DASHBOARD_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { getUrlSearchParam } from '@/utilities';

import { DashboardAccountInfo, DashboardPost } from './containers';
import { DashboardContent } from './containers/DashboardContent';

const RouteDashboardWrapper = styled.div`
    min-height: 100%;
    height: 1px;
    display: flex;
    padding: 24px 0 0 24px;
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

type RouteDashboardProps = AppPageProps;

export class RouteDashboard extends RoutePage<RouteDashboardProps> {
    static readonly routeInfo: RouteInfo = {
        path: DASHBOARD_URL,
        title: text('Dashboard'),
        exact: true
    };

    render() {
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
                                <DashboardContent />
                            )
                    }
                </RouteDashboardWrapper>
            </PageWrapper>
        );
    }
}