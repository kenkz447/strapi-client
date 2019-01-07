import './ProductFetcher.scss';

import { Layout } from 'antd';
import { UnregisterCallback } from 'history';
import * as React from 'react';

import { eventEmitter, RootContext } from '@/app';
import {
    getFurnitureComponentByCode,
    getFurnitureComponentByDesign
} from '@/business/furniture-component';
import { getFurnitureMaterialByCode } from '@/business/furniture-material';
import {
    getProductModulesComponentCodes,
    getProductModulesFromRaw,
    getProductModulesMaterialCodes,
    getProductModulesPrice
} from '@/business/product-modules';
import { getProductTypeById } from '@/business/product-type';
import { NoContent, PageLoading, SlideUp } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { DomainContext, WithHistory } from '@/domain';
import { text } from '@/i18n';
import {
    FurnitureComponent,
    FurnitureComponentType,
    ProductExtended
} from '@/restful';
import { getUrlSearchParam, replaceRoutePath } from '@/utilities';

import { CLEAR_3D_SENCE_CONTEXT_EVENT } from '../RouteProductContext';
import { Product3dSence, ProductPrice } from './product-fetcher';
import { ProductTypeSelect, ProductTypeSelectState } from './product-sider';

export interface ProductFetcherProps {
    readonly modulesCode: string | null;
}

interface ProductFetcherState extends ProductTypeSelectState {
    readonly allowLoad?: boolean;
    readonly modulesCode: string | null;
    readonly loadedProduct: ProductExtended | null;
    readonly needsUpdate?: boolean;
}

export class ProductFetcher extends React.PureComponent<ProductFetcherProps, ProductFetcherState> {
    static readonly contextType = RootContext;
    readonly context!: WithHistory & Pick<DomainContext, 'selectedFurnitureComponent'>;
    readonly unlistenHistory: UnregisterCallback;
    _isUnmounting!: boolean;

    static getDerivedStateFromProps(
        nextProps: ProductFetcherProps,
        state: ProductFetcherState
    ): Partial<ProductFetcherState> | null {
        const { modulesCode, productDesign } = state;

        const urlProductDesign = getUrlSearchParam('productDesign');

        if (nextProps.modulesCode !== modulesCode) {
            return {
                ...state,
                needsUpdate: true,
                modulesCode: nextProps.modulesCode,
                productDesign: urlProductDesign
            };
        }

        if (productDesign !== urlProductDesign) {
            return {
                ...state,
                needsUpdate: true,
                productDesign: urlProductDesign
            };
        }

        return null;
    }

    constructor(props: ProductFetcherProps, context: WithHistory) {
        super(props);

        const { modulesCode } = props;

        const productTypeSelectState = ProductTypeSelect.getSearchParamsState();

        if (modulesCode) {
            this.state = {
                allowLoad: false,
                modulesCode: modulesCode,
                loadedProduct: null,
                ...productTypeSelectState
            };
        } else {
            this.state = {
                allowLoad: false,
                modulesCode: null,
                loadedProduct: null,
                ...productTypeSelectState
            };
        }

        const { history } = context;
        this.unlistenHistory = history.listen(this.onUrlChange);
    }

    private readonly onUrlChange = async () => {
        if (this._isUnmounting) {
            return;
        }

        const { productDesign } = this.state;
        const urlProductDesign = getUrlSearchParam('productDesign');

        if (productDesign === urlProductDesign) {
            return;
        }

        const nextModuleCode = await this.getProductModulesCodeByDesign(urlProductDesign!);

        if (!nextModuleCode) {
            return;
        }

        const { history } = this.context;

        const url = replaceRoutePath(PRODUCT_URL, { modulesCode: nextModuleCode });
        const searchParams = new URLSearchParams(location.search);
        const toUrl = url + '?' + searchParams.toString();
        history.replace(toUrl);
    }

    private readonly fetchModules = async (modulesCode: string) => {
        const componentCodes = getProductModulesComponentCodes(modulesCode);
        const materialCodes = getProductModulesMaterialCodes(modulesCode);

        const componentsMaterials = await Promise.all([
            Promise.all(componentCodes.map((code) =>
                getFurnitureComponentByCode(code)
            )),
            Promise.all(materialCodes.map((code) =>
                getFurnitureMaterialByCode(code)
            ))
        ]);

        const componentList = componentsMaterials[0];
        const materialList = componentsMaterials[1];

        const productModules = componentList.map((component, index) =>
            getProductModulesFromRaw({
                component: component,
                material: materialList[index]
            })
        );

        return productModules;
    }

