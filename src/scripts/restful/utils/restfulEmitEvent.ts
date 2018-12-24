import { eventEmitter } from '@/app';

import { FetchEventArgs } from '../base';

export const restfulEmitEvent = (props: {
    readonly type: 'START' | 'SUCCESS' | 'FAIL',
    readonly url: string,
    readonly method?: string
}) => {
    const eventArgs: FetchEventArgs = {
        url: props.url,
        method: props.method
    };

    eventEmitter.emit(props.type, eventArgs);
};