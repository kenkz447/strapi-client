import './HeaderNotification.scss';

import { Avatar, Badge, Card, Dropdown, Empty, Icon, List } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { DATETIME_FORMAT } from '@/configs';
import { AppNotification, DomainContext } from '@/domain';
import { formatDate } from '@/utilities';

const HeaderNotificationWrapper = styled.div`
    .anticon-notification {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
    }
    .anticon {
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

        return notifications;
    }

    private readonly getNotificationIcon = (notification: AppNotification) => {
        if (notification.type === 'PROMOTION') {
            return <Avatar size="large" icon="gift" style={{background: '#87d068'}} />;
        }
        return null;
    }

    private readonly x = (unreadNotifications: AppNotification[]) => {
        if (!unreadNotifications.length) {
            return (
                <Card>
                    <Empty />
                </Card>
            );
        }

        return (
            <List
                className="header-notification-list"
                dataSource={unreadNotifications}
                renderItem={(item: AppNotification, i) => {
                    const icon = this.getNotificationIcon(item);

                    return (
                        <List.Item
                            key={i}
                            style={{ padding: '12px 16px' }}
                            
                        >
                            <List.Item.Meta
                                avatar={icon}
                                title={item.content}
                                description={formatDate(item.createdAt, DATETIME_FORMAT)}
                            />
                        </List.Item>
                    );
                }}
            />
        );
    }

    public render() {
        const notifications = this.getUnreadNotifications();
        const unreadNotifications = notifications.filter(o => !o.viewed).length;

        return (
            <Dropdown
                overlay={this.x(notifications)}
                trigger={['click']}

            >
                <HeaderNotificationWrapper
                    className="header-action"
                >
                    <Badge count={unreadNotifications}>
                        <Icon type="bell" />
                    </Badge>
                </HeaderNotificationWrapper>
            </Dropdown>
        );
    }
}