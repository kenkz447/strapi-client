import { Layout } from 'antd';
import * as React from 'react';
import { RequestParameter } from 'react-restful';

import {
    getProductModulesComponentCodes,
    getProductModulesFromRaw,
    getProductModulesMaterialCodes,
    getProductModulesPrice
} from '@/business/product-modules';
import { Loading } from '@/components';
import {
    FurnitureComponent,
    furnitureComponentResources,
    FurnitureMaterial,
    furnitureMaterialResources,
    ProductExtended,
    productType,
    request,
    restfulStore
} from '@/restful';

export interface ProductFetcherProps {
    readonly modulesCode: string | null;
}

interface ProductFetcherState {
    readonly allowLoad?: boolean;
    readonly modulesCode: string | null;
    readonly loadedProduct: ProductExtended | null;
}

export class ProductFetcher extends React.PureComponent<ProductFetcherProps, ProductFetcherState> {

    static getDerivedStateFromProps(
        nextProps: ProductFetcherProps,
        prevState: ProductFetcherState
    ): Partial<ProductFetcherState> | null {
        const { modulesCode: nextModuleCode } = nextProps;

        if (!nextModuleCode && prevState.modulesCode) {
            return {
                loadedProduct: null,
                modulesCode: null
            };
        }

        if (nextModuleCode && !prevState.modulesCode) {
            return {
                loadedProduct: null,
                modulesCode: nextModuleCode
            };
        }

        if (
            nextModuleCode && prevState.modulesCode &&
            nextModuleCode !== prevState.modulesCode
        ) {
            return {
                ...prevState,
                allowLoad: false,
                loadedProduct: null,
                modulesCode: nextModuleCode
            };
        }

        return null;
    }

    constructor(props: ProductFetcherProps) {
        super(props);

        const { modulesCode } = props;

        if (modulesCode) {
            this.state = {
                allowLoad: false,
                modulesCode: modulesCode,
                loadedProduct: null
            };
        } else {
            this.state = {
                allowLoad: true,
                modulesCode: null,
                loadedProduct: null
            };
        }
    }

    private readonly fetchModules = async (modulesCode: string) => {
        const componentCodes = getProductModulesComponentCodes(modulesCode);
        const materialCodes = getProductModulesMaterialCodes(modulesCode);

        const componentParamsFetchList = componentCodes.map((code): RequestParameter => {
            return {
                type: 'query',
                parameter: nameof<FurnitureComponent>(o => o.code),
                value: code
            };
        });

        const materialParamsFetchList = materialCodes.map((code): RequestParameter => {
            return {
                type: 'query',
                parameter: nameof<FurnitureMaterial>(o => o.code),
                value: code
            };
        });

        const componentsMaterials = await Promise.all([
            Promise.all<FurnitureComponent[]>(componentParamsFetchList.map((param) =>
                request(
                    furnitureComponentResources.find,
                    [param]
                )
            )),
            Promise.all<FurnitureMaterial[]>(materialParamsFetchList.map((param) =>
                request(
                    furnitureMaterialResources.find,
                    [param]
                )
            ))
        ]);

        const componentList = componentsMaterials[0];
        const materialList = componentsMaterials[1];

        const productModules = componentList.map((component, index) =>
            getProductModulesFromRaw({
                component: component[0],
                material: materialList[index][0]
            })
        );

        return productModules;
    }

    private readonly getProduct = async (modulesCode: string): Promise<ProductExtended> => {
        const modules = await this.fetchModules(modulesCode);
        const standardComponent = modules[0].component;

        const selectedComponentDesign = standardComponent.design;
        const selectedComponentType = restfulStore.findOneRecord(
            productType,
            selectedComponentDesign.productType
        )!;

        return {
            produceCode: modulesCode,
            design: selectedComponentDesign,
            modules: modules,
            productType: selectedComponentType,
            totalPrice: getProductModulesPrice({
                productModules: modules,
                startPrice: 0
            })
        };
    }

    private readonly loadProduct = async (modulesCode: string) => {
        const product = await this.getProduct(modulesCode);
        this.setState({
            allowLoad: true,
            loadedProduct: product,
            modulesCode: modulesCode
        });
    }

    private readonly loadProductIfNeeded = () => {
        const { modulesCode, loadedProduct } = this.state;
        if (modulesCode && !loadedProduct) {
            this.loadProduct(modulesCode);
        }
    }

    public componentDidMount() {
        this.loadProductIfNeeded();
    }

    public componentDidUpdate() {
        this.loadProductIfNeeded();
    }

    public render() {
        const { allowLoad } = this.state;

        if (!allowLoad) {
            return <Loading />;
        }

        return (
            <Layout className="page-layout">
                {null}
            </Layout>
        );
    }
}