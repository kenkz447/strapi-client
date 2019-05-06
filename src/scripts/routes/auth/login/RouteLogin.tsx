import { Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { SlideUp } from '@/components';
import { AUTH_REGISTER_URL, FORGOT_PASSWORD_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { LoginFormControl } from '@/forms/auth';
import { text } from '@/i18n';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteLoginProps = AppPageProps;

export class RouteLogin extends RoutePage<RouteLoginProps> {
    static readonly withContext = ['authClient'];

    static readonly routeInfo: RouteInfo = {
        path: LOGIN_URL,
        title: 'Đăng nhập',
        exact: true
    };

    private readonly renderGoogleLogin = () => {
        return (
            <div style={{ marginBottom: 16 }}>
                <a href={API_ENTRY + '/connect/google'}>
                    <img src="/static/assets/google-icon.png" width="30" /> Đăng nhập với Google
                </a>
            </div>
        );
    }

    render() {
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard
                            title={text('Login')}
                            description={text('LoginDescription')}
                        >
                            {this.renderGoogleLogin()}
                            <LoginFormControl />

                            <Divider dashed={true} />
                            <div className="register-link">
                                <Link to={AUTH_REGISTER_URL}>
                                    <u>{text('Register now')}</u>
                                </Link>
                                &nbsp;
                                <span>{text('or')}</span>
                                &nbsp;
                                <Link to={FORGOT_PASSWORD_URL}>
                                    <u>{text('forgotten password?')}</u>
                                </Link>
                            </div>
                        </AuthCard>
                    </SlideUp>
                </div>
            </AuthPageWrapper>
        );
    }
}