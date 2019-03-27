import { List, Select } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { getFurnitureMaterialByType } from '@/business/furniture-material';
import { Product3DSenceContext } from '@/domain';
import { FurnitureMaterial, FurnitureMaterialType } from '@/restful';

import { RouteProductContext } from '../../RouteProductContext';
import { MaterialSelectItem } from './product-material-select';

interface ProductMaterialSelectProps {

}

class ProductMaterialSelectComponent extends React.Component<
    WithContextProps<Product3DSenceContext, ProductMaterialSelectProps>
    > {

    private readonly fetchMaterials = async (materialType: FurnitureMaterialType) => {
        const { setContext } = this.props;
        const materials = await getFurnitureMaterialByType(materialType);

        setContext({
            availableFurnitureMaterials: materials,
            selectedFurnitureMaterialType: materialType
        });
    }

    private readonly onMaterialTypeChange = (materialTypeId: string) => {
        const {
            selectedFurnitureComponent
        } = this.props;
        
        if (!selectedFurnitureComponent) {
            return;
        }

        const nextMaterialType = selectedFurnitureComponent!.materialTypes.find(o => o.id === materialTypeId);
        if (!nextMaterialType) {
            return;
        }

        this.fetchMaterials(nextMaterialType);
    }

    public componentDidUpdate(prevProps: WithContextProps<Product3DSenceContext, ProductMaterialSelectProps>) {
        const {
            selectedFurnitureComponent,
            selectedFurnitureMaterialType
        } = this.props;

        if (!selectedFurnitureComponent) {
            return null;
        }

        const currentFurnitureMaterialTypeId = selectedFurnitureMaterialType &&
            selectedFurnitureMaterialType.id;

        let nextFurnitureMaterialType = selectedFurnitureComponent.materialTypes &&
            selectedFurnitureComponent!.materialTypes.find(o => o.id === currentFurnitureMaterialTypeId);

        if (!nextFurnitureMaterialType) {
            nextFurnitureMaterialType = selectedFurnitureComponent.materialTypes[0];
        }

        if (currentFurnitureMaterialTypeId === nextFurnitureMaterialType.id) {
            return;
        }

        this.fetchMaterials(nextFurnitureMaterialType);
    }

    public render() {
        const {
            availableFurnitureMaterials,
            selectedFurnitureMaterial,
            selectedFurnitureMaterialType,
            selectedFurnitureComponent
        } = this.props;

        if (!selectedFurnitureMaterial) {
            return null;
        }

        return (
            <List
                className="product-component-select"
                header={
                    <div className="display-flex">
                        <div className="flex-grow-1">Materials:</div>
                        {
                            (
                                selectedFurnitureComponent!.materialTypes
                                && selectedFurnitureComponent!.materialTypes.length > 1
                            ) && (
                                <Select
                                    value={selectedFurnitureMaterialType!.id}
                                    onChange={this.onMaterialTypeChange}
                                >
                                    {
                                        selectedFurnitureComponent!.materialTypes.map((m) => {
                                            return (
                                                <Select.Option key={m.id} value={m.id}>
                                                    {m.name}
                                                </Select.Option>
                                            );
                                        })
                                    }
                                </Select>
                            )}
                    </div>
                }
                dataSource={availableFurnitureMaterials}
                grid={{ column: 4, gutter: 5 }}
                renderItem={(furnitureMaterial: FurnitureMaterial, index: number) => {
                    const isSelected = furnitureMaterial.id === selectedFurnitureMaterial.id;

                    return (
                        <RouteProductContext.Consumer>
                            {({ currentModulesCode }) => (
                                <MaterialSelectItem
                                    key={furnitureMaterial.id}
                                    currentProductModulesCode={currentModulesCode}
                                    furnitureMaterial={furnitureMaterial}
                                    isSelected={isSelected}
                                    index={index}
                                />
                            )}
                        </RouteProductContext.Consumer>
                    );
                }}
            />
        );
    }
}

export const ProductMaterialSelect = withContext<Product3DSenceContext>(
    'availableFurnitureMaterials',
    'selected3DObject',
    'selectedFurnitureMaterial',
    'selectedFurnitureMaterialType',
    'selectedFurnitureComponent'
)(ProductMaterialSelectComponent);