import { Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { BusinessController } from '@/business';
import { upsertBusinessLiscense } from '@/business/business-license';
import { SlideUp } from '@/components';
import { AUTH_CONFIRM_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { ConfirmFormControl } from '@/forms/auth/confirm-form';
import { text } from '@/i18n';
import { BusinessLicense } from '@/restful';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteConfirmProps = AppPageProps;

interface RouteConfirmState {
    readonly licenseResult?: BusinessLicense;
}

export class RouteConfirm extends RoutePage<RouteConfirmProps, RouteConfirmState> {
    static readonly withContext = ['currentUser'];

    static readonly routeInfo: RouteInfo = {
        path: AUTH_CONFIRM_URL,
        title: 'Đăng ký',
        exact: true
    };

    constructor(props: RouteConfirmProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { currentUser } = this.props;
        if (!currentUser || currentUser.confirmed) {
            return <Redirect to={LOGIN_URL} />;
        }

        const { licenseResult } = this.state;
        const hasLicense = !!licenseResult;

        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp key={hasLicense ? 'hasLicense' : 'License'}>
                        <div>
                            {
                                hasLicense
                                    ? (
                                        <AuthCard
                                            title={text('Registration')}
                                            description={text('Registration_Successful')}
                                        >
                                            {}
                                        </AuthCard>
                                    )
                                    : (
                                        <AuthCard
                                            title={text('Registration')}
                                            description={text('Registration_Confirm')}
                                        >
                                            <BusinessController
                                                action={upsertBusinessLiscense}
                                                onSuccess={(result: BusinessLicense) => {
                                                    this.setState({
                                                        licenseResult: result
                                                    });
                                                }}
                                            >
                                                {({ doBusiness }) => {
                                                    return (
                                                        <ConfirmFormControl
                                                            initialValues={{
                                                                isBusiness: true
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
                        </div>
                    </SlideUp>
                </div>
            </AuthPageWrapper>
        );
    }
}