import * as React from 'react';

import { eventEmitter, RouteInfo } from '@/app';
import { PageContent, PageWrapper, SlideUp } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';

import { ProductFetcher, ProductSider } from './containers';
import {
    CLEAR_3D_SENCE_CONTEXT_EVENT,
    CLEAR_3D_SENCE_SELECT_EVENT,
    RouteProductContext
} from './RouteProductContext';

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

    private readonly registerEvent = () => {
        eventEmitter.on(CLEAR_3D_SENCE_CONTEXT_EVENT, this.clear3DSenceContext);
        eventEmitter.on(CLEAR_3D_SENCE_SELECT_EVENT, this.clear3dSenceSelect);
    }

    private readonly clear3dSenceSelect = () => {
        const { setContext } = this.props;
        setContext({
            selected3DObject: null,
            selectedFurnitureComponent: null,
            selectedFurnitureMaterial: null,
            selectedFurnitureComponentIndex: null
        });
    }

    private readonly clear3DSenceContext = () => {
        const { setContext } = this.props;
        setContext({
            selected3DObject: null,
            selectedProduct: null,
            selectedFurnitureComponent: null,
            selectedFurnitureComponentGroup: null,
            selectedFurnitureComponentDiameter: null,
            selectedFurnitureComponentHeight: null,
            selectedFurnitureComponentLengthiness: null,
            selectedFurnitureComponentType: null,
            selectedFurnitureMaterial: null,
            selectedFurnitureMaterialType: null,
            availableFurnitureComponents: null,
            availableFurnitureMaterials: null
        });
    }

    public componentDidMount() {
        this.registerEvent();
    }

    public componentWillUnmount() {
        this.clear3DSenceContext();
        eventEmitter.removeListener(CLEAR_3D_SENCE_CONTEXT_EVENT, this.clear3DSenceContext);
        eventEmitter.removeListener(CLEAR_3D_SENCE_SELECT_EVENT, this.clear3dSenceSelect);
    }

    public render() {
        const { match } = this.props;

        const routeProductContextValue = {
            currentModulesCode: match.params.modulesCode
        };

        return (
            <RouteProductContext.Provider value={routeProductContextValue}>
                <PageWrapper style={{ flexDirection: 'row' }}>
                    <PageContent>
                        <ProductFetcher
                            modulesCode={routeProductContextValue.currentModulesCode}
                        />
                    </PageContent>
                    <ProductSider />
                </PageWrapper>
            </RouteProductContext.Provider>
        );
    }
}