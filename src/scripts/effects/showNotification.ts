import { notification } from 'antd';

interface ShowNotificationProps {
    readonly type: 'success' | 'warning' | 'error' | 'info';
    readonly message: React.ReactNode;
    readonly description?: React.ReactNode;
    readonly duration?: number;
}

export const showNotification = (showNotificationProps: ShowNotificationProps) => {
    const { message, description, type, duration } = showNotificationProps;
    if (!notification[type]) {
        throw new Error('Notification type not allowed!');
    }

    notification[type]({
        duration: duration,
        message: message,
        description: description
    });
}