import {
    FurnitureMaterial,
    furnitureMaterialResources,
    furnitureMaterialResourceType,
    FurnitureMaterialType,
    isRecordEqual,
    request,
    restfulStore
} from '@/restful';

export const getFurnitureMaterialByType = async (furnitureMaterialType: FurnitureMaterialType | string) => {
    const furnitureMaterials = restfulStore.findManyRecords(
        furnitureMaterialResourceType,
        (o) => isRecordEqual(o.materialType, furnitureMaterialType)
    );

    if (furnitureMaterials && furnitureMaterials.length) {
        return furnitureMaterials;
    }

    const result = await request(furnitureMaterialResources.find, {
        type: 'query',
        parameter: nameof<FurnitureMaterial>(o => o.materialType),
        value: typeof furnitureMaterialType === 'string' ?
            furnitureMaterialType :
            furnitureMaterialType.id
    });

    return result;
};
