import { Record, Resource, ResourceType } from 'react-restful';

import { ProductType } from './productType';
import { UploadedFile } from './uploadedFile';

export interface ProductTypeGroup {
    readonly id?: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productTypes: ProductType[];
}

export const productTypeGroupResourceType = new ResourceType<ProductTypeGroup>(nameof<ProductTypeGroup>());

export const productTypeGroupResources = {
    find: new Resource<ProductTypeGroup, ProductTypeGroup[]>({
        resourceType: productTypeGroupResourceType,
        url: '/producttypegroup',
    })
};