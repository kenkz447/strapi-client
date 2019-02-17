import * as React from 'react';
import { withContext } from 'react-context-service';

import { DomainContext, WithDomainContext } from '@/domain';
import { orderDetailResources, request } from '@/restful';

type ContextFetcherProps = WithDomainContext & Pick<DomainContext, 'currentUser'>;

class ContextFetcher extends React.PureComponent<ContextFetcherProps> {
    public componentDidUpdate() {
        const { currentUser } = this.props;

        if (!currentUser) {
            return;
        }

        this.fetchContext();
    }

    public render() {
        return this.props.children || null;
    }

    private readonly fetchContext = async () => {
        const { setContext, currentUser } = this.props;
        const [orderDetails] = await Promise.all([
            request(orderDetailResources.find)
        ]);

        try {
            setContext({
                initOrderDetails: orderDetails,
                appState: 'READY'
            });
        } catch (error) {
            throw new Error('Problem encountered when fetch domain context!');
        }
    }
}

export default withContext<DomainContext>('currentUser')(ContextFetcher);