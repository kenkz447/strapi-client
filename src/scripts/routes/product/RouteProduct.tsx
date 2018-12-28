import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageLoading, PageWrapper, SlideUp } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { ProductExtended } from '@/restful';

import { ProductFetcher } from './containers';

type RouteProductProps = AppPageProps<{ readonly moduleCode: string }>;

export class RouteProduct extends RoutePage<RouteProductProps> {
    static readonly routeInfo: RouteInfo = {
        path: PRODUCT_URL,
        title: text('Products'),
        exact: true
    };

    readonly state = {
        allowLoad: true
    };

    render() {
        const { allowLoad } = this.state;
        const { match } = this.props;

        if (!allowLoad) {
            return <PageLoading />;
        }

        return (
            <PageWrapper>
                <PageContent>
                    <SlideUp className="h-100 w-100 d-flex">
                        <ProductFetcher moduleCode={match.params.moduleCode} />
                    </SlideUp>
                </PageContent>
            </PageWrapper>
        );
    }
}