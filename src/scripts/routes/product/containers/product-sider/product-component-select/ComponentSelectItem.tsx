import { List } from 'antd';
import * as classNames from 'classnames';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import {
    getFurnitureComponentGroupById
} from '@/business/furniture-component-group';
import {
    getProductModuleCodes,
    getProductModulesComponentCodes
} from '@/business/product-modules';
import { Img } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { DomainContext, Product3DSenceContext, WithHistory } from '@/domain';
import {
    FurnitureComponent,
    FurnitureComponentGroup,
    ProductModule
} from '@/restful';
import { getNestedObjectId, replaceRoutePath } from '@/utilities';

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

        const nextProductModules: ProductModule[] = [];
        const currentItemComponentTypeId = getNestedObjectId(furnitureComponent.componentType);

        for (const productModule of selectedProduct!.modules) {
            const moduleComponentTypeId = getNestedObjectId(productModule.component.componentType);
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
                    materialPrice: 0
                });

                continue;
            }
            if (!nextComponentGroup) {
                nextProductModules.push(productModule);
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
                material: {
                    code: 999
                } as any,
                materialPrice: 0
            });
        }

        const nextModulesCode = getProductModuleCodes(nextProductModules);

        const nextProductUrl = replaceRoutePath(
            PRODUCT_URL,
            { modulesCode: nextModulesCode }
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

            const nextSelectedComponentGroupId =
                typeof furnitureComponent.componentGroup === 'string' ?
                    furnitureComponent.componentGroup :
                    furnitureComponent.componentGroup.id;

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
            <List.Item>
                <div
                    onClick={this.onComponentSelect}
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
    }
}