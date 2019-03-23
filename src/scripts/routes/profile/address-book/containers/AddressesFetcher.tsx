import * as React from 'react';
import {
    RequestParameter,
    RestfulDataContainer,
    RestfulRender
} from 'react-restful';

import { Loading } from '@/components';
import { sortById } from '@/domain';
import { addressResources, addressResourceType } from '@/restful';

import { AddressTable } from './addresses-fetcher';

export interface AddressesFetcherProps {
}

interface AddressesFetcherState {
    readonly params: RequestParameter[];
}

export class AddressesFetcher extends React.PureComponent<AddressesFetcherProps, AddressesFetcherState> {
    public render() {
        return (
            <RestfulRender
                resource={addressResources.find}
                render={(renderProps) => {
                    const { data, fetching, refetch } = renderProps;

                    if (!data) {
                        return <Loading />;
                    }

                    return (
                        <RestfulDataContainer
                            resourceType={addressResourceType}
                            initDataSource={data || []}
                            enablePaginationMode={true}
                            sort={sortById}
                        >
                            {(syncAddresses) => (
                                <AddressTable
                                    loading={fetching}
                                    addresses={syncAddresses}
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