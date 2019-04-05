import { Resource, ResourceType } from 'react-restful';

import { getDefaultParams, getDefaultParamsForUpdate } from '../base';
import { User } from './user';

export interface Invitation {
    readonly id?: string;
    readonly code: string;
    readonly expirationDate: string;
    readonly created_by: User;
    readonly receiverFullName: string;
    readonly receiverAgencyName?: string;
    readonly joinedDate?: string;
    readonly createdAt: string;
}

export const invitationResourceType = new ResourceType<Invitation>(nameof<Invitation>());

export const invitationResources = {
    find: new Resource<Invitation, Invitation[]>({
        resourceType: invitationResourceType,
        url: '/invitations',
        getDefaultParams: getDefaultParams
    }),
    findOne: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations/:id'
    }),
    create: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations',
        method: 'POST'
    }),
    update: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    delete: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations/:id',
        method: 'DELETE'
    }),
};