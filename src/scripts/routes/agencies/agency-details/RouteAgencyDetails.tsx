import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { RestfulDataContainer } from 'react-restful';
import { Redirect } from 'react-router';

import { PageContent, PageLoading, PageWrapper } from '@/components';
import { AGENCY_DETAIL_URL, DASHBOARD_BASE_PATH } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';
import {
    Agency,
    agencyResources,
    agencyResourceType,
    request
} from '@/restful';

import { AgencyDetailsHeader } from './containers';
import { AgencyDetailsContent } from './containers/AgencyDetailsContent';

type RouteAgencyDetailsProps = AppPageProps<{ readonly id: string }>;

interface RouteAgencyDetailsState {
    readonly agency?: Agency;
}

export class RouteAgencyDetails extends RoutePage<
    RouteAgencyDetailsProps,
    RouteAgencyDetailsState
    > {
    static readonly routeInfo: RouteInfo = {
        path: AGENCY_DETAIL_URL,
        title: text('Agency details'),
        exact: true
    };

    constructor(props: RouteAgencyDetailsProps) {
        super(props);

        this.state = {
        };

        this.fetchResource();
    }

    private readonly fetchResource = async () => {
        const [agency] = await Promise.all([
            request(
                agencyResources.findOne,
                {
                    type: 'path',
                    parameter: 'id',
                    value: this.props.match.params.id,
                }
            ),
        ]);

        this.setState({
            agency
        });
    }

    public render() {
        const { agency } = this.state;

        if (!agency) {
            return <PageLoading />;
        }

        return (
            <PageWrapper>
                <RestfulDataContainer
                    initDataSource={[agency]}
                    resourceType={agencyResourceType}
                >
                    {([syncAgency]) => (
                        <React.Fragment>
                            <AgencyDetailsHeader agency={syncAgency} />
                            <PageContent>
                                <AgencyDetailsContent agency={syncAgency} />
                            </PageContent>
                        </React.Fragment>
                    )}
                </RestfulDataContainer>
            </PageWrapper>
        );
    }
}