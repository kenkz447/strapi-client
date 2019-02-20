import { Divider } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { RouteInfo } from '@/app';
import { BusinessController } from '@/business';
import { upsertBusinessLiscense } from '@/business/business-license';
import { SlideUp } from '@/components';
import { AUTH_CONFIRM_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteConfirmProps = AppPageProps;

export class RouteConfirm extends RoutePage<RouteConfirmProps> {
    static readonly routeInfo: RouteInfo = {
        path: AUTH_CONFIRM_URL,
        title: 'Đăng ký',
        exact: true
    };

    render() {
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard
                            title={text('Registration successful!')}
                            description={text('Registration_Successful')}
                        >
                            <BusinessController
                                action={upsertBusinessLiscense}
                                onSuccess={() => {
                                    //
                                }}
                            >
                                {() => {
                                    return (null);
                                }}
                            </BusinessController>
                            <Divider dashed={true} />
                            <div className="register-link">
                                <Link to={LOGIN_URL}>
                                    <u>{text('To login page')}</u>
                                </Link>
                            </div>
                        </AuthCard>
                    </SlideUp>
                </div>
            </AuthPageWrapper>
        );
    }
}