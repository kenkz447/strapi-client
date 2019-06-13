import { MenuItem } from 'qoobee';

import {
    CATALOG_BASE_PATH,
    CONTACT_URL,
    getMobileUrl,
    MOBILE_POST_LIST_URL
} from '@/configs';

export const mainMenuMobile: MenuItem[] = [{
    url: getMobileUrl(CATALOG_BASE_PATH),
    icon: 'hdd',
    label: 'Catalog'
}, {
    url: getMobileUrl(MOBILE_POST_LIST_URL),
    icon: 'read',
    label: 'News'
}, {
    url: getMobileUrl(CONTACT_URL),
    icon: 'phone',
    label: 'Contact'
}];