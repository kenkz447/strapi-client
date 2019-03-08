import { Permission } from 'qoobee';

import {
    ACCOUNT_URL,
    AGENCIES_URL,
    DASHBOARD_URL,
    NOTIFICATION_URL,
    ORDER_LIST_URL,
    PRODUCT_PATH
} from '@/configs';

type Permissions = { readonly [key: string]: Permission };

const locationPermissions: Permissions = {
    ALL: {
        key: 'ALL',
        url: /\/*/i
    },
    DASHBOARD: {
        key: 'DASHBOARD',
        url: new RegExp(DASHBOARD_URL)
    },
    PRODUCT: {
        key: 'PRODUCT',
        url: new RegExp(PRODUCT_PATH)
    },
    ORDER_LIST: {
        key: 'ORDER_LIST',
        url: new RegExp(ORDER_LIST_URL)
    },
    AGENCY_LIST: {
        key: 'AGENCY_LIST',
        url: new RegExp(AGENCIES_URL)
    },
    ACCOUNT_LIST: {
        key: 'ACCOUNT_LIST',
        url: new RegExp(ACCOUNT_URL)
    },
    NOTIFICATION: {
        key: 'NOTIFICATION',
        url: new RegExp(NOTIFICATION_URL)
    }
};

export const functionPermissions: Permissions = {
    FUNC_PRODUCT_RELATED_LINK: {
        key: 'PRODUCT_RELATED_LINK'
    },
    FUNC_ORDERS_FILTER_BY_AGENCY: {
        key: 'FUNC_ORDERS_FILTER_BY_AGENCY'
    },
    FUNC_UPDATE_ORDER: {
        key: 'FUNC_UPDATE_ORDER'
    },
    FUNC_ORDER_TRANSACTION_CONFIRM: {
        key: 'FUNC_ORDER_TRANSACTION_CONFIRM'
    },
    FUNC_ORDER_TRANSACTION_CREATE: {
        key: 'FUNC_ORDER_TRANSACTION_CREATE'
    }
};

export const permissions: Permissions = {
    ...locationPermissions,
    ...functionPermissions
};