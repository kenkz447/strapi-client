import './HeaderNotification.scss';

import { Avatar, Badge, Card, Dropdown, Empty, Icon, List } from 'antd';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { DATETIME_FORMAT } from '@/configs';
import { DomainContext } from '@/domain';
import { Notification, notificationResources, request } from '@/restful';
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

    private readonly getNotificationIcon = (notification: Notification) => {
        if (notification.type === 'PROMOTION') {
            return <Avatar size="large" icon="gift" style={{ background: '#87d068' }} />;
        }
        return null;
    }

    private readonly getNotificationUrlPath = (notification: Notification) => {
        const targetURL = new URL(notification.url);
        const targetPath = targetURL.pathname + targetURL.search;
        return targetPath;
    }

    private readonly setNotificationViewed = (notification: Notification) => {
        if (notification.viewed) {
            return;
        }

        request(
            notificationResources.setViewed,
            {
                type: 'path',
                parameter: 'id',
                value: notification.id
            }
        );
    }

    private readonly onNoticationClick = (notification: Notification) => {
        const { history } = this.context;
        const targetPath = this.getNotificationUrlPath(notification);
        history.push(targetPath);
        this.setNotificationViewed(notification);
    }

    private readonly x = (unreadNotifications: Notification[]) => {
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
                renderItem={(notification: Notification, i) => {

                    const icon = this.getNotificationIcon(notification);

                    return (
                        <List.Item
                            key={i}
                            className={notification.viewed ? 'viewed' : ''}
                            style={{ padding: '12px 16px' }}
                            onClick={() => this.onNoticationClick(notification)}
                        >
                            <List.Item.Meta
                                avatar={icon}
                                title={notification.message}
                                description={formatDate(notification.createdAt, DATETIME_FORMAT)}
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