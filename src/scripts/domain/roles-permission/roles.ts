import { Role } from 'qoobee';

import { CATALOG_BASE_PATH, DASHBOARD_BASE_PATH } from '@/configs';

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
        permissions.FUNC_ORDER_CANCEL,
        permissions.FUNC_ADD_TO_CART,
        permissions.PROFILE_AGENCY,
        permissions.PROFILE_PROMO_CODE,
        permissions.PROFILE_ADDRESS_BOOK
    ]
};

const authenticated: Role = {
    key: 'Authenticated',
    defaultUrl: DASHBOARD_BASE_PATH,
    allowed: [
        permissions.DASHBOARD,
        permissions.PRODUCT,
        permissions.MATERIAL_LIBRARY,
        permissions.ORDER_LIST,
        permissions.NOTIFICATION,
        permissions.CATALOG,
        permissions.CATALOG_MOBILE,
        permissions.CONTACT_MOBILE,
        permissions.POSTS_MOBILE,

        permissions.PROFILE_ACCOUNT,
        permissions.PROFILE_ADDRESS_BOOK,
        permissions.PROFILE_AGENCY,
        permissions.PROFILE_PASSWORD,
        permissions.PROFILE_PROMO_CODE,
        permissions.ISSUE_TITKET_LIST,
        
        permissions.FUNC_ORDER_TRANSACTION_CREATE,
        permissions.FUNC_ORDER_COMPLAIN,
        permissions.FUNC_ORDER_CANCEL,
        permissions.FUNC_ADD_TO_CART,
        permissions.FUNC_CUSTOMIZE_CATALOG,
        permissions.FUNC_AGENCY_POLICIES_OVERVIEW,
        permissions.FUNC_DOWNLOAD_MODEL
    ]
};

const registered: Role = {
    key: 'Registered',
    defaultUrl: DASHBOARD_BASE_PATH,
    allowed: [
        permissions.DASHBOARD,
        permissions.NOTIFICATION,
        permissions.CATALOG,
        permissions.CATALOG_MOBILE,
        permissions.PROFILE_ACCOUNT,
        permissions.PROFILE_PASSWORD,
        permissions.CONTACT_MOBILE,
        permissions.POSTS_MOBILE
    ],
    denied: [
        permissions.PROFILE_AGENCY,
        permissions.PROFILE_PROMO_CODE,
        permissions.PROFILE_ADDRESS_BOOK
    ]
};

const anyone: Role = {
    key: 'Public',
    defaultUrl: CATALOG_BASE_PATH,
    allowed: [
        permissions.CATALOG,
        permissions.CATALOG_MOBILE,
        permissions.CONTACT_MOBILE
    ],
};

export const roles = [
    admin,
    authenticated,
    registered,
    anyone
];