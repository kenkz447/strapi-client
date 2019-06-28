import { Button, Layout, Radio } from 'antd';
import { UnregisterCallback } from 'history';
import { events } from 'qoobee';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { getFurnitureComponentByDesign } from '@/business/furniture-component';
import {
    getFurnitureComponentGroupById
} from '@/business/furniture-component-group';
import {
    fetchProductModules,
    getProductModuleDetails,
    getProductModulesPrice
} from '@/business/product-modules';
import { getProductTypeById } from '@/business/product-type';
import { NoContent, PageLoading } from '@/components';
import { getMobileUrl, PRODUCT_PATH, PRODUCT_URL } from '@/configs';
import { text } from '@/i18n';
import {
    FurnitureComponent,
    FurnitureComponentType,
    ProductExtended
} from '@/restful';
import { ProductDetails } from '@/routes/product/containers/product-sider';
import {
    ProductVariantSelect
} from '@/routes/product/containers/product-sider/ProductVariantSelect';
import {
    ProductFetcherContextProps
} from '@/routes/product/containers/ProductFetcher';
import {
    CLEAR_3D_SENCE_SELECT_EVENT
} from '@/routes/product/RouteProductContext';
import {
    getNestedObjectId,
    getUrlSearchParam,
    replaceRoutePath
} from '@/utilities';

import {
    MobileProductComponentSelect,
    Product3DComponentSwitch,
    Product3dSence,
    ProductAddToCart,
    ProductPhotos,
    ProductPrice
} from './mobile-product-fetcher';
import {
    MobileProductMaterialSelect
} from './mobile-product-fetcher/MobileProductMaterialSelect';
import {
    MobileProductTypeSelect,
    MobileProductTypeSelectState
} from './mobile-product-types';

interface MobileProductFetcherProps {
    readonly modulesCode: string | null;
}

interface MobileProductFetcherState extends MobileProductTypeSelectState {
    readonly allowLoad?: boolean;
    readonly modulesCode: string | null;
    readonly loadedProduct: ProductExtended | null;
    readonly needsUpdate?: boolean;
    readonly buyOrSpecs: 'buy' | 'specs';
}

