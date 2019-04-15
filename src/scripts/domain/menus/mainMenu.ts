import {
    ACCOUNT_URL,
    AGENCIES_URL,
    CATALOG_BASE_PATH,
    CATALOG_URL,
    DASHBOARD_BASE_PATH,
    INVITATION_URL,
    ISSUE_TICKET_URL,
    MATERIAL_LIBRARY_URL,
    ORDER_LIST_URL,
    PRODUCT_PATH
} from '@/configs';

export const mainMenu = [{
    url: DASHBOARD_BASE_PATH,
    icon: 'home',
    label: 'Dashboard'
}, {
    url: CATALOG_BASE_PATH,
    icon: 'hdd',
    label: 'Catalog'
}, {
    url: PRODUCT_PATH,
    icon: 'gold',
    label: 'Product'
}, {
    url: MATERIAL_LIBRARY_URL,
    icon: 'folder-open',
    label: 'Material library'
}, {
    url: ORDER_LIST_URL,
    icon: 'appstore',
    label: 'Orders'
}, {
    url: ISSUE_TICKET_URL,
    icon: 'solution',
    label: 'Support'
}, {
    url: AGENCIES_URL,
    icon: 'shop',
    label: 'Agencies'
}, {
    url: ACCOUNT_URL,
    icon: 'team',
    label: 'Accounts'
}, {
    url: INVITATION_URL,
    icon: 'book',
    label: 'Invitation'
}];