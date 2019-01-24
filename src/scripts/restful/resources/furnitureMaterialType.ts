import { UploadFile } from 'antd/lib/upload/interface';
import { Record, Resource, ResourceType } from 'react-restful';

import { FurnitureMaterial } from './furnitureMaterial';

export interface FurnitureMaterialType extends Record {
    readonly id: string;
    readonly name: string;
    readonly materials?: FurnitureMaterial[];
    readonly view_normalMap: UploadFile;
    readonly view_shiny?: number;
    readonly hideInLibrary?: boolean;
}

export const furnitureMaterialTypeResourceType = new ResourceType<FurnitureMaterialType>(
    nameof<FurnitureMaterialType>()
);

export const furnitureMaterialTypeResources = {
    find: new Resource<FurnitureMaterialType, FurnitureMaterialType[]>({
        resourceType: furnitureMaterialTypeResourceType,
        url: '/materialtype',
        method: 'GET'
    })
};