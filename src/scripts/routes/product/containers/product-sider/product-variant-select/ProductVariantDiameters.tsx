import { List, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { Product3DSenceContext } from '@/domain';

interface ProductVariantDiametersProps {
}

type ProductVariantDiametersContext =
    & Pick<Product3DSenceContext, 'selectedFurnitureComponentDiameter'>
    & Pick<Product3DSenceContext, 'availableFurnitureComponentDiameter'>
    & Pick<Product3DSenceContext, 'selectedFurnitureComponent'>;
class ProductVariantDiametersComponent extends React.PureComponent<
    WithContextProps<ProductVariantDiametersContext, ProductVariantDiametersProps>
    > {

    private readonly onVariantChange = (e: RadioChangeEvent) => {
        const { setContext } = this.props;
        setContext({
            selectedFurnitureComponentDiameter: e.target.value
        });
    }

    public render() {
        const {
            availableFurnitureComponentDiameter,
            selectedFurnitureComponentDiameter,
        } = this.props;

        if (!availableFurnitureComponentDiameter) {
            return null;
        }

        return (
            <List
                className="product-component-select"
                header="Variants:"
                grid={{ column: 3, gutter: 5 }}
                dataSource={availableFurnitureComponentDiameter}
                renderItem={(value) => {
                    return (
                        <List.Item key={value}>
                            <Radio
                                value={value}
                                checked={value === selectedFurnitureComponentDiameter}
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

export const ProductVariantDiameters = withContext<ProductVariantDiametersContext, ProductVariantDiametersProps>(
    'selectedFurnitureComponentDiameter',
    'availableFurnitureComponentDiameter'
)(ProductVariantDiametersComponent);