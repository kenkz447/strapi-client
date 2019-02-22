import {
    ACCOUNT_URL,
    AGENCY_LIST_URL,
    DASHBOARD_URL,
    ORDER_LIST_URL,
    PRODUCT_PATH
} from '@/configs';

export const mainMenu = [{
    url: DASHBOARD_URL,
    icon: 'home',
    label: 'Home'
}, {
    url: PRODUCT_PATH,
    icon: 'gold',
    label: 'Product'
}, {
    url: ORDER_LIST_URL,
    icon: 'appstore',
    label: 'Orders'
}, {
    url: AGENCY_LIST_URL,
    icon: 'shop',
    label: 'Agencies'
}, {
    url: ACCOUNT_URL,
    icon: 'team',
    label: 'Accounts'
}];