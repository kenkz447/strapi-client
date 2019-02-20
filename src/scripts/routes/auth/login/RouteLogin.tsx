import * as React from 'react';

import { RouteInfo } from '@/app';
import { SlideUp } from '@/components';
import { LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { LoginFormControl } from '@/forms';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteLoginProps = AppPageProps;

export class RouteLogin extends RoutePage<RouteLoginProps> {
    static readonly routeInfo: RouteInfo = {
        path: LOGIN_URL,
        title: 'Đăng nhập',
        exact: true
    };

    render() {
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard>
                            <LoginFormControl />
                        </AuthCard>
                    </SlideUp>
                </div>
            </AuthPageWrapper>
        );
    }
}