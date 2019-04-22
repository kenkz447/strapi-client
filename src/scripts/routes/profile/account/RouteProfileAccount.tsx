import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { BusinessController } from '@/business';
import { updateUser } from '@/business/profile';
import { PageContent, PageWrapper } from '@/components';
import { PROFILE_ACCOUNT_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { showMessage } from '@/effects';
import { AccountFormControl } from '@/forms/profile';
import { text } from '@/i18n';
import { User } from '@/restful';

type RouteProfileAccountProps = AppPageProps;

export class RouteProfileAccount extends RoutePage<RouteProfileAccountProps> {
    public static readonly withContext = ['currentUser'];

    static readonly routeInfo: RouteInfo = {
        path: PROFILE_ACCOUNT_URL,
        title: text('Account'),
        exact: true
    };

    public render() {
        const { currentUser, setContext } = this.props;

        return (
            <PageWrapper backgroundColor="#fff">
                <PageContent>
                    <BusinessController
                        action={updateUser}
                        onSuccess={(updatedUser: User) => {
                            setContext({
                                currentUser: updatedUser
                            });

                            showMessage({
                                type: 'success',
                                content: 'Ok'
                            });
                        }}
                    >
                        {({ doBusiness }) => (
                            <AccountFormControl
                                initialValues={currentUser}
                                submit={doBusiness}
                            />
                        )}
                    </BusinessController>
                </PageContent>
            </PageWrapper>
        );
    }
}