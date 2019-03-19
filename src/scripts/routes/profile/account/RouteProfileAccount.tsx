import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageWrapper } from '@/components';
import { PROFILE_ACCOUNT_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { AccountFormControl } from '@/forms/profile';
import { text } from '@/i18n';

type RouteProfileAccountProps = AppPageProps;

export class RouteProfileAccount extends RoutePage<RouteProfileAccountProps> {
    public static readonly withContext = ['currentUser'];

    static readonly routeInfo: RouteInfo = {
        path: PROFILE_ACCOUNT_URL,
        title: text('Account'),
        exact: true
    };

    public render() {
        const { currentUser } = this.props;

        return (
            <PageWrapper backgroundColor="#fff">
                <PageContent>
                    <AccountFormControl
                        initialValues={currentUser}
                        submit={() => { }}
                    />
                </PageContent>
            </PageWrapper>
        );
    }
}