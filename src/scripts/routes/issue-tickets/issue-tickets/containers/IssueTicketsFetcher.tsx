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
    IssueTicket,
    issueTicketResources,
    issueTicketResourceType
} from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { IssueTicketFilter, IssueTicketTable } from './issue-tickets-fetcher';

export interface IssueTicketsFetcherProps {
    readonly initData?: Array<IssueTicket>;
}

interface IssueTicketsFetcherState {
    readonly params: RequestParameter[];
}

export class IssueTicketsFetcher extends React.PureComponent<IssueTicketsFetcherProps, IssueTicketsFetcherState> {
    static readonly contextType = RootContext;
    readonly context!: WithHistory;

    readonly unListenHistory: UnregisterCallback;
    _unmounting: boolean = false;

    static readonly getDefaultRequestParams = (): RequestParameter[] => {
        const codeFilter = getUrlSearchParam('code');
        const statusFilter = getUrlSearchParam('status');
        const agency = getUrlSearchParam(nameof<IssueTicket>(o => o.issueTicketAgency));

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
            parameter: nameof<IssueTicket>(o => o.issueTicketAgency),
            value: agency || undefined!
        }];
    }

    constructor(props: IssueTicketsFetcherProps, context: WithHistory) {
        super(props);

        this.state = {
            params: IssueTicketsFetcher.getDefaultRequestParams()
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
        const nextAgencyFilter = getUrlSearchParam(nameof<IssueTicket>(o => o.issueTicketAgency)) || undefined;

        const { params } = this.state;
        const code = getParamsValue(params, 'query', 'code');
        const status = getParamsValue(params, 'query', 'status');
        const agency = getParamsValue(params, 'query', nameof<IssueTicket>(o => o.issueTicketAgency));

        const isCodeChanged = code !== nextCodeFilter;
        const isStatusChanged = status !== nextStatusFilter;
        const isAgencyChange = agency !== nextAgencyFilter;

        if (!isCodeChanged && !isStatusChanged && !isAgencyChange) {
            return;
        }

        let nextParams = upsertRequestParams(params, 'query', 'code', nextCodeFilter);
        nextParams = upsertRequestParams(nextParams, 'query', 'status', nextStatusFilter);
        nextParams = upsertRequestParams(
            nextParams,
            'query',
            nameof<IssueTicket>(o => o.issueTicketAgency),
            nextAgencyFilter
        );

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
        nextUrlSearchParams.set(nameof<IssueTicket>(o => o.issueTicketAgency), agency);

        if (agency) {
            nextUrlSearchParams.set(nameof<IssueTicket>(o => o.issueTicketAgency), agency);
        } else {
            nextUrlSearchParams.delete(nameof<IssueTicket>(o => o.issueTicketAgency));
        }

        history.replace(`?${nextUrlSearchParams.toString()}`);
    }

    componentWillUnmount() {
        this._unmounting = true;
        this.unListenHistory();
    }

    public render() {
        const { initData: defaultIssueTickets } = this.props;
        const { params } = this.state;
        return (
            <Layout className="page-layout">
                <Layout.Header>
                    <IssueTicketFilter
                        code={getParamsValue(params, 'query', 'code')}
                        status={getParamsValue(params, 'query', 'status')}
                        agency={getParamsValue(params, 'query', nameof<IssueTicket>(o => o.issueTicketAgency))}
                        onCodeChange={this.onCodeChange}
                        onStatusChange={this.onStatusChange}
                        onAgencyChange={this.onAgencyChange}
                    />
                </Layout.Header>
                <RestfulRender
                    initData={defaultIssueTickets}
                    resource={issueTicketResources.find}
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
                                        resourceType={issueTicketResourceType}
                                        initDataSource={data || []}
                                        enablePaginationMode={true}
                                        sort={sortById}
                                    >
                                        {(syncIssueTickets) => (
                                            <IssueTicketTable
                                                loading={fetching}
                                                issueTickets={syncIssueTickets}
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