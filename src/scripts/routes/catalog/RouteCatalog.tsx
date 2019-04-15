import { Card } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageWrapper } from '@/components';
import { CATALOG_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { ProductType, productTypeResources, request } from '@/restful';

import { RouteDashboardWrapper } from '../dashboard';
import { CatalogContact } from './containers';
import { CatalogFetcher } from './containers/CatalogFetcher';

type RouteCatalogProps = AppPageProps;

interface RouteCatalogState {
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
            productTypes: []
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [productTypes] = await Promise.all([
            request(productTypeResources.find)
        ]);

        this.setState({
            productTypes: productTypes
        });
    }

    render() {
        const { productTypes } = this.state;
        return (
            <PageWrapper>
                <RouteDashboardWrapper>
                    <CatalogContact />
                    <CatalogFetcher productTypes={productTypes} />
                </RouteDashboardWrapper>
            </PageWrapper>
        );
    }
}