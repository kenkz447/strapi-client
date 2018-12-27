import { Record, Resource, ResourceType } from 'react-restful';

import { MaterialType } from './materialType';
import { UploadedFile } from './uploadedFile';

export interface FurnitureMaterial {
    readonly id: string;
    readonly name: string;
    readonly texture: UploadedFile;
    readonly materialType: MaterialType;
    readonly price: number;
    readonly inStock: boolean;
    readonly code: string;
    readonly description?: string;
    readonly view_normalMap?: UploadedFile;
    readonly isDefault?: boolean;
    readonly displayName?: string;
    readonly hideInLibrary?: boolean;
}

export const furnitureMaterialResouceType = new ResourceType<FurnitureMaterial>(nameof<FurnitureMaterial>());

export const furnitureMaterialResources = {
    find: new Resource<FurnitureMaterial, FurnitureMaterial[]>({
        resourceType: furnitureMaterialResouceType,
        url: '/material'
    })
};