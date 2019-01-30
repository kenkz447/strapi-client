import { Resource, ResourceType } from 'react-restful';

import { FurnitureComponent } from './furnitureComponent';

export interface FurnitureComponentGroup {
    readonly id: string;
    readonly name: string;
    readonly components: FurnitureComponent[];
    readonly productSize?: string;
    readonly packagingSize?: string;
    readonly weight?: number;
}

export const furnitureComponentGroupResourceType = new ResourceType<FurnitureComponentGroup>(
    nameof<FurnitureComponentGroup>()
);

export const furnitureComponentGroupResources = {
    findById: new Resource<FurnitureComponentGroup>({
        resourceType: furnitureComponentGroupResourceType,
        url: '/componentgroups/:id'
    })
};