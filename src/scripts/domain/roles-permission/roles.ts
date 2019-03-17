import { Role } from 'qoobee';

import { permissions } from './permissions';

const admin: Role = {
    key: 'Administrator',
    allowed: [
        permissions.ALL
    ],
    denied: [
        permissions.FUNC_ORDER_TRANSACTION_CREATE,
        permissions.FUNC_ORDER_COMPLAIN,
        permissions.FUNC_ORDER_CANCEL
    ]
};

const authenticated: Role = {
    key: 'Authenticated',
    allowed: [
        permissions.PRODUCT,
        permissions.ORDER_LIST,
        permissions.NOTIFICATION,
        permissions.FUNC_ORDER_TRANSACTION_CREATE,
        permissions.ISSUE_TITKET_LIST,
        permissions.FUNC_ORDER_COMPLAIN,
        permissions.FUNC_ORDER_CANCEL
    ]
};

export const roles = [
    admin,
    authenticated
];