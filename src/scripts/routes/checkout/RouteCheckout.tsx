import { Card, Col, Row } from 'antd';
import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import { CHECKOUT_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { CheckoutFormControl } from '@/forms/checkout/CheckoutFormControl';
import { text } from '@/i18n';

import { CheckoutPageHeader } from './containers';

type RouteCheckoutProps = AppPageProps;

export class RouteCheckout extends RoutePage<RouteCheckoutProps> {
    static readonly routeInfo: RouteInfo = {
        path: CHECKOUT_URL,
        title: text('Checkout'),
        exact: true
    };

    render() {
        return (
            <PageWrapper>
                <CheckoutPageHeader />
                <PageContent>
                    <Card>
                        <CheckoutFormControl
                            initialValues={{}}
                            submit={() => {}}
                        />
                    </Card>
                </PageContent>
            </PageWrapper>
        );
    }
}