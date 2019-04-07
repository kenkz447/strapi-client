import { Typography } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertAgency } from '@/business/agency';
import { updateUser } from '@/business/profile';
import { PageContent, PageWrapper } from '@/components';
import { PROFILE_AGENCY_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { showMessage } from '@/effects';
import { AgencyUpdateFormControl } from '@/forms/agency/agency-update';
import { text } from '@/i18n';

type RouteProfileAgencyProps = AppPageProps;

export class RouteProfileAgency extends RoutePage<RouteProfileAgencyProps> {
    public static readonly withContext = ['currentAgency'];

    static readonly routeInfo: RouteInfo = {
        path: PROFILE_AGENCY_URL,
        title: text('Agency'),
        exact: true
    };

    public render() {
        const { currentAgency } = this.props;

        return (
            <PageWrapper backgroundColor="#fff">
                <PageContent>
                    <Typography.Title level={4}>
                        {text('Agency settings')}
                    </Typography.Title>
                    <Typography.Paragraph>
                        {text('AgencySettingsDesctiption')}
                    </Typography.Paragraph>
                    <BusinessController
                        action={upsertAgency}
                        onSuccess={() => {
                            showMessage({
                                type: 'success',
                                content: 'Ok'
                            });
                        }}
                    >
                        {({ doBusiness }) => (
                            <AgencyUpdateFormControl
                                initialValues={currentAgency}
                                submit={doBusiness}
                            />
                        )}
                    </BusinessController>
                </PageContent>
            </PageWrapper>
        );
    }
}