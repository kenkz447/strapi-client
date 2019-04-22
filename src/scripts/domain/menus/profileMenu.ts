import { MenuItem } from 'qoobee';

import {
    PROFILE_ACCOUNT_URL,
    PROFILE_ADDRESS_BOOK_URL,
    PROFILE_AGENCY_URL,
    PROFILE_PASSWORD_URL,
    PROFILE_PROMO_CODE_URL
} from '@/configs';

export const profileMenu: MenuItem[] = [{
    icon: '',
    label: 'Account settings',
    url: PROFILE_ACCOUNT_URL
}, {
    icon: '',
    label: 'Agency settings',
    url: PROFILE_AGENCY_URL
}, {
    icon: '',
    label: 'Address book',
    url: PROFILE_ADDRESS_BOOK_URL
}, {
    icon: '',
    label: 'Promotion and gifts',
    url: PROFILE_PROMO_CODE_URL
}, {
    icon: '',
    label: 'Change password',
    url: PROFILE_PASSWORD_URL
}];