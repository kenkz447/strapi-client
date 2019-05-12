import { FurnitureMaterial } from '@/restful';

export const getFurntirureMaterialDefault = (): FurnitureMaterial => {
    return {
        code: '999',
        id: '999',
        inStock: false
    // tslint:disable-next-line:no-any
    } as Partial<FurnitureMaterial> as any;
};