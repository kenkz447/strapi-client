import './ProductComponentSelect.scss';

import { List } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { Product3DSenceContext } from '@/domain';
import { FurnitureComponent } from '@/restful';

import { RouteProductContext } from '../../RouteProductContext';
import { ComponentSelectItem } from './product-component-select';

interface ProductComponentSelectProps {

}

class ProductComponentSelectComponent extends React.PureComponent<
    WithContextProps<Product3DSenceContext, ProductComponentSelectProps>
    > {

    private readonly getFilteredFurnitureComponents = () => {
        const {
            selectedFurnitureComponent,
            selectedFurnitureComponentType,
            availableFurnitureComponents,
            selectedFurnitureComponentHeight,
            selectedFurnitureComponentDiameter,
            selectedFurnitureComponentLengthiness: selectedFurnitureComponentLengthinesss
        } = this.props;

        if (
            !selectedFurnitureComponent ||
            !selectedFurnitureComponentType ||
            !availableFurnitureComponents
        ) {
            return [];
        }

        let filteredComponentByGroup = [...availableFurnitureComponents];
        const selectedFurnitureComponentGroup = selectedFurnitureComponent.componentGroup;
        if (
            !selectedFurnitureComponentType.isBase &&
            selectedFurnitureComponentGroup
        ) {
            filteredComponentByGroup = filteredComponentByGroup.filter(o =>
                o.componentGroup && o.componentGroup.id === selectedFurnitureComponentGroup.id
            );
        }

        if (selectedFurnitureComponentHeight) {
            const heightFiltered = filteredComponentByGroup.filter(o => o.height === selectedFurnitureComponentHeight);
            if (heightFiltered.length) {
                filteredComponentByGroup = heightFiltered;
            }
        }

        if (selectedFurnitureComponentDiameter) {
            const diameterFiltered = filteredComponentByGroup.filter(o =>
                o.diameter === selectedFurnitureComponentDiameter
            );

            if (diameterFiltered.length) {
                filteredComponentByGroup = diameterFiltered;
            }
        }

        if (selectedFurnitureComponentLengthinesss) {
            const diameterFiltered = filteredComponentByGroup.filter(o =>
                o.lengthiness === selectedFurnitureComponentLengthinesss
            );
            if (diameterFiltered.length) {
                filteredComponentByGroup = diameterFiltered;
            }
        }

        return filteredComponentByGroup.sort((i1, i2) => (i1.variantIndex || 0) - (i2.variantIndex || 0));
    }

    render() {
        const {
            selectedFurnitureComponent
        } = this.props;

        if (!selectedFurnitureComponent) {
            return null;
        }

        const filteredFurnitureComponents = this.getFilteredFurnitureComponents();
        const isHidden = filteredFurnitureComponents.length === 1;

        const className = 'product-component-select ' + (isHidden ? 'display-none' : '');
        return (
            <List
                className={className}
                header="Components:"
                dataSource={filteredFurnitureComponents}
                grid={{ column: 4, gutter: 5 }}
                renderItem={(furnitureComponent: FurnitureComponent, index: number) => {
                    const isSelected = furnitureComponent.id === selectedFurnitureComponent.id;
                    return (
                        <RouteProductContext.Consumer key={furnitureComponent.id}>
                            {({ currentModulesCode }) => (
                                <ComponentSelectItem
                                    currentProductModulesCode={currentModulesCode}
                                    furnitureComponent={furnitureComponent}
                                    isSelected={isSelected}
                                    currentIndex={index}
                                />
                            )}
                        </RouteProductContext.Consumer>
                    );
                }}
            />
        );
    }
}

export const ProductComponentSelect = withContext<Product3DSenceContext>(
    'availableFurnitureComponents',
    'selected3DObject',
    'selectedFurnitureComponent',
    'selectedFurnitureComponentType',
    'selectedFurnitureComponentHeight',
    'selectedFurnitureComponentDiameter',
    'selectedFurnitureComponentLengthiness'
)(ProductComponentSelectComponent);