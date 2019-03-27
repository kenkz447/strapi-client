import { Avatar, Icon, List } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { DATE_FORMAT } from '@/configs';
import { Post } from '@/restful';
import { formatDate } from '@/utilities';

interface DashboardPostListProps {
    readonly posts: Post[];
}

export class DashboardPostList extends React.PureComponent<DashboardPostListProps> {
    public render() {
        const { posts } = this.props;
        return (
            <List
                size="large"
                itemLayout="vertical"
                dataSource={posts}
                renderItem={(item: Post) => {
                    const postURL = `?post=${item.slug}`;
                    const thumbnail = item.thumbnail
                        && (
                            <img
                                width={256}
                                alt="thumbnail"
                                src={getUploadedFileSrc({ uploadedFile: item.thumbnail })}
                            />
                        );

                    return (
                        <List.Item
                            key={item.title}
                            extra={thumbnail}
                        >
                            <List.Item.Meta
                                // tslint:disable-next-line:max-line-length
                                avatar={<Avatar src="/static/assets/news-icon.png" />}
                                title={<Link to={postURL}>{item.title}</Link>}
                                description={`Ngày đăng: ${formatDate(item.updatedAt, DATE_FORMAT)}`}
                            />
                            {item.brief}
                        </List.Item>
                    );
                }}
            />
        );
    }
}
