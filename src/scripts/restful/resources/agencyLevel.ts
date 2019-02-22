import { Record, Resource, ResourceType } from 'react-restful';

export interface AgencyLevel {
    readonly id: string;
    readonly name: string;
    readonly discountPercent: number;
}

export const agencyLevelResourceType = new ResourceType<AgencyLevel>(nameof<AgencyLevel>());

export const agencyLevelResources = {
    find: new Resource<AgencyLevel, AgencyLevel[]>({
        resourceType: agencyLevelResourceType,
        url: '/agencyLevel'
    })
};