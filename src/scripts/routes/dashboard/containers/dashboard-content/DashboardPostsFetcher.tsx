import * as React from 'react';
import { RestfulDataContainer, RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { postResources, postResourceType } from '@/restful';

import {
    DashboardPostList,
    DashboardPostListProps
} from './dashboard-post-fetcher';

interface DashboardPostsFetcherProps {
    readonly getPostDetailUrl?: DashboardPostListProps['getPostDetailUrl'];
}

export class DashboardPostsFetcher extends React.PureComponent<DashboardPostsFetcherProps> {
    public static readonly defaultProps: DashboardPostsFetcherProps = {
        getPostDetailUrl: (post) => `?post=${post.slug}`
    };

    public render() {
        const { getPostDetailUrl } = this.props;
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
                                    getPostDetailUrl={getPostDetailUrl!}
                                />
                            )}
                        </RestfulDataContainer>
                    );
                }}
            />
        );
    }
}
