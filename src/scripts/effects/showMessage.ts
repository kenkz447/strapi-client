import { message } from 'antd';

interface ShowMessageProps {
    readonly type: 'success' | 'warning' | 'error' | 'info';
    readonly content: React.ReactNode;
    readonly duration?: number;
}

export const showMessage = (props: ShowMessageProps) => {
    const { content, type, duration } = props;
    if (!message[type]) {
        throw new Error('Message type not allowed!');
    }
    message[type](content, duration);
};