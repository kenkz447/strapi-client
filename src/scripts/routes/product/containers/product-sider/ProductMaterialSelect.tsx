import { List } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { Product3DSenceContext } from '@/domain';
import { FurnitureMaterial } from '@/restful';

import { RouteProductContext } from '../../RouteProductContext';
import { MaterialSelectItem } from './product-material-select';

interface ProductMaterialSelectProps {

}

class ProductMaterialSelectComponent extends React.Component<
    WithContextProps<Product3DSenceContext, ProductMaterialSelectProps>
    > {

    public render() {
        const {
            availableFurnitureMaterials,
            selectedFurnitureMaterial
        } = this.props;

        if (!selectedFurnitureMaterial) {
            return null;
        }

        return (
            <List
                className="product-component-select"
                header="Materials:"
                dataSource={availableFurnitureMaterials}
                grid={{ column: 4, gutter: 5 }}
                renderItem={(furnitureMaterial: FurnitureMaterial) => {
                    const isSelected = furnitureMaterial.id === selectedFurnitureMaterial.id;

                    return (
                        <RouteProductContext.Consumer key={furnitureMaterial.id}>
                            {({ currentModulesCode }) => (
                                <MaterialSelectItem
                                    currentProductModulesCode={currentModulesCode}
                                    furnitureMaterial={furnitureMaterial}
                                    isSelected={isSelected}
                                />
                            )}
                        </RouteProductContext.Consumer>
                    );
                }}
            />
        );
    }
}

export const ProductMaterialSelect = withContext<Product3DSenceContext>(
    'availableFurnitureMaterials',
    'selected3DObject',
    'selectedFurnitureMaterial',
    'selectedFurnitureMaterialType'
)(ProductMaterialSelectComponent);