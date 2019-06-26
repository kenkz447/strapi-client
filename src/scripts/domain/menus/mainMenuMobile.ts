import { MenuItem } from 'qoobee';

import {
    CATALOG_BASE_PATH,
    CONTACT_URL,
    getMobileUrl,
    MOBILE_POST_LIST_URL,
    PRODUCT_PATH
} from '@/configs';

export const mainMenuMobile: MenuItem[] = [{
    url: getMobileUrl(CATALOG_BASE_PATH),
    icon: 'hdd',
    label: 'Catalog'
}, {
    url: getMobileUrl(PRODUCT_PATH),
    icon: 'gold',
    label: 'Products'
}, {
    url: getMobileUrl(MOBILE_POST_LIST_URL),
    icon: 'read',
    label: 'News'
}, {
    url: getMobileUrl(CONTACT_URL),
    icon: 'phone',
    label: 'Contact'
}];