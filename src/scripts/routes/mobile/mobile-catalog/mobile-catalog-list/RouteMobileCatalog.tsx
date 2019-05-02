import { RouteInfo } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { PageWrapper } from '@/components';
import { CATALOG_URL, getMobileUrl } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    ProductType,
    ProductTypeGroup,
    productTypeGroupResources,
    productTypeResources,
    request
} from '@/restful';

import { CatalogsFetcher } from './containers';

type RouteCatalogProps = AppPageProps<{ readonly productTypeGroup?: string }>;

export const RouteRouteCatalogWrapper = styled.div`
    min-height: 100%;
    height: 1px;
`;

interface RouteCatalogState {
    readonly productTypeGroups: ProductTypeGroup[];
    readonly productTypes: ProductType[];
}

export class RouteCatalog extends RoutePage<RouteCatalogProps, RouteCatalogState> {
    static readonly routeInfo: RouteInfo = {
        path: getMobileUrl(CATALOG_URL),
        title: text('Catalog'),
        exact: true
    };

    constructor(props: RouteCatalogProps) {
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
        const { productTypes, productTypeGroups } = this.state;
        const { match } = this.props;

        let selectedProductTypeGroup = match.params.productTypeGroup;

        if (!selectedProductTypeGroup && productTypeGroups.length) {
            selectedProductTypeGroup = productTypeGroups[0].id;
        }

        return (
            <PageWrapper>
                <RouteRouteCatalogWrapper>
                    <CatalogsFetcher
                        productTypeGroups={productTypeGroups}
                        productTypes={productTypes}
                        selectedProductTypeGroup={selectedProductTypeGroup}
                    />
                </RouteRouteCatalogWrapper>
            </PageWrapper>
        );
    }
}