import { Card } from 'antd';
import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Redirect } from 'react-router';

import { BusinessController } from '@/business';
import { upsertOrder } from '@/business/order';
import { PageContent, PageWrapper } from '@/components';
import { CART_URL, CHECKOUT_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { CheckoutFormControl } from '@/forms/checkout/CheckoutFormControl';
import { text } from '@/i18n';
import { Order } from '@/restful';

import { CheckoutComplete, CheckoutPageHeader } from './containers';

type RouteCheckoutProps = AppPageProps;

interface RouteCheckoutState {
    readonly checkoutResultOrder?: Order;
}

export class RouteCheckout extends RoutePage<RouteCheckoutProps, RouteCheckoutState> {
    static readonly withContext = [
        nameof<DomainContext>(o => o.cartOrderDetails),
        nameof<DomainContext>(o => o.currentAgency)
    ];

    static readonly routeInfo: RouteInfo = {
        path: CHECKOUT_URL,
        title: text('Checkout'),
        exact: true
    };

    constructor(props: RouteCheckoutProps) {
        super(props);
        this.state = {};
    }

    public componentDidUpdate() {
        if (!this.state.checkoutResultOrder) {
            return;
        }

        const { setContext, cartOrderDetails } = this.props;

        if (!cartOrderDetails.length) {
            return;
        }

        setContext({
            cartOrderDetails: []
        });
    }

    public render() {
        const {
            cartOrderDetails,
            currentAgency
        } = this.props;
        const { checkoutResultOrder } = this.state;

        if (!checkoutResultOrder && !cartOrderDetails.length) {
            return <Redirect to={CART_URL} />;
        }

        const initialValues: Partial<Order> = {
            orderDetails: cartOrderDetails,
            agencyOrderer: currentAgency,
            addressType: 'house'
        };

        return (
            <PageWrapper>
                <CheckoutPageHeader />
                <PageContent>
                    <Card style={{ minHeight: '100%' }}>
                        {
                            checkoutResultOrder
                                ? (<CheckoutComplete order={checkoutResultOrder} />)
                                : (
                                    <BusinessController
                                        action={upsertOrder}
                                        onSuccess={(result: Order) => {
                                            this.setState({
                                                checkoutResultOrder: result
                                            });
                                        }}
                                    >
                                        {({ doBusiness }) => {
                                            return (
                                                <CheckoutFormControl
                                                    initialValues={initialValues}
                                                    submit={doBusiness}
                                                />
                                            );
                                        }}
                                    </BusinessController>
                                )
                        }
                    </Card>
                </PageContent>
            </PageWrapper>
        );
    }
}