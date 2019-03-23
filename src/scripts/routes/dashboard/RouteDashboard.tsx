import { Col, Row } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageWrapper } from '@/components';
import { DASHBOARD_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';

import { DashboardAccountInfo } from './containers';
import { DashboardContent } from './containers/DashboardContent';

type RouteDashboardProps = AppPageProps;

export class RouteDashboard extends RoutePage<RouteDashboardProps> {
    static readonly routeInfo: RouteInfo = {
        path: DASHBOARD_URL,
        title: text('Dashboard'),
        exact: true
    };

    render() {
        return (
            <PageWrapper>
                <PageContent>
                    <div className="mh-100">
                        <Row gutter={24} className="mh-100">
                            <Col span={8} className="mh-100">
                                <DashboardAccountInfo />
                            </Col>
                            <Col span={16} className="mh-100">
                                <DashboardContent />
                            </Col>
                        </Row>
                    </div>
                </PageContent>
            </PageWrapper>
        );
    }
}