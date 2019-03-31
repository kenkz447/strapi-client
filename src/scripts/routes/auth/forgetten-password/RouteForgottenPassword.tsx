import { Alert, Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { BusinessController } from '@/business';
import { forgottenPassword } from '@/business/auth';
import { SlideUp } from '@/components';
import { FORGOT_PASSWORD_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { ForgottenPasswordControl } from '@/forms/auth/forgotten-password';
import { text } from '@/i18n';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteForgottenPasswordProps = AppPageProps;

interface RouteForgottenPasswordState {
    readonly ok: boolean;
}

export class RouteForgottenPassword extends RoutePage<
    RouteForgottenPasswordProps,
    RouteForgottenPasswordState> {

    static readonly routeInfo: RouteInfo = {
        path: FORGOT_PASSWORD_URL,
        title: text('Forgotten password'),
        exact: true
    };

    constructor(props: RouteForgottenPasswordProps) {
        super(props);
        this.state = {
            ok: false
        };
    }

    render() {
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard
                            title={text('Forgotten password')}
                            description={text('ForgottenPasswordDescription')}
                        >
                            {
                                this.state.ok
                                    ? (
                                        <Alert
                                            showIcon={true}
                                            type="success"
                                            message="Ok"
                                            description="Yêu cầu của bạn đã được gởi đi, vui lòng kiểm tra mail và làm theo hướng dẫn!"
                                        />
                                    )
                                    : (
                                        <BusinessController
                                            action={forgottenPassword}
                                            onSuccess={() => {
                                                this.setState({
                                                    ok: true
                                                });
                                            }}
                                        >
                                            {({ doBusiness }) => {
                                                return (
                                                    <ForgottenPasswordControl
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