import { Resource } from 'react-restful';

import { getDefaultParamsForUpdate } from '../base';

export interface ChangePasswordRequestBody {
    readonly oldPassword: string;
    readonly newPassword: string;
    readonly confirmNewPassword: string;
}

export const profileResources = {
    updateUser: new Resource({
        url: '/profile/update-user/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    changePassword: new Resource({
        url: '/profile/change-password',
        method: 'PUT'
    })
};