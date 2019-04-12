import * as React from 'react';
import {
    RequestParameter,
    RestfulDataContainer,
    RestfulRender
} from 'react-restful';

import { Loading } from '@/components';
import { sortById } from '@/domain';
import {
    storedPromoCodeResources,
    storedPromoCodeResourceType
} from '@/restful';

import { StoredPromoCodeTable } from './promo-codes-fetcher';

export interface PromoCodesFetcherProps {
}

interface PromoCodesFetcherState {
    readonly params: RequestParameter[];
}

export class PromoCodesFetcher extends React.PureComponent<PromoCodesFetcherProps, PromoCodesFetcherState> {
    public render() {
        return (
            <RestfulRender
                resource={storedPromoCodeResources.find}
                render={(renderProps) => {
                    const { data, fetching, refetch } = renderProps;

                    if (!data) {
                        return <Loading />;
                    }

                    return (
                        <RestfulDataContainer
                            resourceType={storedPromoCodeResourceType}
                            initDataSource={data || []}
                            enablePaginationMode={true}
                            sort={sortById}
                        >
                            {(syncPromoCodes) => (
                                <StoredPromoCodeTable
                                    loading={fetching}
                                    storedPromoCodes={syncPromoCodes}
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