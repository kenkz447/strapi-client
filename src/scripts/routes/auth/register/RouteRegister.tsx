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
import { RegisterFormContainer } from './containers';

type RouteRegisterProps = AppPageProps;

interface RouteRegisterState {
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
        const { refCode, reflink, error } = this.state;
        
        if (refCode && !reflink) {
            return <PageLoading />;
        }

        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <RegisterFormContainer
                        reflink={reflink!}
                        error={error}
                    />
                </div>
            </AuthPageWrapper>
        );
    }
}