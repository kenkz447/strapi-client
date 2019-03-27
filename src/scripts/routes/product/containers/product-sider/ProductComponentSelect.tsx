import './ProductComponentSelect.scss';

import { List } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { isNumber } from 'util';

import { Product3DSenceContext } from '@/domain';
import { FurnitureComponent, FurnitureComponentGroup } from '@/restful';

import { RouteProductContext } from '../../RouteProductContext';
import { ComponentSelectItem } from './product-component-select';

interface ProductComponentSelectProps {

}

class ProductComponentSelectComponent extends React.PureComponent<
    WithContextProps<Product3DSenceContext, ProductComponentSelectProps>
    > {

    static readonly defaultProps = {
        selectedFurnitureComponentHeight: null,
        selectedFurnitureComponentDiameter: null,
        selectedFurnitureComponentLengthiness: null
    };

    private readonly getFilteredFurnitureComponents = () => {
        const {
            selectedFurnitureComponent,
            selectedFurnitureComponentType,
            availableFurnitureComponents,
            selectedFurnitureComponentHeight,
            selectedFurnitureComponentDiameter,
            selectedFurnitureComponentLengthiness
        } = this.props;

        if (
            !selectedFurnitureComponent ||
            !selectedFurnitureComponentType ||
            !availableFurnitureComponents
        ) {
            return [];
        }

        let filteredComponentByGroup = [...availableFurnitureComponents];
        const selectedFurnitureComponentGroup = selectedFurnitureComponent.componentGroup as FurnitureComponentGroup;
        if (
            !selectedFurnitureComponentType.isBase &&
            selectedFurnitureComponentGroup
        ) {
            filteredComponentByGroup = filteredComponentByGroup.filter(o =>
                o.componentGroup &&
                (o.componentGroup as FurnitureComponentGroup).id === selectedFurnitureComponentGroup.id
            );
        }

        if (selectedFurnitureComponentHeight) {
            const heightFiltered = filteredComponentByGroup.filter(o =>
                !o.height || o.height === selectedFurnitureComponentHeight
            );
            if (heightFiltered.length) {
                filteredComponentByGroup = heightFiltered;
            }
        }

        if (selectedFurnitureComponentDiameter) {
            const diameterFiltered = filteredComponentByGroup.filter(o =>
                !o.diameter || o.diameter === selectedFurnitureComponentDiameter
            );

            if (diameterFiltered.length) {
                filteredComponentByGroup = diameterFiltered;
            }
        }

        if (selectedFurnitureComponentLengthiness) {
            const diameterFiltered = filteredComponentByGroup.filter(o =>
                !o.lengthiness || o.lengthiness === selectedFurnitureComponentLengthiness
            );
            if (diameterFiltered.length) {
                filteredComponentByGroup = diameterFiltered;
            }
        }

        filteredComponentByGroup = filteredComponentByGroup.filter(o => {
            return o.componentGroup && o.componentGroup['disabled'] !== true;
        });

        return filteredComponentByGroup.sort((i1, i2) => (i1.variantIndex || 0) - (i2.variantIndex || 0));
    }

    private readonly isComponentSelected = (
        components: FurnitureComponent[]
    ): FurnitureComponent | undefined => {
        const {
            selectedFurnitureComponentIndex
        } = this.props;
        const next = components.find(o => location.pathname.includes(o.code));
        return next || components[selectedFurnitureComponentIndex || 0];
    }

    componentDidUpdate(prevProps: Product3DSenceContext) {
        const {
            selectedFurnitureComponentDiameter,
            selectedFurnitureComponentHeight,
            selectedFurnitureComponentLengthiness
        } = this.props;

        const diameterChanged = selectedFurnitureComponentDiameter !== prevProps.selectedFurnitureComponentDiameter;
        const heightChanged = selectedFurnitureComponentHeight !== prevProps.selectedFurnitureComponentHeight;
        const lengthinessChanged =
            selectedFurnitureComponentLengthiness !== prevProps.selectedFurnitureComponentLengthiness;

        if (diameterChanged || heightChanged || lengthinessChanged) {
            this.forceUpdate();
        }
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

        const nextSelectedFurnitureComponent = this.isComponentSelected(
            filteredFurnitureComponents
        );

        return (
            <List
                className={className}
                header="Components:"
                dataSource={filteredFurnitureComponents}
                grid={{ column: 4, gutter: 5 }}
                renderItem={(furnitureComponent: FurnitureComponent, index: number) => {
                    const isSelected = furnitureComponent === nextSelectedFurnitureComponent;

                    return (
                        <RouteProductContext.Consumer>
                            {({ currentModulesCode }) => (
                                <ComponentSelectItem
                                    key={furnitureComponent.id}
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
    'selectedFurnitureComponentLengthiness',
    'selectedFurnitureComponentIndex'
)(ProductComponentSelectComponent);