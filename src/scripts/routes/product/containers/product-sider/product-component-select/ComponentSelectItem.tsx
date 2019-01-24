import { List } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { RootContext } from '@/app';
import {
    getFurnitureComponentGroupById
} from '@/business/furniture-component-group';
import {
    getFurnitureMaterialTypeById
} from '@/business/furniture-material-type';
import { getProductModuleCodes } from '@/business/product-modules';
import { Img } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { Product3DSenceContext, WithHistory } from '@/domain';
import {
    FurnitureComponent,
    FurnitureComponentGroup,
    ProductModule
} from '@/restful';
import { replaceRoutePath } from '@/utilities';

interface ComponentSelectItemOwnProps {
    readonly currentProductModulesCode?: string;
    readonly furnitureComponent: FurnitureComponent;
    readonly isSelected: boolean;
    readonly currentIndex: number;
}

type ComponentSelectItemContext = WithHistory
    & Pick<Product3DSenceContext, 'selectedFurnitureComponent'>
    & Pick<Product3DSenceContext, 'selectedFurnitureComponentIndex'>
    & Pick<Product3DSenceContext, 'selectedFurnitureComponentGroup'>
    & Pick<Product3DSenceContext, 'selectedProduct'>;

type ComponentSelectItemProps = WithContextProps<ComponentSelectItemContext, ComponentSelectItemOwnProps>;

class ComponentSelectItemComponent extends React.Component<ComponentSelectItemProps> {
    private readonly onComponentSelect = async () => {
        const {
            furnitureComponent,
            currentProductModulesCode,
            selectedFurnitureComponent,
            selectedProduct,
            history
        } = this.props;

        if (!currentProductModulesCode || !selectedFurnitureComponent) {
            return;
        }

        const nextComponentGroup = await this.getNextComponentGroup();

        const nextProductModules: ProductModule[] = [];

        for (const productModule of selectedProduct!.modules) {
            if (productModule.component.code === selectedFurnitureComponent.code) {
                let material = productModule.material;

                nextProductModules.push({
                    component: furnitureComponent,
                    componentPrice: 0,
                    material: material,
                    materialPrice: 0
                });

                continue;
            }

            if (nextComponentGroup) {
                const isComponentAvailabled = !!nextComponentGroup
                    .components.find(o => o.id === productModule.component.id);

                if (isComponentAvailabled) {
                    nextProductModules.push(productModule);
                    continue;
                }

                const moduleComponentTypeId = typeof productModule.component.componentType === 'string' ?
                    productModule.component.componentType :
                    productModule.component.componentType.id;

                const nextComponent = nextComponentGroup
                    .components.find(o => {
                        if (typeof o.componentType === 'string') {
                            return o.componentType === moduleComponentTypeId;
                        }

                        return o.componentType.id === moduleComponentTypeId;
                    });

                if (!nextComponent) {
                    continue;
                }

                nextProductModules.push({
                    component: nextComponent,
                    componentPrice: 0,
                    material: productModule.material,
                    materialPrice: 0
                });
            } else {
                nextProductModules.push(productModule);
            }
        }

        const nextModulesCode = getProductModuleCodes(nextProductModules);

        const nextProductUrl = replaceRoutePath(
            PRODUCT_URL,
            { modulesCode: nextModulesCode }
        );

        history.replace(nextProductUrl + location.search);
    }

    private readonly getNextComponentGroup = async () => {
        const { selectedFurnitureComponentGroup, furnitureComponent } = this.props;

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

    componentDidUpdate(preveProps: ComponentSelectItemProps) {
        const {
            currentProductModulesCode,
            furnitureComponent,
            setContext,
            currentIndex,
            selectedFurnitureComponentIndex,
            selectedFurnitureComponent
        } = this.props;

        if (
            selectedFurnitureComponent!.id === furnitureComponent.id
            && selectedFurnitureComponentIndex !== currentIndex
        ) {
            setContext({
                selectedFurnitureComponentIndex: currentIndex
            });
        }

        if (
            !location.pathname.includes(furnitureComponent.code)
            && selectedFurnitureComponent!.id !== furnitureComponent.id
            && selectedFurnitureComponentIndex === currentIndex
        ) {
            this.onComponentSelect();
            return;
        }

        if (preveProps.currentProductModulesCode === currentProductModulesCode) {
            return;
        }

        if (
            !currentProductModulesCode ||
            currentProductModulesCode.indexOf(furnitureComponent.code) < 0
        ) {
            return;
        }

        setContext({
            selectedFurnitureComponent: furnitureComponent,
            selectedFurnitureComponentIndex: currentIndex
        });
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

export const ComponentSelectItem = withContext<ComponentSelectItemContext, ComponentSelectItemOwnProps>(
    'history',
    'selectedFurnitureComponent',
    'selectedFurnitureComponentGroup',
    'selectedProduct',
    'selectedFurnitureComponentIndex'
)(ComponentSelectItemComponent);