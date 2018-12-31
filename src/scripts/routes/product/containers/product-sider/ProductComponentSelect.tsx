import './ProductComponentSelect.scss';

import { List } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { Img } from '@/components';
import { Product3DSenceContext } from '@/domain';
import { FurnitureComponent } from '@/restful';

interface ProductComponentSelectProps {

}

class ProductComponentSelectComponent extends React.PureComponent<
    WithContextProps<Product3DSenceContext, ProductComponentSelectProps>
    > {
    render() {
        const {
            selectedFurnitureComponent,
            availableFurnitureComponents,
            setContext
        } = this.props;

        if (!selectedFurnitureComponent) {
            return null;
        }

        return (
            <List
                className="product-component-select"
                header="Components"
                dataSource={availableFurnitureComponents}
                grid={{ column: 4, gutter: 5 }}
                renderItem={(furnitureComponent: FurnitureComponent) => {
                    const isSelected = furnitureComponent.id === selectedFurnitureComponent.id;
                    return (
                        <List.Item>
                            <div
                                className={
                                    classNames(
                                        'product-component-select-item',
                                        'ant-select-selection',
                                        { 'selected': isSelected }
                                    )}
                            >
                                <Img file={furnitureComponent.thumbnail} />
                            </div>
                        </List.Item>
                    );
                }}
            />
        );
    }
}

export const ProductComponentSelect = withContext<Product3DSenceContext>(
    'availableFurnitureComponents',
    'selected3DObject',
    'selectedFurnitureComponent'
)(ProductComponentSelectComponent);