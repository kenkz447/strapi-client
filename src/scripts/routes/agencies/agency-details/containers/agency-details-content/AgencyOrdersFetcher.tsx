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
import { Agency, Order, orderResources, orderResourceType } from '@/restful';
import {
    OrderTable
} from '@/routes/order/order-list/containers/orders-fetcher';
import { getUrlSearchParam } from '@/utilities';

export interface AgencyOrdersFetcherProps {
    readonly agency: Agency;
}

interface AgencyOrdersFetcherState {
    readonly params: RequestParameter[];
}

export class AgencyOrdersFetcher extends React.PureComponent<AgencyOrdersFetcherProps, AgencyOrdersFetcherState> {
    static readonly contextType = RootContext;
    readonly context!: WithHistory;

    readonly unListenHistory: UnregisterCallback;
    _unmounting: boolean = false;

    readonly getDefaultRequestParams = (): RequestParameter[] => {
        const codeFilter = getUrlSearchParam('code');
        const statusFilter = getUrlSearchParam('status');
        const { agency } = this.props;
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
            value: agency.id!
        }];
    }

    constructor(props: AgencyOrdersFetcherProps, context: WithHistory) {
        super(props);

        this.state = {
            params: this.getDefaultRequestParams()
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

        const { params } = this.state;
        const code = getParamsValue(params, 'query', 'code');
        const status = getParamsValue(params, 'query', 'status');

        const isCodeChanged = code !== nextCodeFilter;
        const isStatusChanged = status !== nextStatusFilter;

        if (!isCodeChanged && !isStatusChanged) {
            return;
        }

        let nextParams = upsertRequestParams(params, 'query', 'code', nextCodeFilter);
        nextParams = upsertRequestParams(nextParams, 'query', 'status', nextStatusFilter);

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

    public componentWillUnmount() {
        this._unmounting = true;
        this.unListenHistory();
    }

    public render() {
        const { params } = this.state;
        return (
            <RestfulRender
                resource={orderResources.find}
                parameters={params}
                render={(renderProps) => {
                    const { data, fetching, refetch } = renderProps;

                    if (!data) {
                        return <Loading />;
                    }

                    return (
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
                    );
                }}
            />
        );
    }
}