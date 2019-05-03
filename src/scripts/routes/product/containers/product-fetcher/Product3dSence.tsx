import { events } from 'qoobee';
import React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { isArray } from 'util';

import {
    getFurnitureComponentById,
    getFurnitureComponentsByType
} from '@/business/furniture-component';
import {
    getFurnitureComponentGroupById
} from '@/business/furniture-component-group';
import {
    getFurnitureMaterialByCode,
    getFurnitureMaterialsByTypes
} from '@/business/furniture-material';
import { getUploadedFileSrc } from '@/business/uploaded-file';
import { Product3DSenceContext } from '@/domain';
import {
    FurnitureComponentGroup,
    FurnitureComponentType,
    ProductModule,
    ProductType
} from '@/restful';
import { ThreeSence } from '@/routes/product/components';

import { CLEAR_3D_SENCE_SELECT_EVENT } from '../../RouteProductContext';

interface Product3dSenceProps {
    readonly productModules: ProductModule[];
    readonly productType: ProductType;
}

class Product3dSenceComponent extends React.PureComponent<
    WithContextProps<Product3DSenceContext, Product3dSenceProps>
    > {

    _threeSence = React.createRef<ThreeSence>();

    private readonly on3dComponentSelect = async (selected3DObject: THREE.Group | null) => {
        if (!selected3DObject) {
            events.emit(CLEAR_3D_SENCE_SELECT_EVENT);
            return;
        }

        const { setContext, productModules } = this.props;

        const selectedFurnitureComponent = await getFurnitureComponentById(selected3DObject.name);
        const selectedModule = productModules.find(o => o.component.id === selectedFurnitureComponent.id);

        if (!selectedModule) {
            return;
        }

        if (!selectedFurnitureComponent) {
            throw new Error('No FurnitureComponent found!');
        }

        const selectedFurnitureComponentType = selectedFurnitureComponent.componentType as FurnitureComponentType;

        const [selectedFurnitureComponentGroup, availableFurnitureComponents] = await
            Promise.all([
                getFurnitureComponentGroupById(selectedFurnitureComponent.componentGroup),
                getFurnitureComponentsByType(
                    selectedFurnitureComponent.componentType
                )
            ]);

        const object3DShape = selected3DObject.children[0] as THREE.Mesh;
        const object3DMaterial = isArray(object3DShape.material) ?
            object3DShape.material[0] as THREE.MeshPhongMaterial :
            object3DShape.material as THREE.MeshPhongMaterial;

        const nextSelectedFurnitureMaterialType = (selectedModule.material && selectedModule.material.materialType) ?
            selectedModule.material.materialType
            : selectedFurnitureComponent.materialTypes[0];
        
        const availableFurnitureMaterials =
            await getFurnitureMaterialsByTypes(selectedFurnitureComponent.materialTypes);

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

        const availableFurnitureComponentDiameter = selectedFurnitureComponent.diameter ?
            availableFurnitureComponents.reduce(
                (list, current) => {
                    if (current.diameter && !list.includes(current.diameter)) {
                        list.push(current.diameter! || selectedFurnitureComponent.diameter!);
                    }

                    return list;
                },
                [] as number[]
            ) :
            null;

        const availableFurnitureComponentHeight = selectedFurnitureComponent.height ?
            availableFurnitureComponents.reduce(
                (list, current) => {
                    if (current.height && !list.includes(current.height)) {
                        list.push(current.height! || selectedFurnitureComponent.height!);
                    }

                    return list;
                },
                [] as number[]
            ) :
            null;

        const availableFurnitureComponentLengthiness = selectedFurnitureComponent.lengthiness ?
            availableFurnitureComponents.reduce(
                (list, current) => {
                    if (current.lengthiness && !list.includes(current.lengthiness)) {
                        list.push(current.lengthiness! || selectedFurnitureComponent.lengthiness!);
                    }

                    return list;
                },
                [] as number[]
            ) :
            null;

        setContext({
            selected3DObject,

            selectedFurnitureComponent,
            selectedFurnitureMaterial,
            selectedFurnitureMaterialType: nextSelectedFurnitureMaterialType,
            selectedFurnitureComponentType,
            selectedFurnitureComponentGroup,

            availableFurnitureComponents,
            availableFurnitureMaterials,

            availableFurnitureComponentDiameter,
            availableFurnitureComponentHeight,
            availableFurnitureComponentLengthiness,

            selectedFurnitureComponentDiameter: selectedFurnitureComponent.diameter || null,
            selectedFurnitureComponentHeight: selectedFurnitureComponent.height || null,
            selectedFurnitureComponentLengthiness: selectedFurnitureComponent.lengthiness || null,
            selectedFurnitureComponentIndex: null
        });
    }

    public componentDidMount() {
        const { setContext } = this.props;

        setContext({
            takeProduct3DScreenshot: this._threeSence.current!.takeScreenshot
        });
    }

    public render() {
        const {
            productModules,
            productType,
            selected3DObject
        } = this.props;

        const componentGroup = productModules[0]
            && productModules[0].component
            && productModules[0].component.componentGroup as FurnitureComponentGroup;

        return (
            <ThreeSence
                ref={this._threeSence}
                productModules={productModules}
                productType={productType}
                componentGroup={componentGroup}
                onObjectSelect={this.on3dComponentSelect}
                selectedObject={selected3DObject}
            />
        );
    }
}

export const Product3dSence = withContext<Product3DSenceContext, Product3dSenceProps>(
    'selected3DObject',
)(Product3dSenceComponent);