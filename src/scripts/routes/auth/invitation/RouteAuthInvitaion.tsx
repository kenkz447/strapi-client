import { Alert, Button, Divider } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { BusinessController } from '@/business';
import { joinViaInvitation } from '@/business/invitation';
import { PageLoading, SlideUp } from '@/components';
import { AUTH_INVITATION_URL, LOGIN_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { AuthInvitaionFormControl } from '@/forms/auth';
import { text } from '@/i18n';
import {
    Invitation,
    invitationResources,
    request,
    UserRegisterResponse
} from '@/restful';

import { AuthCard, AuthPageWrapper } from '../shared';

type RouteAuthInvitaionProps = AppPageProps<{ readonly code: string }>;

interface RouteAuthInvitaionState {
    readonly invitation?: Invitation;
    readonly allowLoad?: boolean;
    readonly error?: string;
    readonly loginCallback?: () => void;
}

export class RouteAuthInvitaion extends RoutePage<
    RouteAuthInvitaionProps,
    RouteAuthInvitaionState
    > {
    static readonly withContext = ['authClient'];

    static readonly routeInfo: RouteInfo = {
        path: AUTH_INVITATION_URL,
        title: 'Join with us',
        exact: true
    };

    constructor(props: RouteAuthInvitaionProps) {
        super(props);
        this.state = {};

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        try {
            const { match } = this.props;
            const invitation = await request(
                invitationResources.findOneByCode,
                {
                    type: 'path',
                    parameter: 'code',
                    value: match.params.code
                }
            );

            this.setState({
                invitation: invitation,
                allowLoad: true
            });
        } catch (error) {
            this.setState({
                error: text('Sorry, inviation code is invalid!'),
                allowLoad: true
            });
        }
    }

    render() {
        const { authClient } = this.props;
        const { invitation, allowLoad, error, loginCallback } = this.state;
        if (!allowLoad) {
            return <PageLoading />;
        }

        return (
            <AuthPageWrapper>
                <div className="auth-page-content">
                    <SlideUp>
                        <AuthCard
                            title={text('Join [M]Furniture')}
                            description={text('InvitationJoinDescription')}
                        >
                            {loginCallback &&
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
                                        onClick={loginCallback}
                                    >
                                        Bắt đầu
                                    </Button>
                                </div>
                            }
                            {
                                error && (
                                    <Alert message={error} type="error" />
                                )
                            }
                            {
                                (!loginCallback && !error) && (
                                    <BusinessController
                                        action={joinViaInvitation}
                                        onSuccess={({ jwt }: UserRegisterResponse) => {
                                            this.setState({
                                                loginCallback: () => authClient.jwtLogin(jwt)
                                            });
                                        }}
                                    >
                                        {({ doBusiness }) => {
                                            return (
                                                <AuthInvitaionFormControl
                                                    submit={doBusiness}
                                                    initialValues={{
                                                        invitationId: invitation!.id
                                                    }}
                                                />
                                            );
                                        }}
                                    </BusinessController>
                                )
                            }

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