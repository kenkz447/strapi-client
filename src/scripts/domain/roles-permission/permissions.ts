import { Permission } from 'qoobee';

import {
    ACCOUNT_URL,
    AGENCIES_URL,
    CATALOG_BASE_PATH,
    DASHBOARD_BASE_PATH,
    ISSUE_TICKET_URL,
    MATERIAL_LIBRARY_URL,
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
        url: new RegExp(DASHBOARD_BASE_PATH)
    },
    MATERIAL_LIBRARY: {
        key: 'MATERIAL_LIBRARY',
        url: new RegExp(MATERIAL_LIBRARY_URL)
    },
    CATALOG: {
        key: 'CATALOG',
        url: new RegExp(CATALOG_BASE_PATH)
    },
    PRODUCT: {
        key: 'PRODUCT',
        url: new RegExp(PRODUCT_PATH)
    },
    ORDER_LIST: {
        key: 'ORDER_LIST',
        url: new RegExp(ORDER_LIST_URL)
    },
    ISSUE_TITKET_LIST: {
        key: 'ISSUE_TITKET_LIST',
        url: new RegExp(ISSUE_TICKET_URL)
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
    FUNC_ORDER_COMPLAIN: {
        key: 'FUNC_ORDER_COMPLAIN'
    },
    FUNC_ORDER_CANCEL: {
        key: 'FUNC_ORDER_CANCEL'
    },
    FUNC_ORDER_TRANSACTION_CONFIRM: {
        key: 'FUNC_ORDER_TRANSACTION_CONFIRM'
    },
    FUNC_ORDER_TRANSACTION_CREATE: {
        key: 'FUNC_ORDER_TRANSACTION_CREATE'
    },
    FUNC_ADD_TO_CART: {
        key: 'FUNC_ADD_TO_CART'
    },
    FUNC_CUSTOMIZE_CATALOG: {
        key: 'FUNC_CUSTOMIZE_CATALOG'
    }
};

export const permissions: Permissions = {
    ...locationPermissions,
    ...functionPermissions
};