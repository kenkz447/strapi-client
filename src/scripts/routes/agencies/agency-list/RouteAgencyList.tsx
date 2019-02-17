import * as React from 'react';

import { RouteInfo } from '@/app';
import {
    PageContent,
    PageHeader,
    PageLoading,
    PageWrapper,
    SlideUp
} from '@/components';
import { AGENCY_LIST_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { text } from '@/i18n';
import { agencyResources, request } from '@/restful';

import { AgenciesFetcher } from './containers';

type RouteProps = AppPageProps;

export class RouteAgencyList extends RoutePage<RouteProps> {
    static readonly withContext: Array<keyof DomainContext> = [];

    static readonly routeInfo: RouteInfo = {
        path: AGENCY_LIST_URL,
        title: () => text('Agency list'),
        exact: true
    };

    readonly state = {
        allowLoad: false,
        initAgenies: []
    };

    constructor(props: RouteProps) {
        super(props);
        this.fetchResources();
    }

    readonly fetchResources = async () => {
        const [initAgenies] = await Promise.all([
            request(agencyResources.find, AgenciesFetcher.getDefaultRequestParams()),
            request(agencyResources.find)
        ]);

        this.setState({
            allowLoad: true,
            initAgenies: initAgenies
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
        const { allowLoad, initAgenies } = this.state;
        if (!allowLoad) {
            return <PageLoading />;
        }

        return (
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
        );
    }
}