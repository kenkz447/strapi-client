export const AUTH_PATH = '/auth';
export const LOGIN_URL = AUTH_PATH + '/login';
export const AUTH_REGISTER_URL = AUTH_PATH + '/register';
export const AUTH_CONFIRM_URL = AUTH_PATH + '/confirm';

export const FORGOT_PASSWORD_URL = AUTH_PATH + '/forgot-password';
export const RESET_PASSWORD_URL = AUTH_PATH + '/reset-password';

export const DASHBOARD_URL = '/';
export const PRODUCT_PATH = '/product';
export const PRODUCT_URL = PRODUCT_PATH + '/:modulesCode?';

export const ORDER_PATH = '/orders';
export const ORDER_LIST_URL = ORDER_PATH + '/list';
export const ORDER_DETAIL_URL = ORDER_PATH + '/detail/:id';

export const AGENCIES_URL = '/agencies';
export const AGENCY_DETAIL_URL = AGENCIES_URL + '/detail/:id';

export const ACCOUNT_URL = '/accounts';
export const ACCOUNT_DETAIL_URL = ACCOUNT_URL + '/detail/:id';

export const USER_PATH = '/user';
export const USER_PROFILE_URL = USER_PATH + '/profile';

export const CART_URL = '/cart';

export const CHECKOUT_URL = '/checkout';

export const NOTIFICATION_URL = '/notification';

export const ISSUE_TICKET_URL = '/tickets';
export const ISSUE_TICKET_DETAIL_URL = ISSUE_TICKET_URL + '/:id';