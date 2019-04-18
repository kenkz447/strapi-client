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
import { AuthLoginResponseBody, authResources } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteRegisterProps = AppPageProps;

interface RouteRegisterState {
    readonly registered: boolean;
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
        const registered = getUrlSearchParam('registered');
        this.state = {
            registered: registered ? true : false
        };
    }

    render() {
        const { registered } = this.state;
        const reflinkCode = getUrlSearchParam('ref');

        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        {
                            registered
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
                                            onSuccess={({ jwt }: AuthLoginResponseBody) => {
                                                sessionStorage.setItem('tempJWT', jwt);
                                                this.setState({
                                                    registered: true
                                                });
                                            }}
                                        >
                                            {({ doBusiness }) => {
                                                return (
                                                    <RegisterFormControl
                                                        initialValues={{
                                                            reflinkCode: reflinkCode || undefined
                                                        }}
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