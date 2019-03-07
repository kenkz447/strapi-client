import { Alert, Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { BusinessController } from '@/business';
import { forgottenPassword } from '@/business/auth';
import { resetPassword } from '@/business/auth/actions/resetPassword';
import { SlideUp } from '@/components';
import { FORGOT_PASSWORD_URL, LOGIN_URL, RESET_PASSWORD_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { ForgottenPasswordControl } from '@/forms/auth/forgotten-password';
import {
    ResetPasswordControl
} from '@/forms/auth/reset-password/ResetPasswordFormControl';
import { text } from '@/i18n';
import { getUrlSearchParam } from '@/utilities';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteResetPasswordProps = AppPageProps;

interface RouteResetPasswordState {
    readonly ok: boolean;
    readonly resetCode: string;
}

export class RouteResetPassword extends RoutePage<
    RouteResetPasswordProps,
    RouteResetPasswordState> {

    static readonly routeInfo: RouteInfo = {
        path: RESET_PASSWORD_URL,
        title: text('Reset password'),
        exact: true
    };

    constructor(props: RouteResetPasswordProps) {
        super(props);
        this.state = {
            ok: false,
            resetCode: getUrlSearchParam('code')!
        };
    }

    public render() {
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard
                            title={text('Reset password')}
                            description={text('ResetPasswordDescription')}
                        >
                            {
                                this.state.ok
                                    ? (
                                        <Alert
                                            showIcon={true}
                                            type="success"
                                            message="Ok"
                                            // tslint:disable-next-line:max-line-length
                                            description="Mật khẩu của bạn đã được đặt lại, vui lòng đăng nhập với mật khẩu mới của bạn!"
                                        />
                                    )
                                    : (
                                        <BusinessController
                                            action={resetPassword}
                                            onSuccess={() => {
                                                this.setState({
                                                    ok: true
                                                });
                                            }}
                                        >
                                            {({ doBusiness }) => {
                                                return (
                                                    <ResetPasswordControl
                                                        initialValues={{
                                                            code: this.state.resetCode
                                                        }}
                                                        submit={doBusiness}
                                                    />
                                                );
                                            }}
                                        </BusinessController>
                                    )
                            }

                            <Divider dashed={true} />
                            <div className="auth-link">
                                <Link to={LOGIN_URL}>
                                    <u>{text('Login')}</u>
                                </Link>
                            </div>
                        </AuthCard>
                    </SlideUp>
                </div>
            </AuthPageWrapper>
        );
    }
}