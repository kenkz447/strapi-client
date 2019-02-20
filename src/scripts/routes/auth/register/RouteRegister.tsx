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
import { User, UserRegisterResponse } from '@/restful';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteRegisterProps = AppPageProps;

export class RouteRegister extends RoutePage<RouteRegisterProps> {
    static readonly routeInfo: RouteInfo = {
        path: AUTH_REGISTER_URL,
        title: 'Đăng ký',
        exact: true
    };

    render() {
        const { history } = this.props;
        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard
                            title={text('Register')}
                            description={text('Wellcome to our website')}
                        >
                            <BusinessController
                                action={registerUser}
                                onSuccess={({ user }: UserRegisterResponse) => {
                                    history.push(`/confirm/${user.email}`);
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