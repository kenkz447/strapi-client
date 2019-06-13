import { Avatar, Icon, List } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { DATE_FORMAT } from '@/configs';
import { text } from '@/i18n';
import { Post } from '@/restful';
import { formatDate } from '@/utilities';

export interface DashboardPostListProps {
    readonly posts: Post[];
    readonly getPostDetailUrl: (post: Post) => string;
}

export class DashboardPostList extends React.PureComponent<DashboardPostListProps> {
    public render() {
        const { posts, getPostDetailUrl } = this.props;
        return (
            <List
                size="large"
                itemLayout="vertical"
                dataSource={posts}
                renderItem={(post: Post) => {
                    const postURL = getPostDetailUrl(post);
                    const thumbnail = post.thumbnail
                        && (
                            <img
                                width={256}
                                alt="thumbnail"
                                src={getUploadedFileSrc({ uploadedFile: post.thumbnail })}
                            />
                        );

                    return (
                        <List.Item
                            key={post.title}
                            extra={thumbnail}
                        >
                            <List.Item.Meta
                                // tslint:disable-next-line:max-line-length
                                avatar={<Avatar src="/static/assets/news-icon.png" />}
                                title={<Link to={postURL}>{post.title}</Link>}
                                description={`${text('Date Submitted')}: ${formatDate(post.updatedAt, DATE_FORMAT)}`}
                            />
                            <p>{post.brief}</p>
                            <Link to={postURL}>Đọc thêm...</Link>
                        </List.Item>
                    );
                }}
            />
        );
    }
}
