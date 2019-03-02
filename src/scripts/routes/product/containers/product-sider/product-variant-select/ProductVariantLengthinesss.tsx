import { List, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { Product3DSenceContext } from '@/domain';

interface ProductVariantLengthinesssProps {
}

type ProductVariantLengthinesssContext =
    & Pick<Product3DSenceContext, 'selectedFurnitureComponentLengthiness'>
    & Pick<Product3DSenceContext, 'availableFurnitureComponentLengthiness'>;

class ProductVariantLengthinesssComponent extends React.PureComponent<
    WithContextProps<ProductVariantLengthinesssContext, ProductVariantLengthinesssProps>
    > {

    private readonly onVariantChange = (e: RadioChangeEvent) => {
        const { setContext } = this.props;
        setContext({
            selectedFurnitureComponentLengthiness: e.target.value
        });
    }

    public render() {
        const {
            availableFurnitureComponentLengthiness,
            selectedFurnitureComponentLengthiness,
        } = this.props;

        if (!availableFurnitureComponentLengthiness || availableFurnitureComponentLengthiness.length === 1) {
            return null;
        }

        return (
            <List
                className="product-component-select"
                header="Variants:"
                grid={{ column: 3, gutter: 5 }}
                dataSource={availableFurnitureComponentLengthiness}
                renderItem={(value) => {
                    return (
                        <List.Item key={value}>
                            <Radio
                                value={value}
                                checked={value === selectedFurnitureComponentLengthiness}
                                onChange={this.onVariantChange}
                            >
                                {value} mm
                            </Radio>
                        </List.Item>
                    );
                }}
            />
        );
    }
}

// tslint:disable-next-line:max-line-length
export const ProductVariantLengthinesss = withContext<ProductVariantLengthinesssContext, ProductVariantLengthinesssProps>(
    'selectedFurnitureComponentLengthiness',
    'availableFurnitureComponentLengthiness'
)(ProductVariantLengthinesssComponent);