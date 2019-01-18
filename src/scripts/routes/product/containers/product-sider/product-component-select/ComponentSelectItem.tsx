import { List } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { RootContext } from '@/app';
import { getProductModuleCodes } from '@/business/product-modules';
import { Img } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { Product3DSenceContext, WithHistory } from '@/domain';
import { FurnitureComponent, ProductModule } from '@/restful';
import { replaceRoutePath } from '@/utilities';

interface ComponentSelectItemOwnProps {
    readonly currentProductModulesCode?: string;
    readonly furnitureComponent: FurnitureComponent;
    readonly isSelected: boolean;
}

type ComponentSelectItemContext = WithHistory
    & Pick<Product3DSenceContext, 'selectedFurnitureComponent'>
    & Pick<Product3DSenceContext, 'selectedFurnitureComponentGroup'>
    & Pick<Product3DSenceContext, 'selectedProduct'>;

type ComponentSelectItemProps = WithContextProps<ComponentSelectItemContext, ComponentSelectItemOwnProps>;

class ComponentSelectItemComponent extends React.Component<ComponentSelectItemProps> {
    private readonly onComponentSelect = () => {
        const {
            furnitureComponent,
            currentProductModulesCode,
            selectedFurnitureComponent,
            selectedFurnitureComponentGroup,
            selectedProduct,
            history
        } = this.props;

        if (!currentProductModulesCode || !selectedFurnitureComponent) {
            return;
        }

        const nextProductModules: ProductModule[] = [];
        if (selectedProduct && selectedFurnitureComponentGroup) {
            for (const productModule of selectedProduct.modules) {

                if (productModule.component.code === selectedFurnitureComponent.code) {
                    nextProductModules.push({
                        component: furnitureComponent,
                        componentPrice: 0,
                        material: productModule.material,
                        materialPrice: 0
                    });

                    continue;
                }

                const isComponentAvaliabled = !!selectedFurnitureComponentGroup
                    .components.find(o => o.id === productModule.component.id);

                if (isComponentAvaliabled) {
                    nextProductModules.push(productModule);
                    continue;
                }

                const moduleComponentTypeId = typeof productModule.component.componentType === 'string' ?
                    productModule.component.componentType :
                    productModule.component.componentType.id;

                const nextComponent = selectedFurnitureComponentGroup
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
            }
        }

        const nextModulesCode = getProductModuleCodes(nextProductModules);

        const nextProductUrl = replaceRoutePath(
            PRODUCT_URL,
            { modulesCode: nextModulesCode }
        );

        history.replace(nextProductUrl + location.search);
    }

    componentDidUpdate(preveProps: ComponentSelectItemProps) {
        const {
            currentProductModulesCode,
            furnitureComponent,
            setContext
        } = this.props;

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
            selectedFurnitureComponent: furnitureComponent
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
    'selectedProduct'
)(ComponentSelectItemComponent);