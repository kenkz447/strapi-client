import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageWrapper, SlideUp } from '@/components';
import {
    getMobileUrl,
    MOBILE_POST_DETAIL_URL,
    MOBILE_POST_LIST_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { DashboardPost } from '@/routes/dashboard/containers';

type RouteMobilePostDetailProps = AppPageProps<{ readonly slug: string }>;

export class RouteMobilePostDetail extends RoutePage<RouteMobilePostDetailProps> {
    static readonly routeInfo: RouteInfo = {
        path: getMobileUrl(MOBILE_POST_DETAIL_URL),
        title: text('News'),
        exact: true
    };

    public render() {
        const { match } = this.props;

        return (
            <PageWrapper backgroundColor="#FFF">
                <SlideUp className="mh-100">
                    <DashboardPost
                        postSlug={match.params.slug}
                        backURL={getMobileUrl(MOBILE_POST_LIST_URL)}
                    />
                </SlideUp>
            </PageWrapper>
        );
    }
}