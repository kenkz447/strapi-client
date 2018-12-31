import * as React from 'react';
import styled from 'styled-components';

import {
    productDesignResources,
    productTypeGroupResources,
    productTypeResources,
    request
} from '@/restful';

import {
    ProductComponentSelect,
    ProductTypeSelect,
    ProductTypeSelectProps
} from './product-sider';

const ProductSiderWrapper = styled.div`
    width: 400px;
    background: #fff;
    margin-left: 24px;
    margin-top: -24px;
    margin-right: -24px;
    padding: 24px;
`;

export interface ProductSiderProps {
}

interface ProductSiderState extends ProductTypeSelectProps {

}

export class ProductSider extends React.PureComponent<
    ProductSiderProps,
    ProductSiderState
    > {
    constructor(props: ProductSiderProps) {
        super(props);
        
        this.state = {
            allProductDesign: [],
            allProductType: [],
            allProductTypeGroups: []
        };

        this.fetchResources();
    }

    readonly fetchResources = async () => {
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

    public render() {
        const { allProductTypeGroups, allProductType, allProductDesign } = this.state;
        return (
            <ProductSiderWrapper>
                <ProductTypeSelect
                    allProductTypeGroups={allProductTypeGroups}
                    allProductType={allProductType}
                    allProductDesign={allProductDesign}
                />
                <ProductComponentSelect />
            </ProductSiderWrapper>
        );
    }
}
