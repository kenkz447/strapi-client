import { render } from 'qoobee';

import { getRootProps } from './rootProps';

export const startup = (rootElement: HTMLElement | null) => {
    if (!rootElement) {
        return null;
    }

    const rootProps = getRootProps();
    
    render(rootElement, rootProps);
};