import { Divider } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { RouteInfo } from '@/app';
import { BusinessController } from '@/business';
import { registerUser } from '@/business/user';
import { SlideUp } from '@/components';
import { AUTH_REGISTER_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { RegisterFormControl } from '@/forms/auth';
import { text } from '@/i18n';
import { UserRegisterResponse } from '@/restful';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteRegisterProps = AppPageProps;

export class RouteRegister extends RoutePage<RouteRegisterProps> {
    static readonly withContext = ['authClient'];

    static readonly routeInfo: RouteInfo = {
        path: AUTH_REGISTER_URL,
        title: 'Đăng ký',
        exact: true
    };

    render() {
        const { authClient } = this.props;
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard
                            title={text('Registration')}
                            description={text('Registration_Basic')}
                        >
                            <BusinessController
                                action={registerUser}
                                onSuccess={({ jwt }: UserRegisterResponse) => {
                                    authClient.jwtLogin(jwt);
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