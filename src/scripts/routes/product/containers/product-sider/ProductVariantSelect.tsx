import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { Product3DSenceContext } from '@/domain';

import {
    ProductVariantDiameters,
    ProductVariantHeights,
    ProductVariantLengthinesss
} from './product-variant-select';

interface ProductVariantSelectProps {
}

type ProductVariantSelectContext =
    Pick<Product3DSenceContext, 'selected3DObject'>;

class ProductVariantSelectComponent extends React.PureComponent<
    WithContextProps<ProductVariantSelectContext, ProductVariantSelectProps>
    > {
    public render() {
        const {
            selected3DObject
        } = this.props;

        if (!selected3DObject) {
            return null;
        }

        return (
            <React.Fragment>
                <ProductVariantDiameters />
                <ProductVariantHeights />
                <ProductVariantLengthinesss />
            </React.Fragment>
        );
    }
}

export const ProductVariantSelect = withContext<ProductVariantSelectContext, ProductVariantSelectProps>(
    'selected3DObject',
)(ProductVariantSelectComponent);