import { Record, Resource, ResourceType } from 'react-restful';

import { ComponentGroup } from './componentGroup';
import { FurnitureComponentType } from './furnitureComponentType';
import { MaterialType } from './materialType';
import { ProductDesign } from './productDesign';
import { UploadedFile } from './uploadedFile';

export interface FurnitureComponent extends Record {
    readonly id: string;
    readonly name: string;
    readonly obj?: UploadedFile;
    readonly mtl?: UploadedFile;
    readonly thumbnail?: UploadedFile;
    readonly componentType: FurnitureComponentType;
    readonly materialTypes: MaterialType[];
    readonly quotaValue: number;
    readonly design: ProductDesign;
    readonly price: number;
    readonly fbx?: UploadedFile;
    readonly displayName: string;
    readonly code: string;
    readonly height?: number;
    readonly componentGroup?: ComponentGroup;
    readonly isDefault?: boolean;
    readonly noSelection?: boolean;
    readonly diameter?: number;
    readonly variantIndex?: number;
    readonly scale?: number;
    readonly lengthiness?: number;
}

export const furnitureComponentResourceType = new ResourceType<FurnitureComponent>(nameof<FurnitureComponent>());

export const furnitureComponentResources = {
    find: new Resource<FurnitureComponent, FurnitureComponent[]>({
        resourceType: furnitureComponentResourceType,
        url: '/components',
        method: 'GET'
    }),
    create: new Resource<FurnitureComponent>({
        resourceType: furnitureComponentResourceType,
        url: '/components',
        method: 'POST'
    }),
};