import {
    furnitureComponentResources,
    furnitureComponentResourceType,
    request,
    restfulStore
} from '@/restful';

export const getFurnitureComponentByCodeProps = async (code: string) => {
    const component = restfulStore.findOneRecord(
        furnitureComponentResourceType,
        (o) => o.code === code
    );

    if (component) {
        return component;
    }
    const result = await request(furnitureComponentResources.find, {
        type: 'query',
        parameter: 'code',
        value: code
    });

    return result[0] || null;
};
