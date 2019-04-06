import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { INVITATION_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { InvitationCreateFormButton } from '@/forms/invitation';
import { text } from '@/i18n';

import { InvitationsFetcher } from './containers';

type RouteAccountProps = AppPageProps;

interface RouteInvitationsState {

}

export class RouteInvitations extends RoutePage<RouteAccountProps, RouteInvitationsState> {
    static readonly routeInfo: RouteInfo = {
        path: INVITATION_URL,
        title: text('Invitation'),
        exact: true
    };

    constructor(props: RouteAccountProps) {
        super(props);

        this.state = {
            routeContext: {
                roles: []
            }
        };

        this.fetchResources();
    }

    private readonly fetchResources = async () => {
        // 
    }

    readonly renderHeaderActions = () => {
        return (
            <div>
                <InvitationCreateFormButton>
                    {text('Create invitation link')}
                </InvitationCreateFormButton>
            </div>
        );
    }

    render() {
        return (
            <PageWrapper>
                <PageHeader
                    title={this.title}
                    content="Các inviation-link sẽ hết hạn sau 7 ngày!"
                    action={this.renderHeaderActions()}
                    breadcrumbList={[{
                        title: text('Dashboard'),
                        href: '/'
                    }, {
                        title: text('Invitation')
                    }]}
                />
                <PageContent>
                    <InvitationsFetcher />
                </PageContent>
            </PageWrapper>
        );
    }
}