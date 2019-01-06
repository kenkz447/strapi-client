import React from 'react';
import { WithContextProps } from 'react-context-service';
import { isArray } from 'util';

import { eventEmitter, RootContext } from '@/app';
import {
    getFurnitureComponentById,
    getFurnitureComponentsByType
} from '@/business/furniture-component';
import {
    getFurnitureMaterialByCode,
    getFurnitureMaterialByType,
    getFurnitureMaterialDefault
} from '@/business/furniture-material';
import { getUploadedFileSrc } from '@/business/uploaded-file';
import { Product3DSenceContext } from '@/domain';
import { FurnitureComponentType, ProductModule, ProductType } from '@/restful';
import { ThreeSence } from '@/routes/product/components';

import { CLEAR_3D_SENCE_CONTEXT_EVENT } from '../../RouteProductContext';

interface Product3dSenceProps {
    readonly productModules: ProductModule[];
    readonly productType: ProductType;
}

export class Product3dSence extends React.PureComponent<Product3dSenceProps> {
    static readonly contextType = RootContext;
    readonly context!: WithContextProps<Product3DSenceContext>;

    private readonly on3dComponentSelect = async (object3D: THREE.Group | null) => {
        if (!object3D) {
            eventEmitter.emit(CLEAR_3D_SENCE_CONTEXT_EVENT);
            return;
        }

        const selectedFurnitureComponent = await getFurnitureComponentById(object3D.name);
        if (!selectedFurnitureComponent) {
            throw new Error('No FurnitureComponent found!');
        }
        const selectedFurnitureComponentType = selectedFurnitureComponent.componentType as FurnitureComponentType;

        const availableFurnitureComponents = await getFurnitureComponentsByType(
            selectedFurnitureComponent.componentType
        );

        const object3DShape = object3D.children[0] as THREE.Mesh;
        const object3DMaterial = isArray(object3DShape.material) ?
            object3DShape.material[0] as THREE.MeshPhongMaterial :
            object3DShape.material as THREE.MeshPhongMaterial;

        const selectedFurnitureMaterialType = selectedFurnitureComponent.materialTypes[0];
        const availableFurnitureMaterials = await getFurnitureMaterialByType(selectedFurnitureMaterialType);

        let selectedFurnitureMaterial = availableFurnitureMaterials.find(o => {
            if (
                !object3DMaterial ||
                !object3DMaterial.map
            ) {
                return false;
            }

            const materialTextureSrc = getUploadedFileSrc({ uploadedFile: o.texture });
            const object3DTextureSrc = object3DMaterial.map.image.src;

            return materialTextureSrc === object3DTextureSrc;
        });

        if (!selectedFurnitureMaterial) {
            selectedFurnitureMaterial = await getFurnitureMaterialByCode('999');
        }

        const { setContext } = this.context;

        setContext({
            selectedFurnitureComponent,
            selectedFurnitureMaterial,
            selectedFurnitureMaterialType,
            availableFurnitureComponents,
            availableFurnitureMaterials,
            selectedFurnitureComponentType
        });
    }

    render() {
        const { productModules, productType } = this.props;

        return (
            <ThreeSence
                productModules={productModules}
                productType={productType}
                onObjectSelect={this.on3dComponentSelect}
            />
        );
    }
}