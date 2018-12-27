import { UploadFile } from 'antd/lib/upload/interface';
import { Record, Resource, ResourceType } from 'react-restful';

import { FurnitureMaterial } from './furnutureMaterial';

export interface MaterialType extends Record {
    readonly id: string;
    readonly name: string;
    readonly materials?: FurnitureMaterial[];
    readonly view_normalMap: UploadFile;
    readonly view_shiny?: number;
    readonly hideInLibrary?: boolean;
}

export const materialTypeResourceType = new ResourceType<MaterialType>(
    nameof<MaterialType>()
);

export const materialTypeResources = {
    find: new Resource<MaterialType, MaterialType[]>({
        resourceType: materialTypeResourceType,
        url: '/materialtype',
        method: 'GET'
    })
};