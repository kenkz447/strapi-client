import { List } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';

import { getFurnitureMaterialByType } from '@/business/furniture-material';
import { DomainContext } from '@/domain';
import { MaterialCreateFormButton } from '@/forms/material';
import { text } from '@/i18n';
import { FurnitureMaterial, FurnitureMaterialType } from '@/restful';
import { RouteProductContext } from '@/routes/product/RouteProductContext';

import { MaterialSelectItem } from './mobile-product-material-select';
import {
    MobileProductComponentSelectWrapper
} from './MobileProductComponentSelect';

interface MobileProductMaterialSelectProps {

}

export class MobileProductMaterialSelect extends React.Component<MobileProductMaterialSelectProps> {
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
            <div className="mobile-product-component-list">
                {materials.map((furnitureMaterial: FurnitureMaterial, index: number) => {
                    const isSelected = furnitureMaterial.id === selectedFurnitureMaterial!.id;
                    return (
                        <RouteProductContext.Consumer key={index}>
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
                })}
            </div>
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
                                <MobileProductComponentSelectWrapper>
                                    <h4>{type.name}:</h4>
                                    {this.renderList(type)}
                                </MobileProductComponentSelectWrapper>
                            </div>
                        );
                    })
                }
                {
                    externalMaterialTypes.map(type => {
                        if (!type.materials) {
                            return null;
                        }

                        return (
                            <div key={type.id} style={{ marginBottom: 24 }}>
                                <MobileProductComponentSelectWrapper>
                                    <h4>{type.name}: </h4>
                                    {this.renderList(type)}
                                </MobileProductComponentSelectWrapper>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}