import { List } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { Img } from '@/components';
import { PRODUCT_URL } from '@/configs';
import { Product3DSenceContext, WithHistory } from '@/domain';
import { FurnitureMaterial } from '@/restful';
import { replaceRoutePath } from '@/utilities';

interface MaterialSelectItemOwnProps {
    readonly currentProductModulesCode?: string;
    readonly furnitureMaterial: FurnitureMaterial;
    readonly isSelected?: boolean;
    readonly index: number;
}

type MaterialSelectItemContext =
    WithHistory
    & Pick<Product3DSenceContext, 'selectedFurnitureMaterial'>
    & Pick<Product3DSenceContext, 'selectedFurnitureComponent'>
    & Pick<Product3DSenceContext, 'selectedFurnitureMaterialType'>;

type MaterialSelectItemProps = WithContextProps<MaterialSelectItemContext, MaterialSelectItemOwnProps>;

class MaterialSelectItemMaterial extends React.Component<MaterialSelectItemProps> {
    private readonly onMaterialSelect = () => {
        const {
            history,
            furnitureMaterial,
            currentProductModulesCode,
            selectedFurnitureMaterial,
            selectedFurnitureComponent
        } = this.props;

        if (!currentProductModulesCode || !selectedFurnitureMaterial) {
            return;
        }

        const oldCode = selectedFurnitureComponent!.code + '-' + selectedFurnitureMaterial!.code;
        const newCode = selectedFurnitureComponent!.code + '-' + furnitureMaterial.code;

        const nextModulesCode = currentProductModulesCode.replace(oldCode, newCode);

        const nextProductUrl = replaceRoutePath(PRODUCT_URL, { modulesCode: nextModulesCode });

        history.replace(nextProductUrl + location.search);
    }

    componentDidUpdate(preveProps: MaterialSelectItemProps) {
        const {
            selectedFurnitureMaterial,
            selectedFurnitureComponent,
            currentProductModulesCode,
            furnitureMaterial,
            setContext,
            index
        } = this.props;

        if (!selectedFurnitureComponent
            || !currentProductModulesCode
        ) {
            return;
        }

        if (
            selectedFurnitureComponent.id !== preveProps.selectedFurnitureComponent!.id &&
            preveProps.currentProductModulesCode!.indexOf(preveProps.selectedFurnitureComponent!.code + '-' + furnitureMaterial.code) >= 0
        ) {
            setContext({
                selectedFurnitureMaterial: furnitureMaterial
            });

            return;
        }
    }

    componentDidMount() {
        const {
            selectedFurnitureMaterial,
            selectedFurnitureComponent,
            currentProductModulesCode,
            selectedFurnitureMaterialType,
            furnitureMaterial,
            setContext,
            index
        } = this.props;

        if (!selectedFurnitureComponent || !selectedFurnitureMaterialType) {
            return null;
        }
        
        if (!selectedFurnitureMaterial || !selectedFurnitureMaterial.materialType) {
            return;
        }

        const currentFurnitureMaterialType = selectedFurnitureComponent.materialTypes
            ? selectedFurnitureComponent.materialTypes.find(o => o.id === selectedFurnitureMaterialType.id)
            : selectedFurnitureComponent.materialTypes[0];

        const currentFurnitureMaterialTypeId = currentFurnitureMaterialType!.id;


        if (currentFurnitureMaterialTypeId !== selectedFurnitureMaterial.materialType.id) {
            if (index === 0) {
                this.onMaterialSelect();
                return;
            }
        }
    }

    render() {
        const { furnitureMaterial, isSelected } = this.props;
        return (
            <List.Item>
                <div
                    onClick={this.onMaterialSelect}
                    className={
                        classNames(
                            'product-component-select-item',
                            'ant-select-selection',
                            { 'selected': isSelected }
                        )}
                >
                    <Img file={furnitureMaterial.texture} size="img256x256" />
                </div>
            </List.Item>
        );
    }
}

export const MaterialSelectItem = withContext<MaterialSelectItemContext, MaterialSelectItemOwnProps>(
    'history',
    'selectedFurnitureMaterial',
    'selectedFurnitureComponent',
    'selectedFurnitureMaterialType'
)(MaterialSelectItemMaterial);