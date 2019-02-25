import { Record, Resource, ResourceType } from 'react-restful';

import { AgencyLevel } from './agencyLevel';
import { BusinessLicense } from './businessLicense';
import { City } from './city';
import { County } from './county';
import { User } from './user';

export interface Agency extends Record {
    readonly id?: string;
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly email: string;
    readonly level: AgencyLevel;
    readonly linkedUser: User;
    readonly city: City;
    readonly county: County;
    readonly createdAt: string;
    readonly businessLicense: BusinessLicense;
}

export const agencyResourceType = new ResourceType<Agency>(nameof<Agency>());

export const agencyResources = {
    find: new Resource<Agency, Agency[]>({
        resourceType: agencyResourceType,
        url: '/agency'
    }),
    findOne: new Resource<Agency>({
        resourceType: agencyResourceType,
        url: '/agency/:id'
    }),
    create: new Resource<Agency>({
        resourceType: agencyResourceType,
        url: '/agency',
        method: 'POST'
    }),
};