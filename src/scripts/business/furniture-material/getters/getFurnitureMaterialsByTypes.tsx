import {
    FurnitureMaterial,
    furnitureMaterialResources,
    FurnitureMaterialType,
    request
} from '@/restful';

export const getFurnitureMaterialsByTypes = async (
    furnitureMaterialTypes: FurnitureMaterialType[]
) => {
    const result = await request(furnitureMaterialResources.find, {
        type: 'query',
        parameter: nameof<FurnitureMaterial>(o => o.materialType) + '_in',
        value: furnitureMaterialTypes.map(o => o.id)
    });

    return result;
};
