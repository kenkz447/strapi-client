import { Divider, Typography } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageWrapper } from '@/components';
import { PROFILE_ADDRESS_BOOK_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { AddressFormButton } from '@/forms/profile/address/AddressFormButton';
import { text } from '@/i18n';

import { AddressesFetcher } from './containers';

type RouteProfileAddressBookProps = AppPageProps;

export class RouteProfileAddressBook extends RoutePage<RouteProfileAddressBookProps> {
    public static readonly withContext = ['currentAgency'];

    static readonly routeInfo: RouteInfo = {
        path: PROFILE_ADDRESS_BOOK_URL,
        title: text('Address book'),
        exact: true
    };

    public render() {

        return (
            <PageWrapper backgroundColor="#fff">
                <PageContent>
                    <div>
                        <div className="display-flex">
                            <Typography.Title level={4} className="flex-grow-1">
                                {text('Address book')}
                            </Typography.Title>
                            <AddressFormButton
                                type="primary"
                                label={text('Add address')}
                                icon="plus"
                            >
                                {text('Add address')}
                            </AddressFormButton>
                        </div>
                        <Divider dashed={true} />
                        <div>
                            <AddressesFetcher />
                        </div>
                    </div>
                </PageContent>
            </PageWrapper>
        );
    }
}