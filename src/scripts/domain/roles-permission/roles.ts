import { Role } from 'qoobee';

import { permissions } from './permissions';

const admin: Role = {
    key: 'Administrator',
    allowed: [
        permissions.ALL
    ],
    denied: [
        permissions.FUNC_ORDER_TRANSACTION_CREATE
    ]
};

const authenticated: Role = {
    key: 'Authenticated',
    allowed: [
        permissions.PRODUCT,
        permissions.ORDER_LIST,
        permissions.NOTIFICATION,
        permissions.FUNC_ORDER_TRANSACTION_CREATE,
        permissions.ISSUE_TITKET_LIST
    ]
};

export const roles = [
    admin,
    authenticated
];