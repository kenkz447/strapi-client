import { render } from '@/app';

import { getRootProps } from './rootProps';

export const startup = (rootElement: HTMLElement | null) => {
    if (!rootElement) {
        return null;
    }

    const rootProps = getRootProps();
    
    render(rootElement, rootProps);
};