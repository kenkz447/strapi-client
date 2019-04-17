import { Alert, Button, Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { SlideUp } from '@/components';
import {
    AUTH_EMAIL_CONFIRMATION_URL,
    AUTH_REGISTER_URL,
    CATALOG_BASE_PATH,
    DASHBOARD_BASE_PATH,
    DASHBOARD_URL,
    FORGOT_PASSWORD_URL,
    LOGIN_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { getUrlSearchParam } from '@/utilities';

import { AuthCard, AuthPageWrapper } from '../shared';

type RoutEmailConfirmationProps = AppPageProps;

export class RoutEmailConfirmation extends RoutePage<RoutEmailConfirmationProps> {
    public static readonly withContext = ['history', 'authClient'];

    public static readonly routeInfo: RouteInfo = {
        path: AUTH_EMAIL_CONFIRMATION_URL,
        title: 'Xác nhận email thành công',
        exact: true
    };

    public readonly getJWTCode = () => {
        return getUrlSearchParam('confirmation');
    }

    public render() {
        const { history, authClient } = this.props;

        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard
                            title={text('Registration')}
                            description={text('Registration_Successful')}
                        >
                            <div>
                                <Alert
                                    message="Đăng ký thành công"
                                    description={text('JoinedViaInvitationDesciption')}
                                    type="success"
                                    showIcon={true}
                                />
                                <div className="white-space-2" />
                                <Button
                                    type="primary"
                                    className="w-100 text-center"
                                    onClick={() => {
                                        const tempJWT = sessionStorage.getItem('tempJWT');
                                        if (!tempJWT) {
                                           return void history.push(LOGIN_URL);
                                        }

                                        authClient.jwtLogin(tempJWT);
                                    }}
                                >
                                    Bắt đầu
                                </Button>
                            </div>
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