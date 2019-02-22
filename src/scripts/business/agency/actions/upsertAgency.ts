import { request } from '@/restful';
import { Agency, agencyResources } from '@/restful';

export const upsertAgency = (agency: Partial<Agency>) => {

    return request(
        agencyResources.create,
        {
            type: 'body',
            value: agency
        }
    );
};