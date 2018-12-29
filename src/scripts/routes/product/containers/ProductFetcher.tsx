import './ProductFetcher.scss';

import { Layout } from 'antd';
import { UnregisterCallback } from 'history';
import * as React from 'react';

import { RootContext } from '@/app';
import {
    getFurnitureComponentByCodeProps,
    getFurnitureComponentByDesign
} from '@/business/furniture-component';
import { getFurnitureMaterialByCodeProps } from '@/business/furniture-material';
import {
    getProductModulesComponentCodes,
    getProductModulesFromRaw,
    getProductModulesMaterialCodes,
    getProductModulesPrice
} from '@/business/product-modules';
import { getProductTypeById } from '@/business/product-type';
import { NoContent } from '@/components';
import { ThreeSence } from '@/components/domain';
import { PRODUCT_URL } from '@/configs';
import { WithHistory } from '@/domain';
import {
    FurnitureComponent,
    FurnitureComponentType,
    ProductExtended
} from '@/restful';
import { getUrlSearchParam, replaceRoutePath } from '@/utilities';

import { ProductTypeSelect, ProductTypeSelectState } from './product-sider';

export interface ProductFetcherProps {
    readonly modulesCode: string | null;
}

interface ProductFetcherState extends ProductTypeSelectState {
    readonly allowLoad?: boolean;
    readonly modulesCode: string | null;
    readonly loadedProduct: ProductExtended | null;
}

export class ProductFetcher extends React.PureComponent<ProductFetcherProps, ProductFetcherState> {
    static readonly contextType = RootContext;
    readonly context!: WithHistory;
    readonly unlistenHistory: UnregisterCallback;
    _isUnmounting!: boolean;

    static getDerivedStateFromProps(
        nextProps: ProductFetcherProps,
        state: ProductFetcherState
    ): Partial<ProductFetcherState> | null {
        const { modulesCode, productDesign } = state;

        if (nextProps.modulesCode !== modulesCode) {
            return {
                ...state,
                loadedProduct: null,
                modulesCode: nextProps.modulesCode
            };
        }

        const urlProductDesign = getUrlSearchParam('productDesign');
        
        if (productDesign !== urlProductDesign) {
            return {
                ...state,
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
                allowLoad: true,
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
                getFurnitureComponentByCodeProps(code)
            )),
            Promise.all(materialCodes.map((code) =>
                getFurnitureMaterialByCodeProps(code)
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
            loadedProduct: product,
            modulesCode: modulesCode
        });
    }

    private readonly loadProductIfNeeded = () => {
        const {
            modulesCode,
            loadedProduct
        } = this.state;

        if (loadedProduct || !modulesCode) {
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
                    o => o.id === furnitureComponent.componentType.id
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

    public componentDidMount() {
        this.loadProductIfNeeded();
    }

    public componentDidUpdate() {
        this.loadProductIfNeeded();
    }

    public componentWillUnmount() {
        this._isUnmounting = true;
        this.unlistenHistory();
    }

    public render() {
        const { allowLoad, loadedProduct } = this.state;

        const allowLoadWithProduct = allowLoad && loadedProduct;
        const allowLoadWithNoProduct = allowLoad && !loadedProduct;

        return (
            <Layout className="page-layout product-fetcher">
                {
                    allowLoadWithProduct &&
                    <React.Fragment>
                        <Layout.Content className="h-100">
                            <div className="product-fetcher-sence-wrapper">
                                <ThreeSence
                                    productModules={loadedProduct!.modules}
                                    productType={loadedProduct!.productType}
                                />
                            </div>
                        </Layout.Content>
                        <Layout.Footer>
                            {}
                        </Layout.Footer>
                    </React.Fragment>
                }
                {
                    allowLoadWithNoProduct && <NoContent />
                }
            </Layout>
        );
    }
}