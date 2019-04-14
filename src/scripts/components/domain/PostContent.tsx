import { Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { RequestParams, RestfulRender } from 'react-restful';

import { getPostHTMLContent } from '@/business/post';
import { Loading } from '@/components/generic';
import { DATE_FORMAT } from '@/configs';
import { DomainContext } from '@/domain';
import { text } from '@/i18n';
import { Post, postResources } from '@/restful';
import { formatDate } from '@/utilities';

interface PostContentProps {
    readonly postSlug: string;
    readonly postId?: string;
}

export class PostContent extends React.PureComponent<PostContentProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly renderContent = (post: Post | null) => {
        if (!post) {
            return <Loading />;
        }

        const postContent = getPostHTMLContent(post);

        return (
            <div>
                <Typography.Title level={3}>{post.title}</Typography.Title>
                <Typography.Text type="secondary">
                    {text('Date Submitted')}: {formatDate(post.updatedAt, DATE_FORMAT)}
                </Typography.Text>
                <div className="white-space-2" />
                <article
                    className="dashboard-post-content"
                    dangerouslySetInnerHTML={{ __html: postContent }}
                />
            </div>
        );
    }

    public render() {
        const { postSlug, postId } = this.props;
        if (postId) {
            return (
                <RestfulRender
                    resource={postResources.findOne}
                    parameters={{
                        type: 'path',
                        parameter: 'id',
                        value: postId
                    }}
                >
                    {({ data }) => this.renderContent(data)}
                </RestfulRender>
            );
        }

        return (
            <RestfulRender
                resource={postResources.find}
                parameters={{
                    type: 'query',
                    parameter: 'slug',
                    value: postSlug
                }}
            >
                {({ data }) => this.renderContent(data ? data[0] : null)}
            </RestfulRender>
        );
    }
}
