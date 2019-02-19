import { Card, Col, Row } from 'antd';
import * as React from 'react';
import { Redirect } from 'react-router';

import { RouteInfo } from '@/app';
import { BusinessController } from '@/business';
import { getOrderShippingDate, upsertOrder } from '@/business/order';
import { PageContent, PageWrapper } from '@/components';
import { CART_URL, CHECKOUT_URL, PRODUCT_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { CheckoutFormControl } from '@/forms/checkout/CheckoutFormControl';
import { text } from '@/i18n';
import { Order } from '@/restful';
import { formatDate, getUrlSearchParam } from '@/utilities';

import { CheckoutComplete, CheckoutPageHeader } from './containers';

type RouteCheckoutProps = AppPageProps;

interface RouteCheckoutState {
    readonly checkoutResultOrder?: Order;
}

export class RouteCheckout extends RoutePage<RouteCheckoutProps, RouteCheckoutState> {
    static readonly withContext = [
        nameof<DomainContext>(o => o.initOrderDetails),
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

        const { setContext, initOrderDetails } = this.props;

        if (!initOrderDetails.length) {
            return;
        }

        setContext({
            initOrderDetails: []
        });
    }

    public render() {
        const {
            initOrderDetails,
            currentAgency
        } = this.props;
        const { checkoutResultOrder } = this.state;

        if (!checkoutResultOrder && !initOrderDetails.length) {
            return <Redirect to={CART_URL} />;
        }

        const shippingDate = getOrderShippingDate();
        const initialValues: Partial<Order> = {
            orderDetails: initOrderDetails,
            agencyOrderer: currentAgency,
            shippingDate: formatDate(shippingDate, 'DD/MM/YYYY'),
            status: 'new'
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