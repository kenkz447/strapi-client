import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { agencyLevelResources } from '@/restful';

import { DashboardAgencyLevelList } from './dashboard-agencylevels-fetcher';

interface DashboardAgencyLevelsFetcherProps {
}

export class DashboardAgencyLevelsFetcher extends React.PureComponent<DashboardAgencyLevelsFetcherProps> {
    public render() {
        return (
            <RestfulRender
                resource={agencyLevelResources.find}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return <Loading />;
                    }

                    return (
                        <DashboardAgencyLevelList
                            agencyLevels={data}
                        />
                    );
                }}
            />
        );
    }
}
