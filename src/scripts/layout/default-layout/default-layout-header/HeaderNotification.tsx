import { Badge, Button, Icon } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

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

    private readonly getUnreadNotifications = () => {
        const { notifications } = this.context;
        if (!notifications) {
            return [];
        }
        
        return notifications.filter(o => !o.viewedAt);
    }

    public render() {
        const unreadNotifications = this.getUnreadNotifications();

        return (
            <HeaderNotificationWrapper
                className="header-action"
            >
                <Badge count={unreadNotifications.length} dot={true}>
                    <Icon className="" type="notification" />
                </Badge>
            </HeaderNotificationWrapper>
        );
    }
}