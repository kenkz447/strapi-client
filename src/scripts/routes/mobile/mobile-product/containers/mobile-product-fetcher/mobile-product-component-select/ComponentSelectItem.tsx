import * as classNames from 'classnames';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import {
    getFurnitureComponentGroupById
} from '@/business/furniture-component-group';
import { getFurntirureMaterialDefault } from '@/business/furniture-material';
import {
    getProductModuleCodes,
    getProductModulesComponentCodes
} from '@/business/product-modules';
import { Img } from '@/components';
import { getMobileUrl, PRODUCT_URL } from '@/configs';
import { DomainContext } from '@/domain';
import {
    FurnitureComponent,
    FurnitureComponentGroup,
    ProductModule
} from '@/restful';
import { getNestedObjectId, replaceRoutePath } from '@/utilities';

export const ComponentSelectItemWrapper = styled.div`
    overflow: hidden;
    cursor: pointer;
    width: 80px;
    height: 80px;
    margin: 4px;
    display: inline-block;
    border: 1px solid lightgray;
    &:hover {
        box-shadow: 0 0 0 2px rgba(213, 155, 1, 0.2);
    }
    &.selected {
        border-color: var(--primary-color);
        cursor: unset;
    }
    img {
        max-width: 100%;
    }
`;

interface ComponentSelectItemOwnProps {
    readonly currentProductModulesCode?: string;
    readonly furnitureComponent: FurnitureComponent;
    readonly isSelected: boolean;
    readonly currentIndex: number;
}

export class ComponentSelectItem extends React.PureComponent<ComponentSelectItemOwnProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    private readonly onComponentSelect = async () => {
        const {
            selectedFurnitureComponent,
            selectedProduct,
            history
        } = this.context;

        const {
            furnitureComponent,
            currentProductModulesCode,
        } = this.props;

        if (!currentProductModulesCode || !selectedFurnitureComponent) {
            return;
        }

        const nextComponentGroup = await this.getNextComponentGroup();
        const nextComponentGroupId = nextComponentGroup && nextComponentGroup.id;

        const nextProductModules: ProductModule[] = [];
        const currentItemComponentTypeId = getNestedObjectId(furnitureComponent.componentType);

        for (const productModule of selectedProduct!.modules) {
            const moduleComponent = productModule.component;
            const moduleMaterial = productModule.material;
            const moduleMaterialType = getNestedObjectId(moduleMaterial.materialType);
            const moduleComponentTypeId = getNestedObjectId(productModule.component.componentType);

            if (nextComponentGroupId !== getNestedObjectId(moduleComponent.componentGroup)) {
                // tslint:disable-next-line:no-shadowed-variable
                const nextComponent = nextComponentGroup!
                    .components.find(component => {
                        const selectedComponentTypeId = getNestedObjectId(component.componentType);
                        const isSameType = selectedComponentTypeId === moduleComponentTypeId;
                        return isSameType;
                    });

                if (!nextComponent) {
                    continue;
                }

                const moduleMaterialValid = nextComponent.materialTypes.find(o => o.id === moduleMaterialType);
                const nextMaterial = moduleMaterialValid
                    ? moduleMaterial
                    : getFurntirureMaterialDefault();

                nextProductModules.push({
                    component: nextComponent,
                    componentPrice: 0,
                    material: nextMaterial,
                    materialPrice: nextMaterial.price
                });

                continue;
            }

            if (moduleComponentTypeId !== currentItemComponentTypeId) {
                nextProductModules.push(productModule);
                continue;
            }

            if (productModule.component.code === furnitureComponent.code) {
                let material = productModule.material;

                nextProductModules.push({
                    component: furnitureComponent,
                    componentPrice: 0,
                    material: material,
                    materialPrice: material.price
                });

                continue;
            }

            if (!nextComponentGroup) {
                const moduleMaterialValid = furnitureComponent.materialTypes.find(o => o.id === moduleMaterialType);
                const nextMaterial = moduleMaterialValid
                    ? moduleMaterial
                    : getFurntirureMaterialDefault();

                nextProductModules.push({
                    ...productModule,
                    component: furnitureComponent,
                    material: nextMaterial,
                    materialPrice: nextMaterial.price
                });

                continue;
            }

            const isComponentAvailabled = furnitureComponent.id === productModule.component.id;

            if (isComponentAvailabled) {
                nextProductModules.push(productModule);
                continue;
            }

            const nextComponent = nextComponentGroup
                .components.find(component => {
                    const isSelectedComponent = (component.id === furnitureComponent.id);
                    if (!isSelectedComponent) {
                        return false;
                    }

                    const selectedComponentTypeId = getNestedObjectId(component.componentType);
                    const isSameType = selectedComponentTypeId === moduleComponentTypeId;

                    return isSameType;
                });

            if (!nextComponent) {
                continue;
            }

            nextProductModules.push({
                component: nextComponent,
                componentPrice: 0,
                material: getFurntirureMaterialDefault(),
                materialPrice: 0
            });
        }

        const nextModulesCode = getProductModuleCodes(nextProductModules);

        const nextProductUrl = replaceRoutePath(
            getMobileUrl(PRODUCT_URL),
            {
                modulesCode: nextModulesCode
            }
        );

        history.replace(nextProductUrl + location.search);
    }

    private readonly getNextComponentGroup = async () => {
        const { selectedFurnitureComponentGroup } = this.context;
        const { furnitureComponent } = this.props;

        let nextComponentGroup: FurnitureComponentGroup | null | undefined;

        if (furnitureComponent.componentGroup) {
            const currentSelectedComponentGroupId = selectedFurnitureComponentGroup &&
                selectedFurnitureComponentGroup.id;

            const nextSelectedComponentGroupId = getNestedObjectId(furnitureComponent.componentGroup);

            if (currentSelectedComponentGroupId !== nextSelectedComponentGroupId) {
                nextComponentGroup = await getFurnitureComponentGroupById(nextSelectedComponentGroupId);
            } else {
                nextComponentGroup = selectedFurnitureComponentGroup;
            }
        }

        if (!nextComponentGroup) {
            nextComponentGroup = undefined;
        }

        return nextComponentGroup;
    }

    componentDidUpdate() {
        const {
            setContext,
            selectedFurnitureComponentIndex,
            selectedFurnitureComponent
        } = this.context;

        const {
            currentProductModulesCode,
            furnitureComponent,
            currentIndex,

        } = this.props;

        if (!currentProductModulesCode) {
            return;
        }

        const componentCodes = getProductModulesComponentCodes(currentProductModulesCode);

        if (
            componentCodes.includes(furnitureComponent.code)
            && (selectedFurnitureComponent && selectedFurnitureComponent.id) !== furnitureComponent.id
        ) {
            setContext({
                selectedFurnitureComponent: furnitureComponent,
                selectedFurnitureComponentIndex: currentIndex
            });
            return;
        }

        if (
            componentCodes.includes(furnitureComponent.code)
            && selectedFurnitureComponentIndex !== currentIndex
        ) {
            setContext({
                selectedFurnitureComponentIndex: currentIndex
            });
            return;
        }
    }

    componentDidMount() {
        const { isSelected } = this.props;
        if (isSelected) {
            this.onComponentSelect();
        }
    }

    render() {
        const { furnitureComponent, isSelected } = this.props;
        return (
            <ComponentSelectItemWrapper
                onClick={this.onComponentSelect}
                className={classNames({ 'selected': isSelected })}
            >
                <Img file={furnitureComponent.thumbnail} />
            </ComponentSelectItemWrapper>
        );
    }
}