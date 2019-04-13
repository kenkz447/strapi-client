import * as React from 'react';
import { withContext } from 'react-context-service';

import { DomainContext, WithDomainContext } from '@/domain';
import {
    agencyResources,
    orderDetailResources,
    request,
    storedPromoCodeResources
} from '@/restful';

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

        if (!currentUser.confirmed) {
            return;
        }

        const requests: Promise<{}>[] = [
            request(
                storedPromoCodeResources.find,
                [{
                    type: 'query',
                    parameter: 'isUsed_ne',
                    value: true
                }, {
                    type: 'query',
                    parameter: 'expiredAt_gt',
                    value: (new Date)
                }]
            )
        ];

        requests.push(
            request(
                agencyResources.find,
                {
                    type: 'query',
                    parameter: 'linkedUser',
                    value: currentUser._id || currentUser.id
                }
            )
        );

        const [
            un,
            fetcherAgencies,
        ] = await Promise.all(requests);

        try {
            setContext({
                cartOrderDetails: [],
                currentAgency: fetcherAgencies && fetcherAgencies[0],
                appState: 'READY'
            });
        } catch (error) {
            throw new Error('Problem encountered when fetch domain context!');
        }
    }
}

export default withContext<DomainContext>('currentUser')(ContextFetcher);