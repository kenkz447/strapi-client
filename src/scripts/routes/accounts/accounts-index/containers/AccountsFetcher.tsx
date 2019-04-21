import { Layout } from 'antd';
import { UnregisterCallback } from 'history';
import debounce from 'lodash/debounce';
import { RootContext } from 'qoobee';
import * as React from 'react';
import {
    getParamsValue,
    RequestParameter,
    RestfulDataContainer,
    RestfulRender,
    upsertRequestParams
} from 'react-restful';

import { DataModelPagination, Loading } from '@/components';
import { sortById, WithHistory } from '@/domain';
import {
    agencyResourceType,
    Role,
    userResources,
    userResourceType
} from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { AccountFilter, AccountTable } from './accounts-fetcher';

export interface AgenciesFetcherProps {
}

interface AccountsFetcherState {
    readonly params: RequestParameter[];
}

export class AccountsFetcher extends React.PureComponent<AgenciesFetcherProps, AccountsFetcherState> {
    public static readonly contextType = RootContext;
    public readonly context!: WithHistory;

    public static readonly getDefaultRequestParams = (): RequestParameter[] => {
        const nameFilter = getUrlSearchParam('name');
        const emailFilter = getUrlSearchParam('email');
        const roleFilter = getUrlSearchParam('role');
        const reflinkFilter = getUrlSearchParam('role');

        return [{
            type: 'query',
            parameter: 'name_containss',
            value: nameFilter || undefined!
        }, {
            type: 'query',
            parameter: 'email_containss',
            value: emailFilter || undefined!
        }, {
            type: 'query',
            parameter: 'role',
            value: roleFilter || undefined!
        }, {
            type: 'query',
            parameter: 'reflink',
            value: reflinkFilter || undefined!
        }, {
            type: 'query',
            parameter: '_sort',
            value: '_id:DESC'
        }];
    }

    private readonly unListenHistory: UnregisterCallback;
    private _unmounting: boolean = false;

    constructor(props: AgenciesFetcherProps, context: WithHistory) {
        super(props);

        this.state = {
            params: AccountsFetcher.getDefaultRequestParams()
        };

        const { history } = context;

        this.unListenHistory = history.listen(this.historyChange);
    }

    private readonly historyChange = () => {
        if (this._unmounting) {
            return;
        }

        const nextNameFilter = getUrlSearchParam('name') || undefined;
        const nextEmailFilter = getUrlSearchParam('email') || undefined;
        const nextRoleFilter = getUrlSearchParam('role') || undefined;
        const nextReflinkFilter = getUrlSearchParam('reflink') || undefined;

        const { params } = this.state;
        const name = getParamsValue(params, 'query', 'name_containss');
        const email = getParamsValue(params, 'query', 'email_containss');
        const role = getParamsValue(params, 'query', 'role');
        const reflink = getParamsValue(params, 'query', 'reflink');

        const isNameChanged = name !== nextNameFilter;
        const isEmailChanged = email !== nextEmailFilter;
        const isRoleChanged = role !== nextRoleFilter;
        const isReflinkChanged = reflink !== nextReflinkFilter;

        if (!isNameChanged && !isRoleChanged && !isEmailChanged && !isReflinkChanged) {
            return;
        }

        let nextParams = upsertRequestParams(params, 'query', 'name_containss', nextNameFilter);
        nextParams = upsertRequestParams(nextParams, 'query', 'email_containss', nextEmailFilter);
        nextParams = upsertRequestParams(nextParams, 'query', 'role', nextRoleFilter);
        nextParams = upsertRequestParams(nextParams, 'query', 'reflink', nextReflinkFilter);

        this.setState({
            params: nextParams
        });
    }

    private readonly onNameChange = debounce(
        (name: string) => {
            const { history } = this.context;

            const nextUrlSearchParams = new URLSearchParams(location.search);
            nextUrlSearchParams.set('name', name);
            history.replace(`?${nextUrlSearchParams.toString()}`);
        },
        500
    );

    private readonly onEmailChange = debounce(
        (email: string) => {
            const { history } = this.context;

            const nextUrlSearchParams = new URLSearchParams(location.search);
            nextUrlSearchParams.set('email', email);
            history.replace(`?${nextUrlSearchParams.toString()}`);
        },
        500
    );

    private readonly onRoleChange = (role: string) => {
        const { history } = this.context;

        const nextUrlSearchParams = new URLSearchParams(location.search);
        if (role) {
            nextUrlSearchParams.set('role', role);
        } else {
            nextUrlSearchParams.delete('role');
        }

        history.replace(`?${nextUrlSearchParams.toString()}`);
    }

    private readonly onReflinkChange = (reflink: string) => {
        const { history } = this.context;

        const nextUrlSearchParams = new URLSearchParams(location.search);
        if (reflink) {
            nextUrlSearchParams.set('reflink', reflink);
        } else {
            nextUrlSearchParams.delete('reflink');
        }

        history.replace(`?${nextUrlSearchParams.toString()}`);
    }

    private readonly onPageChange = (nextPage: number, pageSize: number, currentPage: number) => {
        const { params } = this.state;

        let nextParams = upsertRequestParams(params, 'query', '_start', (currentPage - 1) * pageSize);
        nextParams = upsertRequestParams(nextParams, 'query', '_limit', pageSize);

        this.setState({
            params: nextParams
        });
    }

    public componentWillUnmount() {
        this._unmounting = true;
        this.unListenHistory();
    }

    public render() {
        const { params } = this.state;
        return (
            <Layout className="page-layout">
                <Layout.Header>
                    <AccountFilter
                        name={getParamsValue(params, 'query', 'name_containss')}
                        onNameChange={this.onNameChange}
                        email={getParamsValue(params, 'query', 'email_containss')}
                        onEmailChange={this.onEmailChange}
                        role={getParamsValue(params, 'query', 'role')}
                        onRoleChange={this.onRoleChange}
                        reflink={getParamsValue(params, 'query', 'reflink')}
                        onReflinkChange={this.onReflinkChange}
                    />
                </Layout.Header>
                <RestfulRender
                    resource={userResources.find}
                    parameters={params}
                    render={(renderProps) => {
                        const { data, fetching, refetch } = renderProps;

                        if (!data) {
                            return <Loading />;
                        }

                        return (
                            <React.Fragment>
                                <Layout.Content>
                                    <RestfulDataContainer
                                        resourceType={userResourceType}
                                        initDataSource={data || []}
                                        enablePaginationMode={true}
                                        sort={sortById}
                                    >
                                        {(syncUsers) => (
                                            <AccountTable
                                                loading={fetching}
                                                users={syncUsers}
                                                onDelete={() => refetch()}
                                                reload={refetch}
                                            />
                                        )}
                                    </RestfulDataContainer>
                                </Layout.Content>
                                <Layout.Footer>
                                    <DataModelPagination
                                        totalItem={10}
                                        currentPage={1}
                                        onPageChange={this.onPageChange}
                                    />
                                </Layout.Footer>
                            </React.Fragment>
                        );
                    }}
                />
            </Layout>
        );
    }
}