import * as React from 'react';
import styled from 'styled-components';

const ProductSiderWrapper = styled.div`
    width: 400px;
    margin-left: 24px;
    background: #fff;
    margin-top: -24px;
    margin-right: -24px;
`;

export interface ProductSiderProps {
}

export class ProductSider extends React.PureComponent<ProductSiderProps> {
    public render() {
        return (
            <ProductSiderWrapper>
                {}
            </ProductSiderWrapper>
        );
    }
}
