import { Layout } from 'antd';
import { UnregisterCallback } from 'history';
import debounce from 'lodash/debounce';
import * as React from 'react';
import {
    getParamsValue,
    RequestParameter,
    RestfulDataContainer,
    RestfulRender,
    upsertRequestParams
} from 'react-restful';

import { RootContext } from '@/app';
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
    static readonly contextType = RootContext;
    readonly context!: WithHistory;

    readonly unListenHistory: UnregisterCallback;
    _unmounting: boolean = false;

    static readonly getDefaultRequestParams = (): RequestParameter[] => {
        const nameFilter = getUrlSearchParam('name');
        const roleFilter = getUrlSearchParam('role');

        return [{
            type: 'query',
            parameter: 'name_containss',
            value: nameFilter || undefined!
        }, {
            type: 'query',
            parameter: 'role',
            value: roleFilter || undefined!
        }, {
            type: 'query',
            parameter: '_sort',
            value: 'id:DESC'
        }];
    }

    constructor(props: AgenciesFetcherProps, context: WithHistory) {
        super(props);

        this.state = {
            params: AccountsFetcher.getDefaultRequestParams()
        };

        const { history } = context;

        this.unListenHistory = history.listen(this.historyChange);
    }

    readonly historyChange = () => {
        if (this._unmounting) {
            return;
        }

        const nextNameFilter = getUrlSearchParam('name') || undefined;
        const nextRoleFilter = getUrlSearchParam('role') || undefined;

        const { params } = this.state;
        const name = getParamsValue(params, 'query', 'name');
        const role = getParamsValue(params, 'query', 'role');

        const isNameChanged = name !== nextNameFilter;
        const isRoleChanged = role !== nextRoleFilter;

        if (!isNameChanged && !isRoleChanged) {
            return;
        }

        let nextParams = upsertRequestParams(params, 'query', 'name_containss', nextNameFilter);
        nextParams = upsertRequestParams(nextParams, 'query', 'role', nextRoleFilter);

        this.setState({
            params: nextParams
        });
    }

    readonly onNameChange = debounce(
        (name: string) => {
            const { history } = this.context;

            const nextUrlSearchParams = new URLSearchParams(location.search);
            nextUrlSearchParams.set('name', name);
            history.replace(`?${nextUrlSearchParams.toString()}`);
        },
        500
    );

    readonly onRoleChange = (role: string) => {
        const { history } = this.context;

        const nextUrlSearchParams = new URLSearchParams(location.search);
        if (role) {
            nextUrlSearchParams.set('role', role);
        } else {
            nextUrlSearchParams.delete('role');
        }

        history.replace(`?${nextUrlSearchParams.toString()}`);
    }

    componentWillUnmount() {
        this._unmounting = true;
        this.unListenHistory();
    }

    public render() {
        const { params } = this.state;
        return (
            <Layout className="page-layout">
                <Layout.Header>
                    <AccountFilter
                        name={getParamsValue(params, 'query', 'name')}
                        onNameChange={this.onNameChange}
                        role={getParamsValue(params, 'query', 'role')}
                        onRoleChange={this.onRoleChange}
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

    readonly onPageChange = (nextPage: number, pageSize: number, currentPage: number) => {
        const { params } = this.state;

        let nextParams = upsertRequestParams(params, 'query', '_start', (currentPage - 1) * pageSize);
        nextParams = upsertRequestParams(nextParams, 'query', '_limit', pageSize);

        this.setState({
            params: nextParams
        });
    }
}