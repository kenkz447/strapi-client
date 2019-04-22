import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertAgency } from '@/business/agency';
import { changePassword } from '@/business/profile/actions/changePassword';
import { PageContent, PageWrapper } from '@/components';
import { PROFILE_PASSWORD_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { showMessage } from '@/effects';
import { ChangePasswordFormControl } from '@/forms/profile/change-password';
import { text } from '@/i18n';

type RouteChangePasswordProps = AppPageProps;

export class RouteChangePassword extends RoutePage<RouteChangePasswordProps> {
    static readonly routeInfo: RouteInfo = {
        path: PROFILE_PASSWORD_URL,
        title: text('Change password'),
        exact: true
    };

    public render() {
        return (
            <PageWrapper backgroundColor="#fff">
                <PageContent>
                    <BusinessController
                        action={changePassword}
                        onSuccess={() => {
                            showMessage({
                                type: 'success',
                                content: 'Ok'
                            });
                            this.forceUpdate();
                        }}
                    >
                        {({ doBusiness }) => (
                            <ChangePasswordFormControl
                                submit={doBusiness}
                                initialValues={{
                                    confirmNewPassword: '',
                                    newPassword: '',
                                    oldPassword: ''
                                }}
                            />
                        )}
                    </BusinessController>
                </PageContent>
            </PageWrapper>
        );
    }
}