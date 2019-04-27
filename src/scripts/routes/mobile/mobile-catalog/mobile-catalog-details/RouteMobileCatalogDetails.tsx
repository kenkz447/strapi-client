import { RouteInfo } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { PageWrapper, SlideUp } from '@/components';
import { getMobileUrl, MOBILE_CATALOG_DETAILS_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    ProductType,
    ProductTypeGroup,
    productTypeGroupResources,
    productTypeResources,
    request
} from '@/restful';

import { CatalogDetailFetcher } from './containers';

export const RouteMobileCatalogDetailsWrapper = styled.div`
    min-height: 100%;
    height: 1px;
`;

type RouteMobileCatalogDetailsProps = AppPageProps<{ readonly id: string }>;

interface RouteMobileCatalogDetailsState {
    readonly productTypeGroups: ProductTypeGroup[];
    readonly productTypes: ProductType[];
}

export class RouteMobileCatalogDetails extends RoutePage<
    RouteMobileCatalogDetailsProps,
    RouteMobileCatalogDetailsState
    > {
    static readonly routeInfo: RouteInfo = {
        path: getMobileUrl(MOBILE_CATALOG_DETAILS_URL),
        title: text('Catalog'),
        exact: true
    };

    constructor(props: RouteMobileCatalogDetailsProps) {
        super(props);

        this.state = {
            productTypeGroups: [],
            productTypes: []
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [productTypeGroups, productTypes] = await Promise.all([
            request(productTypeGroupResources.find),
            request(productTypeResources.find)
        ]);

        this.setState({
            productTypeGroups: productTypeGroups,
            productTypes: productTypes
        });
    }

    render() {
        const { match } = this.props;

        let selectedCatalogId = match.params.id;

        return (
            <PageWrapper backgroundColor="#FFF">
                <RouteMobileCatalogDetailsWrapper>
                    <SlideUp className="mh-100">
                        <CatalogDetailFetcher
                            catalogId={selectedCatalogId!}
                        />
                    </SlideUp>
                </RouteMobileCatalogDetailsWrapper>
            </PageWrapper>
        );
    }
}