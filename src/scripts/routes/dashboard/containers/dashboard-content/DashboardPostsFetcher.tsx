import * as React from 'react';
import { RestfulDataContainer, RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { postResources, postResourceType } from '@/restful';

import { DashboardPostList } from './dashboard-post-fetcher';

interface DashboardPostsFetcherProps {
}

export class DashboardPostsFetcher extends React.PureComponent<DashboardPostsFetcherProps> {
    public render() {
        return (
            <RestfulRender
                resource={postResources.find}
                render={(renderProps) => {
                    const { data } = renderProps;

                    if (!data) {
                        return <Loading />;
                    }

                    return (
                        <RestfulDataContainer
                            resourceType={postResourceType}
                            initDataSource={data || []}
                            enablePaginationMode={true}
                        >
                            {(syncPost) => (
                                <DashboardPostList
                                    posts={syncPost}
                                />
                            )}
                        </RestfulDataContainer>
                    );
                }}
            />
        );
    }
}
