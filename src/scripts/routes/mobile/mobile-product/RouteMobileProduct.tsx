import { events, RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageWrapper } from '@/components';
import { getMobileUrl, PRODUCT_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    CLEAR_3D_SENCE_CONTEXT_EVENT,
    CLEAR_3D_SENCE_SELECT_EVENT,
    RouteProductContext
} from '@/routes/product/RouteProductContext';

import { MobileProductFetcher, MobileProductTypes } from './containers';

type RouteProps = AppPageProps<{ readonly modulesCode: string }>;

export class RouteMobileProduct extends RoutePage<RouteProps> {
    static readonly routeInfo: RouteInfo = {
        path: getMobileUrl(PRODUCT_URL),
        title: text('Products'),
        exact: true
    };

    readonly state = {
        allowLoad: true
    };

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
            availableFurnitureMaterials: null,
            selectedFurnitureComponentIndex: null
        });
    }

    private readonly registerEvent = () => {
        events.on(CLEAR_3D_SENCE_CONTEXT_EVENT, this.clear3DSenceContext);
        events.on(CLEAR_3D_SENCE_SELECT_EVENT, this.clear3dSenceSelect);
    }

    public componentDidMount() {
        this.registerEvent();
    }

    public componentWillUnmount() {
        this.clear3DSenceContext();
        events.removeListener(CLEAR_3D_SENCE_CONTEXT_EVENT, this.clear3DSenceContext);
        events.removeListener(CLEAR_3D_SENCE_SELECT_EVENT, this.clear3dSenceSelect);
    }

    public render() {
        const { match } = this.props;

        const routeProductContextValue = {
            currentModulesCode: match.params.modulesCode
        };

        return (
            <RouteProductContext.Provider value={routeProductContextValue}>
                <PageWrapper style={{ background: '#fff' }}>
                    <MobileProductTypes />
                    <MobileProductFetcher
                        modulesCode={match.params.modulesCode}
                    />
                </PageWrapper>
            </RouteProductContext.Provider>
        );
    }
}