import { Record, Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { Agency } from './agency';
import { Role, roleSchema } from './role';

export interface User extends Record {
    readonly _id: string;
    readonly fullName?: string;
    readonly email: string;
    readonly role: Role;
    readonly username: string;
    readonly confirmed?: boolean;
    readonly agency?: Agency;
    readonly phone?: string;
    readonly createdAt?: string;
    readonly blocked?: boolean;

    readonly password?: string;
    readonly rePassword?: string;
}

export interface UserRegisterResponse {
    readonly jwt: string;
    readonly user: User;
}

export const userSchema = yup.object().shape<User>({
    _id: yup.string(),
    email: yup.string().email().required(),
    fullName : yup.string().required(),
    confirmed: yup.bool(),
    role: roleSchema.nullable(true).default(null),
    username: yup.string().required(),
    phone: yup.string().required()
});

export const userResourceType = new ResourceType<User>({
    name: nameof<User>(),
    keyProperty: '_id'
});

export const userResources = {
    find: new Resource<User, User[]>({
        resourceType: userResourceType,
        url: '/users'
    }),
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