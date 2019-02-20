import * as React from 'react';
import { withContext } from 'react-context-service';

import { DomainContext, WithDomainContext } from '@/domain';
import { agencyResources, orderDetailResources, request } from '@/restful';

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
        return null;
    }

    private readonly fetchContext = async () => {
        const { setContext, currentUser } = this.props;

        // tslint:disable-next-line:no-any
        const requests: Promise<any>[] = [
            request(
                orderDetailResources.find
            )
        ];

        if (currentUser.agency) {
            requests.push(
                request(
                    agencyResources.findOne,
                    [{ type: 'path', parameter: 'id', value: currentUser.agency.id! }]
                )
            );
        }

        const [
            orderDetails,
            currentAgency
        ] = await Promise.all(requests);

        try {
            setContext({
                initOrderDetails: orderDetails,
                currentAgency: currentAgency,
                appState: 'READY'
            });
        } catch (error) {
            throw new Error('Problem encountered when fetch domain context!');
        }
    }
}

export default withContext<DomainContext>('currentUser')(ContextFetcher);