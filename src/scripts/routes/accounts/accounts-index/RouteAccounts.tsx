import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageWrapper } from '@/components';
import { ACCOUNT_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { request, Role, roleResources } from '@/restful';
import { reflinkResources } from '@/restful/resources/Reflink';

import { AccountsFetcher } from './containers';
import {
    RouteAccountsContext,
    RouteAccountsContextProps
} from './RouteAccountsContext';

type RouteAccountProps = AppPageProps;

interface RouteAccountsState {
    readonly routeContext: RouteAccountsContextProps;
}

export class RouteAccounts extends RoutePage<RouteAccountProps, RouteAccountsState> {
    static readonly routeInfo: RouteInfo = {
        path: ACCOUNT_URL,
        title: text('Tài khoản'),
        exact: true
    };

    constructor(props: RouteAccountProps) {
        super(props);

        this.state = {
            routeContext: {
                roles: [],
                reflinks: []
            }
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        const [roles, reflinks] = await Promise.all([
            request(roleResources.find),
            request(reflinkResources.find)
        ]);

        this.setState({
            routeContext: {
                roles: roles.roles,
                reflinks: reflinks
            }
        });
    }

    render() {
        const { routeContext } = this.state;

        return (
            <RouteAccountsContext.Provider value={routeContext}>
                <PageWrapper>
                    <PageContent>
                        <AccountsFetcher />
                    </PageContent>
                </PageWrapper>
            </RouteAccountsContext.Provider >
        );
    }
}