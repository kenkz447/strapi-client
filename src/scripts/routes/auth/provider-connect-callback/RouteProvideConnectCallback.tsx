import { Alert, Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Loading, SlideUp } from '@/components';
import {
    AUTH_REGISTER_URL,
    FORGOT_PASSWORD_URL,
    LOGIN_CONNECT_CALLBACK_URL,
    LOGIN_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { authResources, request } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteProvideConnectCallbackProps = AppPageProps;

interface RouteProvideConnectCallbackState {
    readonly error: string | null;
}

export class RouteProvideConnectCallback extends RoutePage<
    RouteProvideConnectCallbackProps,
    RouteProvideConnectCallbackState
    > {
    static readonly withContext = ['authClient'];

    static readonly routeInfo: RouteInfo = {
        path: LOGIN_CONNECT_CALLBACK_URL,
        title: 'Đăng nhập',
        exact: true
    };

    constructor(props: RouteProvideConnectCallbackProps) {
        super(props);

        this.state = {
            error: null
        };
    }

    private readonly externalLogin = async () => {
        try {
            const accessToken = getUrlSearchParam('access_token')
                || getUrlSearchParam('code')
                || getUrlSearchParam('oauth_token');

            const loginResponse = await request(
                authResources.providerLogin,
                [{
                    type: 'path',
                    parameter: 'provider',
                    value: 'google'
                }, {
                    type: 'query',
                    parameter: 'access_token',
                    value: accessToken || undefined!
                }]
            );

            const { authClient } = this.props;

            authClient.jwtLogin(loginResponse.jwt);
        } catch (error) {
            this.setState({
                error: 'Đã có lỗi trong quá trình xác thực'
            });
        }
    }

    componentDidMount() {
        this.externalLogin();
    }

    render() {
        const { error } = this.state;

        return (
            <AuthPageWrapper>
                {
                    error
                        ? (
                            <div className="auth-page-content">
                                <SlideUp>
                                    <AuthCard
                                        title={text('Login')}
                                        description={text('LoginDescription')}
                                    >
                                        <div>
                                            <Alert type="error" showIcon={true} message={error} />
                                            <Divider dashed={true} />
                                            <div className="register-link">
                                                <Link to={LOGIN_URL}>
                                                    <u>{text('To login page')}</u>
                                                </Link>
                                            </div>
                                        </div>
                                    </AuthCard>
                                </SlideUp>
                            </div>
                        )
                        : (
                            <Loading>Đang đăng nhập</Loading>
                        )
                }
            </AuthPageWrapper>
        );
    }
}