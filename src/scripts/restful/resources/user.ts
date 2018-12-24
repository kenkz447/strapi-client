import { Record, Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { Role, roleSchema } from './role';

export interface User extends Record {
    readonly _id: string;
    readonly name?: string;
    readonly email: string;
    readonly role: Role;
    readonly username: string;
    readonly confirmed?: boolean;
}

export const userSchema = yup.object<User>().shape({
    _id: yup.string(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    confirmed: yup.bool(),
    role: roleSchema,
    username: yup.string().required()
});

export const userResourceType = new ResourceType<User>({
    name: nameof<User>(),
    keyProperty: '_id'
});

export const userResources = {
    me: new Resource<User>({
        resourceType: userResourceType,
        url: '/users/me'
    }),
    update: new Resource<User>({
        resourceType: userResourceType,
        url: '/users/:id',
        method: 'PUT'
    })
};