import { Card, Icon } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';

import { PostContent } from '@/components/domain';
import { DASHBOARD_URL } from '@/configs';
import { DomainContext } from '@/domain';

interface DashboardPostProps {
    readonly postSlug: string;
    readonly backURL?: string;
}

export class DashboardPost extends React.PureComponent<DashboardPostProps> {
    public static readonly contextType = RootContext;
    public readonly context!: DomainContext;

    private readonly goBackBtnClick = () => {
        const { history } = this.context;
        const { backURL } = this.props;

        if (history.action === 'PUSH') {
            return void history.goBack();
        }
        
        if (backURL) {
            return void history.replace(backURL);
        }

        history.replace(DASHBOARD_URL);
    }

    public render() {
        const { postSlug } = this.props;

        return (
            <Card
                style={{ minHeight: '100%' }}
                bordered={false}
                title={<Icon onClick={this.goBackBtnClick} className="clickable" type="arrow-left" />}
            >
                <PostContent postSlug={postSlug}/>
            </Card>
        );
    }
}
