import { UnregisterCallback } from 'history';
import { events } from 'qoobee';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import {
    productDesignResources,
    productTypeGroupResources,
    productTypeResources,
    request
} from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { CLEAR_3D_SENCE_SELECT_EVENT } from '../RouteProductContext';
import {
    ProductComponentSelect,
    ProductTypeSelect,
    ProductTypeSelectProps
} from './product-sider';
import { ProductMaterialSelect } from './product-sider';
import { ProductDetails } from './product-sider/ProductDetails';
import { ProductVariantSelect } from './product-sider/ProductVariantSelect';

const ProductSiderWrapper = styled.div`
    flex-basis: 360px;
    background: #fff;
    padding: 24px 24px 0 24px;
    overflow-x: hidden;
`;

interface ProductSiderProps {
}

type ProductSiderContext =
    Pick<DomainContext, 'history'>
    & Pick<DomainContext, 'selectedFurnitureComponent'>
    & Pick<DomainContext, 'selectedFurnitureMaterial'>
    & Pick<DomainContext, 'selected3DObject'>;

interface ProductSiderState extends ProductTypeSelectProps {
    readonly currentProductDesignId: string | null;
}

class ProductSiderComponent extends React.PureComponent<
    WithContextProps<ProductSiderContext, ProductSiderProps>,
    ProductSiderState
    > {

    static readonly getDerivedStateFromProps = (
        nextProps: ProductSiderProps,
        state: ProductSiderState
    ): ProductSiderState | null => {
        const nextProductDesignId = getUrlSearchParam('productDesign');

        if (state.currentProductDesignId !== nextProductDesignId) {
            return {
                ...state,
                currentProductDesignId: nextProductDesignId,
            };
        }

        return null;
    }

    readonly unlistenHistory: UnregisterCallback;
    _isUnmounting!: boolean;

    constructor(props: WithContextProps<ProductSiderContext, ProductSiderProps>) {
        super(props);

        const { history } = props;

        this.state = {
            allProductDesign: [],
            allProductType: [],
            allProductTypeGroups: [],
            currentProductDesignId: getUrlSearchParam('productDesign')
        };

        this.fetchResources();

        this.unlistenHistory = history.listen(() => {
            if (this._isUnmounting) {
                return;
            }

            const { currentProductDesignId } = this.state;
            const nextProductDesignId = getUrlSearchParam('productDesign');

            if (currentProductDesignId === nextProductDesignId) {
                return;
            }

            this.onDesignChange();
        });
    }

    private readonly fetchResources = async () => {
        const resources = await Promise.all([
            request(productDesignResources.find),
            request(productTypeResources.find),
            request(productTypeGroupResources.find),
        ]);

        this.setState({
            allProductDesign: resources[0],
            allProductType: resources[1],
            allProductTypeGroups: resources[2]
        });
    }

    private readonly onDesignChange = () => {
        events.emit(CLEAR_3D_SENCE_SELECT_EVENT);
    }

    public componentWillUnmount() {
        this._isUnmounting = true;
        this.unlistenHistory();
    }

    public render() {
        const { selectedFurnitureComponent } = this.props;
        const {
            allProductTypeGroups,
            allProductType,
            allProductDesign
        } = this.state;

        return (
            <ProductSiderWrapper>
                <ProductTypeSelect
                    allProductTypeGroups={allProductTypeGroups}
                    allProductType={allProductType}
                    allProductDesign={allProductDesign}
                />
                {
                    selectedFurnitureComponent
                        ? (
                            <div>
                                <ProductVariantSelect />
                                <ProductComponentSelect />
                                <div className="white-space-2" />
                                <ProductMaterialSelect key={selectedFurnitureComponent.id}/>
                            </div>
                        )
                        : (
                            <ProductDetails />
                        )
                }

            </ProductSiderWrapper>
        );
    }
}

export const ProductSider = withContext<ProductSiderContext, ProductSiderProps>(
    'history',
    'selectedFurnitureComponent',
    'selectedFurnitureMaterial'
)(ProductSiderComponent);