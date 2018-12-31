import { UploadFile } from 'antd/lib/upload/interface';
import { Record, Resource, ResourceType } from 'react-restful';

import { FurnitureMaterial } from './furnutureMaterial';

export interface FurnitureMaterialType extends Record {
    readonly id: string;
    readonly name: string;
    readonly materials?: FurnitureMaterial[];
    readonly view_normalMap: UploadFile;
    readonly view_shiny?: number;
    readonly hideInLibrary?: boolean;
}

export const materialTypeResourceType = new ResourceType<FurnitureMaterialType>(
    nameof<FurnitureMaterialType>()
);

export const materialTypeResources = {
    find: new Resource<FurnitureMaterialType, FurnitureMaterialType[]>({
        resourceType: materialTypeResourceType,
        url: '/materialtype',
        method: 'GET'
    })
};