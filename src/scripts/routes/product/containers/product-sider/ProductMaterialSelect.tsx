import { List } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';

import { getFurnitureMaterialByType } from '@/business/furniture-material';
import { DomainContext } from '@/domain';
import { MaterialCreateFormButton } from '@/forms/material';
import { text } from '@/i18n';
import { FurnitureMaterial, FurnitureMaterialType } from '@/restful';

import { RouteProductContext } from '../../RouteProductContext';
import { MaterialSelectItem } from './product-material-select';

interface ProductMaterialSelectProps {

}

export class ProductMaterialSelect extends React.Component<ProductMaterialSelectProps> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<DomainContext>;

    private readonly fetchMaterials = async (materialType: FurnitureMaterialType) => {
        const { setContext } = this.context;
        const materials = await getFurnitureMaterialByType(materialType);

        setContext({
            availableFurnitureMaterials: materials,
            selectedFurnitureMaterialType: materialType
        });
    }

    public componentDidUpdate() {
        const {
            selectedFurnitureComponent,
            selectedFurnitureMaterialType
        } = this.context;

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

    private readonly renderList = (materialType: FurnitureMaterialType) => {
        const {
            availableFurnitureMaterials,
            selectedFurnitureMaterial,
        } = this.context;

        if (!availableFurnitureMaterials || !availableFurnitureMaterials.length) {
            return null;
        }

        const materials = availableFurnitureMaterials.filter(o => materialType.id === o.materialType.id);

        if (!materials.length) {
            return null;
        }

        return (
            <List
                className="product-component-select"
                dataSource={materials}
                grid={{ column: 4, gutter: 5 }}
                renderItem={(furnitureMaterial: FurnitureMaterial, index: number) => {
                    const isSelected = furnitureMaterial.id === selectedFurnitureMaterial!.id;

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

    public render() {
        const {
            availableFurnitureMaterials,
            selectedFurnitureMaterial,
            selectedFurnitureComponent,
            setContext
        } = this.context;

        if (!selectedFurnitureMaterial || !selectedFurnitureComponent) {
            return null;
        }

        const materialTypes = selectedFurnitureComponent.materialTypes;

        const internalMaterialTypes = materialTypes.filter(o => !o.isExternal);
        const externalMaterialTypes = materialTypes.filter(o => o.isExternal === true);

        return (
            <div>
                {
                   internalMaterialTypes.map(type => {
                        return (
                            <div key={type.id} style={{ marginBottom: 24 }}>
                                <h4>{type.name}:</h4>
                                {this.renderList(type)}
                            </div>
                        );
                    })
                }
                {
                    externalMaterialTypes.map(type => {
                        return (
                            <div key={type.id} style={{ marginBottom: 24 }}>
                                <h4>{type.name}: </h4>
                                {this.renderList(type)}
                                <div>
                                    <MaterialCreateFormButton
                                        icon="upload"
                                        type="default"
                                        onSuccess={(newMaterial) => {
                                            setContext({
                                                availableFurnitureMaterials: [
                                                    ...(availableFurnitureMaterials || []),
                                                    newMaterial
                                                ]
                                            });
                                        }}
                                        initialValues={{
                                            materialType: type
                                        }}
                                    >
                                        {text('Upload material')}
                                    </MaterialCreateFormButton>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}