import { Role } from 'qoobee';

import { DASHBOARD_BASE_PATH } from '@/configs';

import { permissions } from './permissions';

const admin: Role = {
    key: 'Administrator',
    defaultUrl: DASHBOARD_BASE_PATH,
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
    defaultUrl: DASHBOARD_BASE_PATH,
    allowed: [
        permissions.DASHBOARD,
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