class MobileProductFetcherComponent extends React.PureComponent<
    WithContextProps<ProductFetcherContextProps, MobileProductFetcherProps>,
    MobileProductFetcherState
    > {

    readonly unlistenHistory: UnregisterCallback;
    _isUnmounting!: boolean;

    static getDerivedStateFromProps(
        nextProps: MobileProductFetcherProps,
        state: MobileProductFetcherState
    ): Partial<MobileProductFetcherState> | null {
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

    constructor(props: WithContextProps<ProductFetcherContextProps, MobileProductFetcherProps>) {
        super(props);

        const { modulesCode, history } = props;

        const productTypeSelectState = MobileProductTypeSelect.getSearchParamsState();

        if (modulesCode) {
            this.state = {
                allowLoad: false,
                modulesCode: modulesCode,
                loadedProduct: null,
                buyOrSpecs: 'buy',
                ...productTypeSelectState
            };
        } else {
            this.state = {
                allowLoad: false,
                modulesCode: null,
                loadedProduct: null,
                buyOrSpecs: 'buy',
                ...productTypeSelectState
            };
        }

        this.unlistenHistory = history.listen(this.onUrlChange);
    }

    private readonly onUrlChange = async () => {
        if (this._isUnmounting || !location.pathname.includes(PRODUCT_PATH)) {
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

        const url = replaceRoutePath(
            getMobileUrl(PRODUCT_URL),
            { modulesCode: nextModuleCode }
        );

        const searchParams = new URLSearchParams(location.search);
        const toUrl = url + '?' + searchParams.toString();
        history.replace(toUrl);
    }

    private readonly fetchProduct = async (modulesCode: string): Promise<ProductExtended> => {
        const modules = await fetchProductModules(modulesCode);
        const standardComponent = modules[0].component;

        const componentDesign = standardComponent.design;

        if (!componentDesign.productType) {
            throw new Error('Product type is null!');
        }

        const productType = await getProductTypeById(componentDesign.productType);

        return {
            modulesCode: modulesCode,
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
        let letDefaultGroup: string | undefined = undefined;
        for (const furnitureComponentType of allFurnitureComponentType) {

            const furnitureComponentTypeId = getNestedObjectId(furnitureComponentType);

            let defaultFurnitureComponent = allFurnitureComponentByDesign.find(
                o => {
                    const oComponentTypeId = getNestedObjectId(o.componentType);

                    const currentComponentGroup = getNestedObjectId(o.componentGroup);

                    return oComponentTypeId === furnitureComponentTypeId
                        && o.isDefault === true
                        && (letDefaultGroup
                            ? currentComponentGroup === letDefaultGroup
                            : true
                        );
                }
            );

            if (!defaultFurnitureComponent) {
                defaultFurnitureComponent = allFurnitureComponentByDesign.find(
                    o => {
                        const oComponentTypeId = getNestedObjectId(o.componentType);
                        const currentComponentGroup = getNestedObjectId(o.componentGroup);

                        return oComponentTypeId === furnitureComponentTypeId
                            && (letDefaultGroup
                                ? currentComponentGroup === letDefaultGroup
                                : true
                            );
                    }
                );
            }

            if (!defaultFurnitureComponent) {
                continue;
            }

            if (!letDefaultGroup && defaultFurnitureComponent.componentGroup) {
                letDefaultGroup = getNestedObjectId(defaultFurnitureComponent.componentGroup);
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
        events.emit(CLEAR_3D_SENCE_SELECT_EVENT);
    }

    private readonly updateContext = async (prevProps: ProductFetcherContextProps) => {
        const { selectedFurnitureComponent } = prevProps;

        const {
            loadedProduct,
        } = this.state;

        const currentComponentGroup = (loadedProduct && loadedProduct.modules) &&
            ((loadedProduct.modules[0] && typeof loadedProduct.modules[0].component.componentGroup !== 'string')
                ? loadedProduct.modules[0].component.componentGroup
                : null
            );

        const componentGroupEntity = currentComponentGroup
            && await getFurnitureComponentGroupById(currentComponentGroup.id);

        const selectedModule = (selectedFurnitureComponent && loadedProduct) &&
            loadedProduct.modules.find(o => o.component.id === selectedFurnitureComponent.id);

        const details = getProductModuleDetails(loadedProduct && loadedProduct.modules);

        this.props.setContext({
            selectedProduct: loadedProduct,
            selectedFurnitureMaterial: selectedModule ? selectedModule.material : null,
            selectedFurnitureComponentDiameter: details.diameter,
            selectedFurnitureComponentHeight: details.height,
            selectedFurnitureComponentLengthiness: details.lengthiness,
            selectedFurnitureComponentGroup: componentGroupEntity
        });
    }

    public componentDidMount() {
        this.loadProductIfNeeded();
    }

    public componentDidUpdate(
        prevProps: ProductFetcherContextProps,
        prevState: MobileProductFetcherState
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

        const { selectedFurnitureComponent, modulesCode } = this.props;
        const allowLoadWithNoProduct = allowLoad && !loadedProduct;

        if (allowLoadWithNoProduct) {
            return <NoContent />;
        }

        return (
            <div style={{ marginBottom: 24 }}>
                <Product3dSence
                    key={loadedProduct!.design.id}
                    productModules={loadedProduct!.modules}
                    productType={loadedProduct!.productType}
                />
                {
                    <ProductPhotos
                        product={loadedProduct!}
                        visibled={true}
                    />
                }
                {
                    selectedFurnitureComponent
                        ? (
                            <div className="w-100">
                                <Product3DComponentSwitch />
                                <ProductVariantSelect />
                                <MobileProductComponentSelect />
                                <MobileProductMaterialSelect />
                                <div style={{ padding: `0 24px` }}>
                                    <ProductPrice
                                        className="w-100"
                                        totalPrice={loadedProduct!.totalPrice}
                                        actionTitle={text('Bấm vào đây để xác nhận')}
                                        button={
                                            <Button
                                                onClick={this.onComponentChanged}
                                                icon="check"
                                                shape="circle-outline"
                                                size="large"
                                            />
                                        }
                                    />
                                </div>
                            </div>
                        )
                        : (
                            <div style={{overflow: 'hidden'}}>
                                <div className="white-space-2" />
                                <div style={{ padding: '0 24px' }}>
                                    <Radio.Group
                                        className="w-100 text-center"
                                        buttonStyle="solid"
                                        value={this.state.buyOrSpecs}
                                        onChange={(e) => {
                                            this.setState({ buyOrSpecs: e.target.value });
                                        }}
                                    >
                                        <Radio.Button className="w-50" value="buy">
                                            Mua hàng
                                        </Radio.Button>
                                        <Radio.Button className="w-50" value="specs">
                                            Về sản phẩm
                                        </Radio.Button>
                                    </Radio.Group>
                                </div>
                                {
                                    this.state.buyOrSpecs === 'buy'
                                        ? (
                                            <div style={{ padding: '12px 0 0 24px' }}>
                                                <ProductAddToCart
                                                    loadedProduct={loadedProduct!}
                                                    modulesCode={modulesCode!}
                                                />
                                            </div>
                                        )
                                        : (
                                            <div style={{ padding: '12px 24px 0 24px' }}>
                                                <ProductDetails />
                                            </div>
                                        )
                                }
                            </div>
                        )
                }
            </div>
        );
    }
}

export const MobileProductFetcher = withContext<ProductFetcherContextProps, MobileProductFetcherProps>(
    'history',
    'selectedFurnitureComponent',
)(MobileProductFetcherComponent);