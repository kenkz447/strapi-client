import { Policy } from '@/app';

import { DomainContext } from './base';
import { roles } from './roles-permission';

export const locationAllowed: Policy = (context: DomainContext, funcKey?: string) => {
    const { currentUser, history } = context;
    if (!currentUser) {
        return false;
    }

    const currentRole = currentUser.role;

    if (!currentRole) {
        return false;
    }

    const userRole = roles.find(o => o.key === currentRole.name);
    if (!userRole) {
        return false;
    }

    const fullPermisstion = userRole.allowed.find(o => o.key === 'ALL');
    if (fullPermisstion) {
        return true;
    }

    return !!userRole.allowed.find(o => o.url ? o.url.test(history.location.pathname) : false);
};

export const functionAllowed: Policy = (context: DomainContext, funcKey: string) => {
    const { currentUser } = context;
    if (!currentUser) {
        return false;
    }

    const currentRole = currentUser.role;

    if (!currentRole) {
        return false;
    }

    const userRole = roles.find(o => o.key === currentRole.name);
    if (!userRole) {
        return false;
    }

    const fullPermisstion = userRole.allowed.find(o => o.key === 'ALL');
    if (fullPermisstion) {
        return true;
    }

    return !!userRole.allowed.find(o => o.key === funcKey);
};