import { Divider } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { RouteInfo } from '@/app';
import { SlideUp } from '@/components';
import { AUTH_REGISTER_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { LoginFormControl } from '@/forms';
import { text } from '@/i18n';

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
                        <AuthCard
                            title={text('Login')}
                            description={text('LoginDescription')}
                        >
                            <LoginFormControl />

                            <Divider dashed={true} />
                            <div className="register-link">
                                <Link to={AUTH_REGISTER_URL}>
                                    <u>{text('Register now!')}</u>
                                </Link>
                            </div>
                        </AuthCard>
                    </SlideUp>
                </div>
            </AuthPageWrapper>
        );
    }
}