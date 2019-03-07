import { Policy } from 'qoobee';

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

export const isOwner: Policy = (
    context: DomainContext,
    funcKey: string,
    values?: { readonly created_by: any; }
) => {
    const { currentUser } = context;
    if (!currentUser || !values) {
        return false;
    }

    if (!values.created_by) {
        return false;
    }

    const value = values.created_by;
    if (value === currentUser._id) {
        return true;
    }

    if (typeof value === 'object') {
        if (value.id === currentUser._id) {
            return true;
        }
    }

    return false;
};