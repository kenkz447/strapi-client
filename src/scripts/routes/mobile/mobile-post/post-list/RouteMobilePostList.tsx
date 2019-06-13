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
import {
    DashboardPostsFetcher
} from '@/routes/dashboard/containers/dashboard-content';
import { replaceRoutePath } from '@/utilities';

type RouteMobilePostListProps = AppPageProps;

export class RouteMobilePostList extends RoutePage<RouteMobilePostListProps> {
    static readonly routeInfo: RouteInfo = {
        path: getMobileUrl(MOBILE_POST_LIST_URL),
        title: text('News'),
        exact: true
    };

    public render() {
        return (
            <PageWrapper backgroundColor="#FFF">
                <div style={{ padding: '0 24px' }}>
                    <DashboardPostsFetcher
                        getPostDetailUrl={(post) => replaceRoutePath(
                            getMobileUrl(MOBILE_POST_DETAIL_URL),
                            { slug: post.slug }
                        )}
                    />
                </div>
            </PageWrapper>
        );
    }
}