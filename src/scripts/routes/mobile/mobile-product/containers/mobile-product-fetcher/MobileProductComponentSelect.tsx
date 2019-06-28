import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { getProductModulesComponentCodes } from '@/business/product-modules';
import { Product3DSenceContext } from '@/domain';
import { text } from '@/i18n';
import { FurnitureComponent, FurnitureComponentGroup } from '@/restful';
import {
    RouteProductContext,
    RouteProductContextProps
} from '@/routes/product/RouteProductContext';

import { ComponentSelectItem } from './mobile-product-component-select';

export const MobileProductComponentSelectWrapper = styled.div`
    > * {
        padding-left: 24px;
    }
    
    .mobile-product-component-list {
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        
        ::-webkit-scrollbar {
            display: none;
        }
    }
`;

interface MobileProductComponentSelectProps {

}

class MobileProductComponentSelectComponent extends React.PureComponent<
    WithContextProps<Product3DSenceContext, MobileProductComponentSelectProps>
    > {

    public static readonly contextType = RouteProductContext;
    public readonly context!: RouteProductContextProps;

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
            if (!o.componentGroup) {
                return true;
            }

            // tslint:disable-next-line:no-string-literal
            return o.componentGroup['disabled'] !== true;
        });

        return filteredComponentByGroup.sort((i1, i2) => (i1.variantIndex || 0) - (i2.variantIndex || 0));
    }

    private readonly isComponentSelected = (
        components: FurnitureComponent[]
    ): FurnitureComponent | undefined => {
        const { currentModulesCode } = this.context;

        const {
            selectedFurnitureComponentIndex
        } = this.props;

        const currentComponentCodes = getProductModulesComponentCodes(currentModulesCode);

        const nextComponent = components.find(o => currentComponentCodes.includes(o.code));

        if (nextComponent) {
            return nextComponent;
        }

        const nextSelectComponentIndex = selectedFurnitureComponentIndex || 0;
        return components[nextSelectComponentIndex];
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

        if (isHidden) {
            return null;
        }

        const nextSelectedFurnitureComponent = this.isComponentSelected(
            filteredFurnitureComponents
        );

        return (
            <MobileProductComponentSelectWrapper>
                <h4>{text('Components')}: </h4>
                <div className="mobile-product-component-list">
                    {
                        filteredFurnitureComponents.map((furnitureComponent, index) => {
                            const isSelected = furnitureComponent === nextSelectedFurnitureComponent;
                            return (
                                <RouteProductContext.Consumer key={index}>
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
                        })
                    }
                </div>
            </MobileProductComponentSelectWrapper>
        );
    }
}

export const MobileProductComponentSelect = withContext<Product3DSenceContext>(
    'availableFurnitureComponents',
    'selected3DObject',
    'selectedFurnitureComponent',
    'selectedFurnitureComponentType',
    'selectedFurnitureComponentHeight',
    'selectedFurnitureComponentDiameter',
    'selectedFurnitureComponentLengthiness',
    'selectedFurnitureComponentIndex'
)(MobileProductComponentSelectComponent);