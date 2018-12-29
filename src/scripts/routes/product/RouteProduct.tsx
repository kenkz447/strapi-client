import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageLoading, PageWrapper, SlideUp } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    productDesignResources,
    productTypeGroupResources,
    productTypeResources,
    request
} from '@/restful';

import { ProductFetcher, ProductSider } from './containers';

type RouteProps = AppPageProps<{ readonly modulesCode: string }>;

export class RouteProduct extends RoutePage<RouteProps> {
    static readonly routeInfo: RouteInfo = {
        path: PRODUCT_URL,
        title: text('Products'),
        exact: true
    };

    readonly state = {
        allowLoad: true
    };
    
    public render() {
        const { match } = this.props;

        return (
            <PageWrapper>
                <PageContent>
                    <SlideUp className="h-100 w-100 d-flex">
                        <ProductFetcher modulesCode={match.params.modulesCode} />
                        <ProductSider />
                    </SlideUp>
                </PageContent>
            </PageWrapper>
        );
    }
}