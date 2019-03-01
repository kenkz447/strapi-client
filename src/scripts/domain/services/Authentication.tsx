import * as jwtDecode from 'jwt-decode';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { AUTH_CONFIRM_URL, LOGIN_URL } from '@/configs';
import {
    AuthLoginResponseBody,
    authResources,
    User,
    userResources
} from '@/restful';

import { AuthClient, DomainContext, WithHistory } from '../base';

interface DecodedJWT {
    readonly sub: number;
    readonly name: string;
    readonly email: string;
    readonly exp: number;
    readonly iss: string;
    readonly aud: string;
}

type AuthenticationOwnProps = {
};

type AuthenticationProps = WithContextProps<DomainContext & WithHistory> &
    AuthenticationOwnProps;

interface AuthenticationState {
    readonly allowLoad: boolean;
}

class Authentication extends React.PureComponent<
    AuthenticationProps,
    AuthenticationState
    > {
    static readonly getAuthClient = (history: AuthenticationProps['history']) => {
        const authClient = new AuthClient<User>({
            history: history,
            loginPath: LOGIN_URL,
            getUserResource: userResources.me,
            getUserEquestParams: (token) => {
                const userInfo: DecodedJWT = jwtDecode(token);
                return {
                    type: 'path',
                    parameter: 'id',
                    value: userInfo.sub
                };
            },
            getResponseToken: (response: AuthLoginResponseBody) => response.jwt,
            getCookiesOption: (token) => {
                const userInfo: DecodedJWT = jwtDecode(token);
                const now = new Date();
                const timeNow = now.getTime();
                return {
                    expires: new Date(timeNow + userInfo.exp)
                };
            },
            loginResource: authResources.login
        });

        return authClient;
    }

    constructor(props: AuthenticationProps) {
        super(props);

        const { setContext, history } = props;

        const authClient = Authentication.getAuthClient(history);

        this.authenticaton(authClient)
            .then(() => setContext({ authClient }));

        this.state = {
            allowLoad: false
        };
    }

    private readonly isNeedConfirm = (user: User) => {
        return user.role.name === 'Registered';
    }

    private readonly toConfirmPage = () => {
        const { history } = this.props;
        history.replace(AUTH_CONFIRM_URL);
    }

    private readonly authenticaton = async (authClient: AuthClient<User>) => {
        const { setContext, history } = this.props;

        try {
            const user = await authClient.getLoggedInUser();

            const isNeedConfirm = this.isNeedConfirm(user);

            setContext({
                currentUser: {
                    ...user,
                    confirmed: !isNeedConfirm
                }
            });

            if (isNeedConfirm) {
                return this.toConfirmPage();
            }
            
        } catch (message) {
            const isOnAuthPage = history.location.pathname.startsWith('/auth');
            if (isOnAuthPage) {
                return;
            }

            if (message === 'no action') {
                return;
            }

            authClient.gotoLoginPage();
        } finally {
            this.setState({
                allowLoad: true
            });
        }
    }

    public render() {
        const { allowLoad } = this.state;

        if (!allowLoad) {
            return null;
        }

        return this.props.children;
    }
}

export default withContext<DomainContext, AuthenticationOwnProps>('history')(Authentication);