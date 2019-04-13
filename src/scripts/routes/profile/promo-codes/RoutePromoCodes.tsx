import { Divider, Typography } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageWrapper } from '@/components';
import { PROFILE_PROMO_CODE_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';

import { StoredPromoCodesFetcher } from './containers';

type RoutePromoCodesProps = AppPageProps;

export class RoutePromoCodes extends RoutePage<RoutePromoCodesProps> {
    public static readonly withContext = ['currentAgency'];

    static readonly routeInfo: RouteInfo = {
        path: PROFILE_PROMO_CODE_URL,
        title: text('Promo codes'),
        exact: true
    };

    public render() {

        return (
            <PageWrapper backgroundColor="#fff">
                <PageContent>
                    <div>
                        <Typography.Title level={4} className="flex-grow-1">
                            {text('Promotion and gifts')}
                        </Typography.Title>
                        <Typography.Paragraph type="secondary">
                            {text('List of promotion and gift code')}
                        </Typography.Paragraph>
                        <Divider dashed={true} />
                        <div>
                            <StoredPromoCodesFetcher />
                        </div>
                    </div>
                </PageContent>
            </PageWrapper>
        );
    }
}