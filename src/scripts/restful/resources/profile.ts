import { Resource } from 'react-restful';
import * as yup from 'yup';

import { getDefaultParamsForUpdate } from '../base';
import { User } from './user';

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
    updateBusinessInfo: new Resource<User>({
        url: '/profile/update-business-info/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate,
        bodySchema: yup.object().shape<Partial<User>>({
            registration_businessAreas: yup.string().required(),
            registration_companyAddress: yup.string().required(),
            registration_companyName: yup.string().required()
        })
    }),
    changePassword: new Resource({
        url: '/profile/change-password',
        method: 'PUT'
    })
};