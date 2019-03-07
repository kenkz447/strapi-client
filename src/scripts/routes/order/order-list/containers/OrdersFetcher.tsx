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
import { Order, orderResources, orderResourceType } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { OrderTable } from './orders-fetcher';
import { OrderFilter } from './orders-fetcher/OrderFilter';

export interface OrdersFetcherProps {
    readonly initData: Array<Order>;
}

interface OrdersFetcherState {
    readonly params: RequestParameter[];
}

export class OrdersFetcher extends React.PureComponent<OrdersFetcherProps, OrdersFetcherState> {
    static readonly contextType = RootContext;
    readonly context!: WithHistory;

    readonly unListenHistory: UnregisterCallback;
    _unmounting: boolean = false;

    static readonly getDefaultRequestParams = (): RequestParameter[] => {
        const codeFilter = getUrlSearchParam('code');
        const statusFilter = getUrlSearchParam('status');
        const agency = getUrlSearchParam(nameof<Order>(o => o.agencyOrderer));

        return [{
            type: 'query',
            parameter: '_sort',
            value: '_id:DESC'
        }, {
            type: 'query',
            parameter: 'code',
            value: codeFilter || undefined!
        }, {
            type: 'query',
            parameter: 'status',
            value: statusFilter || undefined!
        }, {
            type: 'query',
            parameter: nameof<Order>(o => o.agencyOrderer),
            value: agency || undefined!
        }];
    }

    constructor(props: OrdersFetcherProps, context: WithHistory) {
        super(props);

        this.state = {
            params: OrdersFetcher.getDefaultRequestParams()
        };

        const { history } = context;

        this.unListenHistory = history.listen(this.historyChange);
    }

    readonly historyChange = () => {
        if (this._unmounting) {
            return;
        }

        const nextCodeFilter = getUrlSearchParam('code') || undefined;
        const nextStatusFilter = getUrlSearchParam('status') || undefined;
        const nextAgencyFilter = getUrlSearchParam(nameof<Order>(o => o.agencyOrderer)) || undefined;

        const { params } = this.state;
        const code = getParamsValue(params, 'query', 'code');
        const status = getParamsValue(params, 'query', 'status');
        const agency = getParamsValue(params, 'query', nameof<Order>(o => o.agencyOrderer));

        const isCodeChanged = code !== nextCodeFilter;
        const isStatusChanged = status !== nextStatusFilter;
        const isAgencyChange = agency !== nextAgencyFilter;

        if (!isCodeChanged && !isStatusChanged && !isAgencyChange) {
            return;
        }

        let nextParams = upsertRequestParams(params, 'query', 'code', nextCodeFilter);
        nextParams = upsertRequestParams(nextParams, 'query', 'status', nextStatusFilter);
        nextParams = upsertRequestParams(nextParams, 'query', nameof<Order>(o => o.agencyOrderer), nextAgencyFilter);

        this.setState({
            params: nextParams
        });
    }

    readonly onCodeChange = debounce(
        (code: string) => {
            const { history } = this.context;

            const nextUrlSearchParams = new URLSearchParams(location.search);
            nextUrlSearchParams.set('code', code);
            history.replace(`?${nextUrlSearchParams.toString()}`);
        },
        500
    );

    readonly onStatusChange = (status: string) => {
        const { history } = this.context;

        const nextUrlSearchParams = new URLSearchParams(location.search);
        nextUrlSearchParams.set('status', status);
        if (status) {
            nextUrlSearchParams.set('status', status);
        } else {
            nextUrlSearchParams.delete('status');
        }

        history.replace(`?${nextUrlSearchParams.toString()}`);
    }

    readonly onAgencyChange = (agency: string) => {
        const { history } = this.context;

        const nextUrlSearchParams = new URLSearchParams(location.search);
        nextUrlSearchParams.set(nameof<Order>(o => o.agencyOrderer), agency);

        if (agency) {
            nextUrlSearchParams.set(nameof<Order>(o => o.agencyOrderer), agency);
        } else {
            nextUrlSearchParams.delete(nameof<Order>(o => o.agencyOrderer));
        }

        history.replace(`?${nextUrlSearchParams.toString()}`);
    }

    componentWillUnmount() {
        this._unmounting = true;
        this.unListenHistory();
    }

    public render() {
        const { initData: defaultOrders } = this.props;
        const { params } = this.state;
        return (
            <Layout className="page-layout">
                <Layout.Header>
                    <OrderFilter
                        code={getParamsValue(params, 'query', 'code')}
                        status={getParamsValue(params, 'query', 'status')}
                        agency={getParamsValue(params, 'query', nameof<Order>(o => o.agencyOrderer))}
                        onCodeChange={this.onCodeChange}
                        onStatusChange={this.onStatusChange}
                        onAgencyChange={this.onAgencyChange}
                    />
                </Layout.Header>
                <RestfulRender
                    initData={defaultOrders}
                    resource={orderResources.find}
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
                                        resourceType={orderResourceType}
                                        initDataSource={data || []}
                                        enablePaginationMode={true}
                                        sort={sortById}
                                    >
                                        {(syncOrders) => (
                                            <OrderTable
                                                loading={fetching}
                                                orders={syncOrders}
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