    private readonly fetchProduct = async (modulesCode: string): Promise<ProductExtended> => {
        const modules = await this.fetchModules(modulesCode);
        const standardComponent = modules[0].component;

        const componentDesign = standardComponent.design;

        if (!componentDesign.productType) {
            throw new Error('Product type is null!');
        }

        const productType = await getProductTypeById(componentDesign.productType);

        return {
            design: componentDesign,
            modules: modules,
            productType: productType,
            totalPrice: getProductModulesPrice({
                productModules: modules,
                startPrice: 0
            })
        };
    }

    private readonly loadProduct = async (modulesCode: string) => {
        const product = await this.fetchProduct(modulesCode);
        this.setState({
            allowLoad: true,
            needsUpdate: false,
            loadedProduct: product,
            modulesCode: modulesCode
        });
    }

    private readonly loadProductIfNeeded = () => {
        const {
            modulesCode
        } = this.state;

        if (!modulesCode) {
            return;
        }

        this.loadProduct(modulesCode);
    }

    private readonly getProductModulesCodeByDesign = async (productDesign: string) => {
        if (!productDesign) {
            return;
        }

        const allFurnitureComponentByDesign = await getFurnitureComponentByDesign(productDesign);
        const allFurnitureComponentType = allFurnitureComponentByDesign.reduce(
            (furnitureComponentTypes, furnitureComponent) => {
                const existingFurnitureComponentType = furnitureComponentTypes.find(
                    o => {
                        if (typeof furnitureComponent.componentType === 'string') {
                            return o.id === furnitureComponent.componentType;
                        }

                        return o.id === furnitureComponent.componentType.id;
                    }
                );

                if (existingFurnitureComponentType) {
                    return furnitureComponentTypes;
                }

                return [
                    ...furnitureComponentTypes,
                    furnitureComponent.componentType
                ];
            },
            [] as FurnitureComponentType[]
        );

        const moduleComponents: FurnitureComponent[] = [];
        for (const furnitureComponentType of allFurnitureComponentType) {
            const defaultFurnitureComponent = allFurnitureComponentByDesign.find(
                o => o.componentType === furnitureComponentType
            );

            if (!defaultFurnitureComponent) {
                continue;
            }

            moduleComponents.push(defaultFurnitureComponent);
        }

        const result = moduleComponents.reduce(
            (modulesCode, component, index) => {
                let nextCode = modulesCode;

                nextCode += component.code + '-' + '999';

                if (index !== moduleComponents.length - 1) {
                    nextCode += '-';
                }

                return nextCode;
            },
            ''
        );

        return result;
    }

    private readonly onComponentChanged = () => {
        eventEmitter.emit(CLEAR_3D_SENCE_CONTEXT_EVENT);
    }

    private readonly onShoppingClick = () => {
        // 
    }

    public componentDidMount() {
        this.loadProductIfNeeded();
    }

    public componentDidUpdate(
        prevProps: ProductFetcherProps,
        prevState: ProductFetcherState
    ) {
        const isModulesCodeChanged = prevState.modulesCode !== this.state.modulesCode;

        if (isModulesCodeChanged) {
            this.loadProductIfNeeded();
        }
    }

    public componentWillUnmount() {
        this._isUnmounting = true;
        this.unlistenHistory();
    }

    public render() {
        const { allowLoad, loadedProduct } = this.state;
        if (!allowLoad) {
            return (
                <PageLoading />
            );
        }
        const { selectedFurnitureComponent } = this.context;
        const allowLoadWithProduct = allowLoad && loadedProduct;
        const allowLoadWithNoProduct = allowLoad && !loadedProduct;

        return (
            <SlideUp className="h-100 w-100 d-flex">
                <Layout className="page-layout product-fetcher">
                    {
                        allowLoadWithProduct &&
                        <React.Fragment>
                            <Layout.Content className="h-100">
                                <div className="product-fetcher-sence-wrapper">
                                    <Product3dSence
                                        key={loadedProduct!.design.id}
                                        productModules={loadedProduct!.modules}
                                        productType={loadedProduct!.productType}
                                    />
                                    <ProductPrice
                                        totalPrice={loadedProduct!.totalPrice}
                                        actionTitle={selectedFurnitureComponent ? text('Done') : text('Buy this')}
                                        actionIcon={selectedFurnitureComponent ? 'check' : 'shopping'}
                                        actionCallback={selectedFurnitureComponent ?
                                            this.onComponentChanged :
                                            this.onShoppingClick
                                        }
                                    />
                                </div>
                            </Layout.Content>
                        </React.Fragment>
                    }
                    {
                        allowLoadWithNoProduct && <NoContent />
                    }
                </Layout>
            </SlideUp>
        );
    }
}