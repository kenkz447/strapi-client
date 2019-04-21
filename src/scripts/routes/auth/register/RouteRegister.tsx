import { Alert, Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { BusinessController } from '@/business';
import { registerUser } from '@/business/user';
import { PageLoading, SlideUp } from '@/components';
import { AUTH_REGISTER_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { RegisterFormControl } from '@/forms/auth';
import { text } from '@/i18n';
import { AuthLoginResponseBody, authResources, request } from '@/restful';
import { Reflink, reflinkResources } from '@/restful/resources/Reflink';
import { getUrlSearchParam, isFutureDate } from '@/utilities';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteRegisterProps = AppPageProps;

interface RouteRegisterState {
    readonly registered: boolean;
    readonly refCode?: string | null;
    readonly reflink?: Reflink;
    readonly error?: string;
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
            registered: registered ? true : false,
            refCode: getUrlSearchParam('ref')
        };

        if (this.state.refCode) {
            this.fetchReflink(this.state.refCode);
        }
    }

    private readonly fetchReflink = async (refCode: string) => {
        try {
            const reflink = await request(
                reflinkResources.findOneByCode,
                {
                    type: 'path',
                    parameter: 'code',
                    value: refCode
                }, 
                {
                    silent: true
                }
            );

            if (reflink.expirationDate) {
                const isExpired = isFutureDate(reflink.expirationDate);
                if (isExpired) {
                    this.setState({
                        refCode: null,
                        error: text(`you ref code is expired!`)
                    });
                }
            }

            this.setState({
                reflink: reflink
            });
        } catch (error) {
            if (error.status = 404) {
                return this.setState({
                    refCode: null,
                    error: text('Your ref code does not exist!')
                });
            }

            this.setState({
                refCode: null,
                error: error ? error.message : 'Unknow!'
            });
        }
    }

    render() {
        const { registered, refCode, reflink, error } = this.state;
        if (refCode && !reflink) {
            return <PageLoading />;
        }

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
                                        {
                                            error && (
                                                <div>
                                                    <Alert type="error" showIcon={true} message={error} />
                                                    <div className="white-space-2"/>
                                                </div>
                                            )
                                        }
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
                                                            reflink: reflink
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