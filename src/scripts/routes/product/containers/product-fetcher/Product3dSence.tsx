import React from 'react';
import { WithContextProps } from 'react-context-service';
import { isArray } from 'util';

import { RootContext } from '@/app';
import {
    getFurnitureComponentById,
    getFurnitureComponentsByType
} from '@/business/furniture-component';
import { getFurnitureMaterialByType } from '@/business/furniture-material';
import { getUploadedFileSrc } from '@/business/uploaded-file';
import { Product3DSenceContext } from '@/domain';
import { ProductModule, ProductType } from '@/restful';
import { ThreeSence } from '@/routes/product/components';

interface Product3dSenceProps {
    readonly productModules: ProductModule[];
    readonly productType: ProductType;
}

export class Product3dSence extends React.PureComponent<Product3dSenceProps> {
    static readonly contextType = RootContext;
    readonly context!: WithContextProps<Product3DSenceContext>;

    public readonly on3dComponentSelect = async (object3D: THREE.Group | null) => {
        const { setContext } = this.context;

        if (!object3D) {
            setContext({
                selected3DObject: null,
                selectedFurnitureComponent: null,
                selectedFurnitureMaterial: null,
                selectedFurnitureMaterialType: null,
                availableFurnitureComponents: null,
                availableFurnitureMaterials: null
            });
            return;
        }

        const selectedFurnitureComponent = await getFurnitureComponentById(object3D.name);
        if (!selectedFurnitureComponent) {
            throw new Error('No FurnitureComponent found!');
        }

        const availableFurnitureComponents = await getFurnitureComponentsByType(
            selectedFurnitureComponent.componentType
        );

        const object3DShape = object3D.children[0] as THREE.Mesh;
        const object3DMaterial = isArray(object3DShape.material) ?
            object3DShape.material[0] as THREE.MeshPhongMaterial :
            object3DShape.material as THREE.MeshPhongMaterial;

        const selectedFurnitureMaterialType = selectedFurnitureComponent.materialTypes[0];
        const availableFurnitureMaterials = await getFurnitureMaterialByType(selectedFurnitureMaterialType);

        const selectedFurnitureMaterial = availableFurnitureMaterials.find(o => {
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

        setContext({
            selected3DObject: object3DShape,
            selectedFurnitureComponent,
            selectedFurnitureMaterial,
            selectedFurnitureMaterialType,
            availableFurnitureComponents,
            availableFurnitureMaterials
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