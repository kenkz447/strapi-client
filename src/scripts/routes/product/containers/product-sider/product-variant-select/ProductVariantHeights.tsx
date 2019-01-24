import { List, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { Product3DSenceContext } from '@/domain';

interface ProductVariantHeightsProps {
}

type ProductVariantHeightsContext =
    & Pick<Product3DSenceContext, 'selectedFurnitureComponentHeight'>
    & Pick<Product3DSenceContext, 'availableFurnitureComponentHeight'>;

class ProductVariantHeightsComponent extends React.PureComponent<
    WithContextProps<ProductVariantHeightsContext, ProductVariantHeightsProps>
    > {

    private readonly onVariantChange = (e: RadioChangeEvent) => {
        const { setContext } = this.props;
        setContext({
            selectedFurnitureComponentHeight: e.target.value
        });
    }

    public render() {
        const {
            availableFurnitureComponentHeight,
            selectedFurnitureComponentHeight,
        } = this.props;

        if (!availableFurnitureComponentHeight) {
            return null;
        }

        return (
            <List
                className="product-component-select"
                header="Variants:"
                grid={{ column: 3, gutter: 5 }}
                dataSource={availableFurnitureComponentHeight}
                renderItem={(value) => {
                    return (
                        <List.Item key={value}>
                            <Radio
                                value={value}
                                checked={value === selectedFurnitureComponentHeight}
                                onChange={this.onVariantChange}
                            >
                                {value}
                            </Radio>
                        </List.Item>
                    );
                }}
            />
        );
    }
}

export const ProductVariantHeights = withContext<ProductVariantHeightsContext, ProductVariantHeightsProps>(
    'selectedFurnitureComponentHeight',
    'availableFurnitureComponentHeight'
)(ProductVariantHeightsComponent);