import { List } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { RootContext } from '@/app';
import { Img } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { Product3DSenceContext, WithHistory } from '@/domain';
import { FurnitureComponent } from '@/restful';
import { replaceRoutePath } from '@/utilities';

interface ComponentSelectItemOwnProps {
    readonly currentProductModulesCode?: string;
    readonly furnitureComponent: FurnitureComponent;
    readonly isSelected: boolean;
}

type ComponentSelectItemContext = WithHistory & Pick<Product3DSenceContext, 'selectedFurnitureComponent'>;

type ComponentSelectItemProps = WithContextProps<ComponentSelectItemContext, ComponentSelectItemOwnProps>;

class ComponentSelectItemComponent extends React.Component<ComponentSelectItemProps> {
    private readonly onComponentSelect = () => {
        const {
            furnitureComponent,
            currentProductModulesCode,
            history,
            selectedFurnitureComponent
        } = this.props;

        if (!currentProductModulesCode || !selectedFurnitureComponent) {
            return;
        }

        const nextModulesCode = currentProductModulesCode.replace(
            selectedFurnitureComponent.code,
            furnitureComponent.code
        );

        const nextProductUrl = replaceRoutePath(PRODUCT_URL, { modulesCode: nextModulesCode });

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
    'selectedFurnitureComponent'
)(ComponentSelectItemComponent);