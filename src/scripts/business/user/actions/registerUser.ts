import { authResources, request, User } from '@/restful';

export const registerUser = (newUser: Partial<User>) => {

    return request(
        authResources.register,
        {
            type: 'body',
            value: newUser
        }
    );
};