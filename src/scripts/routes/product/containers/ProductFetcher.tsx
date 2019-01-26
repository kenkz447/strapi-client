import './ProductFetcher.scss';

import { Layout } from 'antd';
import { UnregisterCallback } from 'history';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { eventEmitter } from '@/app';
import {
    getFurnitureComponentByCode,
    getFurnitureComponentByDesign
} from '@/business/furniture-component';
import { getFurnitureMaterialByCode } from '@/business/furniture-material';
import {
    getProductModuleDetails,
    getProductModulesComponentCodes,
    getProductModulesFromRaw,
    getProductModulesMaterialCodes,
    getProductModulesPrice
} from '@/business/product-modules';
import { getProductTypeById } from '@/business/product-type';
import { NoContent, PageLoading, SlideUp } from '@/components';
import { PRODUCT_PATH, PRODUCT_URL } from '@/configs';
import { DomainContext, WithHistory } from '@/domain';
import { text } from '@/i18n';
import {
    FurnitureComponent,
    FurnitureComponentType,
    ProductExtended
} from '@/restful';
import { getUrlSearchParam, replaceRoutePath } from '@/utilities';

import { CLEAR_3D_SENCE_SELECT_EVENT } from '../RouteProductContext';
import { Product3dSence, ProductPrice } from './product-fetcher';
import { ProductTypeSelect, ProductTypeSelectState } from './product-sider';

interface ProductFetcherProps {
    readonly modulesCode: string | null;
}

type ProductFetcherContextProps = WithHistory
    & Pick<DomainContext, 'selectedFurnitureComponent'>
    & Pick<DomainContext, 'selectedFurnitureMaterial'>
    & Pick<DomainContext, 'selectedProduct'>
    & Pick<DomainContext, 'selectedFurnitureComponentDiameter'>
    & Pick<DomainContext, 'selectedFurnitureComponentHeight'>
    & Pick<DomainContext, 'selectedFurnitureComponentLengthiness'>;

interface ProductFetcherState extends ProductTypeSelectState {
    readonly allowLoad?: boolean;
    readonly modulesCode: string | null;
    readonly loadedProduct: ProductExtended | null;
    readonly needsUpdate?: boolean;
}

class ProductFetcherComponent extends React.PureComponent<
    WithContextProps<ProductFetcherContextProps, ProductFetcherProps>,
    ProductFetcherState
    > {

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

    constructor(props: WithContextProps<ProductFetcherContextProps, ProductFetcherProps>) {
        super(props);

        const { modulesCode, history } = props;

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

        this.unlistenHistory = history.listen(this.onUrlChange);
    }

    private readonly onUrlChange = async () => {
        if (this._isUnmounting || !location.pathname.startsWith(PRODUCT_PATH)) {
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

        const { history } = this.props;

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
        eventEmitter.emit(CLEAR_3D_SENCE_SELECT_EVENT);
    }

    private readonly onShoppingClick = () => {
        // 
    }

    private readonly updateContext = async (prevProps: ProductFetcherContextProps) => {
        const { selectedFurnitureComponent } = prevProps;

        const {
            loadedProduct,
        } = this.state;

        const selectedModule = (selectedFurnitureComponent && loadedProduct) &&
            loadedProduct.modules.find(o => o.component.id === selectedFurnitureComponent.id);

        const details = getProductModuleDetails(loadedProduct && loadedProduct.modules);
        this.props.setContext({
            selectedProduct: loadedProduct,
            selectedFurnitureMaterial: selectedModule ? selectedModule.material : null,
            selectedFurnitureComponentDiameter: details.diameter,
            selectedFurnitureComponentHeight: details.height,
            selectedFurnitureComponentLengthiness: details.lengthiness
        });
    }

    public componentDidMount() {
        this.loadProductIfNeeded();
    }

    public componentDidUpdate(
        prevProps: ProductFetcherContextProps,
        prevState: ProductFetcherState
    ) {
        const isModulesCodeChanged = prevState.modulesCode !== this.state.modulesCode;

        if (isModulesCodeChanged) {
            this.loadProductIfNeeded();
        }

        if (this.state.loadedProduct !== prevState.loadedProduct) {
            this.updateContext(prevProps);
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
        const { selectedFurnitureComponent } = this.props;
        const allowLoadWithProduct = allowLoad && loadedProduct;
        const allowLoadWithNoProduct = allowLoad && !loadedProduct;

        return (
            <SlideUp className="h-100 w-100 d-flex">
                <Layout className="page-layout product-fetcher">
                    {
                        allowLoadWithProduct &&
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
                    }
                    {
                        allowLoadWithNoProduct && <NoContent />
                    }
                </Layout>
            </SlideUp>
        );
    }
}

export const ProductFetcher = withContext<ProductFetcherContextProps, ProductFetcherProps>(
    'history',
    'selectedFurnitureComponent'
)(ProductFetcherComponent);