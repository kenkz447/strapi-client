import { Resource } from 'react-restful';

import { User } from './user';

export interface AuthLoginRequestBody {
    readonly identifier: string;
    readonly password: string;
}

export interface AuthLoginResponseBody {
    readonly user: User;
    readonly jwt: string;
}

export interface AuthForgottenPasswordRequestBody {
    readonly email: string;
    readonly url: string;
}

export interface AuthForgottenPasswordResponseBody {

}

export interface AuthResetPasswordRequestBody {
    readonly code: string;
    readonly password: string;
    readonly passwordConfirmation: string;
}

export interface AuthResetPasswordReponseBody {

}

export const authResources = {
    login: new Resource<AuthLoginRequestBody, AuthLoginResponseBody>({
        url: '/auth/local',
        method: 'POST'
    }),
    forgottenPassword: new Resource<AuthForgottenPasswordRequestBody, AuthForgottenPasswordResponseBody>({
        url: '/auth/forgot-password',
        method: 'POST'
    }),
    resetPassword: new Resource<AuthResetPasswordRequestBody, AuthResetPasswordReponseBody>({
        url: '/auth/reset-password',
        method: 'POST'
    })
};