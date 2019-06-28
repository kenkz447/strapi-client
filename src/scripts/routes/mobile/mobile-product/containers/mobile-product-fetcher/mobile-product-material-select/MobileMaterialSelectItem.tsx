import { Icon, List, Tooltip } from 'antd';
import * as classNames from 'classnames';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { getProductModulesMaterialCodes } from '@/business/product-modules';
import { Img } from '@/components';
import { getMobileUrl, PRODUCT_URL } from '@/configs';
import {
    DomainContext,
    Product3DSenceContext,
    WithDomainContext,
    WithHistory
} from '@/domain';
import { FurnitureMaterial } from '@/restful';
import { MaterialDetails } from '@/routes/product/components/MaterialDetails';
import { replaceRoutePath } from '@/utilities';

import { ComponentSelectItemWrapper } from '../mobile-product-component-select';

interface MaterialSelectItemOwnProps {
    readonly currentProductModulesCode?: string;
    readonly furnitureMaterial: FurnitureMaterial;
    readonly isSelected?: boolean;
    readonly index: number;
}

type MaterialSelectItemContext =
    & Pick<Product3DSenceContext, 'selectedFurnitureMaterial'>
    & Pick<Product3DSenceContext, 'selectedFurnitureComponent'>
    & Pick<Product3DSenceContext, 'selectedFurnitureMaterialType'>;

type MaterialSelectItemProps = WithContextProps<MaterialSelectItemContext, MaterialSelectItemOwnProps>;

class MaterialSelectItemMaterial extends React.Component<MaterialSelectItemProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext<DomainContext>;

    private readonly onMaterialSelect = () => {
        const { history } = this.context;

        const {
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

        const nextProductUrl = replaceRoutePath(
            getMobileUrl(PRODUCT_URL),
            { modulesCode: nextModulesCode }
        );

        history.replace(nextProductUrl + location.search);
    }

    public componentDidUpdate(preveProps: MaterialSelectItemProps) {
        const {
            selectedFurnitureComponent,
            currentProductModulesCode,
            furnitureMaterial,
            setContext
        } = this.props;

        if (!selectedFurnitureComponent || !currentProductModulesCode) {
            return;
        }

        if (
            selectedFurnitureComponent.id !== preveProps.selectedFurnitureComponent!.id &&
            preveProps.currentProductModulesCode!
                .indexOf(preveProps.selectedFurnitureComponent!.code + '-' + furnitureMaterial.code) >= 0
        ) {
            setContext({
                selectedFurnitureMaterial: furnitureMaterial
            });

            return;
        }
    }

    public componentDidMount() {
        const {
            selectedFurnitureMaterial,
            selectedFurnitureComponent,
            selectedFurnitureMaterialType,
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

        const currentFurnitureMaterialTypeId = currentFurnitureMaterialType && currentFurnitureMaterialType.id;

        if (currentFurnitureMaterialTypeId !== selectedFurnitureMaterial.materialType.id) {
            if (index === 0) {
                this.onMaterialSelect();
                return;
            }
        }
    }

    public render() {
        const { furnitureMaterial, isSelected } = this.props;

        const thumbailFile = furnitureMaterial.thumbnail || furnitureMaterial.texture;

        return (

            <ComponentSelectItemWrapper
                onClick={this.onMaterialSelect}
                className={
                    classNames({ 'selected': isSelected })}
            >
                <Img file={thumbailFile} size="img256x256" />
            </ComponentSelectItemWrapper>
        );
    }
}

export const MaterialSelectItem = withContext<MaterialSelectItemContext, MaterialSelectItemOwnProps>(
    'selectedFurnitureMaterial',
    'selectedFurnitureComponent',
    'selectedFurnitureMaterialType'
)(MaterialSelectItemMaterial);