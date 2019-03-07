import { RouteInfo } from 'qoobee';
import * as React from 'react';

import {
    PageContent,
    PageHeader,
    PageLoading,
    PageWrapper,
    SlideUp
} from '@/components';
import { AGENCIES_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    Agency,
    AgencyLevel,
    agencyLevelResources,
    agencyResources,
    request
} from '@/restful';

import { AgenciesFetcher } from './containers';
import { RouteAgenciesContext } from './RouteAgenciesContext';

type RouteProps = AppPageProps;

interface RouteAgenciesState {
    readonly allowLoad: boolean;
    readonly initAgenies: Agency[];
    readonly routeContext: {
        readonly agencyLevels: AgencyLevel[];
    };
}

export class RouteAgencies extends RoutePage<RouteProps, RouteAgenciesState> {
    static readonly withContext: Array<keyof DomainContext> = [];

    static readonly routeInfo: RouteInfo = {
        path: AGENCIES_URL,
        title: () => text('Agency list'),
        exact: true
    };

    constructor(props: RouteProps) {
        super(props);
        this.state = {
            allowLoad: false,
            initAgenies: [],
            routeContext: {
                agencyLevels: []
            }
        };

        this.fetchResources();
    }

    readonly fetchResources = async () => {
        const [initAgenies, agencyLevels] = await Promise.all([
            request(agencyResources.find, AgenciesFetcher.getDefaultRequestParams()),
            request(agencyLevelResources.find)
        ]);

        this.setState({
            allowLoad: true,
            initAgenies: initAgenies,
            routeContext: {
                agencyLevels
            }
        });
    }

    readonly renderHeaderActions = () => {
        return (
            <div>
                {null}
            </div>
        );
    }

    render() {
        const { allowLoad, initAgenies, routeContext } = this.state;

        if (!allowLoad) {
            return <PageLoading />;
        }

        return (
            <RouteAgenciesContext.Provider value={routeContext}>
                <PageWrapper>
                    <PageHeader
                        title={this.title}
                        action={this.renderHeaderActions()}
                        breadcrumbList={[{
                            title: 'Home',
                            href: '/'
                        }, {
                            title: text('Agenies')
                        }]}
                    />
                    <PageContent>
                        <SlideUp className="w-100 d-flex">
                            <AgenciesFetcher initData={initAgenies} />
                        </SlideUp>
                    </PageContent>
                </PageWrapper>
            </RouteAgenciesContext.Provider>
        );
    }
}