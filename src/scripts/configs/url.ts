export const AUTH_PATH = '/auth';
export const LOGIN_URL = AUTH_PATH + '/login';
export const FORGOT_PASSWORD_URL = AUTH_PATH + '/forgot-password';
export const RESET_PASSWORD_URL = AUTH_PATH + '/reset-password';

export const DASHBOARD_URL = '/';
export const PRODUCT_PATH = '/product';
export const PRODUCT_URL = PRODUCT_PATH + '/:modulesCode?';

export const ORDER_PATH = '/orders';
export const ORDER_LIST_URL = ORDER_PATH + '/list';
export const ORDER_DETAIL_URL = ORDER_PATH + '/detail/:id';

export const AGENCY_PATH = '/agencies';
export const AGENCY_LIST_URL = AGENCY_PATH + '/agency-list';
export const AGENCY_DETAIL_URL = AGENCY_PATH + '/detail/:id';

export const ACCOUNT_PATH = '/accounts';
export const ACCOUNT_LIST_URL = ACCOUNT_PATH + '/account-list';
export const ACCOUNT_DETAIL_URL = ACCOUNT_LIST_URL + '/detail/:id';

export const USER_PATH = '/user';
export const USER_PROFILE_URL = USER_PATH + '/profile';

export const CART_URL = '/cart';

export const CHECKOUT_URL = '/checkout';
