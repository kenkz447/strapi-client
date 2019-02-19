import { Badge, Button, Icon } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { RootContext } from '@/app';
import { DomainContext } from '@/domain';

const HeaderNotificationWrapper = styled.div`
    .anticon-notification {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
    }
`;

interface HeaderNotificationProps {
}

export class HeaderNotification extends React.PureComponent<HeaderNotificationProps> {
    static readonly contextType = RootContext;
    readonly context!: DomainContext;

    public render() {
        const { history } = this.context;

        return (
            <HeaderNotificationWrapper
                className="header-action"
                onClick={() => history.push('/notification')}
            >
                <Badge count={1} dot={true}>
                    <Icon className="" type="notification" />
                </Badge>
            </HeaderNotificationWrapper>
        );
    }
}