import { Layout } from 'antd';
import { UnregisterCallback } from 'history';
import { RootContext } from 'qoobee';
import * as React from 'react';
import {
    RequestParameter,
    RestfulDataContainer,
    RestfulRender,
    upsertRequestParams
} from 'react-restful';

import { DataModelPagination, Loading } from '@/components';
import { sortByCreatedDate, WithHistory } from '@/domain';
import { invitationResources, invitationResourceType } from '@/restful';

import { InvitationTable } from './invitations-fetcher';

export interface AgenciesFetcherProps {
}

interface InvitationsFetcherState {
    readonly params: RequestParameter[];
}

export class InvitationsFetcher extends React.PureComponent<AgenciesFetcherProps, InvitationsFetcherState> {
    static readonly contextType = RootContext;
    readonly context!: WithHistory;

    readonly unListenHistory: UnregisterCallback;
    _unmounting: boolean = false;

    constructor(props: AgenciesFetcherProps, context: WithHistory) {
        super(props);

        this.state = {
            params: []
        };

        const { history } = context;

        this.unListenHistory = history.listen(this.historyChange);
    }

    readonly historyChange = () => {
        if (this._unmounting) {
            return;
        }
    }

    componentWillUnmount() {
        this._unmounting = true;
        this.unListenHistory();
    }

    public render() {
        return (
            <Layout className="page-layout">
                <RestfulRender
                    resource={invitationResources.find}
                    render={(renderProps) => {
                        const { data, fetching, refetch } = renderProps;

                        if (!data) {
                            return <Loading />;
                        }

                        return (
                            <React.Fragment>
                                <Layout.Content>
                                    <RestfulDataContainer
                                        resourceType={invitationResourceType}
                                        initDataSource={data || []}
                                        enablePaginationMode={true}
                                        sort={sortByCreatedDate}
                                    >
                                        {(syncUsers) => (
                                            <InvitationTable
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

    private readonly onPageChange = (nextPage: number, pageSize: number) => {
        const { params } = this.state;

        let nextParams = upsertRequestParams(params, 'query', 'page', nextPage);
        nextParams = upsertRequestParams(nextParams, 'query', 'rowPerPage', pageSize);

        this.setState({
            params: nextParams
        });
    }
}