import './DashboardPost.scss';

import { Card, Icon, Typography } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { getPostHTMLContent } from '@/business/post';
import { Loading } from '@/components';
import { DASHBOARD_URL, DATE_FORMAT } from '@/configs';
import { DomainContext } from '@/domain';
import { postResources } from '@/restful';
import { formatDate } from '@/utilities';

interface DashboardPostProps {
    readonly postSlug: string;
}

export class DashboardPost extends React.PureComponent<DashboardPostProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly goBackBtnClick = () => {
        const { history } = this.context;
        if (history.action === 'PUSH') {
            return void history.goBack();
        }

        history.replace(DASHBOARD_URL);
    }

    public render() {
        const { postSlug } = this.props;
        return (
            <RestfulRender
                resource={postResources.find}
                parameters={{
                    type: 'query',
                    parameter: 'slug',
                    value: postSlug
                }}
            >
                {({ data, fetching }) => {
                    if (!data || !data.length) {
                        return <Loading />;
                    }

                    const [post] = data;
                    const postContent = getPostHTMLContent(post);

                    return (
                        <Card
                            style={{ minHeight: '100%' }}
                            bordered={false}
                            title={<Icon onClick={this.goBackBtnClick} className="clickable" type="arrow-left" />}
                        >
                            <div>
                                <Typography.Title level={3}>{post.title}</Typography.Title>
                                <Typography.Text type="secondary">
                                    Ngày đăng: {formatDate(post.updatedAt, DATE_FORMAT)}
                                </Typography.Text>
                                <div className="white-space-2" />
                                <article
                                    className="dashboard-post-content"
                                    dangerouslySetInnerHTML={{ __html: postContent }}
                                />
                            </div>
                        </Card>
                    );
                }}
            </RestfulRender>
        );
    }
}
