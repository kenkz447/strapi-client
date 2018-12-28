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
import { Agency, agencyResources, agencyResourceType } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { AgencyFilter, AgencyTable } from './agencies-fetcher';

export interface AgenciesFetcherProps {
    readonly initData: Array<Agency>;
}

interface AgenciesFetcherState {
    readonly params: RequestParameter[];
}

export class AgenciesFetcher extends React.PureComponent<AgenciesFetcherProps, AgenciesFetcherState> {
    static readonly contextType = RootContext;
    readonly context!: WithHistory;

    readonly unListenHistory: UnregisterCallback;
    _unmounting: boolean = false;

    static readonly getDefaultRequestParams = (): RequestParameter[] => {
        const nameFilter = getUrlSearchParam('name');

        return [{
            type: 'query',
            parameter: 'name',
            value: nameFilter || undefined!
        }];
    }

    constructor(props: AgenciesFetcherProps, context: WithHistory) {
        super(props);

        this.state = {
            params: AgenciesFetcher.getDefaultRequestParams()
        };

        const { history } = context;

        this.unListenHistory = history.listen(this.historyChange);
    }

    readonly historyChange = () => {
        if (this._unmounting) {
            return;
        }

        const nextNameFilter = getUrlSearchParam('name') || undefined;

        const { params } = this.state;
        const name = getParamsValue(params, 'query', 'name');

        const isNameChanged = name !== nextNameFilter;

        if (!isNameChanged) {
            return;
        }

        let nextParams = upsertRequestParams(params, 'query', 'name', nextNameFilter);
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

    componentWillUnmount() {
        this._unmounting = true;
        this.unListenHistory();
    }

    public render() {
        const { initData: defaultAgencies } = this.props;
        const { params } = this.state;
        return (
            <Layout className="page-layout">
                <Layout.Header>
                    <AgencyFilter
                        name={getParamsValue(params, 'query', 'name')}
                        onNameChange={this.onNameChange}
                    />
                </Layout.Header>
                <RestfulRender
                    initData={defaultAgencies}
                    resource={agencyResources.find}
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
                                        resourceType={agencyResourceType}
                                        initDataSource={data || []}
                                        enablePaginationMode={true}
                                        sort={sortById}
                                    >
                                        {(syncAgencies) => (
                                            <AgencyTable
                                                loading={fetching}
                                                agencys={syncAgencies}
                                                onDelete={() => refetch()}
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

    readonly onPageChange = (nextPage: number, pageSize: number) => {
        const { params } = this.state;

        let nextParams = upsertRequestParams(params, 'query', 'page', nextPage);
        nextParams = upsertRequestParams(nextParams, 'query', 'rowPerPage', pageSize);

        this.setState({
            params: nextParams
        });
    }
}