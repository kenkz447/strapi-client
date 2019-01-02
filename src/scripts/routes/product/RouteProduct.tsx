import * as React from 'react';

import { eventEmitter, RouteInfo } from '@/app';
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
import { RouteProductContext } from './RouteProductContext';

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

    private readonly clearContext = () => {
        eventEmitter.on('clear3dContext', () => {
            const { setContext } = this.context;
            setContext({
                selected3DObject: null,
                selectedFurnitureComponent: null,
                selectedFurnitureMaterial: null,
                selectedFurnitureMaterialType: null,
                availableFurnitureComponents: null,
                availableFurnitureMaterials: null,
                selectedFurnitureComponentGroup: null,
                selectedFurnitureComponentDiameter: null,
                selectedFurnitureComponentHeight: null,
                selectedFurnitureComponentLengthinesss: null,
                selectedFurnitureComponentType: null
            });
        });
    }

    public render() {
        const { match } = this.props;

        const routeProductContextValue = {
            currentModulesCode: match.params.modulesCode
        };

        return (
            <RouteProductContext.Provider value={routeProductContextValue}>
                <PageWrapper>
                    <PageContent>
                        <SlideUp className="h-100 w-100 d-flex">
                            <ProductFetcher
                                modulesCode={routeProductContextValue.currentModulesCode}
                            />
                            <ProductSider />
                        </SlideUp>
                    </PageContent>
                </PageWrapper>
            </RouteProductContext.Provider>
        );
    }
}