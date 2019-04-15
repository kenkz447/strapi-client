import { Card } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageWrapper } from '@/components';
import { CATALOG_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    ProductType,
    ProductTypeGroup,
    productTypeGroupResources,
    productTypeResources,
    request
} from '@/restful';

import { RouteDashboardWrapper } from '../dashboard';
import { CatalogContact, CatalogsFetcher } from './containers';

type RouteCatalogProps = AppPageProps<{ readonly productTypeGroup?: string }>;

interface RouteCatalogState {
    readonly productTypeGroups: ProductTypeGroup[];
    readonly productTypes: ProductType[];
}

export class RouteCatalog extends RoutePage<RouteCatalogProps, RouteCatalogState> {
    static readonly routeInfo: RouteInfo = {
        path: CATALOG_URL,
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
        const selectedProductTypeGroup = match.params.productTypeGroup;

        return (
            <PageWrapper>
                <RouteDashboardWrapper>
                    <CatalogContact />
                    <CatalogsFetcher
                        productTypeGroups={productTypeGroups}
                        productTypes={productTypes}
                        selectedProductTypeGroup={selectedProductTypeGroup}
                    />
                </RouteDashboardWrapper>
            </PageWrapper>
        );
    }
}