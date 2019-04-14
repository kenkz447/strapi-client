import { Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { BusinessController } from '@/business';
import { registerUser } from '@/business/user';
import { SlideUp } from '@/components';
import { AUTH_REGISTER_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { RegisterFormControl } from '@/forms/auth';
import { text } from '@/i18n';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteRegisterProps = AppPageProps;

interface RouteRegisterState {
    readonly successed: boolean;
}

export class RouteRegister extends RoutePage<
    RouteRegisterProps,
    RouteRegisterState
    > {
    static readonly withContext = ['authClient'];

    static readonly routeInfo: RouteInfo = {
        path: AUTH_REGISTER_URL,
        title: 'Đăng ký',
        exact: true
    };

    constructor(props: RouteRegisterProps) {
        super(props);
        this.state = {
            successed: false
        };
    }

    render() {
        const { successed } = this.state;
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        {
                            successed
                                ? (
                                    <AuthCard
                                        title={text('Registration')}
                                        description={text('Registration_Successful')}
                                    />
                                )
                                : (
                                    <AuthCard
                                        title={text('Registration')}
                                        description={text('Registration_Basic')}
                                    >
                                        <BusinessController
                                            action={registerUser}
                                            onSuccess={() => {
                                                this.setState({
                                                    successed: true
                                                });
                                            }}
                                        >
                                            {({ doBusiness }) => {
                                                return (
                                                    <RegisterFormControl
                                                        submit={doBusiness}
                                                    />
                                                );
                                            }}
                                        </BusinessController>


                                    </AuthCard>
                                )
                        }
                        <Divider dashed={true} />
                        <div className="register-link">
                            <Link to={LOGIN_URL}>
                                <u>{text('To login page')}</u>
                            </Link>
                        </div>
                    </SlideUp>
                </div>
            </AuthPageWrapper>
        );
    }
}