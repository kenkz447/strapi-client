import { Permission, permissions } from './permissions';

export interface Role {
    readonly key: string;
    readonly allowed: Permission[];
}

const admin: Role = {
    key: 'Administrator',
    allowed: [
        permissions.ALL
    ]
};

const authenticated: Role = {
    key: 'Authenticated',
    allowed: [
        permissions.PRODUCT,
        permissions.ORDER_LIST,
        permissions.NOTIFICATION
    ]
};

export const roles = [
    admin,
    authenticated
];