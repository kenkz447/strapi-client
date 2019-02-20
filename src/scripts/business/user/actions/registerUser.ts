import { Order, request, User, userResources } from '@/restful';

export const registerUser = (newUser: Partial<User>) => {

    return request(
        userResources.register,
        {
            type: 'body',
            value: {
                ...newUser,
                username: newUser.email,
                gender: 'male'
            }
        }
    );
};